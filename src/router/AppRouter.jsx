import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { PaginaPrincipal, PaginaToken, PaginaAccesoDenegado } from '../pages/';
import { TablaBusqueda, TablaAlbacete, TablaAlicante, TablaAlmeria, TablaBarcelona, TablaCartagena, TablaGerona, TablaGranada, TablaMadrid, TablaMalaga, TablaMelilla, TablaRibarroja, TablaSantomera, TablaTortosa } from '../components/';
import { Navbar } from '../ui/';
import { useKeycloak } from '@react-keycloak/web';
import { useContext } from 'react';
import { BusquedaContext } from '../context/context';

const RoleWrapper = ({ userRoles, requiredRoles }) => {

  if (userRoles) {
    const hasAccess = userRoles.some(role => requiredRoles.includes(role));
    return hasAccess ? <Outlet /> : <Navigate to="accesoDenegado" />;
  }
};

export const AppRouter = () => {

  const { initialized, keycloak } = useKeycloak();
  const { busqueda, userRoles, setUserRoles, setIsGod } = useContext(BusquedaContext);
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    if (initialized) {
      setKeycloakInitialized(true);
      setUserRoles(keycloak?.tokenParsed?.realm_access?.roles.filter(role => role?.startsWith("KC_")));
    }
  }, [initialized, keycloak, setUserRoles, setIsGod]);

  if (!keycloakInitialized) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Navbar />
      <hr />
      <Routes>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG08']} />}>
          <Route
            path="albacete"
            element={<TablaAlbacete />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG06']} />}>
          <Route
            path="alicante"
            element={<TablaAlicante />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG07']} />}>
          <Route
            path="almeria"
            element={<TablaAlmeria />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG15']} />}>
          <Route
            path="barcelona"
            element={<TablaBarcelona />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG03']} />}>
          <Route
            path="cartagena"
            element={<TablaCartagena />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG12']} />}>
          <Route
            path="gerona"
            element={<TablaGerona />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG18']} />}>
          <Route
            path="granada"
            element={<TablaGranada />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG04']} />}>
          <Route
            path="madrid"
            element={<TablaMadrid />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG19']} />}>
          <Route
            path="malaga"
            element={<TablaMalaga />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG17']} />}>
          <Route
            path="melilla"
            element={<TablaMelilla />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG01']} />}>
          <Route
            path="santomera"
            element={<TablaSantomera />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG16']} />}>
          <Route
            path="tortosa"
            element={<TablaTortosa />}
          />
        </Route>
        <Route element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_RG11']} />}>
          <Route
            path="ribarroja"
            element={<TablaRibarroja />}
          />
        </Route>
        {busqueda && <Route path="/busqueda/:id" element={<TablaBusqueda />} />}
        <Route path="token" element={<PaginaToken />} />
        <Route path="accesoDenegado" element={<PaginaAccesoDenegado />} />
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Route path="albacete" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG08']} element={<TablaAlbacete />} />} />
        <Route path="alicante" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG06']} element={<TablaAlicante />} />} />
        <Route path="almeria" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG07']} element={<TablaAlmeria />} />} /> 
        <Route path="barcelona" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG15']} element={<TablaBarcelona />} />} />
        <Route path="cartagena" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG03']} element={<TablaCartagena />} />} />
        <Route path="gerona" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG12']} element={<TablaGerona />} />} />
        <Route path="granada" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG18']} element={<TablaGranada />} />} />
        <Route path="madrid" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG04']} element={<TablaMadrid />} />} />
        <Route path="malaga" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG19']} element={<TablaMalaga />} />} />
        <Route path="melilla" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG17']} element={<TablaMelilla />} />} /> 
        <Route path="santomera" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG01']} element={<TablaSantomera />} />} /> 
        <Route path="tortosa" element={<RoleWrapper userRoles={userRoles} requiredRoles={['KC_IMPRESORAS', 'KC_IMPRESORAS_RG16']} element={<TablaTortosa />} />} /> */}
    </>
  );
};
