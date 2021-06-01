export class PhieuBanGiao{
    soPhieuBanGiao!: string;
    maNhanVien!: string;
    name!: string;
    ngayLap!: Date;
    soPhieuYeuCau!: string;
    ghiChu!: string
}

export const bodyPhieuBanGiao: {[index: string]: any} = {
    "soPhieuBanGiao": "",
    "maNhanVien": "",
    "ngayLap": "",
    "soPhieuYeuCau": "",
    "ghiChu": ""
}