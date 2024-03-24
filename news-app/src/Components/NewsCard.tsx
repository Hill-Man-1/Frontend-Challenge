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

interface ImageSize {
  width: number;
  height: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ articles, sort }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const itemsPerPage = 9;
  const imageSize: ImageSize = { width: 400, height: 250 };
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [sortedArticles, setSortedArticles] = useState<NewsArticle[]>([]);
  

  useEffect(() => {
    setLoading(true);
    if (sort === 'newest') {
      setSortedArticles([...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
    } else {
      setSortedArticles([...articles].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()));
    }
    setTimeout(() => setLoading(false), 2000); // Simulate data loading delay
  }, [articles, sort]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 1590);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to the top immediately when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true); // Then, set loading true to show the loading indicator
    // Simulate a loading period before showing the content
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={loadingImageUrl} alt="Loading..." className='loadingImage' style={{ maxWidth: '100%' }} />
            <img src={loadingText} alt="Loading..." style={{ maxWidth: '100%' }} />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {currentArticles.map((article, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={8}>
                <Card
                  className="news-card"
                  style={{ marginTop: '80px', marginBottom: '20px', height: '100%' }}
                  bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  title={article.title}
                  cover={
                    <img
                      alt={article.title}
                      src={article.urlToImage}
                      style={{ marginTop: '20px', width: `${imageSize.width}px`, height: `${imageSize.height}px`, objectFit: 'cover' }}
                    />
                  }
                >
                  <p>{article.description}</p>
                  <p>{formatPublishDate(article.publishedAt)}</p>
                  <p>Author: {article.author}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            style={{ textAlign: 'center', marginTop: '120px' }}
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
                    style={{ position: 'fixed', bottom: '50px', right: '50px', zIndex: 1000 }}
                />
            )}
        </>
    );
}

export default NewsCard;
