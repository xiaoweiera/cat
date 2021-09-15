export interface chainModel {
  position: string
}
export interface dappListModel {
  chain: string
  group_id: number | string
  interval: string
  sort_field: string
  sort_type:string
  query:string
  page: number
  page_size: number
}