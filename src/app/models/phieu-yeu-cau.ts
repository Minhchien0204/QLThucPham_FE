export class PhieuYeuCau{
    soPhieuYeucau!: string;
    maNhanVien!: string;
    name!: string;
    ngayLap!: Date;
    trangThai!: boolean;
    ghiChu!: string;
}


export class PhieuYeuCauUpdate{
    soPhieuYeucau!: string;
    maNhanVien!: string;
    ngayLap!: Date;
    trangThai!: boolean;
    ghiChu!: string;
}

export const bodyPhieuYeuCau: {[index: string]:any} = {
    "soPhieuYeuCau": "",
    "maNhanVien": "",
    "ngayLap": "",
    "ghiChu": "",
}
