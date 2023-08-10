import { UserDocument } from "../../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: string | object;
    }
  }
}
