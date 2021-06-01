export class ChiTietKiemKe{
    id!: number;
    soPhieuKiemKe!: string;
    maThucPham!: string;
    tenThucPham!: string;
    soLuong!: string;
    chatLuong!: string;
}

export const bodyChiTietKiemKe: {[index: string]: any} = {
    "soPhieuKiemKe": "",
    "maThucPham": "",
    "soLuong": "",
    "chatLuong": ""
}