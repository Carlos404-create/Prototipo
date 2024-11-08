import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import "./Radar_Chart.css";

const data = [
    {
        subject: "Matemáticas",
        A: 10,
        B: 10,
        fullMark:10,
    },
    {
        subject: "Modulo",
        A: 4,
        B: 5,
        fullMark:10,
    },
    {
        subject: "Ingles",
        A: 6,
        B: 7,
        fullMark:10,
    },
    {
        subject: "Geografía",
        A: 9,
        B: 8,
        fullMark:10,
    },
    {
        subject: "Etica",
        A: 4,
        B: 3,
        fullMark:10,
    },
    {
        subject: "Física",
        A: 6,
        B: 3,
        fullMark:10,
    },
];

const Radar_Chart = () => {
    return (
        <div className="RadarChart">
             <h3 style={{ textAlign: 'center' }}>Rendimiento Académico</h3>
            <ResponsiveContainer width={600} height={600}>
                <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
                    <PolarGrid/>
                    <PolarAngleAxis dataKey="subject"/>
                    <PolarRadiusAxis/>
                    <Radar name="class" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5}/>
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Radar_Chart