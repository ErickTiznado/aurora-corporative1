import React from 'react'
import type { MenuOption } from '../Dashboard'
import DashboardView from '../dashboard/DashboardView'
import ClientesView from '../clientes/ClientesView'
import ProveedoresView from '../proveedores/ProveedoresView'
import InventarioView from '../inventario/InventarioView'
import './MainContent.css'

interface MainContentProps {
  activeSection: MenuOption
  sidebarCollapsed: boolean
}

const MainContent: React.FC<MainContentProps> = ({ 
  activeSection, 
  sidebarCollapsed 
}) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView />
      case 'clientes':
        return <ClientesView />
      case 'proveedores':
        return <ProveedoresView />
      case 'inventario':
        return <InventarioView />
      case 'facturacion':
        return (
          <div className="main___placeholder">
            <div className="main___placeholder-icon">🧾</div>
            <h3>Facturación Electrónica (DTE)</h3>
            <p>Esta funcionalidad estará disponible próximamente</p>
          </div>
        )
      case 'pos':
        return (
          <div className="main___placeholder">
            <div className="main___placeholder-icon">�</div>
            <h3>Punto de Venta (POS)</h3>
            <p>Esta funcionalidad estará disponible próximamente</p>
          </div>
        )
      case 'reportes':
        return (
          <div className="main___placeholder">
            <div className="main___placeholder-icon">�</div>
            <h3>Centro de Reportes</h3>
            <p>Esta funcionalidad estará disponible próximamente</p>
          </div>
        )
      case 'productos':
        return (
          <div className="main___placeholder">
            <div className="main___placeholder-icon">🛍️</div>
            <h3>Gestión de Productos</h3>
            <p>Módulo de productos (Eccomerce) en preparación</p>
          </div>
        )
      case 'promociones':
        return (
          <div className="main___placeholder">
            <div className="main___placeholder-icon">🎯</div>
            <h3>Promociones</h3>
            <p>Configuración de promociones y descuentos en desarrollo</p>
          </div>
        )
      case 'banners':
        return (
          <div className="main___placeholder">
            <div className="main___placeholder-icon">🖼️</div>
            <h3>Banners</h3>
            <p>Gestión de banners publicitarios próximamente</p>
          </div>
        )
      default:
        return (
          <div className="main___placeholder">
            <div className="main___placeholder-icon">🚧</div>
            <h3>Sección en Desarrollo</h3>
            <p>Esta funcionalidad está siendo desarrollada</p>
          </div>
        )
    }
  }

  return (
    <main className={`main___container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="main___content">
        {renderContent()}
      </div>
    </main>
  )
}

export default MainContent