export class PhieuCungCap{
    soPhieuCugCap!: string;
    maNhanVien!: string;
    name!: string;
    ngayLap!: Date;
    trangThai!: boolean;
    ghiChu!: string;
}

export class PhieuCungCapUpdate{
    soPhieuCugCap!: string;
    maNhanVien!: string;
    ngayLap!: Date;
    trangThai!: boolean;
    ghiChu!: string;
}

export const bodyPhieuCungCap: {[index: string]: any} = {
    "soPhieuCugCap": "",
    "maNhanVien": "",
    "ngayLap": "",
    "ghiChu": "",
}