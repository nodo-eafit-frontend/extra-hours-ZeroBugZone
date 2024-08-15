import { FormControl, Select, MenuItem } from '@mui/material';

// Componente HorasButton
function HorasButton() {
    return (
        <FormControl fullWidth sx={{ padding: '10px 10px', width: '65px' }}>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Número"
        >
            {[...Array(10)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
    );
}


export { HorasButton};

