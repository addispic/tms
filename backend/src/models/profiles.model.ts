import { Schema, Document, models, model } from "mongoose";

// interface
interface Profile extends Document {
  author: Schema.Types.ObjectId;
  file: string;
  flag: "pro" | "bg";
  public_id: string;
}

// profiles schema
const profilesSchema = new Schema<Profile>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  }
});

// exports
export default models.Profile || model("Profile",profilesSchema)