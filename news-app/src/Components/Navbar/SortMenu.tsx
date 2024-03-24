import React, { useState } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface SortMenuProps {
    onChangeSort: (sort: 'newest' | 'oldest') => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ onChangeSort }) => {
    const [currentSort, setCurrentSort] = useState<'newest' | 'oldest'>('newest');

    const handleMenuClick = (e: any) => {
        const sortKey = e.key as 'newest' | 'oldest';
        onChangeSort(sortKey);
        setCurrentSort(sortKey);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            {currentSort === 'newest' && <Menu.Item key="oldest">Oldest to Newest</Menu.Item>}
            {currentSort === 'oldest' && <Menu.Item key="newest">Newest to Oldest</Menu.Item>}
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <Button className="sort-button">
                {currentSort === 'newest' ? 'Newest to Oldest' : 'Oldest to Newest'} <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default SortMenu;
