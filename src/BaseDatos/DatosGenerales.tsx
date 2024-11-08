import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Alumno {
  id_Alumno: number;
  Nombre: string;
  Parcial: string;
  Materia: string;
  Calificacion: number;
  GradoYGrupo: string;
}

const DatosGenerales: React.FC = () => {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [textoBusqueda, setTextoBusqueda] = useState<string>(''); // Estado para el texto de búsqueda
  const [alumnosFiltrados, setAlumnosFiltrados] = useState<Alumno[]>([]); // Estado para los alumnos filtrados

  // Obtener los datos de los alumnos cuando esta en el componente
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get('http://localhost:4100/api/datos');
        setAlumnos(response.data);
        setAlumnosFiltrados(response.data); // Inicialmente muestra todos los alumnos
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMensaje(error.response?.data || 'Error al obtener los datos');
        } else {
          setMensaje('Error inesperado');
        }
      }
    };
    obtenerDatos();
  }, []);

  // Función que filtra los alumnos según el nombre o grado y grupo
  const filtrarAlumnos = () => {
    if (textoBusqueda.trim().toLowerCase() !== '') {
      const alumnosFiltrados = alumnos.filter((alumno) =>
        alumno.Nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
        alumno.GradoYGrupo.toLowerCase().includes(textoBusqueda.toLowerCase())
      );
      setAlumnosFiltrados(alumnosFiltrados); // 
    } else {
      setAlumnosFiltrados(alumnos);
    }
    //mandamos este set para que cada vez que bsucamos se actualie el texto y borre los datos que estan puestos 
    setTextoBusqueda('');
  };

 // Obtener una lista de materias únicas para la cabecera
 const materiasUnicas = Array.from(new Set(alumnos.map((alumno) => alumno.Materia)));

 // Agrupar calificaciones por parcial
 const calificacionesPorParcial = alumnos.reduce((acc: any, alumno) => {
   const key = alumno.Parcial;
   if (!acc[key]) {
     acc[key] = {
       Nombre: alumno.Nombre,
       Parcial: alumno.Parcial,
       GradoYGrupo: alumno.GradoYGrupo,
       Calificaciones: {}
     };
   }
   acc[key].Calificaciones[alumno.Materia] = alumno.Calificacion;
   return acc;
 }, {});

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      <input
        type="text"
        value={textoBusqueda}
        onChange={(e) => setTextoBusqueda(e.target.value)} // Actualizamos el estado del texto
        placeholder="Buscar por nombre o grado y grupo"
      />
      <button onClick={filtrarAlumnos}>Buscar</button> {/* Al hacer clic, filtramos y limpiamos el texto */}

      {mensaje && <p>{mensaje}</p>}

      {alumnosFiltrados.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Parcial</th>
              {materiasUnicas.map((materia) => (
                  <th key={materia}>{materia}</th>
                ))}
              <th>Grado y Grupo</th>
            </tr>
          </thead>
          <tbody>
              {Object.values(calificacionesPorParcial).map((parcial: any, index) => (
                <tr key={index}>
                  <td>{parcial.Nombre}</td>
                  <td>{parcial.Parcial}</td>
                  {materiasUnicas.map((materia) => (
                    <td key={materia}>
                      {parcial.Calificaciones[materia] || ''}
                    </td>
                  ))}
                  <td>{parcial.GradoYGrupo}</td>
                </tr>
              ))}
            </tbody>
        </table>
      ) : (
        <p>No se encontraron resultados</p>
      )}

      <div className="agrupador-boton">
        <button className="boton-ingresar" onClick={() => navigate("/")}>
          Volver
        </button>
        <button className="boton-insertar" onClick={() => navigate("/insertar")}>
          Insertar
        </button>
      </div>
    </div>
  );
};

export default DatosGenerales;
