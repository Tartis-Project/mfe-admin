import { Component } from '@angular/core';
// import { AdminService } from '../../services/administrator.service';
import { KeycloakService } from 'keycloak-angular';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss'
})
export class AdminListComponent {
  // admins: any[] = [];
  // displayedColumns: string[] = ['id', 'name', 'email'];
  // isLoading = true;

  // constructor(
  //   private adminService: AdminService,
  //   private keycloakService: KeycloakService
  // ) { }

  // async ngOnInit() {
  //   try {
  //     const token = await this.keycloakService.getToken();
  //     this.adminService.getAdmins(token).subscribe((admin) => {
  //       this.admins = admin;
  //       this.isLoading = false;
  //     });
  //   } catch (error) {
  //     console.error('Error obteniendo los administradores de Keycloak:', error);
  //     this.isLoading = false;
  //   }
  // }
}
