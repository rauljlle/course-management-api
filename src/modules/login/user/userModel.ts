import {Schema, model} from 'mongoose';
import IUser from './userInterface';

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default model('User', UserSchema);
