import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import youtube from './youtube';
import formatDate from 'date-fns/format';
import CommentList from './CommentList';
import Divider from '@material-ui/core/Divider';
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



const Div = styled.div`
    margin: 60px auto 0; 
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-gap: 10px;
    width: 60%;

    ${media.medium`
        display: block;
        width: 95%;
    `} 
`;

const PlayerDiv = styled.div`
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 25px;
    height: 0;
    overflow: hidden;
`;

const Player = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const HeaderContentDiv = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
`;

const ContentDiv = styled.div`
    display: grid;
    grid-template-rows: 1fr 2fr;
`;

const AVI = styled.img`
    border-radius: 50%;
    width: 50px;
    margin: 0 5px 0 0;
`;

const VideoPlayer = ({ selectedVideo, match }) => {

    const [video, setVideo] = useState(null);
    const [videoSource, setVideoSource] = useState("");
    const [channelName, setChannelName] = useState("");
    const [channelAvatar, setChannelAvatar] = useState("");
    const [comments, setComments] = useState([]);
    const [recommended, setRecommended] = useState([]);

    const fetchRecommended = async id => {
        const response = await youtube.get('/activities', {
            params: {
                channelId: id,
                part: 'snippet, contentDetails',
                maxResults: 20
            }
        });
        setRecommended(response.data.items);
    }

    const fetchComments = async id => {
        const response = await youtube.get('/commentThreads', {
            params: {
                videoId: id,
                part: 'snippet',
                maxResults: 30
            }
        });
        setComments(response.data.items);
    }

    const fetchChannel = async id => {
        const response = await youtube.get('/channels', {
            params: {
                id: id,
                part: 'snippet,contentDetails,statistics'
            }
        });
        setChannelName(response.data.items[0].snippet.title);
        setChannelAvatar(response.data.items[0].snippet.thumbnails.medium.url);
    }

    const fetchVideo = async id => {
        const response = await youtube.get('/videos', {
            params: {
                id: id,
                part: 'snippet,contentDetails,statistics'
            }
        });
        setVideoSource(`https://www.youtube.com/embed/${match.params.id}`);
        setVideo(response.data.items[0]);
        fetchChannel(response.data.items[0].snippet.channelId);
        fetchComments(id);
        fetchRecommended(response.data.items[0].snippet.channelId);
    }

    useEffect(() => {
        fetchVideo(match.params.id);
    }, [selectedVideo, match.params.id])

    return (
        <>
            {video ? (
            <Div>
                <PlayerDiv>
                    <Player src={`${videoSource}?autoplay=1`} allow="fullscreen" ></Player>
                </PlayerDiv>
                <Divider />
                <HeaderContentDiv>
                    <h2>{escapeChar(video.snippet.title)}</h2>
                    <div style={{justifySelf: 'end'}}>
                        <h2>{video.statistics.viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                    </div>
                </HeaderContentDiv>
                <ContentDiv>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr', width: '50%'}}>
                        <AVI style={{alignSelf: 'center', justifySelf: 'center'}} src={channelAvatar} />
                        <div style={{margin: 0, display: 'inline-block', alignSelf: 'center'}}>
                            <h3 style={{margin: 0, alignSelf: 'center'}}>{channelName}</h3>
                            <h4 style={{margin: 0, alignSelf: 'center'}}>{`Published on ${formatDate(video.snippet.publishedAt, 'MMMM DD, YYYY')}`}</h4>
                        </div>
                    </div>
                        
                    <p>{video.snippet.description.length > 300 ? `${video.snippet.description.slice(0, 300)}...` : video.snippet.description}</p>
                </ContentDiv>
                <Divider />
                <CommentList video={video} comments={comments}/>
            </Div>
            ): (
            <div>Loading ...</div>
            )}
        </>
    );
}

export default VideoPlayer;