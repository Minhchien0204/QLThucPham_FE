export class PhieuAn{
    sophieuAn!: string;
    maGV!: string;
    name!: string;
    ngayLap!: Date;
    soLuong!: number;
    trangThai!: boolean;
    ghiChu!: string;
}


export class PhieuAnUpdate{
    sophieuAn!: string;
    maGV!: string;
    ngayLap!: Date;
    soLuong!: number;
    trangThai!: boolean;
    ghiChu!: string;
}


export const bodyPhieuAn: {[index: string]: any} = {
    "sophieuan": "",
    "maGV": "",
    "ngayLap": "",
    "soLuong": "",
    "ghiChu": "",
} 
