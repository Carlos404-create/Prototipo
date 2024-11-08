import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Alumno {
  id_Alumno: number;
  Nombre: string;
  Parcial: string;
  Materia: string;
  Calificacion: number;
  GradoYGrupo: string;
}

const Boleta: React.FC = () => {
  const { nombre } = useParams<{ nombre: string }>();
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      if (nombre) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:4100/api/datos/${nombre}`);
          if (response.data) {
            setAlumnos(response.data);
            setError('');
          }
        } catch (err) {
          setError('No se encontraron datos para este alumno.');
          setAlumnos([]);
        } finally {
          setLoading(false);
        }
      }
    };

    obtenerDatos();
  }, [nombre]);

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
      <h1>Boleta del Alumno</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        alumnos.length > 0 ? (
          <table>
            <thead>
              <tr>
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
          <p>No se encontraron resultados para el nombre: {nombre}</p>
        )
      )}
    </div>
  );
};

export default Boleta;
