import Button from '@mui/material/Button';

function ButtonExport() {
  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:4000/excel');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte-horas-extra.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      // Puedes agregar alguna notificación o mensaje de error para el usuario
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport}>
      Exportar
    </Button>
  );
}

export default ButtonExport;