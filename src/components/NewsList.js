import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
const NewsListBlock = styled.div`
  boxk-size: border-box;
  padding-bottom: 3rem;
  width: 768px
    margin: 0 auto
    margin-top: 2rem
    @media screen and (max-width : 786px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //async 를 사용하는 함수를 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=b4c58623c1dc4bd1a454eaf12fb409ca`,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);
  //대기중
  if (loading) {
    return <NewsListBlock>대기중....</NewsListBlock>;
  }
  //아직 articles 값이 설정되지 않은 경우
  if (!articles) {
    return null;
  }
  //articles 값이 유효할때는
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
