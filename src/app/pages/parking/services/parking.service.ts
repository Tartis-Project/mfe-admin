import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Floor } from '../interfaces/floor.model';
import { ParkingSpot } from '../interfaces/parkingSpot.model';
import { environment } from '../../../../environments/environment';
import { switchMap } from 'rxjs/operators';
import { ParkingSpotService } from './parkingSpot.service';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private readonly apiUrl = environment.apiUrl + '/floors';
  constructor(private http: HttpClient, private parkingSpotService: ParkingSpotService) { }

  getFloors(): Observable<Floor[]> {
    return this.http.get<Floor[]>(this.apiUrl);
  }

  getFloorById(id: string): Observable<Floor> {
    return this.http.get<Floor>(`${this.apiUrl}/${id}`);
  }

  addFloor(floor: Floor): Observable<Floor> {
    return this.http.post<Floor>(this.apiUrl, floor);
  }

  updateFloor(id: string, floor: Partial<Floor>): Observable<Floor> {
    return this.http.put<Floor>(`${this.apiUrl}/${id}`, floor);
  }


  // deleteFloor(id: string): Observable<void> {
  //   return this.parkingSpotService.getParkingSpots().pipe(
  //     switchMap((spots: ParkingSpot[]) => {
  //       const spotsToDelete = spots.filter(spot => spot.idFloor === id);

  //       if (spotsToDelete.length > 0) {
  //         const deleteRequests = spotsToDelete.map(spot => this.parkingSpotService.deleteParkingSpot(spot.id));
  //         return forkJoin(deleteRequests).pipe(
  //           switchMap(() => this.http.delete<void>(`${this.apiUrl}/${id}`))
  //         );
  //       } else {
  //         return this.http.delete<void>(`${this.apiUrl}/${id}`);
  //       }
  //     })
  //   );
  // }
}
