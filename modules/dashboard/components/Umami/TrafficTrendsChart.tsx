"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import { format, parseISO } from "date-fns";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface DataPoint {
  x: string;
  y: number;
}

interface DataProps {
  data: {
    pageviews: DataPoint[];
    sessions: DataPoint[];
  };
}

const TrafficTrendsChart = ({ data }: DataProps) => {
  const pageviewsData = data?.pageviews || [];
  const sessionsData = data?.sessions || [];

  const rawLabels = pageviewsData.map((point) => point.x);
  const labels = rawLabels?.map((isoDate) => {
    try {
      return format(parseISO(isoDate), "MMM");
    } catch {
      return isoDate;
    }
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sessions",
        data: sessionsData.map((point) => point.y),
        backgroundColor: "rgba(59, 130, 246, 0.4)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 4,
        stack: "traffic",
      },
      {
        label: "Pageviews",
        data: pageviewsData.map((point) => point.y),
        backgroundColor: "rgba(29, 78, 216, 0.7)",
        borderColor: "rgba(29, 78, 216, 1)",
        borderWidth: 1,
        borderRadius: 4,
        stack: "traffic",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 12 },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const isoDate = rawLabels?.[index];
            if (!isoDate) return "";
            try {
              return format(parseISO(isoDate), "MMMM yyyy");
            } catch {
              return isoDate;
            }
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
      y: {
        stacked: true,
        grid: { color: "rgba(100, 100, 100, 0.1)" },
        ticks: { font: { size: 11 } },
      },
    },
  };

  return (
    <div className="mx-auto h-[300px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TrafficTrendsChart;
