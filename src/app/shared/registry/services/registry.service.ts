import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registry } from '../interfaces/registry.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  private readonly apiUrl = environment.apiUrl + '/registries';
  constructor(private http: HttpClient) { }

  getRegistries(): Observable<Registry[]> {
    return this.http.get<Registry[]>(this.apiUrl);
  }

  getRegistryById(id: string): Observable<Registry> {
    return this.http.get<Registry>(`${this.apiUrl}/${id}`);
  }

  addRegistry(registry: Registry): Observable<Registry> {
    return this.http.post<Registry>(this.apiUrl, registry);
  }

  updateRegistry(id: string, registry: Partial<Registry>): Observable<Registry> {
    return this.http.put<Registry>(`${this.apiUrl}/${id}`, registry);
  }

  deleteRegistry(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
