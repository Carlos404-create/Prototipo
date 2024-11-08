import Radar_Chart from "./Components/Chart/Radar_Chart";
import "./App.css";
import Info from "./Components/Evaluations/InfoMembers";
function App() {
  return (
  <div className="Body">
    <div>
      <Info
      Nombre="Carlos"
      Especialidad="Programación"
      />
    </div>
    <Radar_Chart/>
  </div>
  )
}

export default App;
