import { useState } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { TurnLeft as TurnLeftIcon } from '@mui/icons-material';
import { useImpresora } from '../../hooks/useImpresora';
import { SnackbarAlert, SnackbarAlertError } from './';
import { DialogDesviar } from '../../components/DialogDesviar';
import PropTypes from 'prop-types';

export const BotonDesviar = ({ printer }) => {
    const { estado, isLoading, data } = useImpresora(printer);
    const [isOpen, setIsOpen] = useState(false);
    const [abrirSnack, setAbrirSnack] = useState(false);

    const handleCheckDesvio = async () => {
        try {
            await estado();
            setIsOpen(true);
        } catch (err) {
            console.error('Error al consultar estado:', err);
        }
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Tooltip title="Desviar impresora">
                <IconButton
                    size="small"
                    color="info"
                    onClick={handleCheckDesvio}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={20} /> : <TurnLeftIcon />}
                </IconButton>
            </Tooltip>
            {isOpen && (
                <DialogDesviar
                    onClose={closeDialog}
                    isOpen={isOpen}
                    printer={printer}
                    data={data}
                    setAbrirSnack={setAbrirSnack}
                />
            )}
            {abrirSnack === true && <SnackbarAlert accion={"Desviada de manera"} alert={abrirSnack} setAlert={setAbrirSnack} />}
            {abrirSnack === "error" && <SnackbarAlertError accion={"Restablecida de manera"} alert={abrirSnack} setAlert={setAbrirSnack} />}
        </>
    );
};

BotonDesviar.propTypes = {
    printer: PropTypes.string.isRequired,
};
