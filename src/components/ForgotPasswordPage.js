import { useState } from 'react';
import axios from '../axios';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post('/user/forgot-password', values);
      message.success('Reset link has been sent to your email.');
      setLoading(false);
    } catch (error) {
      message.error('An error occurred');
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default ForgotPasswordPage;
