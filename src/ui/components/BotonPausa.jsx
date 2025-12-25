import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { Pause as PauseIcon } from '@mui/icons-material';
import { useImpresora } from '../../hooks/useImpresora';
import { SnackbarAlert, SnackbarAlertError } from './';
import PropTypes from 'prop-types';

export const BotonPausa = ({ printer }) => {
    const { pausa, isLoading, alert, setAlert } = useImpresora(printer);

    const handlePausar = async () => {
        try {
            await pausa();
        } catch (err) {
            console.error('Error al pausar impresora:', err);
        }
    };

    return (
        <>
            <Tooltip title="Pausar impresora">
                <IconButton
                    size="small"
                    color="primary"
                    onClick={handlePausar}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={20} /> : <PauseIcon />}
                </IconButton>
            </Tooltip>
            {alert === true && <SnackbarAlert accion={"Pausa"} alert={alert} setAlert={setAlert} />}
            {alert === "error" && <SnackbarAlertError accion={"Pausa"} alert={alert} setAlert={setAlert} />}
        </>
    );
};

BotonPausa.propTypes = {
    printer: PropTypes.string.isRequired,
};
