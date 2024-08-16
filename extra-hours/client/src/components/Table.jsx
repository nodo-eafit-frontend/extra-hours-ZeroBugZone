import { DataGrid } from '@mui/x-data-grid';

// Asumimos que has importado los datos de los JSON
import empleados from 'JSON_Empleados_INFO';
import horasExtra from 'JSON_Horas_Extra_INFO';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombre', headerName: 'Nombre', width: 150 },
  { field: 'cargo', headerName: 'Cargo', width: 130 },
  { field: 'supervisor', headerName: 'Supervisor', width: 150 },
  {
    field: 'salario',
    headerName: 'Salario',
    type: 'number',
    width: 110,
    valueFormatter: (params) => {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(params.value);
    },
  },
  {
    field: 'horasExtras',
    headerName: 'Horas Extras',
    type: 'number',
    width: 110,
    valueGetter: (params) => {
      const horasExtraEmpleado = horasExtra.find(h => h.id_empleado === params.row.id);
      return horasExtraEmpleado ? horasExtraEmpleado.horasExtras : 0;
    },
  },
  {
    field: 'fechaHorasExtras',
    headerName: 'Fecha Horas Extras',
    width: 150,
    valueGetter: (params) => {
      const horasExtraEmpleado = horasExtra.find(h => h.id_empleado === params.row.id);
      return horasExtraEmpleado ? horasExtraEmpleado.fecha : 'N/A';
    },
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
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
    </div>
  );
}
