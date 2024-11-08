import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro: React.FC = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onIngresar = async () => {
    console.log("Botón Ingresar clickeado");

    if (nombre === "") {
      alert("Ingrese un nombre");
      return;
    }
    if (correo === "") {
      alert("Ingrese el correo");
      return;
    }
    if (password === "") {
      alert("Ingrese la contraseña");
      return;
    }
    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const url = "http://localhost:4100/api/registrar"; // Asegúrate de que la URL del endpoint es correcta
    console.log("Enviando solicitud a: ", url); // Log de la URL

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Nombre: nombre,
        Correo: correo,
        Password: password
      })
    });

    console.log("Respuesta recibida: ", response); // Log de la respuesta

    if (response.ok) {
      alert("Registro exitoso");
      navigate("/");
    } else {
      const error = await response.text();
      if (response.status === 409) { // 409 Conflict, cuando el correo ya está registrado
        alert("Ya existe un correo electrónico, intenta de nuevo");
      } else {
        alert(error);
      }
    }
  };

  return (
    <div className="contenedor">
      <div className="titulo">SIRPROME</div>
      <div className="agrupador-nombre">
        <div>Nombre de Usuario</div>
        <div>
          <input
            type="text"
            placeholder="Ingresa el nombre de usuario"
            className="caja-nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
      </div>
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
      <div className="agrupador-password1">
        <div>Repetir Contraseña</div>
        <div>
          <input
            type="password"
            placeholder="Ingrese nuevamente su contraseña"
            className="caja-password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
      </div>
      <div className="agrupador-boton">
        <button className="boton-ingresar" onClick={onIngresar}>
          Registrar
        </button>
      </div>
      <div className="otros-botones">
        <a href="/" className="link-inicio-sesion">inicio de sesion</a>
        <a href="/recuperar-password" className="link-password">Olvidé mi contraseña</a>
      </div>
    </div>
  );
};

export default Registro;
