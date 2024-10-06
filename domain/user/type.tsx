export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: string;
    created_at: string;
    updated_at: string;
    password: string;
}

export interface UserCreateForm {
    name: string;
    email: string;
    password: string;
    role: string;
}
export interface UserUpdateForm {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}