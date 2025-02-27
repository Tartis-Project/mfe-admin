import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Floor } from '../interfaces/floor.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private readonly apiUrl = environment.apiUrl + '/floors';
  constructor(private http: HttpClient) { }

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

  deleteFloor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
