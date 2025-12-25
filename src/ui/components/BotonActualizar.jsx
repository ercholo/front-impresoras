import { useEffect, useState } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useKeycloak } from '@react-keycloak/web';
import PropTypes from 'prop-types';

export const BotonActualizar = ({ printer, recibirDatos }) => {
    const { keycloak } = useKeycloak();
    const [loading, setLoading] = useState(false);
    const [puedeEjecutar, setPuedeEjecutar] = useState(true);
    const server = 'sprintpro';

    const handleActualizar = async () => {
        setLoading(true);
        setPuedeEjecutar(false);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_URL_FETCH}${printer}/${server}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                    }
                }
            );

            const data = await res.json();
            recibirDatos(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al actualizar trabajos:', error);
            setLoading(false);
        }
    };

    // Timeout anti-spam de 5 segundos
    useEffect(() => {
        if (!puedeEjecutar) {
            const timeoutId = setTimeout(() => {
                setPuedeEjecutar(true);
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [puedeEjecutar]);

    return (
        <Tooltip title="Actualizar trabajos">
            <span>
                <IconButton
                    size="small"
                    color="success"
                    onClick={handleActualizar}
                    disabled={loading || !puedeEjecutar}
                >
                    {loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                </IconButton>
            </span>
        </Tooltip>
    );
};

BotonActualizar.propTypes = {
    printer: PropTypes.string.isRequired,
    recibirDatos: PropTypes.func.isRequired,
};
