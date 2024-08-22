import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExtraHoursForm from "./ExtraHoursForm"; // Asegúrate de importar el componente

export default function EmpleadosDataTable() {
  const [error, setError] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [horasExtra, setHorasExtra] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      setError("");
      setEmpleados([]);
      try {
        const response = await fetch("http://localhost:4000/getEmpleados");
        if (!response.ok) {
          throw new Error("Empleados no encontrados");
        }
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchHorasExtra = async () => {
      try {
        const response = await fetch("http://localhost:4000/getAllExtraHours");
        if (!response.ok) {
          throw new Error("Horas extras no encontradas");
        }
        const data = await response.json();
        setHorasExtra(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEmpleados();
    fetchHorasExtra();

    const interval = setInterval(() => {
      window.location.reload();
    }, 50000); // Recarga cada 5 segundosreturn () => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleOpenModal = (id) => {
    setSelectedEmpleadoId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmpleadoId(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "cargo", headerName: "Cargo", width: 130 },
    { field: "supervisor", headerName: "Supervisor", width: 150 },
    {
      field: "salario",
      headerName: "Salario",
      type: "number",
      width: 110,
      valueFormatter: (value) => {
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(value);
      },
    },
    {
      field: "cantHorasExtras",
      headerName: "Cantidad Horas Extras",
      type: "number",
      width: 110,
      valueGetter: (value, field) => {
        const horasExtraEmpleado = horasExtra.find(
          (h) => h.empleadoId === field.id
        );
        return horasExtraEmpleado ? horasExtraEmpleado.cantidadHorasExtra : 0;
      },
    },
    {
      field: "valorHorasExtras",
      headerName: "Valor Horas Extras",
      type: "number",
      width: 110,
      valueFormatter: (value) => {
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(value);
      },
      valueGetter: (value, field) => {
        const horasExtraEmpleado = horasExtra.find(
          (h) => h.empleadoId === field.id
        );
        return horasExtraEmpleado ? horasExtraEmpleado.totalValorHoraExtra : 0;
      },
    },
    {
      field: "totalNomina",
      headerName: "Total Nómina",
      type: "number",
      width: 110,
      valueFormatter: (value) => {
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(value);
      },
      valueGetter: (value, field) => {
        const horasExtraEmpleado = horasExtra.find(
          (h) => h.empleadoId === field.id
        );

        const totalValorHoraExtra = horasExtraEmpleado
          ? horasExtraEmpleado.totalValorHoraExtra
          : 0;

        return field.salario + totalValorHoraExtra;
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(params.id)}
        >
          Ver Horas Extras
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {empleados.length > 0 && (
        <DataGrid
          rows={empleados}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      )}

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Horas Extras del Empleado</DialogTitle>
        <DialogContent>
          {selectedEmpleadoId && (
            <ExtraHoursForm empleadoId={selectedEmpleadoId} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
