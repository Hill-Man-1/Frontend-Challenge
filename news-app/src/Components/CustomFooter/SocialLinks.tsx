import React from 'react';
import { Row, Col } from 'antd';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { socialLinks } from '../../Utils/Constant';
import '../../Style/Footer.css'

const SocialLinks: React.FC = () => (
    <Row gutter={[16, 16]} justify="center">
        <Col>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <GithubOutlined style={{ fontSize: '40px', color: 'white' }} />
            </a>  
        </Col>
        <Col>
            <a href={socialLinks.linkedIn} target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined style={{ fontSize: '40px', color: 'white' }} />
            </a>
        </Col>
    </Row>
);

export default SocialLinks;
