export class UserDetail {
    id!: number;
    userName!: string;
    password!: string;
    name!: string;
    gioiTinh!: boolean;
    ngaySinh!: Date;
    dienThoai!: string;
    diaChi!: string;
    role!: string;
}

export const bodyUser: {[index: string]:any} = {
    "userName": "",
    "password": "",
    "name": "",
    "gioiTinh": "",
    "ngaySinh": "",
    "dienThoai": "",
    "diaChi": "",
    "role": ""

}