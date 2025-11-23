import { useState } from 'react';
import {
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';
import { DeleteSweep as DeleteSweepIcon } from '@mui/icons-material';
import { useImpresora } from '../../hooks/useImpresora';

export const BotonPurgarCola = ({ printer, onPurgar }) => {
    const [open, setOpen] = useState(false);
    const { purgarCola, isLoading } = useImpresora(printer);

    const handlePurgar = async () => {
        try {
            await purgarCola();
            setOpen(false);
            if (onPurgar) onPurgar();
        } catch (err) {
            console.error('Error al purgar cola:', err);
        }
    };

    return (
        <>
            <Tooltip title="Purgar toda la cola">
                <IconButton
                    size="small"
                    color="error"
                    onClick={() => setOpen(true)}
                >
                    <DeleteSweepIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirmar purga de cola</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que deseas eliminar TODOS los trabajos de la cola de <strong>{printer}</strong>?
                    </Typography>
                    <Typography color="error" sx={{ mt: 2 }}>
                        Esta acción no se puede deshacer.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button
                        onClick={handlePurgar}
                        color="error"
                        variant="contained"
                        disabled={isLoading}
                    >
                        Purgar Cola
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
