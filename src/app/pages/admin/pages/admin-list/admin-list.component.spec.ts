import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListComponent } from './admin-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';

describe('AdminListComponent', () => {
  let component: AdminListComponent;
  let fixture: ComponentFixture<AdminListComponent>;
  let keycloakServiceMock: jasmine.SpyObj<KeycloakService>;

  beforeEach(async () => {
    keycloakServiceMock = jasmine.createSpyObj('KeycloakService', [
      'getToken',
      'getKeycloakInstance',
      'isLoggedIn',
      'logout',
    ]);
    await TestBed.configureTestingModule({
      imports: [AdminListComponent, HttpClientTestingModule],
      providers: [{ provide: KeycloakService, useValue: keycloakServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
