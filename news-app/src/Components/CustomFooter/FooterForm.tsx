import React from 'react';
import { Form, Input, Button, FormInstance } from 'antd';
import { emailValidationRules } from '../../Utils/Constant'; 
import { FormValues } from '../../Types'; 
import '../../Style/Footer.css'

interface FooterFormProps {
    form: FormInstance<FormValues>;
    onFinish: (values: FormValues) => void;
}


const FooterForm: React.FC<FooterFormProps> = ({ form, onFinish }) => (
    <Form form={form} onFinish={onFinish}>
        <Form.Item name="email" rules={emailValidationRules}>
            <Input placeholder="Enter your email address" />
        </Form.Item>
        <Form.Item>
            <Button className='subscribe-button' htmlType="submit">
                Subscribe
            </Button>
        </Form.Item>
    </Form>
);

export default FooterForm;
