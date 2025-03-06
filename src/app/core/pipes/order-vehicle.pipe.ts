import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../../pages/vehicles/interfaces/vehicle.model';
import { Registry } from '../../shared/registry/interfaces/registry.model';

@Pipe({
  name: 'orderVehicle',
  standalone: true
})
export class OrderVehiclePipe implements PipeTransform {

  transform(vehicles: Vehicle[], registries: Registry[], order: string): Vehicle[] {
    if (registries.length <= 0) return vehicles;
  
    const validRegistries = registries.filter(registry => {
      const entryValid = !isNaN(new Date(registry.entryTime).getTime());
      const exitValid = registry.exitTime ? !isNaN(new Date(registry.exitTime).getTime()) : true;
      return entryValid || exitValid;
    });
  
    switch(order){
      case('new'):
      validRegistries.sort((a, b) => {
        const dateA = new Date(a.entryTime).getTime();
        const dateB = new Date(b.entryTime).getTime();
        return dateB - dateA; 
      });
      break;
      case('old'):
      validRegistries.sort((a, b) => {
        const dateA = new Date(a.entryTime).getTime();
        const dateB = new Date(b.entryTime).getTime();
        return dateA - dateB; 
      });
      break;
    }
    
    
    const vehicleMap = new Map<string, Vehicle>();
    vehicles.forEach(vehicle => {
      vehicleMap.set(vehicle.id, vehicle);
    });
  
    const uniqueVehicles = new Map<string, Vehicle>(); 
    validRegistries.forEach(registry => {
      if (!uniqueVehicles.has(registry.idVehicle)) {
        const vehicle = vehicleMap.get(registry.idVehicle);
        if (vehicle) {
          uniqueVehicles.set(registry.idVehicle, vehicle);
        }
      }
    });
  
    const sortedVehicles = Array.from(uniqueVehicles.values());
    return sortedVehicles;
  }
  

}
