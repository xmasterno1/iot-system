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
  temp: number;
  hum: number;
  light: number;
  time: string;
}

interface DashboardProps {
  dataSensors: DataEntry[];
}

const LineChart = ({dataSensors}: DashboardProps) => {
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
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: dataSensors.map((item) => item.time),
    datasets: [
      {
        label: "Temperature",
        data: dataSensors.map((item) => item.temp),
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        tension: 0.5,
        yAxisID: "y",
      },
      {
        label: "Humidity",
        data: dataSensors.map((item) => item.hum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.5,
        yAxisID: "y",
      },
      {
        label: "Light",
        data: dataSensors.map((item) => item.light),
        borderColor: "rgb(255, 255, 0)",
        backgroundColor: "rgba(255, 255, 0, 0.3)",
        tension: 0.5,
        yAxisID: "y1",
      },
    ],
  };

  return (
    <Line className="min-w-full max-h-full" options={options} data={data} />
  );
};

export default LineChart;
