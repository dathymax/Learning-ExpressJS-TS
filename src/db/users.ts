import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
})

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySesstionToken = (sesstionToken: string) => UserModel.findOne({
    "authentication.sessionToken": sesstionToken
});

export const getUserById = (userId: string) => UserModel.findById(userId);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (userId: string) => UserModel.findByIdAndDelete({ _id: userId });

export const updateUserById = (userId: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(userId, values);
