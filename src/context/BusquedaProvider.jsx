import { useEffect, useState } from "react";
import { BusquedaContext } from "./context";
import PropTypes from 'prop-types';

export const BusquedaProvider = ({ children }) => {

    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [busqueda, setBusqueda] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [abrirSnack, setAbrirSnack] = useState(false);
    const [isGod, setIsGod] = useState(false);

    useEffect(() => {
        if (userRoles?.length > 0 && userRoles.some(role => role ==='KC_IMPRESORAS' )) setIsGod(true);
    }, [userRoles]);

    return (

        <BusquedaContext.Provider value={{ terminoBusqueda, setTerminoBusqueda, busqueda, setBusqueda, abrirSnack, setAbrirSnack, userRoles, setUserRoles, setIsGod, isGod }}>
            {children}
        </BusquedaContext.Provider>
    )
}

BusquedaProvider.propTypes = {
    children: PropTypes.object,
}