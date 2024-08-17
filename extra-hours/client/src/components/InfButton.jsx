import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { Container, Typography, Box } from "@mui/material";
import "../utils/InfButton.scss";

const InfButton = ({ empleadoInfo }) => {
  return (
    <Container className="container">
      <Typography variant="h5" gutterBottom className="typography-title">
        Información del Empleado
      </Typography>
      <Box className="button-box">
        <Box>
          <Typography variant="h6">Nombre</Typography>
          <Button variant="outlined" className="button" disableRipple disabled>
            {empleadoInfo.nombre}
          </Button>
        </Box>
        <Box>
          <Typography variant="h6">Cargo</Typography>
          <Button variant="outlined" className="button" disableRipple disabled>
            {empleadoInfo.cargo}
          </Button>
        </Box>
        <Box>
          <Typography variant="h6">Supervisor</Typography>
          <Button variant="outlined" className="button" disableRipple disabled>
            {empleadoInfo.supervisor}
          </Button>
        </Box>
        <Box>
          <Typography variant="h6">Salario</Typography>
          <Button variant="outlined" className="button" disableRipple disabled>
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            }).format(empleadoInfo.salario)}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

InfButton.propTypes = {
  empleadoInfo: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    cargo: PropTypes.string.isRequired,
    supervisor: PropTypes.string.isRequired,
    salario: PropTypes.number.isRequired,
  }).isRequired,
};

export default InfButton;
