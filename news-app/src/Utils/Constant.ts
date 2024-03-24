import { Rule } from 'antd/es/form';

export const emailValidationRules: Rule[] = [
    { required: true, message: 'Please input your email!', type: 'email' },
];

export const socialLinks = {
    github: 'https://github.com/Hill-Man-1',
    linkedIn: 'https://www.linkedin.com/in/hilman-syarifudin-fadilah',
};
