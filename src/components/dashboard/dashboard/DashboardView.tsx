import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import './DashboardView.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface DashboardStats {
  ventasDelMes: number
  crecimiento: number
  ordenesActivas: number
  alertas: number
}

interface DashboardViewProps {
  stats?: DashboardStats
}

const DashboardView: React.FC<DashboardViewProps> = ({ 
  stats = {
    ventasDelMes: 87450,
    crecimiento: 12.5,
    ordenesActivas: 156,
    alertas: 8
  }
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value}%`
  }

  return (
    <div className="dashboard-view___container">
      {/* Estadísticas principales */}
      <div className="dashboard-view___stats-section">
        <h2 className="dashboard-view___section-title">Resumen General</h2>
        <div className="dashboard-view___stats-grid">
          <div className="dashboard-view___stat-card">
            <div className="dashboard-view___stat-icon">💰</div>
            <div className="dashboard-view___stat-info">
              <h3>Ventas del Mes</h3>
              <p className="dashboard-view___stat-number">
                {formatCurrency(stats.ventasDelMes)}
              </p>
              <span className="dashboard-view___stat-trend positive">
                ↗ vs mes anterior
              </span>
            </div>
          </div>

          <div className="dashboard-view___stat-card success">
            <div className="dashboard-view___stat-icon">📈</div>
            <div className="dashboard-view___stat-info">
              <h3>Crecimiento</h3>
              <p className="dashboard-view___stat-number">
                {formatPercentage(stats.crecimiento)}
              </p>
              <span className="dashboard-view___stat-trend positive">
                Objetivo: +10%
              </span>
            </div>
          </div>

          <div className="dashboard-view___stat-card">
            <div className="dashboard-view___stat-icon">🎯</div>
            <div className="dashboard-view___stat-info">
              <h3>Órdenes Activas</h3>
              <p className="dashboard-view___stat-number">{stats.ordenesActivas}</p>
              <span className="dashboard-view___stat-trend neutral">
                En proceso
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Gráficas de análisis */}
      <div className="dashboard-view___charts-section">
        <div className="dashboard-view___charts-grid">
          {/* Gráfica de Ventas Mensuales */}
          <div className="dashboard-view___chart-card">
            <h2 className="dashboard-view___section-title">Ventas Mensuales</h2>
            <div className="dashboard-view___chart-container">
              <Line
                data={{
                  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                  datasets: [
                    {
                      label: 'Ventas 2024',
                      data: [65000, 59000, 80000, 81000, 56000, 87450],
                      fill: false,
                      borderColor: 'rgb(16, 157, 141)',
                      backgroundColor: 'rgba(16, 157, 141, 0.1)',
                      tension: 0.4,
                      pointBackgroundColor: 'rgba(16, 157, 141, 1)',
                      pointBorderColor: '#fff',
                      pointBorderWidth: 2,
                      pointRadius: 6,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                      labels: {
                        color: '#ffffff',
                        font: {
                          size: 14,
                          weight: '500',
                        },
                      },
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      borderColor: 'rgba(16, 157, 141, 0.8)',
                      borderWidth: 1,
                      callbacks: {
                        label: function(context) {
                          return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`
                        }
                      }
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                      },
                      ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                          return formatCurrency(Number(value))
                        }
                      },
                    },
                    x: {
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                      },
                      ticks: {
                        color: '#ffffff',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Gráfica de Productos más Vendidos */}
          <div className="dashboard-view___chart-card">
            <h2 className="dashboard-view___section-title">Productos más Vendidos</h2>
            <div className="dashboard-view___chart-container">
              <Bar
                data={{
                  labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
                  datasets: [
                    {
                      label: 'Unidades Vendidas',
                      data: [320, 285, 190, 155, 125],
                      backgroundColor: [
                        'rgba(16, 157, 141, 0.8)',
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(241, 196, 15, 0.8)',
                      ],
                      borderColor: [
                        'rgba(16, 157, 141, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(241, 196, 15, 1)',
                      ],
                      borderWidth: 2,
                      borderRadius: 8,
                      borderSkipped: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                      labels: {
                        color: '#ffffff',
                        font: {
                          size: 14,
                          weight: '500',
                        },
                      },
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      borderColor: 'rgba(16, 157, 141, 0.8)',
                      borderWidth: 1,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                      },
                      ticks: {
                        color: '#ffffff',
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        color: '#ffffff',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView