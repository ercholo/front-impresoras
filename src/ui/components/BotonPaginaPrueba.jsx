import { IconButton, Tooltip } from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import { useImpresora } from '../../hooks/useImpresora';

export const BotonPaginaPrueba = ({ printer }) => {
    const { paginaPrueba, isLoading } = useImpresora(printer);

    const handlePaginaPrueba = async () => {
        try {
            await paginaPrueba();
        } catch (err) {
            console.error('Error al imprimir página de prueba:', err);
        }
    };

    return (
        <Tooltip title="Imprimir página de prueba">
            <IconButton
                size="small"
                color="info"
                onClick={handlePaginaPrueba}
                disabled={isLoading}
            >
                <PrintIcon />
            </IconButton>
        </Tooltip>
    );
};
