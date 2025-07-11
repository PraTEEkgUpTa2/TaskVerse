// types/express/index.d.ts or types.d.ts
import { IUser } from "./models/user.models"; // adjust path as needed

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
