import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Typography,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    Cancel as CancelIcon,
    Pause as PauseIcon,
    PlayArrow as PlayArrowIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';
import { useImpresora } from '../../hooks/useImpresora';

export const DialogTrabajosDetallados = ({ open, onClose, printer }) => {
    const {
        trabajosDetallados,
        cancelarTrabajo,
        pausarTrabajo,
        reanudarTrabajo,
        data,
        isLoading
    } = useImpresora(printer);

    const [trabajos, setTrabajos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (open && printer) {
            cargarTrabajos();
        }
    }, [open, printer]);

    useEffect(() => {
        if (data && data.trabajos) {
            setTrabajos(data.trabajos);
            setError(null);
        } else if (data && data.error) {
            setError('Error al cargar trabajos');
        }
    }, [data]);

    const cargarTrabajos = async () => {
        try {
            await trabajosDetallados();
        } catch (err) {
            setError('Error al cargar trabajos');
        }
    };

    const handleCancelar = async (jobId) => {
        try {
            await cancelarTrabajo(jobId);
            await cargarTrabajos();
        } catch (err) {
            setError('Error al cancelar trabajo');
        }
    };

    const handlePausar = async (jobId) => {
        try {
            await pausarTrabajo(jobId);
            await cargarTrabajos();
        } catch (err) {
            setError('Error al pausar trabajo');
        }
    };

    const handleReanudar = async (jobId) => {
        try {
            await reanudarTrabajo(jobId);
            await cargarTrabajos();
        } catch (err) {
            setError('Error al reanudar trabajo');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">
                        Trabajos de {printer}
                    </Typography>
                    <Tooltip title="Actualizar">
                        <IconButton onClick={cargarTrabajos} disabled={isLoading}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </DialogTitle>
            <DialogContent>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : trabajos.length === 0 ? (
                    <Alert severity="info">No hay trabajos en cola</Alert>
                ) : (
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Job ID</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Propietario</TableCell>
                                    <TableCell>Documento</TableCell>
                                    <TableCell align="right">Páginas</TableCell>
                                    <TableCell align="right">Tamaño</TableCell>
                                    <TableCell>Fecha Envío</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trabajos.map((trabajo) => (
                                    <TableRow key={trabajo.jobId} hover>
                                        <TableCell>{trabajo.jobId}</TableCell>
                                        <TableCell>{trabajo.estado}</TableCell>
                                        <TableCell>{trabajo.propietario}</TableCell>
                                        <TableCell>{trabajo.documento}</TableCell>
                                        <TableCell align="right">{trabajo.paginas}</TableCell>
                                        <TableCell align="right">{trabajo.tamano}</TableCell>
                                        <TableCell>{trabajo.fechaEnvio}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Pausar trabajo">
                                                <IconButton
                                                    size="small"
                                                    color="warning"
                                                    onClick={() => handlePausar(trabajo.jobId)}
                                                >
                                                    <PauseIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Reanudar trabajo">
                                                <IconButton
                                                    size="small"
                                                    color="success"
                                                    onClick={() => handleReanudar(trabajo.jobId)}
                                                >
                                                    <PlayArrowIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Cancelar trabajo">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleCancelar(trabajo.jobId)}
                                                >
                                                    <CancelIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};
