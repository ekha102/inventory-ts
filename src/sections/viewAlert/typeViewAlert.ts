
export interface IViewAlertTable {
  item_id: number;
  item_name: string;
  store_id: number;
  bin_id: number;
  quantity: number;
  alert: number;
  statust: string;
}

export interface IViewAlertDetail {
  item_name: string;
  item_id: number;
  create_date: Date;
  update_date: Date;
  store_name: string;
  quantity: number;
  alert: number;
  item_desc: string;
  check_in_date: Date;
  check_out_date: Date;
  loc_name: string;
  bin_name: string;
  bin_id: number;
}