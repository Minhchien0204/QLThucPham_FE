import { Role } from "./role";

export class User {
    id!: number;
    userName!: string;
    name!: string;
    gioiTinh!: boolean;
    dienThoai!: string;
    diaChi!: string;
    ngaySinh!: Date;
    role!: Role;
    token?: string;
}
