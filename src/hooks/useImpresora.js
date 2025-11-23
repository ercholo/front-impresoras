import { useState } from "react";
import { useKeycloak } from '@react-keycloak/web';

export const useImpresora = (printer) => {

    const { keycloak } = useKeycloak();
    const server = 'sprintpro';
    const initialState = {
        data: null,
        isLoading: false,
        hasError: null,
        isOk: false,
    };

    const [state, setState] = useState(initialState);
    const [alert, setAlert] = useState(false);

    const fetchData = async (url) => {

        setState({
            ...initialState,
            isLoading: true,
        });

        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Error en la solicitud: ${res.status}`);
            }

            const data = await res.json();

            setState({
                data,
                isLoading: false,
                hasError: null,
                isOk: data.ok
            });

            setAlert(data.ok);

        } catch (error) {
            // console.error(error);
            alert.error(error);
            setState({
                ...initialState,
                hasError: error.message,
            });
            throw error;
        }

    };

    const actualiza = () => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server);

    const pausa = () => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/pausa');

    const reanuda = () => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/reanuda');

    const estado = () => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/estado');

    const restablece = () => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/desviarImpresoraOriginal');

    const desviar = (printerDestino) => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + printerDestino + '/' + server + '/desviar');

    const trabajosDetallados = () => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/trabajosDetallados');

    const cancelarTrabajo = (jobId) => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/' + jobId + '/cancelar');

    const pausarTrabajo = (jobId) => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/' + jobId + '/pausarTrabajo');

    const reanudarTrabajo = (jobId) => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/' + jobId + '/reanudarTrabajo');

    const purgarCola = () => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/purgarCola');

    const paginaPrueba = () => fetchData(import.meta.env.VITE_URL_FETCH + printer + '/' + server + '/pagPrueba');

    // const actualiza = () => fetchData(`http://172.30.5.181:16665/impresoras/${printer}/${server}`);

    // const pausa = () => fetchData(`http://172.30.5.181:16665/impresoras/${printer}/${server}/pausa`);

    // const reanuda = () => fetchData(`http://172.30.5.181:16665/impresoras/${printer}/${server}/reanuda`);

    // const estado = () => fetchData(`http://172.30.5.181:16665/impresoras/${printer}/${server}/estado`);

    // const restablece = () => fetchData(`http://172.30.5.181:16665/impresoras/${printer}/${server}/desviarImpresoraOriginal`);

    // const desviar = (printerDestino) => fetchData(`http://172.30.5.181:16665/impresoras/${printer}/${printerDestino}/${server}/desviar`);

    return {
        actualiza,
        pausa,
        reanuda,
        estado,
        restablece,
        desviar,
        trabajosDetallados,
        cancelarTrabajo,
        pausarTrabajo,
        reanudarTrabajo,
        purgarCola,
        paginaPrueba,
        data: state.data,
        isLoading: state.isLoading,
        isOk: state.isOk,
        error: state.hasError,
        alert,
        setAlert,
    };
};