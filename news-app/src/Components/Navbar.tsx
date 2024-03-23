import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import logoImage from '../Assets/Global-Glimpse_copy-removebg-preview (1).png';
import '../Style/Navbar.css'


interface NavbarProps {
    onChangeSort: (sort: 'newest' | 'oldest') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onChangeSort }) => {
    const handleMenuClick = (e: any) => {
        if (e.key === 'newest' || e.key === 'oldest') {
            onChangeSort(e.key);
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="newest">Newest to Oldest</Menu.Item>
            <Menu.Item key="oldest">Oldest to Newest</Menu.Item>
        </Menu>
    );

    return (
        <div className='navbar' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px'}}>
            <img className='logo-global' src={logoImage} alt="Global Glimpse Logo" />
            <div>GLOBAL GLIMPSE</div>
            <div>
                <Dropdown overlay={menu}>
                <Button className="sort-button">
                    Sort <DownOutlined />
                </Button>
                </Dropdown>
            </div>
        </div>
    );
};

export default Navbar;
