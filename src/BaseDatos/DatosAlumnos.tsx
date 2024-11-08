import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

interface Alumno {
  id_Alumno: number;
  Nombre: string;
  Parcial: string;
  Materia: string;
  Calificacion: number;
  GradoYGrupo: string;
}

const DatosAlumnos: React.FC = () => {
  const { group } = useParams<{ group: string }>(); // Aquí obtenemos el parámetro 'group' de la URL
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [alumnosFiltrados, setAlumnosFiltrados] = useState<Alumno[]>([]); // Estado para los alumnos filtrados

  // Obtener los datos de los alumnos cuando esta en el componente
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get('http://localhost:4100/api/datos');
        setAlumnos(response.data);
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

  // Filtrar los alumnos por el grupo que está en la URL
  useEffect(() => {
    if (group) {
      const alumnosFiltrados = alumnos.filter((alumno) => alumno.GradoYGrupo === group);
      setAlumnosFiltrados(alumnosFiltrados);
    }
  }, [alumnos, group]);

  return (
    <div>
      <h1>Lista de Alumnos - {group}</h1>
      {mensaje && <p>{mensaje}</p>}

      {alumnosFiltrados.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Parcial</th>
              <th>Materia</th>
              <th>Calificación</th>
              <th>Grado y Grupo</th>
            </tr>
          </thead>
          <tbody>
            {alumnosFiltrados.map((alumno, index) => (
              <tr key={index}>
                <td>{alumno.id_Alumno}</td>
                <td>
                  {/* Hacemos que el nombre sea un enlace que redirige a /promedio/{id_Alumno} */}
                  <Link to={`/boleta/${alumno.Nombre}`}>{alumno.Nombre}</Link>
                </td>
                <td>{alumno.Parcial}</td>
                <td>{alumno.Materia}</td>
                <td>{alumno.Calificacion}</td>
                <td>{alumno.GradoYGrupo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron resultados para el grupo {group}</p>
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

export default DatosAlumnos;
