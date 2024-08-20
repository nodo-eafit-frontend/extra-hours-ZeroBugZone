import { useState, useEffect } from "react";
import "./App.css";
import Brand from "./components/Brand";
import EmpleadosDataTable from "./components/EmpleadosDataTable";
import TipoHoraExtraComponent from "./components/TipoHoraExtra";
import ExtraHoursForm from "./components/ExtraHoursForm"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function App() {
  const [count, setCount] = useState(0);
  const [id, setId] = useState(1);
  const [horasExtras, setHoras] = useState(0);
  const onChange = (value) => {
    setId(value);
  };
  useEffect(() => {
    fetch("http://localhost:4000/extra-hours/" + id)
      .then((res) => res.json())
      .then((data) => {
        const { extraHoras } = data;
        setHoras(extraHoras);
      });
  }, [id]);

  const empleadoId = 1; // Puedes cambiar este ID para probar con diferentes empleados

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <Brand />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <TipoHoraExtraComponent />
          </Item>
        </Grid>
        
        <Grid item xs={12}>
          <Item>
            <EmpleadosDataTable />
          </Item>
        </Grid>
      </Grid>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ExtraHoursForm empleadoId={empleadoId} />
      </LocalizationProvider>
    </Box>
  );
}

