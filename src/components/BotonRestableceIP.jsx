import { memo, useEffect } from 'react';
import { useImpresora } from '../hooks/useImpresora';
import { Spinner } from '../ui/components';
import PropTypes from 'prop-types';

//uso el memo para que no renderice los botones cuando el componente padre (tablaPrincipal) cambia el estado actualizando la tabla
export const BotonRestableceIP = memo(({ printer, isDisabled, setAbrirSnack, onClose }) => {

    const { restablece, isLoading, alert } = useImpresora(printer, '');

    const onRestablecer = async () => {
        await restablece();
    };

    //Cuando 'alert' cambia de valor actualizo si debe abrir o no el Snackbar, en caso de que sea true entonces cierro el modal (dialog)
    useEffect(() => {
        setAbrirSnack(alert);
        if (alert) onClose();
    }, [alert]);

    return (
        <>
            <button
                type="button"
                disabled={isDisabled}
                className="btn btn btn-secondary"
                onClick={() => onRestablecer(printer)}
                title='Restablecer por su IP original'
            >
                <i className="bi bi-arrow-repeat"></i>
            </button>
            {isLoading ? <Spinner loading={isLoading} /> : null}
        </>
    )
});

BotonRestableceIP.displayName = 'BotonRestableceIP';
export default BotonRestableceIP;

BotonRestableceIP.propTypes = {
    printer: PropTypes.string,
    isDisabled: PropTypes.bool,
    onClose: PropTypes.func,
    setAbrirSnack: PropTypes.func,
}