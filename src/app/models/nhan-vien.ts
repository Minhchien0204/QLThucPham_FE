export class NhanVien {
    id!: number;
    maNhanVien!: string;
    name!: string;
    dienThoai!: string;
    diaChi!: string;
    ngaySinh!: string;
    tenBoPhan!: string;
}

export const bodyNhanVien: {[index: string]:any} = {
    "id": "",
    "tenBoPhan": ""
}
