import { useState } from "react";
import { useKeycloak } from '@react-keycloak/web';

export const useImpresora = (printer) => {

    const { keycloak } = useKeycloak();

    // Si empieza por 16, 17 o 18 entonces el servidor es sapsprint2
    const server = printer.startsWith('01ALAV') || printer.startsWith('07') || printer.startsWith('08') ||printer.startsWith('12') || printer.startsWith('16') || printer.startsWith('17') || printer.startsWith('18') ? 'sprintpro' : 'sapsprint';

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

    const actualiza = () => fetchData(`https://impresoras.hefame.es/api/${printer}/${server}`);

    const pausa = () => fetchData(`https://impresoras.hefame.es/api/${printer}/${server}/pausa`);

    const reanuda = () => fetchData(`https://impresoras.hefame.es/api/${printer}/${server}/reanuda`);

    const estado = () => fetchData(`https://impresoras.hefame.es/api/${printer}/${server}/estado`);

    const restablece = () => fetchData(`https://impresoras.hefame.es/api/${printer}/${server}/desviarImpresoraOriginal`);

    const desviar = (printerDestino) => fetchData(`https://impresoras.hefame.es/api/${printer}/${printerDestino}/${server}/desviar`);

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
        data: state.data,
        isLoading: state.isLoading,
        isOk: state.isOk,
        error: state.hasError,
        alert,
        setAlert,
    };
};