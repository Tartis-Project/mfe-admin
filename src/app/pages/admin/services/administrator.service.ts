// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminService {
//   private keycloakUrl = 'http://localhost:8080/admin/realms/tu-realm/users';
//   constructor(private http: HttpClient) { }

//   getAdmins(token: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });

//     return this.http.get<any>(this.keycloakUrl, { headers });
//   }
// }
