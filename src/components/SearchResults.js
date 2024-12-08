import React from "react";

const SearchResults = ({ results }) => {
    return (
        <div className="search-results">
            {results.map((post) => (
                <div key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
