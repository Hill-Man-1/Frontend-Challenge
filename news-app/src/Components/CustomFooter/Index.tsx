import React from 'react';
import { Layout, Row, Col, Form } from 'antd';
import FooterForm from './FooterForm';
import SocialLinks from './SocialLinks';
import { FormValues } from '../../Types';
import '../../Style/Footer.css';

const { Footer } = Layout;

const CustomFooter: React.FC = () => {
    const [form] = Form.useForm<FormValues>();

    const onFinish = (values: FormValues) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Footer className='footer'>
            <Row justify="space-around" align="middle">
                <Col span={6} className="footer-column" style={{ textAlign: 'center' }}>
                    <h3>Stay Updated</h3>
                    <p>Subscribe for instant notifications directly to your inbox. Enter your email to never miss the latest news.</p>
                    <FooterForm form={form} onFinish={onFinish} />
                </Col>
                <Col span={6} className="footer-column" style={{ textAlign: 'center' }}>
                    <h3>FOLLOW ME !</h3>
                    <SocialLinks />
                </Col>
            </Row>
        </Footer>
    );
};

export default CustomFooter;