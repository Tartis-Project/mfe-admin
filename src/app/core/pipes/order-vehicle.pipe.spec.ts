import { OrderVehiclePipe } from './order-vehicle.pipe';
import { Vehicle } from '../../pages/vehicles/interfaces/vehicle.model';
import { Registry } from '../../shared/registry/interfaces/registry.model';

describe('OrderVehiclePipe', () => {
  let pipe: OrderVehiclePipe;

  beforeEach(() => {
    pipe = new OrderVehiclePipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the vehicles in the correct order when "new" is passed as order', () => {
    const vehicles: Vehicle[] = [
      {
        id: '1', licensePlate: 'ABC123', model: 'Toyota',
        type: '',
        color: '',
        isActive: false
      },
      {
        id: '2', licensePlate: 'XYZ456', model: 'Honda',
        type: '',
        color: '',
        isActive: false
      }
    ];
    
    const registries: Registry[] = [
      {
        idVehicle: '1', entryTime: new Date('2025-03-06T12:00:00'), exitTime: new Date('2025-03-06T12:00:00'),
        id: '',
        idParkingSpot: '',
        idRate: ''
      },
      {
        idVehicle: '2', entryTime: new Date('2025-03-07T12:00:00'), exitTime: new Date('2025-03-07T12:00:00'),
        id: '',
        idParkingSpot: '',
        idRate: ''
      }
    ];
  
    const result = pipe.transform(vehicles, registries, 'new');
    
    expect(result.length).toBe(2);
    expect(result[0].id).toBe('2'); // La fecha más reciente (2025-03-07) debe estar primero
    expect(result[1].id).toBe('1'); // La fecha anterior (2025-03-06) debe estar después
  });
  
  it('should return the vehicles in the correct order when "old" is passed as order', () => {
    const vehicles: Vehicle[] = [
      {
        id: '1', licensePlate: 'ABC123', model: 'Toyota',
        type: '',
        color: '',
        isActive: false
      },
      {
        id: '2', licensePlate: 'XYZ456', model: 'Honda',
        type: '',
        color: '',
        isActive: false
      }
    ];
    
    const registries: Registry[] = [
      {
        idVehicle: '1', entryTime: new Date('2025-03-06T12:00:00'), exitTime: new Date('2025-03-06T12:00:00'),
        id: '',
        idParkingSpot: '',
        idRate: ''
      },
      {
        idVehicle: '2', entryTime: new Date('2025-03-07T12:00:00'), exitTime: new Date('2025-03-07T12:00:00'),
        id: '',
        idParkingSpot: '',
        idRate: ''
      }
    ];
  
    const result = pipe.transform(vehicles, registries, 'old');
    
    expect(result.length).toBe(2);
    expect(result[0].id).toBe('1'); // La fecha más antigua (2025-03-06) debe estar primero
    expect(result[1].id).toBe('2'); // La fecha posterior (2025-03-07) debe estar después
  });
  

  it('should return the original vehicles array when no registries are passed', () => {
    const vehicles: Vehicle[] = [
      {
        id: '1', licensePlate: 'ABC123', model: 'Toyota',
        type: '',
        color: '',
        isActive: false
      },
      {
        id: '2', licensePlate: 'XYZ456', model: 'Honda',
        type: '',
        color: '',
        isActive: false
      }
    ];

    const result = pipe.transform(vehicles, [], 'new');
    
    expect(result.length).toBe(2);
    expect(result).toEqual(vehicles); // No registries, so it should return the original array
  });



  it('should handle registries with invalid entryTime or exitTime correctly', () => {
    const vehicles: Vehicle[] = [
      {
        id: '1', licensePlate: 'ABC123', model: 'Toyota',
        type: '',
        color: '',
        isActive: false
      }
    ];
    
    const registries: Registry[] = [
      {
        idVehicle: '1', entryTime: new Date('2025-03-06T12:00:00'), exitTime: new Date('2025-03-06T12:00:00'),
        id: '',
        idParkingSpot: '',
        idRate: ''
      },
      {
        idVehicle: '1', entryTime: new Date('2025-03-06T12:00:00'), exitTime: new Date('2025-03-06T12:00:00'),
        id: '',
        idParkingSpot: '',
        idRate: ''
      }
    ];

    const result = pipe.transform(vehicles, registries, 'new');
    
    expect(result.length).toBe(1); // Only valid registry should be considered
    expect(result[0].id).toBe('1'); // The vehicle should be returned even with one invalid registry
  });
});
