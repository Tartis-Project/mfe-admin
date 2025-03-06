import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { Administrator } from '../interfaces/administrator.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
    
  userAdmin = {} as Administrator;

  //private keycloakUrl = 'http://localhost:8090/admin/realms/realm-front-keycloak/users';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
  ) {
    this.getDataUser();
  }

  /*
  getAdmins(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(this.keycloakUrl, { headers });
  }
    */

  getUserName(): string | null {
    const userProfile = this.keycloakService.getKeycloakInstance().idTokenParsed;
    this.userAdmin.name = userProfile?.['name'] || null;
    return userProfile?.['name'] || null;
  }

  getUserEmail(): string | null {
    const userProfile = this.keycloakService.getKeycloakInstance().idTokenParsed;
    this.userAdmin.email = userProfile?.['email'] || null;
    return userProfile?.['email'] || null;
  }

  getDataUser(){
    console.log('getDataUser()');
    const userProfile = this.keycloakService.getKeycloakInstance().idTokenParsed;
    this.userAdmin.name = userProfile?.['name'] || null;
    this.userAdmin.email = userProfile?.['email'] || null;
    console.log(this.userAdmin);
  }

  logout() {
    this.keycloakService.logout();
  }
}
