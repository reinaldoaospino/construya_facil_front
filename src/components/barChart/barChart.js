import { Bar } from "react-chartjs-2";
import 'chart.js/auto';


export const BarChart = ({ chartData, width, margin }) => {
    return (
        <div style={{ width, margin }}>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Tareas por empleado"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }}
            />
        </div>
    );
};