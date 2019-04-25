import React, { useState } from 'react';
import { Router, Route} from "react-router-dom";
import youtube from '../api/youtube';
import history from '../utils/history';
import ScrollToTop from '../utils/ScrollToTop';
import Search from './Search/Search';
import './App.css';
import Header from './Header';
import VideoPlayer from './Player/VideoPlayer';
import Home from './Home';
// import Sidebar from './Sidebar';


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
          <ScrollToTop>
          <Header onTermSubmit={onTermSubmit}/>
          {/* <Sidebar onTermSubmit={onTermSubmit}/> */}
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
              render={(props) => <VideoPlayer {...props} selectedVideo={selectedVideo} onVideoSelect={onVideoSelect} />}
            />  
          </ScrollToTop>
        </Router>  
      </>
  );
}

export default App;
