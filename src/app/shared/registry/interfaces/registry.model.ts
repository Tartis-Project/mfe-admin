export interface Registry {
  id: string;
  idParkingSpot: string;
  idVehicle: string;
  idRate: string;
  entryTime: Date;
  exitTime?: Date;
  amount?: number;
}
