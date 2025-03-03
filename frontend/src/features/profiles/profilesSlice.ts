import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// hooks
import { RootState } from "../../store";

// types
export type Profile = {
  _id: string;
  file: string;
  flag: string;
};

export type Profiles = {
  author: string;
  profiles: Profile[];
};

type InitialSate = {
  profiles: Profiles[];
  isProfilesFetching: boolean;
  isProfileUploading: boolean;
  isProfileUploadingDone: boolean;
  profileFlag: string;
  profilePreview: string | null;
};

// initial state
const initialState: InitialSate = {
  profiles: [],
  isProfilesFetching: false,
  isProfileUploading: false,
  isProfileUploadingDone: false,
  profileFlag: "",
  profilePreview: null,
};

// get profiles
export const getProfiles = createAsyncThunk(
  "profiles/getProfiles",
  async () => {
    try {
      const response = await axios.get("/api/profiles");
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { errors: { flag: "unexpected error has occurred" } };
      }
    }
  }
);

// new profile
export const newProfile = createAsyncThunk(
  "profiles/newProfile",
  async (data: FormData) => {
    try {
      const response = await axios.post("/api/profiles/new", data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return {
          errors: {
            flag: "unexpected error occurred",
          },
        };
      }
    }
  }
);

// slices
const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    // profile flag
    setProfileFlag: (state, action: PayloadAction<string>) => {
      state.profileFlag = action.payload;
    },
    // set profile preview
    setProfilePreview: (state, action: PayloadAction<string>) => {
      state.profilePreview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // cases
      // get profiles
      // pending
      .addCase(getProfiles.pending, (state) => {
        state.isProfilesFetching = true;
      })
      // fulfilled
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.isProfilesFetching = false;
        if (action.payload?.profiles) {
          state.profiles = action.payload?.profiles;
        }
      })
      // rejected
      .addCase(getProfiles.rejected, (state) => {
        state.isProfilesFetching = false;
      })
      //   new profile
      // pending
      .addCase(newProfile.pending, (state) => {
        state.isProfileUploading = true;
        state.isProfileUploadingDone = false;
      })
      // fulfilled
      .addCase(newProfile.fulfilled, (state, action) => {
        state.isProfileUploading = false;
        state.isProfileUploadingDone = true;
        state.profileFlag = "";
        if (action.payload?.profile) {
          const { author, flag, file, _id } = action.payload.profile;
          // is top profile exist
          const isTopProfileExist = state.profiles.find(
            (pro) => pro.author === author
          );
          if (!isTopProfileExist) {
            state.profiles.push({ author, profiles: [{ _id, flag, file }] });

            return;
          } else {
            const topProfileIndex = state.profiles.findIndex(
              (pro) => pro.author === author
            );
            const isProfileExist = isTopProfileExist.profiles.find(
              (pro) => pro.flag === flag
            );
            if (!isProfileExist) {
              isTopProfileExist.profiles.push({ _id, flag, file });
            } else {
              isTopProfileExist.profiles[
                isTopProfileExist.profiles.findIndex((pro) => pro.flag === flag)
              ] = { _id, flag, file };
            }
            state.profiles[topProfileIndex] = isTopProfileExist;
          }
          // state.profileFlag = "";
          state.profilePreview = null;
        }
      })
      // rejected
      .addCase(newProfile.rejected, (state) => {
        state.isProfileUploading = false;
        state.isProfileUploadingDone = true;
      });
  },
});

// exports
// actions
export const { setProfileFlag, setProfilePreview } = profilesSlice.actions;
// selectors
// profiles selector
export const profilesSelector = (state: RootState) => state.profiles.profiles;
// is profile uploading
export const isProfileUploadingSelector = (state: RootState) =>
  state.profiles.isProfileUploading;
// profile flag
export const profileFlagSelector = (state: RootState) =>
  state.profiles.profileFlag;
// profile preview
export const profilePreviewSelector = (state: RootState) =>
  state.profiles.profilePreview;
// reducer
export default profilesSlice.reducer;
