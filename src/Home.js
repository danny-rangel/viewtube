import React, { useState, useEffect } from 'react';
import youtube from './youtube';
import styled, { css } from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import escapeChar from './escapeChar';

const size = {
    small: 400,
    medium: 960,
    large: 1140
}

const media = Object.keys(size).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${size[label]}px) {
            ${css(...args)}
        }
    `
    return acc;
}, {});

const HomeDiv = styled.div`
    margin: 20px 180px;

    ${media.medium`
        margin: 20px 5px;
    `}
`;

const ListDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 20px;
`;

const StyledCard = styled(Card)`
    && {
        width: 100%;
        cursor: pointer;
    }
`;

const Img = styled.img`
    width: 100%;
`;


const Home = ({ onVideoSelect }) => {

  const [trendingVideos, setTrendingVideos] = useState([]);

  const fetchTopVideos = async () => {
      const response = await youtube.get('/videos', {
          params: {
              chart: 'mostPopular',
              maxResults: 20,
              part: 'snippet,contentDetails,statistics'
          }
      });
      setTrendingVideos(response.data.items);
  }

  useEffect(() => {
    fetchTopVideos();
  }, [])

  const renderedList = trendingVideos.map(video => {
      return (
        <StyledCard key={video.id} onClick={() => onVideoSelect(video)} >
            <Img
                src={video.snippet.thumbnails.standard.url}
            />
            <CardContent>
                <h4 style={{margin: 0, fontWeight: '100'}}>
                    {escapeChar(video.snippet.title)}
                </h4>
            </CardContent>
        </StyledCard>
      );
  })

  return (
      <HomeDiv>
        <h2 style={{fontWeight: '100'}}>Trending</h2>
        <ListDiv>
            {renderedList}
        </ListDiv>
      </HomeDiv>
  );
}

export default Home;
