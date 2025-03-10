import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';
import { Administrator } from '../interfaces/administrator.model';
import { AdminService } from './administrator.service';
import { KeycloakInitOptions, KeycloakLoginOptions, KeycloakLogoutOptions, KeycloakRegisterOptions, KeycloakAccountOptions, KeycloakProfile } from 'keycloak-js';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;
  let keycloakServiceMock: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    keycloakServiceMock = jasmine.createSpyObj('KeycloakService', [
      'getToken',
      'getKeycloakInstance',
      'isLoggedIn',
      'logout',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminService,
        { provide: KeycloakService, useValue: keycloakServiceMock },
      ],
    });

    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if user is not authenticated', async () => {
    keycloakServiceMock.isLoggedIn.and.returnValue(await Promise.resolve(false));

    await service.getDataUser();
    expect(service.userAdmin.username).toBeUndefined();
    expect(service.userAdmin.email).toBeUndefined();
  });

  it('should get user details from Keycloak token', async () => {
    keycloakServiceMock.isLoggedIn.and.returnValue(await Promise.resolve(true));
    keycloakServiceMock.getKeycloakInstance.and.returnValue({
      idTokenParsed: {
        sub: '123',
        preferred_username: 'testUser',
        email: 'test@example.com',
        given_name: 'Test',
        family_name: 'User',
      },
      didInitialize: false,
      init: function (initOptions?: KeycloakInitOptions): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
      login: function (options?: KeycloakLoginOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      logout: function (options?: KeycloakLogoutOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      register: function (options?: KeycloakRegisterOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      accountManagement: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      createLoginUrl: function (options?: KeycloakLoginOptions): Promise<string> {
        throw new Error('Function not implemented.');
      },
      createLogoutUrl: function (options?: KeycloakLogoutOptions): string {
        throw new Error('Function not implemented.');
      },
      createRegisterUrl: function (options?: KeycloakRegisterOptions): Promise<string> {
        throw new Error('Function not implemented.');
      },
      createAccountUrl: function (options?: KeycloakAccountOptions): string {
        throw new Error('Function not implemented.');
      },
      isTokenExpired: function (minValidity?: number): boolean {
        throw new Error('Function not implemented.');
      },
      updateToken: function (minValidity?: number): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
      clearToken: function (): void {
        throw new Error('Function not implemented.');
      },
      hasRealmRole: function (role: string): boolean {
        throw new Error('Function not implemented.');
      },
      hasResourceRole: function (role: string, resource?: string): boolean {
        throw new Error('Function not implemented.');
      },
      loadUserProfile: function (): Promise<KeycloakProfile> {
        throw new Error('Function not implemented.');
      },
      loadUserInfo: function (): Promise<{}> {
        throw new Error('Function not implemented.');
      }
    });

    await service.getDataUser();

    expect(service.userAdmin.id).toBe('123');
    expect(service.userAdmin.username).toBe('testUser');
    expect(service.userAdmin.email).toBe('test@example.com');
    expect(service.userAdmin.firstName).toBe('Test');
    expect(service.userAdmin.lastName).toBe('User');
  });

  it('should call logout method from Keycloak service', () => {
    service.logout();
    expect(keycloakServiceMock.logout).toHaveBeenCalled();
  });

  // Test for getUserName
  it('should return the correct username from Keycloak', () => {
    keycloakServiceMock.getKeycloakInstance.and.returnValue({
      idTokenParsed: {
        preferred_username: 'testUser',
      },
      didInitialize: false,
      init: function (initOptions?: KeycloakInitOptions): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
      login: function (options?: KeycloakLoginOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      logout: function (options?: KeycloakLogoutOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      register: function (options?: KeycloakRegisterOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      accountManagement: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      createLoginUrl: function (options?: KeycloakLoginOptions): Promise<string> {
        throw new Error('Function not implemented.');
      },
      createLogoutUrl: function (options?: KeycloakLogoutOptions): string {
        throw new Error('Function not implemented.');
      },
      createRegisterUrl: function (options?: KeycloakRegisterOptions): Promise<string> {
        throw new Error('Function not implemented.');
      },
      createAccountUrl: function (options?: KeycloakAccountOptions): string {
        throw new Error('Function not implemented.');
      },
      isTokenExpired: function (minValidity?: number): boolean {
        throw new Error('Function not implemented.');
      },
      updateToken: function (minValidity?: number): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
      clearToken: function (): void {
        throw new Error('Function not implemented.');
      },
      hasRealmRole: function (role: string): boolean {
        throw new Error('Function not implemented.');
      },
      hasResourceRole: function (role: string, resource?: string): boolean {
        throw new Error('Function not implemented.');
      },
      loadUserProfile: function (): Promise<KeycloakProfile> {
        throw new Error('Function not implemented.');
      },
      loadUserInfo: function (): Promise<{}> {
        throw new Error('Function not implemented.');
      }
    });

    const result = service.getUserName();
    expect(result).toBe('testUser');
    expect(service.userAdmin.username).toBe('testUser');
  });

  // Test for getUserFirstName
  it('should return the correct first name from Keycloak', () => {
    keycloakServiceMock.getKeycloakInstance.and.returnValue({
      idTokenParsed: {
        given_name: 'Test',
      },
      didInitialize: false,
      init: function (initOptions?: KeycloakInitOptions): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
      login: function (options?: KeycloakLoginOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      logout: function (options?: KeycloakLogoutOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      register: function (options?: KeycloakRegisterOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      accountManagement: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      createLoginUrl: function (options?: KeycloakLoginOptions): Promise<string> {
        throw new Error('Function not implemented.');
      },
      createLogoutUrl: function (options?: KeycloakLogoutOptions): string {
        throw new Error('Function not implemented.');
      },
      createRegisterUrl: function (options?: KeycloakRegisterOptions): Promise<string> {
        throw new Error('Function not implemented.');
      },
      createAccountUrl: function (options?: KeycloakAccountOptions): string {
        throw new Error('Function not implemented.');
      },
      isTokenExpired: function (minValidity?: number): boolean {
        throw new Error('Function not implemented.');
      },
      updateToken: function (minValidity?: number): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
      clearToken: function (): void {
        throw new Error('Function not implemented.');
      },
      hasRealmRole: function (role: string): boolean {
        throw new Error('Function not implemented.');
      },
      hasResourceRole: function (role: string, resource?: string): boolean {
        throw new Error('Function not implemented.');
      },
      loadUserProfile: function (): Promise<KeycloakProfile> {
        throw new Error('Function not implemented.');
      },
      loadUserInfo: function (): Promise<{}> {
        throw new Error('Function not implemented.');
      }
    });

    const result = service.getUserFirstName();
    expect(result).toBe('Test');
    expect(service.userAdmin.firstName).toBe('Test');
  });

  // Test for getUserEmail
  it('should return the correct email from Keycloak', () => {
    keycloakServiceMock.getKeycloakInstance.and.returnValue({
      idTokenParsed: {
        email: 'test@example.com',
      },
      didInitialize: false,
      init: function (initOptions?: KeycloakInitOptions): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
      login: function (options?: KeycloakLoginOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      logout: function (options?: KeycloakLogoutOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      register: function (options?: KeycloakRegisterOptions): Promise<void> {
        throw new Error('Function not implemented.');
      },
      accountManagement: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      createLoginUrl: function (options?: KeycloakLoginOptions): Promise<string> {
        throw new Error('Function not implemented.');
      },
      createLogoutUrl: function (options?: KeycloakLogoutOptions): string {
        throw new Error('Function not implemented.');
      },
      createRegisterUrl: function (options?: KeycloakRegisterOptions): Promise<string> {
        throw new Error('Function not implemented.');
      },
      createAccountUrl: function (options?: KeycloakAccountOptions): string {
        throw new Error('Function not implemented.');
      },
      isTokenExpired: function (minValidity?: number): boolean {
        throw new Error('Function not implemented.');
      },
      updateToken: function (minValidity?: number): Promise<boolean> {
        throw new Error('Function not implemented.');
      },
      clearToken: function (): void {
        throw new Error('Function not implemented.');
      },
      hasRealmRole: function (role: string): boolean {
        throw new Error('Function not implemented.');
      },
      hasResourceRole: function (role: string, resource?: string): boolean {
        throw new Error('Function not implemented.');
      },
      loadUserProfile: function (): Promise<KeycloakProfile> {
        throw new Error('Function not implemented.');
      },
      loadUserInfo: function (): Promise<{}> {
        throw new Error('Function not implemented.');
      }
    });

    const result = service.getUserEmail();
    expect(result).toBe('test@example.com');
    expect(service.userAdmin.email).toBe('test@example.com');
  });
});
