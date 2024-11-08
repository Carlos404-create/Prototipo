import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const RestablecerContrasena: React.FC = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const onRestablecer = async () => {
    console.log("Botón Restablecer clickeado");
    if (correo === "") {
      alert("Ingrese el correo");
      return;
    }
    if (nuevaContrasena === "") {
      alert("Ingrese la nueva contraseña");
      return;
    }
    if (nuevaContrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const url = "http://localhost:4100/api/restablecerContrasena"; // Asegúrate de que la URL del endpoint es correcta
    console.log("Enviando solicitud a: ", url); // Log de la URL

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Correo: correo,
        NuevaContrasena: nuevaContrasena
      })
    });

    console.log("Respuesta recibida: ", response); // Log de la respuesta

    if (response.ok) {
      alert("Contraseña restablecida correctamente");
      navigate("/");
    } else {
      const error = await response.text();
      alert(error);
    }
  };

  return (
    <div className="contenedor">
      <div className="titulo">SIRPROME</div>    
      <div className="agrupador-correo">
        <div>Correo Electrónico</div>
        <div>
          <input
            type="text"
            placeholder="Ingresa tu correo electrónico"
            className="caja-correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
      </div>
      <div className="agrupador-password">
        <div>Nueva Contraseña</div>
        <div>
          <input
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            className="caja-password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
          />
        </div>
      </div>
      <div className="agrupador-password1">
        <div>Confirmar Contraseña</div>
        <div>
          <input
            type="password"
            placeholder="Confirma tu nueva contraseña"
            className="caja-password2"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
          />
        </div>
      </div>
      <div className="agrupador-boton">
        <button className="boton-ingresar" onClick={onRestablecer}>
          Restablecer
        </button>
      </div>
      <div className="otros-botones">
        <a href="/registro" className="link-registro">Registrarse</a>
        <a href="/" className="link-acceso">Iniciar Sesión</a>
      </div>
    </div>
  );
};

export default RestablecerContrasena;
