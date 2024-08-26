import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: import.meta.env.VITE_URL_KEYCLOAK,
    realm: import.meta.env.VITE_REALM_KEYCLOAK,
    clientId: import.meta.env.VITE_CLIENTID_KEYCLOAK
});

export default keycloak;