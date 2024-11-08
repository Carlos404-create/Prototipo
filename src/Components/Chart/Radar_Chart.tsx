import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import "./Radar_Chart.css";

const data = [
    {
        subject: "Matemáticas",
        A: 10,
        fullMark:10,
    },
    {
        subject: "Modulo",
        A: 6,
        fullMark:10,
    },
    {
        subject: "Ingles",
        A: 8,
        fullMark:10,
    },
    {
        subject: "Geografía",
        A: 0,
        fullMark:10,
    },
    {
        subject: "Etica",
        A: 0,
        fullMark:10,
    },
    {
        subject: "Física",
        A: 6,
        fullMark:10,
    },
];

const Radar_Chart = () => {
    return (
        <div className="RadarChart">
            <div>
                <ResponsiveContainer width={400} height={400}>
                    <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
                        <PolarGrid/>
                        <PolarAngleAxis dataKey="subject"/>
                        <PolarRadiusAxis/>
                        <Radar name="class" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5}/>
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Radar_Chart