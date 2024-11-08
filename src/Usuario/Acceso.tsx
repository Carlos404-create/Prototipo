import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Acceso: React.FC = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const onIngresar = async () => {
    console.log("Botón Ingresar clickeado"); // Log para verificar el clic
    if (correo === "") {
      alert("Ingrese el correo");
      return;
    }
    if (password === "") {
      alert("Ingrese la contraseña");
      return;
    }

    const url = "http://localhost:4100/api/iniciarSesion"; 
    console.log("Enviando solicitud a: ", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Correo: correo,
        Password: password
      })
    });

    console.log("Respuesta recibida: ", response);
    if (response.ok) {
      alert("Inicio de sesión exitoso");
      navigate("/inicio");
    } else if (response.status === 404) {
      alert("Usuario o contraseña incorrectos");
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
        <div>Contraseña</div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="caja-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="agrupador-boton">
        <button className="boton-ingresar" onClick={onIngresar}>
          Ingresar
        </button>
      </div>
      <div className="otros-botones">
        <a href="/registro" className="link-registro">Registrarse</a>
        <a href="/recuperar-password" className="link-password">Olvidé mi contraseña</a>
      </div>
    </div>
  );
};

export default Acceso;
