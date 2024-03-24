import React from 'react';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import '../Style/Footer.css';

const { Footer } = Layout;

const CustomFooter: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Footer className='footer'>
      <Row justify="space-around" align="middle">
        <Col span={6} className="footer-column" style={{ textAlign: 'center' }}>
          <h3>Stay Updated</h3>
          <p>Subscribe for instant notifications directly to your inbox. Enter your email to never miss the latest news.</p>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>
            <Form.Item>
              <Button className='subscribe-button' htmlType="submit">
                Subscribe
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6} className="footer-column" style={{ textAlign: 'center' }}>
        <h3>FOLLOW US</h3>
          <Row gutter={[16, 16]} justify="center">
            <Col>
              <a href="https://github.com/Hill-Man-1" target="_blank" rel="noopener noreferrer">
                <GithubOutlined style={{ fontSize: '40px', color: 'white' }} />
              </a>
            </Col>
            <Col>
              <a href="https://www.linkedin.com/in/hilman-syarifudin-fadilah" target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined style={{ fontSize: '40px', color: 'white' }} />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="footer-bottom">
          NewsApp ©{new Date().getFullYear()} Created with Ant Design
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
