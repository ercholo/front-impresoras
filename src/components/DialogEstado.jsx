import { Modal } from "bootstrap";
import { memo, useEffect } from "react";
import PropTypes from 'prop-types';
import { BotonRestableceIP } from '../ui/components';


export const DialogEstado = memo(({ data, printer, onClose, isOpen, setAbrirSnack }) => {

    useEffect(() => {

        // Inicializar el modal solo cuando el componente se monta
        const myModal = new Modal('#dialogEstado', {
            keyboard: false
        });

        // renderizar el modal
        if (isOpen) {
            myModal.show();
        }

        return () => {
            // Limpiar el modal al desmontar el componente
            myModal.dispose();
        };
    }, [isOpen]);

    return (

        <div className="modal fade" style={{ zIndex: 9050 }} id="dialogEstado" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Estado Impresora {printer} </h1>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group">
                            <li className="list-group-item">Estado: {data.estado}</li>
                            <li className="list-group-item">Desvío: {data.desviada ? <strong>DESVIADA</strong> : 'Sin desvío'}</li>
                            <li className="list-group-item">IP actual: {data.ip}</li>
                            <li className="list-group-item">Impresora desviada: {data.desviada ? <strong>{data.impresoraDesvio}</strong> : 'Sin desvío'}</li>
                        </ul>
                    </div>
                    <div className="modal-footer d-flex ">
                        <BotonRestableceIP printer={data.impresora} isDisabled={data.desviada ? false : true} onClose={onClose} setAbrirSnack={setAbrirSnack} />
                        <button type="button" title='Cerrar' className="btn btn-outline-danger" onClick={onClose}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
});

DialogEstado.displayName = 'DialogEstado';

DialogEstado.propTypes = {
    printer: PropTypes.string,
    onClose: PropTypes.func,
    setAbrirSnack: PropTypes.func,
    setIsOpen: PropTypes.func,
    isOpen: PropTypes.bool,
    data: PropTypes.object
}