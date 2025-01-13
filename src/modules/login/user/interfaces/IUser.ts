import { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default IUser;
