import { ReactKeycloakProvider } from "@react-keycloak/web";
import { AppRouter } from "./router/AppRouter";
import keycloak from "./keycloak";
import { BusquedaProvider } from "./context/BusquedaProvider";

export const SapsprintApp2 = () => {

  function onEvent (event, error)  {
    console.log('onKeycloakEvent', event, error);
  }

  return (
    <BusquedaProvider>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "check-sso", enableLogging: true }}
        onEvent={onEvent}
      >
        <AppRouter />
      </ReactKeycloakProvider>
    </BusquedaProvider>
  );
}

export default SapsprintApp2;