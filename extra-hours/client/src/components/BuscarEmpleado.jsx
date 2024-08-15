import { TextField, InputAdornment,Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function BuscarEmpleado() {
    return (
    <Box>
        <h4>ID Empleado</h4>
        <TextField
                label="Buscar"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                        ),
                    }}
                />
    </Box>
    );
}

export default BuscarEmpleado;