import React, { useState } from 'react'
import { FiSearch, FiPackage, FiEdit3, FiBarChart, FiSettings } from 'react-icons/fi'
import './InventarioView.css'

interface Producto {
  id: string
  nombre: string
  categoria: string
  sku: string
  stock: number
  stockMinimo: number
  precio: number
  proveedor: string
  ubicacion: string
  estado: 'disponible' | 'agotado' | 'bajo'
  ultimaActualizacion: string
}

interface InventarioStats {
  totalProductos: number
  stockBajo: number
  valorTotal: number
  movimientosHoy: number
}

interface InventarioViewProps {
  stats?: InventarioStats
  productos?: Producto[]
}

const InventarioView: React.FC<InventarioViewProps> = ({
  stats = {
    totalProductos: 2847,
    stockBajo: 23,
    valorTotal: 45782,
    movimientosHoy: 156
  },
  productos = [
    {
      id: '1',
      nombre: 'Laptop HP Pavilion 15',
      categoria: 'Electrónicos',
      sku: 'HP-PAV-15-001',
      stock: 45,
      stockMinimo: 10,
      precio: 850000,
      proveedor: 'TechSupply',
      ubicacion: 'A-1-5',
      estado: 'disponible',
      ultimaActualizacion: '2025-09-30'
    },
    {
      id: '2',
      nombre: 'Mouse Inalámbrico Logitech',
      categoria: 'Accesorios',
      sku: 'LOG-M705-BK',
      stock: 8,
      stockMinimo: 15,
      precio: 45000,
      proveedor: 'Distribuidora Norte',
      ubicacion: 'B-2-3',
      estado: 'bajo',
      ultimaActualizacion: '2025-09-29'
    },
    {
      id: '3',
      nombre: 'Monitor Samsung 24"',
      categoria: 'Monitores',
      sku: 'SAM-24-FHD-001',
      stock: 0,
      stockMinimo: 5,
      precio: 180000,
      proveedor: 'Samsung Chile',
      ubicacion: 'C-1-2',
      estado: 'agotado',
      ultimaActualizacion: '2025-09-28'
    }
  ]
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'disponible' | 'bajo' | 'agotado'>('todos')
  const [selectedCategory, setSelectedCategory] = useState<string>('todas')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount)
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'disponible': return 'success'
      case 'bajo': return 'warning'
      case 'agotado': return 'danger'
      default: return 'neutral'
    }
  }

  const categories = ['todas', ...new Set(productos.map(p => p.categoria))]

  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'todos' || producto.estado === selectedFilter
    const matchesCategory = selectedCategory === 'todas' || producto.categoria === selectedCategory
    return matchesSearch && matchesFilter && matchesCategory
  })

  return (
    <div className="inventario-view___container">
      {/* Estadísticas */}
      <div className="inventario-view___stats-section">
        <div className="inventario-view___stats-grid">
          <div className="inventario-view___stat-card">
            <div className="inventario-view___stat-icon">📦</div>
            <div className="inventario-view___stat-info">
              <h3>Total Productos</h3>
              <p className="inventario-view___stat-number">{stats.totalProductos.toLocaleString()}</p>
              <span className="inventario-view___stat-trend positive">+12 nuevos</span>
            </div>
          </div>

          <div className="inventario-view___stat-card warning">
            <div className="inventario-view___stat-icon">⚠️</div>
            <div className="inventario-view___stat-info">
              <h3>Stock Bajo</h3>
              <p className="inventario-view___stat-number">{stats.stockBajo}</p>
              <span className="inventario-view___stat-trend warning">Requiere reposición</span>
            </div>
          </div>

          <div className="inventario-view___stat-card success">
            <div className="inventario-view___stat-icon">💰</div>
            <div className="inventario-view___stat-info">
              <h3>Valor Total</h3>
              <p className="inventario-view___stat-number">{formatCurrency(stats.valorTotal)}</p>
              <span className="inventario-view___stat-trend success">Inventario</span>
            </div>
          </div>

          <div className="inventario-view___stat-card">
            <div className="inventario-view___stat-icon">📊</div>
            <div className="inventario-view___stat-info">
              <h3>Movimientos Hoy</h3>
              <p className="inventario-view___stat-number">{stats.movimientosHoy}</p>
              <span className="inventario-view___stat-trend positive">Entradas/Salidas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Herramientas de gestión */}
      <div className="inventario-view___tools-section">
        <div className="inventario-view___search-filters">
          <div className="inventario-view___search-box">
            <FiSearch className="inventario-view___search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre, SKU o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="inventario-view___search-input"
            />
          </div>
          
          <div className="inventario-view___filters">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="inventario-view___filter-select"
            >
              <option value="todos">Todos los estados</option>
              <option value="disponible">Disponible</option>
              <option value="bajo">Stock Bajo</option>
              <option value="agotado">Agotado</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="inventario-view___filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'todas' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="inventario-view___action-buttons">
          <button className="inventario-view___btn primary">
            <span>➕</span>
            Nuevo Producto
          </button>
          <button className="inventario-view___btn secondary">
            <span>📊</span>
            Ajuste Stock
          </button>
          <button className="inventario-view___btn secondary">
            <span>📋</span>
            Movimientos
          </button>
          <button className="inventario-view___btn secondary">
            <span>📤</span>
            Exportar
          </button>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="inventario-view___list-section">
        <h3 className="inventario-view___section-title">
          Productos en Inventario
          <span className="inventario-view___count">({filteredProductos.length})</span>
        </h3>
        
        <div className="inventario-view___table-container">
          <table className="inventario-view___products-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Ubicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => (
                <tr key={producto.id} className={`inventario-view___product-row ${getEstadoColor(producto.estado)}`}>
                  <td className="inventario-view___product-cell">
                    <div className="inventario-view___product-info">
                      <FiPackage className="inventario-view___product-icon" />
                      <div>
                        <div className="inventario-view___product-name">{producto.nombre}</div>
                        <div className="inventario-view___product-category">{producto.categoria}</div>
                      </div>
                    </div>
                  </td>
                  <td className="inventario-view___sku-cell">
                    <code>{producto.sku}</code>
                  </td>
                  <td className="inventario-view___stock-cell">
                    <div className="inventario-view___stock-info">
                      <span className="inventario-view___stock-current">{producto.stock}</span>
                      <span className="inventario-view___stock-min">/{producto.stockMinimo}</span>
                    </div>
                  </td>
                  <td className="inventario-view___price-cell">
                    {formatCurrency(producto.precio)}
                  </td>
                  <td className="inventario-view___status-cell">
                    <span className={`inventario-view___status-badge ${getEstadoColor(producto.estado)}`}>
                      {producto.estado}
                    </span>
                  </td>
                  <td className="inventario-view___location-cell">
                    {producto.ubicacion}
                  </td>
                  <td className="inventario-view___actions-cell">
                    <div className="inventario-view___action-buttons">
                      <button className="inventario-view___action-btn" title="Editar">
                        <FiEdit3 />
                      </button>
                      <button className="inventario-view___action-btn" title="Estadísticas">
                        <FiBarChart />
                      </button>
                      <button className="inventario-view___action-btn" title="Configurar">
                        <FiSettings />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProductos.length === 0 && (
          <div className="inventario-view___empty-state">
            <div className="inventario-view___empty-icon">📦</div>
            <h3>No se encontraron productos</h3>
            <p>Intenta ajustar los filtros de búsqueda o agregar un nuevo producto.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InventarioView