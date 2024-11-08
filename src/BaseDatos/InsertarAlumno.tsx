import React, { useState } from 'react';
import axios from 'axios';

interface Datos {
  nombre: string;
  gradoYGrupo: string;
  asignatura: string;
  parcial: string;
  calificacion: number;
}

const InsertarAlumno: React.FC = () => {
  const [datos, setDatos] = useState<Datos>({
    nombre: '',
    gradoYGrupo: '',
    asignatura: '',
    parcial: '',
    calificacion: 0,
  });
  const [mensaje, setMensaje] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4100/api/insertarAlumno', datos);
      setMensaje('Alumno registrado correctamente');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMensaje(error.response?.data || 'Error al registrar el alumno');
      } else {
        setMensaje('Error inesperado');
      }
    }
  };

  return (
    <div>
      <h1>Registrar Alumno</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={datos.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Grado y Grupo:</label>
          <input type="text" name="gradoYGrupo" value={datos.gradoYGrupo} onChange={handleChange} required />
        </div>
        <div>
          <label>Asignatura:</label>
          <input type="text" name="asignatura" value={datos.asignatura} onChange={handleChange} required />
        </div>
        <div>
          <label>Parcial:</label>
          <input type="text" name="parcial" value={datos.parcial} onChange={handleChange} required />
        </div>
        <div>
          <label>Calificación:</label>
          <input type="number" name="calificacion" value={datos.calificacion} onChange={handleChange} required min={0} max={10} />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default InsertarAlumno;



