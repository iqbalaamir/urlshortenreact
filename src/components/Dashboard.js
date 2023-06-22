import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, message, Layout ,Tooltip } from 'antd';
import axios from '../axios';
import { LinkOutlined, CopyOutlined } from '@ant-design/icons';
import '../styles/Dashboard.scss';
import copy from 'copy-to-clipboard';

const { Header, Content } = Layout;

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);

  const copyToClipboard = (text) => {
    const didCopy = copy(text);
    
    if (didCopy) {
      message.success('URL copied to clipboard');
    } else {
      message.error('Failed to copy URL');
    }
  };
  

  const columns = [
    {
      title: 'Short URL',
      dataIndex: 'shortURL',
      key: 'shortURL',
      render: (text) => (
        <Tooltip title="Click to Copy">
          <Button type="link" onClick={() => copyToClipboard(`https://urlshortapi.onrender.com/url/url/${text}`)}>
            <CopyOutlined /> {text}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: 'Long URL',
      dataIndex: 'originalURL',
      key: 'originalURL',
    },
    {
      title: 'Click Count',
      dataIndex: 'clicks',
      key: 'clicks',
    }
  ];

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        const response = await axios.get('/url/urls');
        setUrls(response.data);
        setLoading(false);
      } catch (error) {
        message.error('An error occurred while fetching URLs');
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
      const response = await axios.post('/url/shorten', values);
      console.log(response.data)
      setUrls(prevUrls => [...prevUrls, response.data]);
      message.success('URL shortened successfully');
      setLoading(false);
    } catch (error) {
      message.error('An error occurred while shortening URL');
      setLoading(false);
    }
  };

 
  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <h2>URL Shortener Dashboard</h2>
      </Header>
      <Content className="dashboard-content">
        <Form className="url-form" onFinish={onFinish}>
          <Form.Item name="originalURL" rules={[{ required: true, message: 'Please input your URL!' }]}>
            <Input prefix={<LinkOutlined />} placeholder="URL" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Shorten URL</Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={urls} loading={loading} rowKey="shortURL" />
      </Content>
    </Layout>
  );

}

export default Dashboard;
