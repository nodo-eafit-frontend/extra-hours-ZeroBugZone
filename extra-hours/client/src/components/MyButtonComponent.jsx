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
          backgroundColor: '#FFFFFF', 
          color: '#283593', 
          borderRadius: '8px',          
          borderColor: '#BDBDBD',     
          borderWidth: 2,             
          fontWeight: 'bold',         
          padding: '24px 24px',
          width: '200px',         
          '&:hover': {
            backgroundColor: '#F5F5F5', 
            borderColor: '#9E9E9E',     
          },
        }}
        disableRipple 
        disabled 
      >
      </Button>
    </Container>
  );
};

export default MyButtonComponent;
MyButtonComponent.propTypes = {
  buttonText: PropTypes.string.isRequired, 
};