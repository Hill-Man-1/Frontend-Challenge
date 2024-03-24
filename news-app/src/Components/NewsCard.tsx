import React, { useState, useEffect } from 'react';
import { Card, Pagination, Row, Col, Button} from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import loadingImageUrl from '../Assets/LOADING.png';
import loadingText from '../Assets/LOADING2.png'
import '../Style/NewsCard.css'


interface NewsArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

interface NewsCardProps {
  articles: NewsArticle[];
  sort: 'newest' | 'oldest';
}

const NewsCard: React.FC<NewsCardProps> = ({ articles, sort }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const itemsPerPage = 9;
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [sortedArticles, setSortedArticles] = useState<NewsArticle[]>([]);
  

  useEffect(() => {
    setLoading(true);
    if (sort === 'newest') {
      setSortedArticles([...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
    } else {
      setSortedArticles([...articles].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()));
    }
    setTimeout(() => setLoading(false), 2000);
  }, [articles, sort]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 1590);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPublishDate = (publishedAt: string) => {
    return formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = sortedArticles.slice(startIndex, endIndex);

  return (
    <>
      {loading ? (
        <div className="loading-container">
            <img src={loadingImageUrl} alt="Loading..." className="loading-image" />
            <img src={loadingText} alt="Loading..."/>
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {currentArticles.map((article, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={8}>
                <Card className="news-card-container">
                  <h3 className="news-card-title">{article.title}</h3>
                  <img
                    className="news-card-cover-img"
                    alt={article.title}
                    src={article.urlToImage}
                  />
                  <div className="news-card-body">
                    <p>{article.description}</p>
                    <p>{formatPublishDate(article.publishedAt)}</p>
                    <p>Author: {article.author}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link">
                      Read more
                    </a>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            className="pagination-container"
            showSizeChanger={false}
            current={currentPage}
            pageSize={itemsPerPage}
            total={sortedArticles.length}
            onChange={handlePageChange}
          />
        </>
      )}
      {showScrollButton && (
          <Button
              type="primary"
              shape="circle"
              icon={<ArrowUpOutlined />}
              size="large"
              onClick={handleScrollToTop}
              className="scroll-to-top-btn"
          />
      )}
    </>
  );
}

export default NewsCard;