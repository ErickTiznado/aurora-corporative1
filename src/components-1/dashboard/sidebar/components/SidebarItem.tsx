import React from 'react';
import './SidebarItem.css';

interface SidebarItemProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, onClick, isActive }) => {
    return (
        <button
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
        >
            {label}
        </button>
    );
};

export default SidebarItem;