import { useState, useEffect } from "react";
import "./App.css";
import BasicButtons from "./components/Boton";
<<<<<<< HEAD
=======
import CustomButton from "./components/BotonEncabezado";
import BuscarEmpleado from "./components/BuscarEmpleado";
>>>>>>> 4a45271004300a75bbfd78f0f31192fd959b071c
import { InputNumber } from "antd";
import Brand from "./components/Brand";
import EmpleadoBuscador from './components/EmpleadoBuscador';

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
        let horas = 0;
        data.forEach((element) => {
          horas += element.horasExtras;
        });
        setHoras(horas);
      });
  }, [id]);

  return (
    <>
        <Brand />
      

      <div>
      <EmpleadoBuscador />
    </div>
        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />;
      
      <h1>Vite + React</h1>
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
<<<<<<< HEAD
=======
      <div style={{ marginTop: '50px' }}>
            <CustomButton text="AGREGAR NUEVA HORA EXTRA" />
      </div>
      <div style={{ marginTop: '50px' }}>
        <BuscarEmpleado />
      </div>
>>>>>>> 4a45271004300a75bbfd78f0f31192fd959b071c
    </>
  );
}

export default App;
