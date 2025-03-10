import { SearchVehiclePipe } from './search-vehicle.pipe';
import { Vehicle } from '../../pages/vehicles/interfaces/vehicle.model';

describe('SearchVehiclePipe', () => {
  let pipe: SearchVehiclePipe;

  beforeEach(() => {
    pipe = new SearchVehiclePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array when no searchTerm is provided', () => {
    const vehicles: Vehicle[] = [
      { id: '1', licensePlate: 'ABC123', model: 'Toyota', vehicleType: 'Sedan', color: 'Red', active: true },
      { id: '2', licensePlate: 'XYZ456', model: 'Honda', vehicleType: 'SUV', color: 'Blue', active: true },
    ];

    const result = pipe.transform(vehicles, '');
    expect(result).toEqual(vehicles); // The same array should be returned
  });

  it('should return the original array when searchTerm length is 1 or less', () => {
    const vehicles: Vehicle[] = [
      { id: '1', licensePlate: 'ABC123', model: 'Toyota', vehicleType: 'Sedan', color: 'Red', active: true },
      { id: '2', licensePlate: 'XYZ456', model: 'Honda', vehicleType: 'SUV', color: 'Blue', active: true },
    ];

    let result = pipe.transform(vehicles, 'A'); // Search term with length 1
    expect(result).toEqual(vehicles);

    result = pipe.transform(vehicles, ''); // Empty search term
    expect(result).toEqual(vehicles);
  });

  it('should filter vehicles based on license plate', () => {
    const vehicles: Vehicle[] = [
      { id: '1', licensePlate: 'ABC123', model: 'Toyota', vehicleType: 'Sedan', color: 'Red', active: true },
      { id: '2', licensePlate: 'XYZ456', model: 'Honda', vehicleType: 'SUV', color: 'Blue', active: true },
    ];

    const result = pipe.transform(vehicles, 'abc');
    expect(result.length).toBe(1);
    expect(result[0].licensePlate).toBe('ABC123');
  });

  it('should filter vehicles based on type', () => {
    const vehicles: Vehicle[] = [
      { id: '1', licensePlate: 'ABC123', model: 'Toyota', vehicleType: 'Sedan', color: 'Red', active: true },
      { id: '2', licensePlate: 'XYZ456', model: 'Honda', vehicleType: 'SUV', color: 'Blue', active: true },
    ];

    const result = pipe.transform(vehicles, 'SUV');
    expect(result.length).toBe(1);
    expect(result[0].vehicleType).toBe('SUV');
  });

  it('should filter vehicles based on model', () => {
    const vehicles: Vehicle[] = [
      { id: '1', licensePlate: 'ABC123', model: 'Toyota', vehicleType: 'Sedan', color: 'Red', active: true },
      { id: '2', licensePlate: 'XYZ456', model: 'Honda', vehicleType: 'SUV', color: 'Blue', active: true },
    ];

    const result = pipe.transform(vehicles, 'Honda');
    expect(result.length).toBe(1);
    expect(result[0].model).toBe('Honda');
  });

  it('should filter vehicles based on color', () => {
    const vehicles: Vehicle[] = [
      { id: '1', licensePlate: 'ABC123', model: 'Toyota', vehicleType: 'Sedan', color: 'Red', active: true },
      { id: '2', licensePlate: 'XYZ456', model: 'Honda', vehicleType: 'SUV', color: 'Blue', active: true },
    ];

    const result = pipe.transform(vehicles, 'blue');
    expect(result.length).toBe(1);
    expect(result[0].color).toBe('Blue');
  });

  it('should filter vehicles based on multiple search terms (license plate, type, model, and color)', () => {
    const vehicles: Vehicle[] = [
      { id: '1', licensePlate: 'ABC123', model: 'Toyota', vehicleType: 'Sedan', color: 'Red', active: true },
      { id: '2', licensePlate: 'XYZ456', model: 'Honda', vehicleType: 'SUV', color: 'Blue', active: true },
      { id: '3', licensePlate: 'DEF789', model: 'Ford', vehicleType: 'Truck', color: 'Green', active: true },
    ];

    // Searching by model 'Toyota' should return only the first vehicle
    let result = pipe.transform(vehicles, 'Toyota');
    expect(result.length).toBe(1);
    expect(result[0].model).toBe('Toyota');

    // Searching by color 'Blue' should return only the second vehicle
    result = pipe.transform(vehicles, 'blue');
    expect(result.length).toBe(1);
    expect(result[0].color).toBe('Blue');

    // Searching by type 'Truck' should return only the third vehicle
    result = pipe.transform(vehicles, 'truck');
    expect(result.length).toBe(1);
    expect(result[0].vehicleType).toBe('Truck');
  });

  it('should return an empty array when no vehicles match the search term', () => {
    const vehicles: Vehicle[] = [
      { id: '1', licensePlate: 'ABC123', model: 'Toyota', vehicleType: 'Sedan', color: 'Red', active: true },
      { id: '2', licensePlate: 'XYZ456', model: 'Honda', vehicleType: 'SUV', color: 'Blue', active: true },
    ];

    const result = pipe.transform(vehicles, 'NonExistent');
    expect(result.length).toBe(0); // No vehicles should match
  });
});
