export class PhieuGiao{
    soPhieuGiao!: string;
    maNhanVien!: string;
    name!: string;
    soPhieuCugCap!: string;
    ngayLap!: Date;
    ghiChu!: string
}

export const bodyPhieuGiao: {[index: string]: any} = {
    "soPhieuGiao": "",
    "maNhanVien": "",
    "ngayLap": "",
    "soPhieuCugCap": "",
    "ghiChu": ""
}