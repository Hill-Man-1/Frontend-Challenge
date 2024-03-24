import React, { useState, useEffect } from 'react';
import './App.css';
import { Layout, Row, Col } from 'antd';
import Navbar from './Components/Navbar';
import CustomFooter from './Components/Footer';
import NewsCard from './Components/NewsCard';
import NotFoundPage from './Components/NotFoundPage';
import "antd/dist/reset.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

interface ArticleSource {
  id: string | null;
  name: string;
}

interface NewsArticle {
  source: ArticleSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

function App() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = '8ce755751a95422e97dbf85466de0a04'; 
      const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-02-23&sortBy=publishedAt&apiKey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleSortChange = (sortOption: 'newest' | 'oldest') => {
    setSort(sortOption);
  };

  return (
    <Router>
      <Layout className="layout">
        <Navbar onChangeSort={handleSortChange} />
        <Layout.Content style={{ padding: '20px 50px' }}>
          <Routes>
            <Route path="/" element={
              <div className="site-layout-content">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <NewsCard articles={newsData} sort={sort} />
                  </Col>
                </Row>
              </div>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout.Content>
        <CustomFooter />
      </Layout>
    </Router>
  );
}

export default App;
