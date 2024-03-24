import React from 'react';
import logoImage from '../../Assets/Global-Glimpse_copy-removebg-preview (1).png'
import SortMenu from './SortMenu';
import '../../Style/Navbar.css'; 

interface NavbarProps {
    onChangeSort: (sort: 'newest' | 'oldest') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onChangeSort }) => {
    return (
        <div className='navbar'>
            <img className='logo-global' src={logoImage} alt="Global Glimpse Logo" />
            <div className='brand-title'>GLOBAL GLIMPSE</div>
            <SortMenu onChangeSort={onChangeSort} />
        </div>
    );
};

export default Navbar;
