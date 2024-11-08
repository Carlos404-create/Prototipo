import th from "../assets/th.jpg";
import { Link } from 'react-router-dom';

const PrimerosMenu = () => {
  const groups = ["1A", "1B", "1C", "1D", "1E", "1F", "1G", "1H", "1I", "1J", "1K", "1L", "1M"];    

  return (
    <div className="Cotenedor-Principal">
      {groups.map((group, index) => (
        <div className="Contenedor-Grupos" key={index}>
          <div>
            <img src={th} alt={`Grupo ${group}`} />
          </div>
          <div className="texto-Grupos">
            <Link to={`/Primeros/Grupo/${group}`}>Grupo {group}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrimerosMenu;

