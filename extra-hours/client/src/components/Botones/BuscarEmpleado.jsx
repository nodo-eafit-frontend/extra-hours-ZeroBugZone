import { useState } from "react";
import { TextField, InputAdornment, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function BuscarEmpleado() {
  const [empleadoID, setEmpleadoID] = useState("");
  const [valorGuardado, setValorGuardado] = useState("");

  const handleInputChange = (event) => {
    setEmpleadoID(event.target.value);
  };

  const handleSearchClick = () => {
    setValorGuardado(empleadoID);
    console.log("Valor guardado:", empleadoID);
  };

  return (
    <Box>
      <h4>ID Empleado</h4>
      <TextField
        label="Buscar"
        variant="outlined"
        value={empleadoID}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSearchClick}>
        Buscar
      </Button>
      {valorGuardado && <p>Valor guardado: {valorGuardado}</p>}
    </Box>
  );
}

export default BuscarEmpleado;
