import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Snackbar, Alert } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

const ExtraHoursForm = ({ empleadoId }) => {
  const [empleado, setEmpleado] = useState(null);
  const [fecha, setFecha] = useState(dayjs());
  const [tipoHora, setTipoHora] = useState('');
  const [cantidadHoras, setCantidadHoras] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [horasExtras, setHorasExtras] = useState([]);

  // Estado para manejar los mensajes de Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' o 'error'

  useEffect(() => {
    const fetchEmpleadoInfo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/getEmpleadoInfo/${empleadoId}`);
        const data = await response.json();
        setEmpleado(data);
      } catch (error) {
        console.error('Error al obtener la información del empleado:', error);
      }
    };

    const fetchHorasExtras = async () => {
      try {
        const response = await fetch(`http://localhost:4000/extra-hours/${empleadoId}`);
        const data = await response.json();
        // Asegurarnos de que la respuesta contiene las horas extras
        setHorasExtras(data.horasExtras || []);
      } catch (error) {
        console.error('Error al obtener las horas extras:', error);
      }
    };

    fetchEmpleadoInfo();
    fetchHorasExtras();
  }, [empleadoId]);

  const agregarHoraExtra = () => {
    if (tipoHora && cantidadHoras && cantidadHoras <= 12) {
      setHorasExtras([...horasExtras, { fecha, tipoHora, cantidadHoras, observaciones }]);
      setFecha(dayjs());
      setTipoHora('');
      setCantidadHoras('');
      setObservaciones('');
    } else {
      // Mostrar un mensaje de error
      setSnackbarMessage('Por favor, verifica que todos los campos estén completos y la cantidad de horas no supere las 12.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const guardarHorasExtras = async () => {
    try {
      const response = await fetch(`http://localhost:4000/extra-hours/${empleadoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empleadoId,
          horasExtras: horasExtras.map((hora) => ({
            fecha: dayjs(hora.fecha).format('YYYY-MM-DD'),
            tipoHora: hora.tipoHora,
            cantidadHoras: hora.cantidadHoras,
            observaciones: hora.observaciones,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar las horas extras');
      }

      // Mostrar un mensaje de éxito
      setSnackbarMessage('Horas extras guardadas con éxito');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Limpiar los datos después de guardar
      setHorasExtras([]);
    } catch (error) {
      console.error('Error al guardar las horas extras:', error);
      // Mostrar un mensaje de error
      setSnackbarMessage('Hubo un error al guardar las horas extras.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!empleado) {
    return <div>Cargando información del empleado...</div>;
  }

  return (
    <div>
      <h2>Registro de Horas Extras</h2>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="Nombre" value={empleado.nombre} fullWidth InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Cargo" value={empleado.cargo} fullWidth InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Supervisor" value={empleado.supervisor} fullWidth InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Salario" value={`$${empleado.salario}`} fullWidth InputProps={{ readOnly: true }} />
        </Grid>
      </Grid>

      <Grid container spacing={2} marginTop={3}>
        <Grid item xs={4}>
          <DesktopDatePicker
            label="Fecha"
            inputFormat="DD/MM/YYYY"
            value={fecha}
            onChange={(newValue) => setFecha(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Tipo Hora"
            select
            value={tipoHora}
            onChange={(e) => setTipoHora(e.target.value)}
            fullWidth
          >
            <MenuItem value="diurna">Diurna</MenuItem>
            <MenuItem value="nocturna">Nocturna</MenuItem>
            <MenuItem value="diurnaFestiva">Diurna Festiva</MenuItem>
            <MenuItem value="nocturnaFestiva">Nocturna Festiva</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Cantidad de Horas"
            type="number"
            value={cantidadHoras}
            onChange={(e) => setCantidadHoras(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={agregarHoraExtra} style={{ marginTop: '20px' }}>
        Agregar Hora Extra
      </Button>

      <Table style={{ marginTop: '20px' }}>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo de Hora</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Observaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {horasExtras.map((hora, index) => (
            <TableRow key={index}>
              <TableCell>{dayjs(hora.fecha).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{hora.tipoHora}</TableCell>
              <TableCell>{hora.cantidadHoras}</TableCell>
              <TableCell>{hora.observaciones}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="contained"
        color="secondary"
        onClick={guardarHorasExtras}
        style={{ marginTop: '20px' }}
        disabled={horasExtras.length === 0}
      >
        Guardar Horas Extras
      </Button>

      {/* Snackbar para mostrar los mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ExtraHoursForm;
