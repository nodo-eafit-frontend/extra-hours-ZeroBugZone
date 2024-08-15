import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';

const MyButtonComponent = ({ buttonText }) => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
      {buttonText}
      </Typography>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: '#FFFFFF', // Fondo blanco
          color: '#283593', 
          borderRadius: '8px',          // Color del texto
          borderColor: '#BDBDBD',     // Color del borde (delineado)
          borderWidth: 2,             // Ancho del borde
          fontWeight: 'bold',         // Texto en negrita
          padding: '24px 24px',
          width: '200px',         // Hacer el botón más ancho
          '&:hover': {
            backgroundColor: '#F5F5F5', // Fondo gris claro al pasar el mouse
            borderColor: '#9E9E9E',     // Borde gris más oscuro al pasar el mouse
          },
        }}
        disableRipple // Elimina el efecto de ripple al hacer clic
        disabled // Deshabilita el clic en el botón
      >
      </Button>
    </Container>
  );
};

export default MyButtonComponent;
MyButtonComponent.propTypes = {
  buttonText: PropTypes.string.isRequired, 
};