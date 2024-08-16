import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckboxComponent() {
    return (
        <>
            <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Diurna"
            />
            <FormControlLabel
                control={<Checkbox />}
                label="Nocturna"
            />
            <FormControlLabel
                control={<Checkbox />}
                label="Nocturna festiva"
            />
            <FormControlLabel
                control={<Checkbox />}
                label="Diurna festiva"
            />
        </>
    );
}
