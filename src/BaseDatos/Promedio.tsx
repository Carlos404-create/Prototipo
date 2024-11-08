import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Promedio: React.FC = () => {
  const { id_Alumno } = useParams<{ id_Alumno: string }>(); // Obtener el id_Alumno desde la URL
  const [promedio, setPromedio] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string>('');

  // Obtener el promedio del alumno por id
  useEffect(() => {
    const obtenerPromedio = async () => {
      try {
        const response = await axios.get(`http://localhost:4100/api/Promedio/${id_Alumno}`);
        setPromedio(response.data.promedio);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMensaje(error.response?.data || 'Error al obtener el promedio');
        } else {
          setMensaje('Error inesperado');
        }
      }
    };
    if (id_Alumno) {
      obtenerPromedio();
    }
  }, [id_Alumno]);

  return (
    <div>
      <h1>Promedio del Alumno</h1>
      {mensaje && <p>{mensaje}</p>}
      {promedio !== null ? (
        <p>El promedio del alumno es: {promedio}</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Promedio;
