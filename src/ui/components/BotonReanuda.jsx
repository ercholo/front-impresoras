import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { useImpresora } from '../../hooks/useImpresora';
import { SnackbarAlert, SnackbarAlertError } from './';
import PropTypes from 'prop-types';

export const BotonReanuda = ({ printer }) => {
    const { reanuda, isLoading, alert, setAlert } = useImpresora(printer);

    const handleReanudar = async () => {
        try {
            await reanuda();
        } catch (err) {
            console.error('Error al reanudar impresora:', err);
        }
    };

    return (
        <>
            <Tooltip title="Reanudar impresora">
                <IconButton
                    size="small"
                    color="default"
                    onClick={handleReanudar}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
                </IconButton>
            </Tooltip>
            {alert === true && <SnackbarAlert accion={"Reanudación"} alert={alert} setAlert={setAlert} />}
            {alert === "error" && <SnackbarAlertError accion={"Reanudación"} alert={alert} setAlert={setAlert} />}
        </>
    );
};

BotonReanuda.propTypes = {
    printer: PropTypes.string.isRequired,
};
