import mongoose, { Document, Schema } from "mongoose";

export type UserDocument = Document & {
  full_name: string;
  email: string;
  profileImageUrl: string;
  gender?: string;
  phoneNumber?: string;
  geoLocation?: {
    latitude: string;
    longitude: string;
  };
  address?: string;
  aadharCardUrl?: string;
  upiId?: string;
  isEligible: boolean;
};

const userSchema = new Schema<UserDocument>({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImageUrl: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
  phoneNumber: { type: String, unique: true },
  geoLocation: {
    type: {
      latitude: { type: String },
      longitude: { type: String },
    },
    default: null,
  },
  address: { type: String },
  aadharCardUrl: { type: String },
  upiId: { type: String },
  isEligible: {
    type: Boolean,
    default: function (this: UserDocument) {
      return this.full_name &&
        this.email &&
        this.profileImageUrl &&
        this.gender &&
        this.phoneNumber &&
        this.geoLocation &&
        this.address &&
        this.aadharCardUrl &&
        this.upiId
        ? true
        : false;
    },
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.isEligible = !!(
      this.full_name &&
      this.email &&
      this.profileImageUrl &&
      this.gender &&
      this.phoneNumber &&
      this.geoLocation &&
      this.address &&
      this.aadharCardUrl &&
      this.upiId
    );
  }
  next();
});

userSchema.pre("updateOne", function (next) {
  this.isEligible = !!(
    this.full_name &&
    this.email &&
    this.profileImageUrl &&
    this.gender &&
    this.phoneNumber &&
    this.geoLocation &&
    this.address &&
    this.aadharCardUrl &&
    this.upiId
  );
  next();
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
