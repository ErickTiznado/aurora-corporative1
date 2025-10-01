import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './ClientesView.css'

interface Cliente {
  id: string
  nombre: string
  email: string
  telefono: string
  empresa?: string
  tipo: 'regular' | 'vip' | 'nuevo'
  ultimaCompra: string
  montoTotal: number
}

interface ClientesStats {
  totalClientes: number
  clientesActivos: number
  clientesVip: number
  ventasDelMes: number
}

interface ClientesViewProps {
  stats?: ClientesStats
  clientes?: Cliente[]
}

const ClientesView: React.FC<ClientesViewProps> = ({
  stats = {
    totalClientes: 1247,
    clientesActivos: 892,
    clientesVip: 47,
    ventasDelMes: 156890
  },
  clientes = [
    {
      id: '1',
      nombre: 'María González',
      email: 'maria@email.com',
      telefono: '+56 9 1234 5678',
      empresa: 'Tech Solutions SpA',
      tipo: 'vip',
      ultimaCompra: '2025-09-28',
      montoTotal: 45680
    },
    {
      id: '2',
      nombre: 'Carlos Mendoza',
      email: 'carlos@email.com',
      telefono: '+56 9 8765 4321',
      tipo: 'regular',
      ultimaCompra: '2025-09-25',
      montoTotal: 12450
    },
    {
      id: '3',
      nombre: 'Ana Silva',
      email: 'ana@email.com',
      telefono: '+56 9 5555 1234',
      empresa: 'Innovate Ltd',
      tipo: 'nuevo',
      ultimaCompra: '2025-09-30',
      montoTotal: 8900
    }
  ]
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'regular' | 'vip' | 'nuevo'>('todos')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL')
  }

  const getClienteTypeColor = (tipo: string) => {
    switch (tipo) {
      case 'vip': return 'success'
      case 'nuevo': return 'info'
      default: return 'neutral'
    }
  }

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'todos' || cliente.tipo === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="clientes-view___container">
      {/* Estadísticas */}
      <div className="clientes-view___stats-section">
        <div className="clientes-view___stats-grid">
          <div className="clientes-view___stat-card">
            <div className="clientes-view___stat-icon">👥</div>
            <div className="clientes-view___stat-info">
              <h3>Total Clientes</h3>
              <p className="clientes-view___stat-number">{stats.totalClientes.toLocaleString()}</p>
              <span className="clientes-view___stat-trend positive">+8% este mes</span>
            </div>
          </div>

          <div className="clientes-view___stat-card">
            <div className="clientes-view___stat-icon">📈</div>
            <div className="clientes-view___stat-info">
              <h3>Clientes Activos</h3>
              <p className="clientes-view___stat-number">{stats.clientesActivos.toLocaleString()}</p>
              <span className="clientes-view___stat-trend positive">71% del total</span>
            </div>
          </div>

          <div className="clientes-view___stat-card">
            <div className="clientes-view___stat-icon">💰</div>
            <div className="clientes-view___stat-info">
              <h3>Ventas del Mes</h3>
              <p className="clientes-view___stat-number">{formatCurrency(stats.ventasDelMes)}</p>
              <span className="clientes-view___stat-trend positive">+15% vs anterior</span>
            </div>
          </div>
        </div>
      </div>

      {/* Herramientas de gestión */}
      <div className="clientes-view___tools-section">
        <div className="clientes-view___search-filters">
          <div className="clientes-view___search-box">
            <FiSearch className="clientes-view___search-icon" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="clientes-view___search-input"
            />
          </div>
          
          <div className="clientes-view___filters">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="clientes-view___filter-select"
            >
              <option value="todos">Todos los clientes</option>
              <option value="regular">Regulares</option>
              <option value="vip">VIP</option>
              <option value="nuevo">Nuevos</option>
            </select>
          </div>
        </div>

        <div className="clientes-view___action-buttons">
          <button className="clientes-view___btn primary">
            <span>➕</span>
            Nuevo Cliente
          </button>
          <button className="clientes-view___btn secondary">
            <span>📥</span>
            Importar
          </button>
          <button className="clientes-view___btn secondary">
            <span>📤</span>
            Exportar
          </button>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="clientes-view___list-section">
        <h3 className="clientes-view___section-title">
          Clientes Recientes
          <span className="clientes-view___count">({filteredClientes.length})</span>
        </h3>
        
        <div className="clientes-view___table-container">
          <table className="clientes-view___clients-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Empresa</th>
                <th>Tipo</th>
                <th>Última Compra</th>
                <th>Total Compras</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="clientes-view___client-row">
                  <td className="clientes-view___client-name-cell">
                    <div className="clientes-view___client-info">
                      <div className="clientes-view___client-avatar">
                        {cliente.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="clientes-view___client-name">{cliente.nombre}</div>
                      </div>
                    </div>
                  </td>
                  <td className="clientes-view___contact-cell">
                    <div className="clientes-view___contact-info">
                      <div className="clientes-view___contact-item">📧 {cliente.email}</div>
                      <div className="clientes-view___contact-item">📱 {cliente.telefono}</div>
                    </div>
                  </td>
                  <td className="clientes-view___company-cell">
                    {cliente.empresa || '-'}
                  </td>
                  <td className="clientes-view___type-cell">
                    <span className={`clientes-view___client-type ${getClienteTypeColor(cliente.tipo)}`}>
                      {cliente.tipo.toUpperCase()}
                    </span>
                  </td>
                  <td className="clientes-view___date-cell">
                    {formatDate(cliente.ultimaCompra)}
                  </td>
                  <td className="clientes-view___amount-cell">
                    {formatCurrency(cliente.montoTotal)}
                  </td>
                  <td className="clientes-view___actions-cell">
                    <div className="clientes-view___action-buttons-table">
                      <button className="clientes-view___action-btn-table" title="Editar">📝</button>
                      <button className="clientes-view___action-btn-table" title="Historial">📊</button>
                      <button className="clientes-view___action-btn-table" title="Contactar">💬</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClientes.length === 0 && (
          <div className="clientes-view___empty-state">
            <div className="clientes-view___empty-icon">🔍</div>
            <h3>No se encontraron clientes</h3>
            <p>Intenta ajustar los filtros de búsqueda o agregar un nuevo cliente.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientesView