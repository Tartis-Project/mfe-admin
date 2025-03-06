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

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
  ) {
    this.getDataUser();
  }

  getAllUsers(): Observable<Administrator[]> {
    return new Observable((observer) => {
      this.keycloakService.getToken().then((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        this.http
          .get<
            any[]
          >('http://localhost:8090/admin/realms/realm-front-keycloak/users', { headers })
          .subscribe(
            (users) => {
              const adminUsers: Administrator[] = users.map((user) => ({
                id: user.id,
                username: user.username,
                email: user.email || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
              }));

              observer.next(adminUsers);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            },
          );
      });
    });
  }

  getUserName(): string | null {
    const userProfile =
      this.keycloakService.getKeycloakInstance().idTokenParsed;
    this.userAdmin.username = userProfile?.['preferred_username'] || null;
    return userProfile?.['preferred_username'] || null;
  }

  getUserEmail(): string | null {
    const userProfile =
      this.keycloakService.getKeycloakInstance().idTokenParsed;
    this.userAdmin.email = userProfile?.['email'] || null;
    return userProfile?.['email'] || null;
  }

  async getDataUser() {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    if (isLoggedIn) {
      const userProfile =
        this.keycloakService.getKeycloakInstance().idTokenParsed;
      console.log('Token completo:', userProfile);
      if (userProfile) {
        this.userAdmin.id = userProfile['sub'] || '';
        this.userAdmin.username = userProfile['preferred_username'] || null;
        this.userAdmin.email = userProfile['email'] || null;
        this.userAdmin.firstName = userProfile['given_name'] || null;
        this.userAdmin.lastName = userProfile['family_name'] || null;
      }
    } else {
      console.warn('Usuario no autenticado');
    }
    console.log('Datos de usuario:', this.userAdmin);
  }

  logout() {
    this.keycloakService.logout();
  }
}
