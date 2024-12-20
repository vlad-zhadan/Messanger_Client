import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';


const MessageSearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        if (onSearch && typeof onSearch === 'function') {
            onSearch(searchText);
        }
    };

    return (
        <div className="searchBar">
            <input
                type="text"
                placeholder="Search messages..."
                value={searchText}
                onChange={handleInputChange}
                className="searchInput"
            />
            <button onClick={handleSearch} className="searchButton">
                🔍
            </button>
        </div>
    );
};

export default observer(MessageSearchBar);
