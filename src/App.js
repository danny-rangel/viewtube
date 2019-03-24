import React, { useState } from 'react';
import { Router, Route} from "react-router-dom";
import youtube from './youtube';
import history from './history';

import Search from './Search';
import './App.css';

import Header from './Header';
import VideoPlayer from './VideoPlayer';
import Home from './Home';


const App = () => {

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});

  const onTermSubmit = async term => {
      const response = await youtube.get('/search', {
          params: {
              q: term,
              maxResults: 20,
              part: 'snippet',
              type: 'video'
          }
      });
      setVideos(response.data.items);
      history.push('/search');
  }

  const onVideoSelect = video => {
    setSelectedVideo(video);
    history.push(`/watch/${video.id.videoId || video.id}`);
  }

  return (
      <>
        <Router history={history} >
          <Header onTermSubmit={onTermSubmit}/>
            <Route 
              exact path="/" 
              render={() => <Home onVideoSelect={onVideoSelect} />}
            />
            <Route 
              exact path="/search" 
              render={() => <Search onVideoSelect={onVideoSelect} videos={videos} />}
            />
            <Route 
              path="/watch/:id" 
              render={(props) => <VideoPlayer {...props} selectedVideo={selectedVideo} />}
            />  
        </Router>  
      </>
  );
}

export default App;
