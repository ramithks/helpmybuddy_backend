import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export type UserDocument = Document & {
  googleId: string;
  full_name: string;
  email: string;
  profileImageUrl?: string;
  gender?: string;
  phoneNumber?: string;
  geoLocation?: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  aadharCardUrl?: string;
  upiId?: string;
  isEligible: boolean;
};

const userSchema = new Schema<UserDocument>({
  googleId: String,
  full_name: String,
  email: String,
  profileImageUrl: String,
  gender: String,
  phoneNumber: String,
  geoLocation: {
    latitude: String,
    longitude: String,
  },
  address: String,
  aadharCardUrl: String,
  upiId: String,
  isEligible: Boolean,
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
