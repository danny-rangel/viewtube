import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import youtube from '../../api/youtube';
import VideoPlayerDetails from './VideoPlayerDetails';
import SearchList from '../Search/SearchList';
import CommentList from '../Comments/CommentList';
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


const MainDiv = styled.div`
    display: grid; 
    padding-top: 100px;
    grid-gap: 10px;
    grid-template-columns: 2.2fr 1fr;
    grid-template-rows: fit-content(800px) 1fr;
    grid-template-areas: "playerdiv listdiv"
                         "comments  listdiv";

    ${media.medium`
        grid-template-columns: 1fr;
        grid-template-areas:
            "playerdiv"
            "listdiv"
            "comments";
        
    `} 
`;


const PlayerSectionDiv = styled.div`
    margin: 0 auto; 
    display: grid;
    grid-template-rows: fit-content(500px) 0.5fr;
    grid-area: playerdiv;
    grid-gap: 10px;
    width: 90%;
    
    grid-template-areas: 
        "player"
        "content"
    ;

    ${media.medium`
        display: block;
        width: 95%;
    `} 
`;

const ListSectionDiv = styled.div`
    padding-right: 10px;
    grid-area: listdiv;

    ${media.medium`

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

const StyledProgress = styled(CircularProgress)`
    && {
        align-self: center;
        justify-self: center;
        color: black;
        margin: 100px 0;
    }
`;


const VideoPlayer = ({ selectedVideo, match, onVideoSelect }) => {

    const [video, setVideo] = useState(null);
    const [videoSource, setVideoSource] = useState("");
    const [channelName, setChannelName] = useState("");
    const [channelAvatar, setChannelAvatar] = useState("");
    const [comments, setComments] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [nextComments, setNextComments] = useState(null);

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
            setNextComments(response.data.nextPageToken);
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


    const fetchNextComments = async id => {
        
        try {
            const response = await youtube.get('/commentThreads', {
                params: {
                    videoId: id,
                    part: 'snippet',
                    maxResults: 30,
                    pageToken: nextComments
                }
            });
            setComments([...comments, ...response.data.items]);
            setNextComments(response.data.nextPageToken || null);
        } catch(error) {
            console.log(error);
        }
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
                        
                        <VideoPlayerDetails 
                            channelAvatar={channelAvatar} 
                            channelName={channelName}
                            video={video} 
                        />
                        
                    </PlayerSectionDiv>

                    <InfiniteScroll
                            style={{overflow: 'hidden'}}
                            dataLength={comments.length}
                            next={() => fetchNextComments(match.params.id)}
                            hasMore={nextComments !== null ? true : false}
                            loader={<div style={{display: 'grid'}}>
                                <StyledProgress />
                            </div>}
                            endMessage={
                                <div style={{marginBottom: '40px'}}>
                                </div>
                            }
                            >
                            <CommentList 
                                video={video} 
                                comments={comments} 
                                style={{gridArea: 'comments'}}
                            />
                    </InfiniteScroll>

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