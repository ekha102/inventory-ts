export interface ILocationTable {
  loc_id: number;
  loc_name: string;
}

export interface ICreateLoc {
  loc_name: string;
}

export interface ILocations {
  loc_id?: number;
  loc_name: string;
}

export interface ILocationInBins {
  loc_id: number,
  loc_name: string;
}
