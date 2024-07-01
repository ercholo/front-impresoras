import { memo, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web'
import PropTypes from 'prop-types';
import { Spinner } from '../ui/components';

//uso el memo para que no renderice los botones cuando el componente padre (tablaPrincipal) cambia el estado actualizando la tabla
export const BotonActualizar = memo(({ printer, recibirDatos }) => {

    const { keycloak } = useKeycloak();

    const [loading, setLoading] = useState(false);
    const [puedeEjecutar, setPuedeEjecutar] = useState(true);

    const server = printer.startsWith('01') || printer.startsWith('07') || printer.startsWith('08') ||printer.startsWith('12') || printer.startsWith('16') || printer.startsWith('17') || printer.startsWith('18') ? 'sprintpro' : 'sapsprint';

    const onActualizar = async () => {

        setLoading(true);
        setPuedeEjecutar(false);

        try {

            const res = await fetch(`https://impresoras.hefame.es/api/${printer}/${server}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            });

            const data = await res.json();
            recibirDatos(data);
            setLoading(false);

        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPuedeEjecutar(true); 
        }, 5000);

        return () => {
            clearTimeout(timeoutId); 
        };
    }, [puedeEjecutar]);

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-success"
                disabled={loading || !puedeEjecutar}
                onClick={onActualizar}
                title='Actualizar trabajos'
            >
                <i className="bi bi-arrow-clockwise"></i>
            </button>
            {loading ? <Spinner loading={loading} /> : null}
        </>
    )
});

BotonActualizar.displayName = 'BotonActualizar';

BotonActualizar.propTypes = {
    printer: PropTypes.string,
    recibirDatos: PropTypes.func
}