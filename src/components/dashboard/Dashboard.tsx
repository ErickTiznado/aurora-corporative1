import React, { useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import MainContent from './main/MainContent'
import './Dashboard.css'

export type MenuOption = 
  | 'dashboard'
  | 'clientes' 
  | 'proveedores' 
  | 'inventario' 
  | 'usuarios' 
  | 'reportes' 
  | 'facturacion' 
  | 'notas-anulaciones' 
  | 'pos' 
  | 'inventario-basico' 
  | 'dte-envios' 
  | 'multi-empresa' 
  | 'configuracion'
  // Ecommerce
  | 'productos'
  | 'promociones'
  | 'banners'

interface DashboardProps {
  userRole?: 'admin' | 'user' | 'manager'
  userName?: string
}

const Dashboard: React.FC<DashboardProps> = ({ 
  userRole = 'user', 
  userName = 'Usuario' 
}) => {
  const [activeSection, setActiveSection] = useState<MenuOption>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSectionChange = (section: MenuOption) => {
    setActiveSection(section)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="dashboard___container">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        userRole={userRole}
        userName={userName}
      />
      <MainContent
        activeSection={activeSection}
        sidebarCollapsed={sidebarCollapsed}
      />
    </div>
  )
}

export default Dashboard