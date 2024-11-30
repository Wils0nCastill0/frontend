// src/components/ChartComponent.tsx
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Box } from '@chakra-ui/react';

Chart.register(...registerables);

const ChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Datos de ejemplo para ventas por hora
        const hours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];
        const salesData = [120, 250, 300, 450, 500, 320, 280, 220, 400, 450, 380, 300];
        const previousDayData = [100, 220, 280, 420, 480, 300, 260, 200, 380, 420, 350, 280];

        chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: hours,
            datasets: [
              {
                label: 'Ventas de Hoy',
                data: salesData,
                borderColor: '#4299E1',
                backgroundColor: 'rgba(66, 153, 225, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointBackgroundColor: '#4299E1',
                pointRadius: 4,
                pointHoverRadius: 6,
              },
              {
                label: 'Ventas de Ayer',
                data: previousDayData,
                borderColor: '#9F7AEA',
                backgroundColor: 'rgba(159, 122, 234, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointBackgroundColor: '#9F7AEA',
                pointRadius: 4,
                pointHoverRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              intersect: false,
              mode: 'index',
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  usePointStyle: true,
                  padding: 20,
                  font: {
                    size: 12,
                    family: "'Inter', sans-serif",
                  },
                },
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                  size: 14,
                  family: "'Inter', sans-serif",
                },
                bodyFont: {
                  size: 13,
                  family: "'Inter', sans-serif",
                },
                callbacks: {
                  label: function(context) {
                    return `${context.dataset.label}: $${context.parsed.y}`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 12,
                    family: "'Inter', sans-serif",
                  },
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                  font: {
                    size: 12,
                    family: "'Inter', sans-serif",
                  },
                  callback: function(value) {
                    return `$${value}`;
                  },
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <Box p={4} bg="white" borderRadius="lg" boxShadow="sm" height="400px">
      <canvas ref={chartRef} />
    </Box>
  );
};

export default ChartComponent;