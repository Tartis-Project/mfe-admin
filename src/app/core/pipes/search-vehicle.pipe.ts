import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../../pages/vehicles/interfaces/vehicle.model';

@Pipe({
  name: 'searchVehicle',
  standalone: true,
})
export class SearchVehiclePipe implements PipeTransform {
  transform(vehicles: Vehicle[], searchTerm: string): Vehicle[] {
    if (!vehicles || searchTerm.length <=1 ) {
      return vehicles;
    }
    searchTerm = searchTerm.toLowerCase();

    return vehicles.filter(
      (vehicle) =>
        vehicle.licensePlate.toLowerCase().includes(searchTerm) ||
        vehicle.type.toLowerCase().includes(searchTerm) ||
        vehicle.model.toLowerCase().includes(searchTerm) ||
        vehicle.color.toLowerCase().includes(searchTerm),
    );
  }
}
