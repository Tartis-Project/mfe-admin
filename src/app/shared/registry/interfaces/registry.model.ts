import { Timestamp } from "rxjs";

export interface Registry {
  id: string;
  idParkingSpot: string;
  idVehicle: string;
  idRate: string;
  entryTime: Timestamp<Date>;
  exitTime?: Timestamp<Date>;
  amount?: number;
}