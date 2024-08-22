import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

export default function CustomButton({text}) {
    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: '#E0E0E0',
                color: '#283593',
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: '#BDBDBD',
                },
            }}
        >
            {text}
        </Button>
    );
}

CustomButton.propTypes = {
    text: PropTypes.string.isRequired, 
};