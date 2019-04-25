import React from 'react';
import SearchItem from './SearchItem';

const SearchList = ({ videos, onVideoSelect, fontSize }) => {
    const renderedList = videos.map((video, index) => {
        return <SearchItem key={index} onVideoSelect={onVideoSelect} video={video} fontSize={fontSize} />;
    });

    return <>{renderedList}</>
}

export default SearchList;