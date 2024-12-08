import React, { useState } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";

import "./App.css";

const App = () => {
    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState("");

    const handleSearch = async (query) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/posts/search?query=${query}`
            );
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleFilter = (selectedFilter) => {
        setFilter(selectedFilter);
        // Add filtering logic here if needed
    };

    return (
        <div className="app">
            <SearchBox onSearch={handleSearch} />
           
            <SearchResults results={results} />
        </div>
    );
};

export default App;
