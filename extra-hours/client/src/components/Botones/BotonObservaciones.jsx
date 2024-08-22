import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Observaciones = () => {
    const [observacion, setObservacion] = useState('');

    const handleInputChange = (event) => {
        setObservacion(event.target.value);
    };

    const handleSubmit = () => {
        
        console.log(observacion);
        setObservacion(''); 
    };

    return (
        <Box sx={{ margin: 2 }}>
            <TextField
                label="Observaciones"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={observacion}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginTop: 2 }}
            >
                Agregar Observación
            </Button>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
                {observacion && `Observación: ${observacion}`}
            </Typography>
        </Box>
    );
};

export default Observaciones;