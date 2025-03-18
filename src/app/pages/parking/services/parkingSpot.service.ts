import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { ParkingSpot } from '../interfaces/parkingSpot.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParkingSpotService {
  private readonly apiUrl = environment.apiUrl + '/parkingspots';
  constructor(private http: HttpClient) {}

  getParkingSpots(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.apiUrl);
  }

  getParkingSpotById(id: string): Observable<ParkingSpot> {
    return this.http.get<ParkingSpot>(`${this.apiUrl}/${id}`);
  }

  addParkingSpot(ParkingSpot: ParkingSpot): Observable<ParkingSpot> {
    return this.http.post<ParkingSpot>(this.apiUrl, ParkingSpot);
  }

  updateParkingSpot(
    id: string,
    ParkingSpot: Partial<ParkingSpot>,
  ): Observable<ParkingSpot> {
    return this.http.put<ParkingSpot>(`${this.apiUrl}/${id}`, ParkingSpot);
  }

  deleteParkingSpot(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // getLastSpotNumber() {
  //   return this.http.get<ParkingSpot[]>(this.apiUrl).pipe(
  //     map((spots: ParkingSpot[]) => {
  //       if (spots.length > 0) {
  //         const lastSpotNumber = Math.max(
  //           ...spots.map((spot) => spot.spotNumber),
  //         );
  //         return lastSpotNumber;
  //       } else {
  //         return 0;
  //       }
  //     }),
  //   );
  // }
}
