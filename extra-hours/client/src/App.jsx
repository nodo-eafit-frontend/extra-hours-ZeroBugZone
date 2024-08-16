import { useState, useEffect } from "react";
import "./App.css";
import BasicButtons from "./components/Botones/Boton";
import CustomButton from "./components/Botones/BotonEncabezado";
import BuscarEmpleado from "./components/Botones/BuscarEmpleado";
import { InputNumber } from "antd";
import Brand from "./components/Brand";
import EmpleadoBuscador from './components/EmpleadoBuscador';
import InfButton from './components/Botones/InfButton';
import Observaciones from './components/Botones/BotonObservaciones';
import Table from './components/Table';
import CheckboxComponent from './components/TipoHoraExtra';

function App() {
  const [count, setCount] = useState(0);
  const [id, setId] = useState(1);
  const [horasExtras, setHoras] = useState(0);
  const onChange = (value) => {
    setId(value);
  };
  useEffect(() => {
    fetch("http://localhost:4000/extra-hours/" + id)
      .then((res) => res.json())
      .then((data) => {
        const { extraHoras } = data;
        setHoras(extraHoras);
      });
  }, [id]);

  return (
    <>
        <div> <Brand/> </div> 


      <div>
      <EmpleadoBuscador />
    </div>
        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />;
      
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {horasExtras
          ? "las Horas extras son" + horasExtras: "No hay horas extras"}
      </p>
      <BasicButtons />

      <div style={{ marginTop: '55px' }}>
            <CustomButton text="AGREGAR NUEVA HORA EXTRA" />
      </div>
      <div style={{ marginTop: '50px' }}>
        <BuscarEmpleado />
      </div >

      <div style={{ marginTop: '55px', display: 'flex', justifyContent: 'space-between'}}>
      <InfButton buttonText="Empleado"/>
      <InfButton buttonText="Salario"/>
      <InfButton buttonText="Cargo"/>
      <InfButton buttonText="Supervisor"/>
      </div>
      <div style={{ marginTop: '50px' }}>
        <h4>Fecha</h4>
      <CustomButton text="22/08/2024" />
      </div>
      <div>
            <h1>Observaciones</h1>
            <Observaciones />
        </div>
      <div>
        <h1>Empleados</h1>
        <Table />
      </div>
      <div>
            <h1>Mi Aplicación</h1>
            <CheckboxComponent />
      </div>
    </>
  );
}

export default App;
