import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';

export const DoughnutChart = ({ chartData, width }) => {
    return (
        <div style={{ width }}>
            <Doughnut
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Tareas por proyectos"
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