import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import youtube from '../../api/youtube';
import VideoPlayerDetails from './VideoPlayerDetails';
import SearchList from '../Search/SearchList';
import CommentList from '../Comments/CommentList';

import Divider from '@material-ui/core/Divider';
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


const MainDiv = styled.div`
    display: grid; 
    padding-top: 100px;
    grid-template-columns: 4.5fr 2fr;

    ${media.medium`
    grid-template-columns: 1fr;
        grid-template-areas:
            "playerSection"
            "listSection";
        
    `} 
`;


const PlayerSectionDiv = styled.div`
    margin: 0 auto; 
    display: grid;
    grid-template-rows: fit-content(500px) 2px 150px 2px 1fr;
    grid-gap: 10px;
    width: 90%;
    
    grid-template-areas: 
        "player"
        "divider"
        "content"
        "divider2"
        "comments"
    ;

    ${media.medium`
        display: block;
        width: 95%;
        grid-area: playerSection;
    `} 
`;

const ListSectionDiv = styled.div`
    padding-right: 10px;
    ${media.medium`
        
    grid-area: listSection;
    `} 
`;

const PlayerDiv = styled.div`
    position: relative;
    grid-area: player;
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
    display: block;
`;


const VideoPlayer = ({ selectedVideo, match, onVideoSelect }) => {

    const [video, setVideo] = useState(null);
    const [videoSource, setVideoSource] = useState("");
    const [channelName, setChannelName] = useState("");
    const [channelAvatar, setChannelAvatar] = useState("");
    const [comments, setComments] = useState([]);
    const [recommended, setRecommended] = useState([]);

    const fetchRecommended = async id => {
        const response = await youtube.get('/search', {
            params: {
                relatedToVideoId: id,
                part: 'snippet',
                maxResults: 20,
                type: 'video'
            }
        });
        setRecommended(response.data.items);
    }

    const fetchComments = async id => {
        try {
            const response = await youtube.get('/commentThreads', {
                params: {
                    videoId: id,
                    part: 'snippet',
                    maxResults: 30
                }
            });
            setComments(response.data.items);
        } catch(error) {
            console.log(error);
        }
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
        setVideoSource(`https://www.youtube.com/embed/${match.params.id}?autoplay=1`);
        setVideo(response.data.items[0]);
        fetchChannel(response.data.items[0].snippet.channelId);
        fetchComments(id);
        fetchRecommended(id);
    }

    useEffect(() => {
        fetchVideo(match.params.id);
    }, [selectedVideo, match.params.id])

        return (
            <>
                {video ? (
                <MainDiv>
                    <PlayerSectionDiv>
                        <PlayerDiv>
                            <Player 
                                src={videoSource} 
                                allow="fullscreen" 
                            />
                        </PlayerDiv>
                        <Divider style={{gridArea: 'divider'}}/>
                        <VideoPlayerDetails 
                            channelAvatar={channelAvatar} 
                            channelName={channelName}
                            video={video} 
                        />
                        <Divider style={{gridArea: 'divider2'}}/>
                        <CommentList 
                            video={video} 
                            comments={comments} 
                            style={{gridArea: 'comments'}}
                        />
                    </PlayerSectionDiv>
                    <ListSectionDiv>
                        <SearchList 
                            videos={recommended} 
                            onVideoSelect={onVideoSelect}
                            fontSize={'1'}
                        />
                    </ListSectionDiv>
                </MainDiv>
                ): (
                <div>
                    <CircularProgress />
                </div>
                )}
            </>
        );
}

export default VideoPlayer;