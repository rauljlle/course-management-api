import { model, Schema } from "mongoose";
import ICourse from "./interfaces/ICourse";

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  instructor: { type: String, required: true },
});

export default model<ICourse>("Course", CourseSchema);
