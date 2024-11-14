import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../utils/AgregarFecha.scss";

export default function CustomDateInput({ label }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [storedDate, setStoredDate] = useState("");

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    // console.log(newDate);
  };

  const handleStoreDate = () => {
    setStoredDate(selectedDate);
    console.log(`Fecha guardada: ${selectedDate}`);
  };

  return (
    <div className="custom-date-input">
      <TextField
        label={label}
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        variant="contained"
        onClick={handleStoreDate}
        className="store-button"
      >
        Almacenar Fecha
      </Button>
      {storedDate && <p>Fecha almacenada: {storedDate}</p>}
    </div>
  );
}

CustomDateInput.propTypes = {
  label: PropTypes.string.isRequired,
};
