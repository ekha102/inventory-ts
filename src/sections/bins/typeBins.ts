export interface ICreateBin {
  bin_id: number;
  bin_name: string;
}

export interface ITableBins {
  bin_id: number;
  bin_name: string;
}

export interface IEditBins {
  bin_id: number | string;    // Backend pass in the null, but the empty string
  bin_name: string;
  loc_id: number | string;
  loc_name: string;
  bin_desc: string;
}

