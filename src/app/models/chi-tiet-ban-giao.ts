export class ChiTietBanGiao{
    id!: number;
    soPhieuBanGiao!: string;
    maThucPham!: string;
    tenThucPham!: string;
    soLuong!: string;
}

export const bodyChiTietBanGiao: {[index: string]: any} = {
    "soPhieuBanGiao": "",
    "maThucPham": "",
    "soLuong": ""
}