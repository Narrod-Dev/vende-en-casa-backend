export class UserDto {
    id: number;
    full_name:string;
    email: string;
    password_hash: string;
    location:string;
    role: string;
    is_active: boolean;
    created_at: Date;
}
