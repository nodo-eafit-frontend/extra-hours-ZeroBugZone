import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, MenuItem, Snackbar, Alert, IconButton } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ExtraHoursForm = ({ empleadoId }) => {
  const [empleado, setEmpleado] = useState(null);
  const [fecha, setFecha] = useState(dayjs());
  const [tipoHora, setTipoHora] = useState('');
  const [cantidadHoras, setCantidadHoras] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [horasExtras, setHorasExtras] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Para manejar el estado de edición

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
      if (editIndex !== null) {
        // Editar la entrada existente
        const nuevasHorasExtras = [...horasExtras];
        nuevasHorasExtras[editIndex] = { fecha, tipoHora, cantidadHoras, observaciones };
        setHorasExtras(nuevasHorasExtras);
        setEditIndex(null);
      } else {
        // Agregar nueva entrada
        setHorasExtras([...horasExtras, { fecha, tipoHora, cantidadHoras, observaciones }]);
      }
      // Resetear campos
      setFecha(dayjs());
      setTipoHora('');
      setCantidadHoras('');
      setObservaciones('');
    } else {
      setSnackbarMessage('Por favor, verifica que todos los campos estén completos y la cantidad de horas no supere las 12.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const editarHoraExtra = (index) => {
    const hora = horasExtras[index];
    setFecha(dayjs(hora.fecha));
    setTipoHora(hora.tipoHora);
    setCantidadHoras(hora.cantidadHoras);
    setObservaciones(hora.observaciones);
    setEditIndex(index);
  };

  const eliminarHoraExtra = (index) => {
    const nuevasHorasExtras = horasExtras.filter((_, i) => i !== index);
    setHorasExtras(nuevasHorasExtras);
  };

  const guardarHorasExtras = async () => {
    try {
      const response = await fetch(`http://localhost:4000/extra-hours/${empleadoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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

      setSnackbarMessage('Horas extras guardadas con éxito');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setHorasExtras([]);
    } catch (error) {
      console.error('Error al guardar las horas extras:', error);
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        {editIndex !== null ? 'Actualizar Hora Extra' : 'Agregar Hora Extra'}
      </Button>

      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={horasExtras.map((hora, index) => ({
            id: index,
            fecha: dayjs(hora.fecha).format('DD/MM/YYYY'),
            tipoHora: hora.tipoHora,
            cantidadHoras: hora.cantidadHoras,
            observaciones: hora.observaciones,
          }))}
          columns={[
            { field: 'fecha', headerName: 'Fecha', width: 150 },
            { field: 'tipoHora', headerName: 'Tipo de Hora', width: 150 },
            { field: 'cantidadHoras', headerName: 'Cantidad', width: 150 },
            { field: 'observaciones', headerName: 'Observaciones', width: 300 },
            {
              field: 'acciones',
              headerName: 'Acciones',
              width: 150,
              renderCell: (params) => (
                <>
                  <IconButton onClick={() => editarHoraExtra(params.row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => eliminarHoraExtra(params.row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              ),
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </div>

      <Button
        variant="contained"
        color="secondary"
        onClick={guardarHorasExtras}
        style={{ marginTop: '20px' }}
        disabled={horasExtras.length === 0}
      >
        Guardar Horas Extras
      </Button>

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
    </LocalizationProvider>
  );
};

export default ExtraHoursForm;
