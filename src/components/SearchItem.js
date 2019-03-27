import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled, { css } from 'styled-components';
import escapeChar from '../utils/escapeChar';


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


const NewCard = styled(Card)`
    && {
        margin: 2px 0 0 0;
        width: 100%;
    }
    &&:hover {
        background-color: #efefef;
    }
`;

const Content = styled(CardContent)`
    && {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 10px;
        align-items: center;

        ${media.medium`
        grid-template-columns: 1fr;
        `} 
    }
`;


const Image = styled.img`
    && {
        width: 100%;
    }
`;

const Div = styled.div`
    display: grid;
    justify-self: center;
    justify-items: center;
    cursor: pointer;
    
`;

const SearchItem = ({ video, onVideoSelect }) => {
    return (
        <Div onClick={() => onVideoSelect(video)}>
            <NewCard>
                <Content>
                    <Image
                        src={video.snippet.thumbnails.high.url}
                    />
                    <div>
                        <Typography component="h6" variant="h6">
                            {escapeChar(video.snippet.title)}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {video.snippet.channelTitle}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {video.snippet.description}
                        </Typography>
                    </div>
                </Content>
            </NewCard>
        </Div>
    );
}


export default SearchItem;