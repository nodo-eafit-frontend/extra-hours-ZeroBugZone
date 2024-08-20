import { useEffect, useState } from "react";
import  {DataGrid}  from "@mui/x-data-grid";

export default function EmpleadosDataTable() {
  const [error, setError] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [horasExtra, setHorasExtra] = useState([]);

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
  }, []);

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
      field: "horasExtras",
      headerName: "Horas Extras",
      type: "number",
      width: 110,
      valueGetter: (value, field) => {
        const horasExtraEmpleado = horasExtra.find(
          (h) => h.id_empleado === field.id
        );
        return horasExtraEmpleado ? horasExtraEmpleado.horasExtras : 0;
      },
    },
    {
      field: "fechaHorasExtras",
      headerName: "Fecha Horas Extras",
      width: 150,
      type: "date",
      valueGetter: (value, field) => {
        const horasExtraEmpleado = horasExtra.find(
          (h) => h.id_empleado === field.id
        );
        return horasExtraEmpleado?.fecha ? Date.parse(horasExtraEmpleado?.fecha) : new Date();
      },
      valueFormatter: (value) => {
        if (!value) return "";
        return new Intl.DateTimeFormat("es-CO", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(value);
      },
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
    </div>
  );
}
