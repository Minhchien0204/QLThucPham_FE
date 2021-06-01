export class ChiTietYeuCau{
    id!: number;
    soPhieuYeuCau!: string;
    maThucPham!: string;
    tenThucPham!: string;
    soLuong!: string;
}

export const bodyChiTietYeuCau: {[index: string]: any} = {
    "soPhieuYeuCau": "",
    "maThucPham": "",
    "soLuong": ""
}