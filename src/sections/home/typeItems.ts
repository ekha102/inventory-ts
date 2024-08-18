export interface IItems {
  item_id: number;
  item_name: string;
  quantity: number;
  alert: number;
  comment: string;
}

export interface ICreateItem {
  item_name: string;
  store_id: number | string;
  loc_id: number | string;
  bin_id: number | string;
  quantity: number | string;
  alert: number | string;
  comment: string;
  item_desc: string;
}