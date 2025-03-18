import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map } from 'rxjs';
import { Registry } from '../interfaces/registry.model';
import { environment } from '../../../../environments/environment';
import { VehicleService } from '../../../pages/vehicles/services/vehicle.service';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  private readonly apiUrl = environment.apiUrl + '/registries';

  constructor(
    private http: HttpClient,
    private vehicleService: VehicleService,
  ) {}

  getRegistries(): Observable<Registry[]> {
    return combineLatest([
      this.http.get<Registry[]>(this.apiUrl),
      this.vehicleService.getVehicles(),
    ]).pipe(
      map(([registries, vehicles]) => {
        const vehicleIds = new Set(vehicles.map((v) => v.id));
        return registries.filter((registry) =>
          vehicleIds.has(registry.idVehicle),
        );
      }),
    );
  }

  getRegistryById(id: string): Observable<Registry> {
    return this.http.get<Registry>(`${this.apiUrl}/${id}`);
  }

  addRegistry(registry: Registry): Observable<Registry> {
    return this.http.post<Registry>(this.apiUrl, registry);
  }

  updateRegistry(
    id: string,
    registry: Partial<Registry>,
  ): Observable<Registry> {
    return this.http.put<Registry>(`${this.apiUrl}/${id}`, registry);
  }

  deleteRegistry(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
