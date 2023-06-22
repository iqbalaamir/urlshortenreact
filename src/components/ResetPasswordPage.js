import { useState } from 'react';
import axios from '../axios';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post(`/user/reset-password/${token}`, values);
      message.success('Password reset successfully.');
      setLoading(false);
      // Navigate to login page...
    } catch (error) {
      message.error('An error occurred');
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your new Password!' }]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="New Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Reset Password</Button>
      </Form.Item>
    </Form>
  );
}

export default ResetPasswordPage;
