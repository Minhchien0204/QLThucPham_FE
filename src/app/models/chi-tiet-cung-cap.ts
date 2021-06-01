export class ChiTietCungCap{
    id!: number;
    soPhieuCugCap!: string;
    maThucPham!: string;
    tenThucPham!: string;
    maNhaCungCap!: string;
    tenNhaCungCap!: string;
    soLuong!: string;
}

export const bodyChiTietCungCap: {[index: string]: any} = {
    "soPhieuCugCap": "",
    "maThucPham": "",
    "maNhaCungCap": "",
    "soLuong": ""
}