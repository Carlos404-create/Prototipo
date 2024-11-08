import th from "../assets/th.jpg";
import { Link } from 'react-router-dom';

const QuintosMenu = () => {
  const groups = ["5A", "5B", "5C", "5D", "5E", "5F", "5G", "5H", "5I", "5J", "5K", "5L", "5M"];    

  return (
    <div className="Cotenedor-Principal">
      {groups.map((group, index) => (
        <div className="Contenedor-Grupos" key={index}>
          <div>
            <img src={th} alt={`Grupo ${group}`} />
          </div>
          <div className="texto-Grupos">
            <Link to={`/Quintos/Grupo/${group}`}>Grupo {group}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuintosMenu;

