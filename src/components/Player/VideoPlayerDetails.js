import React from 'react';
import styled, { css } from 'styled-components';
import escapeChar from '../../utils/escapeChar';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';

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

const ContentDiv = styled.div`
    display: grid;
    grid-area: content;
    grid-gap: 10px;
    grid-template-areas: 
        "title"
        "subCount"
        "divider"
        "channelInfo"
        "description"
        "divider2"
        ;
`;

const AVI = styled.img`
    border-radius: 50%;
    width: 50px;
    margin: 0 5px 0 0;
`;

const TitleText = styled.h2`
    font-weight: 100;
    margin: 5px 0 0 0;
    font-size: 1.4rem;

    ${media.medium`
        font-size: 1.2rem;
    `} 
`;

const SubCountText = styled.h2`
    font-weight: 100;
    margin: 0;
    font-size: 1.2rem;
    color: gray;

    ${media.medium`
        font-size: 1rem;
    `} 
`;

const ChannelNameText = styled.h3`
    margin: 0;
    align-self: center;
    font-weight: bolder;
    color: black;
    font-size: 0.9rem;

`;

const DateText = styled.h4`
    margin: 0;
    align-self: center;å
    font-weight: 100;
    font-size: 0.9rem;
    color: gray;

    ${media.medium`
        font-size: 0.8rem;
    `} 
`;

const DescText = styled.p`
    
    align-self: center;
    font-weight: 100;
    font-size: 0.8rem;

    ${media.medium`
        font-size: 0.8rem;
    `} 
`;

const VideoPlayerDetails = ({ video, channelName, channelAvatar }) => {

    return (
        <ContentDiv>        
            <div style={{gridArea: 'title'}}>
                <TitleText>{escapeChar(video.snippet.title)}</TitleText>
            </div>
            <div style={{gridArea: 'subCount'}}>
                <SubCountText>{`${video.statistics.viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} views`}</SubCountText>
            </div>
            <Divider style={{gridArea: 'divider'}}/>
            <div style={{margin: 0, alignItems: 'center', gridArea: 'channelInfo'}}>
                <AVI style={{alignSelf: 'center', justifySelf: 'center'}} src={channelAvatar} />
                <div style={{margin: 0, display: 'inline-block', alignItems: 'center'}}>
                    <ChannelNameText>{channelName}</ChannelNameText>
                    <DateText>{`Published on ${moment(video.snippet.publishedAt).format('MMMM DD, YYYY')}`}</DateText>
                </div>
            </div>
            <div style={{gridArea: 'description'}}>
                <DescText>{video.snippet.description.length > 100 ? `${video.snippet.description.slice(0, 100)}...` : video.snippet.description}</DescText>
            </div>
            <Divider style={{gridArea: 'divider2'}}/>
        </ContentDiv>
    );
}

export default VideoPlayerDetails;