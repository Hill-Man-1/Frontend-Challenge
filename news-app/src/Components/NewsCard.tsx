import React, { useState, useEffect } from 'react';
import { Card, Pagination, Row, Col, Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import loadingImageUrl from '../Assets/LOADING.png';
import loadingText from '../Assets/LOADING2.png';
import placeholderImage from '../Assets/404-Image-Not-Found.webp'
import { motion } from 'framer-motion';
import '../Style/NewsCard.css';

interface NewsArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null; 
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
    if (articles.length > 0) {
      const sorted = [...articles].sort((a, b) => {
        return sort === 'newest'
          ? new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          : new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      });
      setSortedArticles(sorted);
    } else {
      setSortedArticles([]);
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderImage;
  };

  const renderImage = (urlToImage: string | null, title: string) => {
    if (urlToImage) {
      return (
        <img
          className="news-card-cover-img"
          alt={title}
          src={urlToImage}
          onError={handleImageError}
        />
      );
    } else {
      return <img className="news-card-cover-img" alt={title} src={placeholderImage} />;
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = sortedArticles.slice(startIndex, endIndex);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  // Define motion variants for individual articles
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      {loading ? (
      <div className="loading-container">
        <img src={loadingImageUrl} alt="Loading..." className="loading-image" />
        <img src={loadingText} alt="Loading..." />
      </div>
    ) : (
      // Use motion.div for animating the container of the articles
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="news-cards-animation-container"
      >
        <Row gutter={[16, 16]}>
          {currentArticles.map((article, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={8}>
              {/* Use motion.div for animating each card */}
              <motion.div variants={itemVariants}>
                <Card className="news-card-container" key={article.url}>
                  <h3 className="news-card-title">{article.title}</h3>
                  {renderImage(article.urlToImage, article.title)}
                  <div className="news-card-body">
                    <p>{article.description}</p>
                    <p>{formatPublishDate(article.publishedAt)}</p>
                    <p>Author: {article.author}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link">
                      Read more
                    </a>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    )}
    <Pagination
      className="pagination-container"
      showSizeChanger={false}
      current={currentPage}
      pageSize={itemsPerPage}
      total={sortedArticles.length}
      onChange={handlePageChange}
    />
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
)};

export default NewsCard;