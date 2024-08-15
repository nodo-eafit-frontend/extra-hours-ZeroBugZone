import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const EmpleadoBuscador = () => {
  const [empleadoId, setEmpleadoId] = useState('');
  const [empleadoInfo, setEmpleadoInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setEmpleadoInfo(null);

    try {
      const response = await fetch('http://localhost:4000/getEmpleadoInfo/'+empleadoId);
      if (!response.ok) {
        throw new Error('Empleado no encontrado');
      }
      const data = await response.json();
      setEmpleadoInfo(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <TextField
        label="ID del Empleado"
        variant="outlined"
        value={empleadoId}
        onChange={(e) => setEmpleadoId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        Buscar
      </Button>

      {error && (
        <Typography color="error" style={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}

      {empleadoInfo && (
        <Card style={{ marginTop: '20px', maxWidth: '300px' }}>
          <CardContent>
            <Typography variant="h6">{empleadoInfo.nombre}</Typography>
            <Typography>Cargo: {empleadoInfo.cargo}</Typography>
            <Typography>Supervisor: {empleadoInfo.supervisor}</Typography>
            <Typography>
              Salario: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(empleadoInfo.salario)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmpleadoBuscador;