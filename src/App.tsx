import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Acceso from "./Usuario/Acceso";
import Registro from "./Usuario/Registro";
import RestablecerContrasena from "./Usuario/RestablecerContrasena";
import Inicio from "./Menu/Inicio";
import InsertarAlumno from "./BaseDatos/InsertarAlumno";
import DatosAlumnos from "./BaseDatos/DatosAlumnos";
import QuintosMenu from "./Grupos/QuintosMenu";
import "./assets/Estilo.css"
import PrimerosMenu from "./Grupos/PrimerosMenu";
import TercerosMenu from "./Grupos/TercerosMenu";
import DatosGenerales from "./BaseDatos/DatosGenerales";
import Promedio from "./BaseDatos/Promedio";
import Boleta from "./BaseDatos/Boleta";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/grupo/:group" element={<DatosAlumnos />} />
      <Route path="/boleta/:nombre" element={<Boleta />} />
        <Route path="/Primeros/Grupo/:group" element={<DatosAlumnos />} />
        <Route path="/Terceros/Grupo/:group" element={<DatosAlumnos />} />
        <Route path="/Quintos/Grupo/:group" element={<DatosAlumnos />} />
        <Route path="/Primeros" element={<PrimerosMenu/>}/>
        <Route path="/Terceros" element={<TercerosMenu/>}/>
        <Route path="/Quintos" element={<QuintosMenu/>}/>
        <Route path="/insertar" element={<InsertarAlumno/>}/>
        <Route path="/inicio" element={<Inicio/>}/>
        <Route path="/datos" element={<DatosGenerales />} />
        <Route path="/" element={<Acceso/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/recuperar-password" element={<RestablecerContrasena/>} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;
