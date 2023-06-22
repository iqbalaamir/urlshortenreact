import { useState } from 'react';
import axios from '../axios';
import { Button, Card, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.scss';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/user/login', values);
      localStorage.setItem('token', response.data.token);
      message.success('Logged in successfully');
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      message.error('An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
    <Card title="Login" className="login-card">
    <Form onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="login-form-button">Log in</Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
    </Form>
    </Card>
    </div>
  );
}

export default LoginPage;
