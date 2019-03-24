import React from 'react';
import SearchItem from './SearchItem';

const SearchList = ({ videos, onVideoSelect }) => {
    const renderedList = videos.map((video, index) => {
        return <SearchItem key={index} onVideoSelect={onVideoSelect} video={video}/>;
    });

    return <>{renderedList}</>
}

export default SearchList;