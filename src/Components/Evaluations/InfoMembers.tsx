import "./InfoMembers.css";

export type data = 
    {
        Nombre: string,
        Especialidad: string,
    };

const Info = ({Nombre, Especialidad}:data) => {

    return (
        <div>
            <div className="Header">
                <h1>Rendimiento del Alumno</h1>
                <h2>{Nombre}</h2>
                <p>{Especialidad}</p>
            </div>
        </div>
    )
}

export default Info