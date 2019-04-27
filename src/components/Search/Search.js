import React from 'react';
import SearchList from './SearchList';
import styled, { css } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const Div = styled.div`
    width: 70%;
    margin: 80px auto;
    ${media.medium`
        width: 100%;
    `}
`;

const StyledProgress = styled(CircularProgress)`
    && {
        align-self: center;
        justify-self: center;
        color: black;
        margin: 100px 0;
    }
`;


const Search = ({ videos, onVideoSelect, fetchNextVideos, nextVideos }) => {
    return (
        <Div>
            <InfiniteScroll
                style={{overflow: 'hidden'}}
                dataLength={videos.length}
                next={fetchNextVideos}
                hasMore={nextVideos !== null ? true : false}
                loader={<div style={{display: 'grid'}}>
                    <StyledProgress />
                </div>}
                endMessage={
                    <div style={{marginBottom: '40px'}}>
                    </div>
                }
                >
                <SearchList onVideoSelect={onVideoSelect} videos={videos} fontSize={'1.4'}/>
            </InfiniteScroll>
        </Div>
    );
}

export default Search;