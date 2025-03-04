import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080', // URL de tu servidor Keycloak
        realm: 'myrealm', // Nombre del realm en Keycloak
        clientId: 'myclient', // ID del cliente en Keycloak
      },
      initOptions: {
        onLoad: 'login-required', // Opciones: 'login-required' | 'check-sso'
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
    });
}
