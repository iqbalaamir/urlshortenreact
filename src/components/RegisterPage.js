import { useState } from 'react';
import axios from '../axios';
import { Button, Card, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../styles/RegisterPage.scss';

function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post('/user/register', values);
      message.success('Registered successfully. Please check your email for activation link.');
      setLoading(false);
      // Navigate to login page...
    } catch (error) {
      message.error('An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card title="Register" className="register-card">
    <Form onFinish={onFinish}>
    <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your First Name!' }]}>
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your Last Name!' }]}>
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      
      <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="register-form-button">Register</Button>
            Or <Link to="/">login now!</Link>
          </Form.Item>
    </Form>
    </Card>
    </div>
  );
}

export default RegisterPage;
