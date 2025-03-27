import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import { MaterialModule } from '../../../../material/material.module';
import { Administrator } from '../../interfaces/administrator.model';
import { AdminService } from '../../services/administrator.service';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent {
  administrators: Administrator[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'username'];

  constructor(
    private adminService: AdminService,
    private keycloakService: KeycloakService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (users) => {
        this.administrators = users;
        console.log('Usuarios cargados:', this.administrators);
      },
      (error) => {
        console.error('Error obteniendo usuarios:', error);
      },
    );
  }
}