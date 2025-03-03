// hooks
import { useAppSelector } from "../hooks";
// slices
// profiles
import {
  profilesSelector,
  profileFlagSelector,
  profilePreviewSelector,
  isProfileUploadingSelector,
} from "../features/profiles/profilesSlice";
export default function GetProfile({
  _id,
  flag,
}: {
  _id: string;
  flag: string;
}) {
  // states
  // slices state
  // profiles
  const profiles = useAppSelector(profilesSelector);
  const profileFlag = useAppSelector(profileFlagSelector);
  const profilePreview = useAppSelector(profilePreviewSelector);
  const isProfileUploading = useAppSelector(isProfileUploadingSelector);

  const userProfiles = profiles.find((pro) => pro.author === _id)?.profiles;
  const path = userProfiles?.find((pro) => pro.flag === flag)?.file
    ? `${userProfiles?.find((pro) => pro.flag === flag)?.file}`
    : flag === "pro"
    ? "/tms-pro.png"
    : flag === "bg"
    ? "/tms-bg.jpg"
    : "";

  if (profileFlag === flag && profilePreview) {
    return (
      <div className="w-full h-full relative">
        {isProfileUploading && (
          <div className="absolute left-0 top-0 w-full h-full bg-neutral-200/75 flex items-center justify-center">
            <div className="w-[25%] aspect-square shrink-0 rounded-full border-4 border-green-500 border-r-transparent animate-spin" />
          </div>
        )}
        <img
          className="w-full h-full object-center object-cover"
          src={profilePreview || ""}
          alt=""
        />
      </div>
    );
  }

  return (
    <img className="w-full h-full object-center object-cover" src={path} />
  );
}