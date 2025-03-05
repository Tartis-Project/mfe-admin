import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080', 
        realm: 'mi-realm', 
        clientId: 'mi-angular-app', 
      },
      initOptions: {
        onLoad: 'login-required', // Opciones: 'login-required' | 'check-sso'
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
    });
}
