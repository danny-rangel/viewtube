import React from 'react';
import SearchList from './SearchList';
import styled, { css } from 'styled-components';

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
    margin: 20px auto;
    ${media.medium`
        width: 100%;
    `}
`;

const Search = ({ videos, onVideoSelect }) => {
    return (
        <Div>
            <SearchList onVideoSelect={onVideoSelect} videos={videos} />
        </Div>
    );
}

export default Search;