import { UserDocument } from "../../models/user";

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
