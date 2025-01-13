import { Document } from "mongoose";

export default interface Course extends Document {
  title: string;
  description: string;
  duration: number;
  instructor: string;
}
