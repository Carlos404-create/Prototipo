import th from "../assets/th.jpg";
import { Link } from 'react-router-dom';

const TercerosMenu = () => {
  const groups = ["3A", "3B", "3C", "3D", "3E", "3F", "3G", "3H", "3I", "3J", "3K", "3L", "3M"];    

  return (
    <div className="Cotenedor-Principal">
      {groups.map((group, index) => (
        <div className="Contenedor-Grupos" key={index}>
          <div>
            <img src={th} alt={`Grupo ${group}`} />
          </div>
          <div className="texto-Grupos">
            <Link to={`/Terceros/Grupo/${group}`}>Grupo {group}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TercerosMenu;
