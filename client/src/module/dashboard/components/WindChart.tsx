import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface DataEntry {
  wind: number;
  createdAt: string;
}

interface DashboardProps {
  dataSensors: DataEntry[];
}

const WindChart = ({dataSensors}: DashboardProps) => {
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        min: 0,
        max: 30,
      },
    },
  };

  const data = {
    labels: dataSensors.map((item) => item.createdAt),
    datasets: [
      {
        label: "Wind",
        data: dataSensors.map((item) => item.wind),
        borderColor: "green",
        backgroundColor: "green",
        tension: 0.5,
        yAxisID: "y",
      },
    ],
  };

  return <Line className="max-h-full" options={options} data={data} />;
};

export default WindChart;
