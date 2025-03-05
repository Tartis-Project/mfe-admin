import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://keycloak-container:8080', 
        realm: 'realm-front-keycloak', 
        clientId: 'angular18', 
      },
      initOptions: {
        onLoad: 'login-required', // Opciones: 'login-required' | 'check-sso'
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
    });
}