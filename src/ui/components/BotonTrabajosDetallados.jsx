import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { List as ListIcon } from '@mui/icons-material';
import { DialogTrabajosDetallados } from './DialogTrabajosDetallados';

export const BotonTrabajosDetallados = ({ printer }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Tooltip title="Ver trabajos detallados">
                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => setOpen(true)}
                >
                    <ListIcon />
                </IconButton>
            </Tooltip>
            <DialogTrabajosDetallados
                open={open}
                onClose={() => setOpen(false)}
                printer={printer}
            />
        </>
    );
};
