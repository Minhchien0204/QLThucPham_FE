export class ChiTietGiao{
    id!: number;
    soPhieuGiao!: string;
    maThucPham!: string;
    tenThucPham!: string;
    maNhaCungCap!: string;
    tenNhaCungCap!: string;
    soLuong!: string;
    donGia!: string;
}

export const bodyChiTietGiao: {[index: string]: any} = {
    "soPhieugiao": "",
    "maThucPham": "",
    "maNhaCungCap": "",
    "soLuong": "",
    "donGia": ""
}