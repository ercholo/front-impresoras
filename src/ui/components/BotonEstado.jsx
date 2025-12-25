import { useState } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';
import { useImpresora } from '../../hooks/useImpresora';
import { SnackbarAlert, SnackbarAlertError } from './';
import { DialogEstado } from '../../components/DialogEstado';
import PropTypes from 'prop-types';

export const BotonEstado = ({ printer }) => {
    const { estado, isLoading, data } = useImpresora(printer);
    const [abrirSnack, setAbrirSnack] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleEstado = async () => {
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
            <Tooltip title="Consultar estado">
                <IconButton
                    size="small"
                    color="warning"
                    onClick={handleEstado}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={20} /> : <InfoOutlinedIcon />}
                </IconButton>
            </Tooltip>
            {isOpen && (
                <DialogEstado
                    onClose={closeDialog}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    printer={printer}
                    data={data}
                    setAbrirSnack={setAbrirSnack}
                />
            )}
            {abrirSnack === true && <SnackbarAlert accion={"Restablecida de manera"} alert={abrirSnack} setAlert={setAbrirSnack} />}
            {abrirSnack === "error" && <SnackbarAlertError accion={"Restablecida de manera"} alert={abrirSnack} setAlert={setAbrirSnack} />}
        </>
    );
};

BotonEstado.propTypes = {
    printer: PropTypes.string.isRequired,
};
