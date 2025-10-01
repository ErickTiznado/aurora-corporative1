import "./Sidebar.css"
import SidebarItem from "./components/SidebarItem"

const Sidebar = () => {
    const menuItems = [
        { label: "Clientes" },
        { label: "Proveedores" },
        { label: "Inventario" },
        { label: "Usuarios" },
        { label: "Reportes" },
        { label: "Facturación (DTE)" },
        { label: "Notas y Anulaciones" },
        { label: "POS (Caja)" },
        { label: "Inventario (básico)" },
        { label: "DTE y Envíos" },
        { label: "Reportes" },
        { label: "Multi-empresa" },
        { label: "Configuración y Seguridad" },
    ]

    return (
        <nav className="sidebar">
            <ul>
                {menuItems.map((item, index) => (
                    <SidebarItem key={index} label={item.label} />
                ))}
            </ul>
        </nav>
    )
}

export default Sidebar