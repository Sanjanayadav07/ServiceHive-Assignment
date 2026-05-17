import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'sales';
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },


        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'sales'],
            default: 'sales',
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);