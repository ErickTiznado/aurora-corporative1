import React from 'react'
import type { MenuOption } from '../Dashboard'
import './Sidebar.css'

interface MenuItem {
  id: MenuOption
  label: string
  icon: string
  category?: 'core' | 'management' | 'reports' | 'config' | 'ecommerce'
  adminOnly?: boolean
}

interface SidebarProps {
  activeSection: MenuOption
  onSectionChange: (section: MenuOption) => void
  collapsed: boolean
  onToggle: () => void
  userRole: 'admin' | 'user' | 'manager'
  userName: string
}

const menuItems: MenuItem[] = [
  // Dashboard
  { id: 'dashboard', label: 'Dashboard', icon: '📋', category: 'core' },
  
  // Core Business
  { id: 'clientes', label: 'Clientes', icon: '👥', category: 'core' },
  { id: 'proveedores', label: 'Proveedores', icon: '🏪', category: 'core' },
  { id: 'inventario', label: 'Inventario', icon: '📦', category: 'core' },
  
  // Management
  { id: 'usuarios', label: 'Usuarios', icon: '👤', category: 'management', adminOnly: true },
  { id: 'facturacion', label: 'Facturación (DTE)', icon: '🧾', category: 'management' },
  { id: 'notas-anulaciones', label: 'Notas y Anulaciones', icon: '📋', category: 'management' },
  { id: 'pos', label: 'POS (Caja)', icon: '💰', category: 'management' },
  { id: 'inventario-basico', label: 'Inventario Básico', icon: '📊', category: 'management' },
  { id: 'dte-envios', label: 'DTE y Envíos', icon: '📤', category: 'management' },
  
  // Reports
  { id: 'reportes', label: 'Reportes', icon: '📈', category: 'reports' },
  
  // Configuration
  { id: 'multi-empresa', label: 'Multi-empresa', icon: '🏢', category: 'config', adminOnly: true },
  { id: 'configuracion', label: 'Configuración y Seguridad', icon: '⚙️', category: 'config', adminOnly: true },

  // Ecommerce
  { id: 'productos', label: 'Productos', icon: '🛍️', category: 'ecommerce' },
  { id: 'promociones', label: 'Promociones', icon: '🎯', category: 'ecommerce' },
  { id: 'banners', label: 'Banners', icon: '🖼️', category: 'ecommerce' },
]

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
  collapsed,
  onToggle,
  userRole,
  userName
}) => {
  const filteredMenuItems = menuItems.filter(item => 
    !item.adminOnly || userRole === 'admin'
  )

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'core': return 'Principal'
      case 'management': return 'Gestión'
      case 'reports': return 'Reportes'
      case 'config': return 'Configuración'
      case 'ecommerce': return 'Eccomerce'
      default: return ''
    }
  }

  const groupedItems = filteredMenuItems.reduce((acc, item) => {
    const category = item.category || 'core'
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return (
    <aside className={`sidebar___container ${collapsed ? 'collapsed' : ''}`}>
      {/* Header con toggle */}
      <div className="sidebar___header">
        <div className="sidebar___brand-container">
          {!collapsed && (
            <div className="sidebar___brand">
              <span className="sidebar___brand-icon">⚡</span>
              <h2 className="sidebar___brand-text">Aurora</h2>
            </div>
          )}
        </div>
        <button 
          className="sidebar___toggle-btn"
          onClick={onToggle}
          aria-label={collapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
        >
          <span className={`sidebar___toggle-icon ${collapsed ? 'collapsed' : ''}`}>
            {collapsed ? '▶' : '◀'}
          </span>
        </button>
      </div>

      {/* User Info */}
      <div className="sidebar___user-info">
        <div className="sidebar___user-avatar">
          <span>{userName.charAt(0).toUpperCase()}</span>
        </div>
        {!collapsed && (
          <div className="sidebar___user-details">
            <span className="sidebar___user-name">{userName}</span>
            <span className="sidebar___user-role">{userRole}</span>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar___nav">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="sidebar___nav-group">
            {!collapsed && (
              <h3 className="sidebar___nav-group-title">
                {getCategoryLabel(category)}
              </h3>
            )}
            <ul className="sidebar___nav-list">
              {items.map((item) => (
                <li key={item.id} className="sidebar___nav-item">
                  <button
                    className={`sidebar___nav-link ${
                      activeSection === item.id ? 'active' : ''
                    }`}
                    onClick={() => onSectionChange(item.id)}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="sidebar___nav-icon">{item.icon}</span>
                    {!collapsed && (
                      <span className="sidebar___nav-label">{item.label}</span>
                    )}
                    {activeSection === item.id && (
                      <span className="sidebar___nav-indicator" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar___footer">
        {!collapsed && (
          <div className="sidebar___footer-content">
            <span className="sidebar___version">v1.0.0</span>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar