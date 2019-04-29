import React from 'react';
import SearchItem from './SearchItem';

const SearchList = ({ videos, onVideoSelect, fontSize }) => {

    const renderedList = videos.map((video, index) => {
        return <SearchItem key={index} onVideoSelect={onVideoSelect} video={video} fontSize={fontSize} />;
    });

    if (videos.length === 0) {
        return (
            <div style={{margin: '100px auto', textAlign: 'center'}}>
                <h2>No results found</h2>
            </div>
        );
    } else {
        return <>{renderedList}</>;
    }

    
}

export default SearchList;