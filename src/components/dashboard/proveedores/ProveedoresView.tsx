import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './ProveedoresView.css'

interface Proveedor {
  id: string
  nombre: string
  contacto: string
  email: string
  telefono: string
  categoria: string
  estado: 'activo' | 'inactivo' | 'pendiente'
  ultimoPedido: string
  montoTotal: number
  productos: number
}

interface ProveedoresStats {
  totalProveedores: number
  activos: number
  pendientes: number
  montoCompras: number
}

interface ProveedoresViewProps {
  stats?: ProveedoresStats
  proveedores?: Proveedor[]
}

const ProveedoresView: React.FC<ProveedoresViewProps> = ({
  stats = {
    totalProveedores: 156,
    activos: 134,
    pendientes: 12,
    montoCompras: 245680
  },
  proveedores = [
    {
      id: '1',
      nombre: 'Distribuidora Norte S.A.',
      contacto: 'Pedro Ramírez',
      email: 'pedro@distnorte.cl',
      telefono: '+56 2 2345 6789',
      categoria: 'Electrónicos',
      estado: 'activo',
      ultimoPedido: '2025-09-25',
      montoTotal: 89450,
      productos: 156
    },
    {
      id: '2',
      nombre: 'Suministros Industriales Ltda.',
      contacto: 'Carmen López',
      email: 'carmen@suministros.cl',
      telefono: '+56 2 8765 4321',
      categoria: 'Insumos',
      estado: 'activo',
      ultimoPedido: '2025-09-28',
      montoTotal: 45890,
      productos: 89
    },
    {
      id: '3',
      nombre: 'TechSupply Chile',
      contacto: 'Roberto Silva',
      email: 'roberto@techsupply.cl',
      telefono: '+56 9 1234 5678',
      categoria: 'Tecnología',
      estado: 'pendiente',
      ultimoPedido: '2025-09-20',
      montoTotal: 67340,
      productos: 203
    }
  ]
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'activo' | 'inactivo' | 'pendiente'>('todos')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL')
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'success'
      case 'pendiente': return 'warning'
      case 'inactivo': return 'danger'
      default: return 'neutral'
    }
  }

  const filteredProveedores = proveedores.filter(proveedor => {
    const matchesSearch = proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proveedor.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'todos' || proveedor.estado === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="proveedores-view___container">
      {/* Estadísticas */}
      <div className="proveedores-view___stats-section">
        <div className="proveedores-view___stats-grid">
          <div className="proveedores-view___stat-card">
            <div className="proveedores-view___stat-icon">🏢</div>
            <div className="proveedores-view___stat-info">
              <h3>Total Proveedores</h3>
              <p className="proveedores-view___stat-number">{stats.totalProveedores}</p>
              <span className="proveedores-view___stat-trend positive">+5 este mes</span>
            </div>
          </div>

          <div className="proveedores-view___stat-card success">
            <div className="proveedores-view___stat-icon">✅</div>
            <div className="proveedores-view___stat-info">
              <h3>Activos</h3>
              <p className="proveedores-view___stat-number">{stats.activos}</p>
              <span className="proveedores-view___stat-trend success">86% del total</span>
            </div>
          </div>

          <div className="proveedores-view___stat-card">
            <div className="proveedores-view___stat-icon">💰</div>
            <div className="proveedores-view___stat-info">
              <h3>Compras del Mes</h3>
              <p className="proveedores-view___stat-number">{formatCurrency(stats.montoCompras)}</p>
              <span className="proveedores-view___stat-trend positive">+8% vs anterior</span>
            </div>
          </div>
        </div>
      </div>

      {/* Herramientas de gestión */}
      <div className="proveedores-view___tools-section">
        <div className="proveedores-view___search-filters">
          <div className="proveedores-view___search-box">
            <FiSearch className="proveedores-view___search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre, contacto o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="proveedores-view___search-input"
            />
          </div>
          
          <div className="proveedores-view___filters">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="proveedores-view___filter-select"
            >
              <option value="todos">Todos los proveedores</option>
              <option value="activo">Activos</option>
              <option value="pendiente">Pendientes</option>
              <option value="inactivo">Inactivos</option>
            </select>
          </div>
        </div>

        <div className="proveedores-view___action-buttons">
          <button className="proveedores-view___btn primary">
            <span>➕</span>
            Nuevo Proveedor
          </button>
          <button className="proveedores-view___btn secondary">
            <span>🛒</span>
            Órdenes de Compra
          </button>
          <button className="proveedores-view___btn secondary">
            <span>📊</span>
            Reportes
          </button>
        </div>
      </div>

      {/* Lista de proveedores */}
      <div className="proveedores-view___list-section">
        <h3 className="proveedores-view___section-title">
          Proveedores
          <span className="proveedores-view___count">({filteredProveedores.length})</span>
        </h3>
        
        <div className="proveedores-view___table-container">
          <table className="proveedores-view___providers-table">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Contacto</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Último Pedido</th>
                <th>Total Compras</th>
                <th>Productos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProveedores.map((proveedor) => (
                <tr key={proveedor.id} className="proveedores-view___provider-row">
                  <td className="proveedores-view___provider-name-cell">
                    <div className="proveedores-view___provider-info">
                      <div className="proveedores-view___provider-avatar">
                        {proveedor.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="proveedores-view___provider-name">{proveedor.nombre}</div>
                      </div>
                    </div>
                  </td>
                  <td className="proveedores-view___contact-cell">
                    <div className="proveedores-view___contact-info">
                      <div className="proveedores-view___contact-item">👤 {proveedor.contacto}</div>
                      <div className="proveedores-view___contact-item">📧 {proveedor.email}</div>
                      <div className="proveedores-view___contact-item">📱 {proveedor.telefono}</div>
                    </div>
                  </td>
                  <td className="proveedores-view___category-cell">
                    🏷️ {proveedor.categoria}
                  </td>
                  <td className="proveedores-view___status-cell">
                    <span className={`proveedores-view___provider-status ${getEstadoColor(proveedor.estado)}`}>
                      {proveedor.estado.toUpperCase()}
                    </span>
                  </td>
                  <td className="proveedores-view___date-cell">
                    {formatDate(proveedor.ultimoPedido)}
                  </td>
                  <td className="proveedores-view___amount-cell">
                    {formatCurrency(proveedor.montoTotal)}
                  </td>
                  <td className="proveedores-view___products-cell">
                    {proveedor.productos} items
                  </td>
                  <td className="proveedores-view___actions-cell">
                    <div className="proveedores-view___action-buttons-table">
                      <button className="proveedores-view___action-btn-table" title="Editar">📝</button>
                      <button className="proveedores-view___action-btn-table" title="Pedido">🛒</button>
                      <button className="proveedores-view___action-btn-table" title="Historial">📊</button>
                      <button className="proveedores-view___action-btn-table" title="Contactar">💬</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProveedores.length === 0 && (
          <div className="proveedores-view___empty-state">
            <div className="proveedores-view___empty-icon">🔍</div>
            <h3>No se encontraron proveedores</h3>
            <p>Intenta ajustar los filtros de búsqueda o agregar un nuevo proveedor.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProveedoresView