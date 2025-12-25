import { useEffect } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { RestartAlt as RestartAltIcon } from '@mui/icons-material';
import { useImpresora } from '../../hooks/useImpresora';
import PropTypes from 'prop-types';

export const BotonRestableceIP = ({ printer, isDisabled, setAbrirSnack, onClose }) => {
    const { restablece, isLoading, alert } = useImpresora(printer);

    const handleRestablecer = async () => {
        try {
            await restablece();
        } catch (err) {
            console.error('Error al restablecer IP:', err);
        }
    };

    // Cuando 'alert' cambia actualizo snackbar y cierro modal
    useEffect(() => {
        setAbrirSnack(alert);
        if (alert) onClose();
    }, [alert, setAbrirSnack, onClose]);

    return (
        <Tooltip title="Restablecer por su IP original">
            <span>
                <IconButton
                    size="small"
                    color="secondary"
                    onClick={handleRestablecer}
                    disabled={isDisabled || isLoading}
                >
                    {isLoading ? <CircularProgress size={20} /> : <RestartAltIcon />}
                </IconButton>
            </span>
        </Tooltip>
    );
};

BotonRestableceIP.propTypes = {
    printer: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    setAbrirSnack: PropTypes.func.isRequired,
};
