import React, { useState, useEffect } from 'react';
import youtube from '../api/youtube';
import styled, { css } from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import escapeChar from '../utils/escapeChar';
import CircularProgress from '@material-ui/core/CircularProgress';

const size = {
    small: 400,
    medium: 960,
    large: 1140
};

const media = Object.keys(size).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${size[label]}px) {
            ${css(...args)}
        }
    `;
    return acc;
}, {});

const HomeDiv = styled.div`
    margin: 80px 180px;
    display: grid;

    ${media.medium`
        margin: 80px 5px;
    `}
`;

const ListDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    grid-gap: 20px;
`;

const StyledCard = styled(Card)`
    && {
        width: 100%;
        cursor: pointer;
        box-shadow: none;
    }
`;

const StyledProgress = styled(CircularProgress)`
    && {
        align-self: center;
        justify-self: center;
        color: black;
    }
`;

const Img = styled.img`
    width: 100%;
`;

const StyledCardContent = styled(CardContent)`
    && {
        padding: 0 !important;
    }
`;

const Home = ({ onVideoSelect }) => {
    const [trendingVideos, setTrendingVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTopVideos = async () => {
        setLoading(true);
        const response = await youtube.get('/videos', {
            params: {
                chart: 'mostPopular',
                maxResults: 20,
                part: 'snippet,contentDetails,statistics'
            }
        });
        setTrendingVideos(response.data.items);
        setLoading(false);
    };

    useEffect(() => {
        fetchTopVideos();
    }, []);

    const renderedList = trendingVideos.map(video => {
        return (
            <StyledCard key={video.id}>
                <Img
                    src={video.snippet.thumbnails.high.url}
                    onClick={() => onVideoSelect(video)}
                />
                <StyledCardContent>
                    <h4
                        style={{
                            marginTop: '10px',
                            fontWeight: '100',
                            fontSize: '1rem'
                        }}
                        onClick={() => onVideoSelect(video)}
                    >
                        {video.snippet.title.length > 46
                            ? `${escapeChar(
                                  video.snippet.title.slice(0, 46)
                              )}...`
                            : escapeChar(video.snippet.title)}
                    </h4>
                </StyledCardContent>
            </StyledCard>
        );
    });

    if (loading) {
        return (
            <HomeDiv>
                <h2 style={{ fontWeight: '100' }}>Trending</h2>
                <StyledProgress />
            </HomeDiv>
        );
    } else {
        return (
            <HomeDiv>
                <h2 style={{ fontWeight: '100' }}>Trending</h2>
                <ListDiv>{renderedList}</ListDiv>
            </HomeDiv>
        );
    }
};

export default Home;
