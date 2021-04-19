// {"project_name":"venus",
// "token_name":"ADA",
// "apy":1.57341408486365,
// "apy_detail":"利率(0.59%) + 挖矿(0.99%)",
// "quota_remain":null,
// "quota_remain_percent":null,
// "quota_used":null,
// "tvl":198758317.857189,
// "quota":null,
// "timestamp":1618830000,
// "high_light":false}
export interface ItemModel {
    project_name: String
    token_name: String
}


export interface HeaderModel {
    token_name: String
    price: Number
    change: Number
}


export interface RowModel {
    project_name: String
    data: ItemModel[]
}

export interface RowResponse {
    code: Number
    data: RowModel[]
}

export interface TableModel {
    title:String,
    headers:HeaderModel[],
    rows:RowModel[]
}