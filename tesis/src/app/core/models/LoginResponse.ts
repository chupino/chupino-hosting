import { User } from "./User";

export interface LoginResponse{
    data: {
        token: string,
        user: User
    },
    status: Number,
}