import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

export default function TipoHoraExtraComponent() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <h2>Tipos Horas extras</h2>
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Diurna"
                />
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Nocturna"
                />
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Nocturna festiva"
                />
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Diurna festiva"
                />
            </Grid>
        </Grid>
    );
}
