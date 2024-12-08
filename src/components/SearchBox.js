import React, { useState } from "react";
import "./SearchBox.css"; // You can style your components using a separate CSS file.

const BlogSearch = () => {
  // Sample Blog Data (replace it with your real data)
  const blogPosts = [
    {
      id: 1,
      title: "Introduction to Spring Boot",
      content:
        "Spring Boot is a framework for building Java applications quickly and easily. It simplifies configuration and provides a set of tools to improve productivity.",
      author: "John Doe",
      tags: "Spring Boot, Java",
      createdAt: "2024-12-01T10:00:00",
    },
    {
      id: 2,
      title: "Advanced Spring Boot Features",
      content:
        "In this article, we explore advanced features of Spring Boot, such as custom error pages, async processing, and integrating with messaging systems.",
      author: "Jane Smith",
      tags: "Spring Boot, Advanced",
      createdAt: "2024-12-03T14:30:00",
    },
    {
      id: 3,
      title: "Learning React",
      content:
        "React is a popular JavaScript library for building user interfaces. It allows developers to create dynamic, single-page applications with reusable components.",
      author: "Alice Lee",
      tags: "React, JavaScript",
      createdAt: "2024-12-05T08:45:00",
    },
    {
      id: 4,
      title: "Spring Boot Security",
      content:
        "Spring Security is a powerful framework for authentication and authorization. It provides many features like OAuth2 support, security filters, and more.",
      author: "Bob Brown",
      tags: "Spring Boot, Security",
      createdAt: "2024-12-07T12:00:00",
    },
  ];

  const [query, setQuery] = useState(""); // Holds the search query entered by the user
  const [filteredPosts, setFilteredPosts] = useState([]); // Holds the filtered search results
  const [showSuggestions, setShowSuggestions] = useState(false); // Controls whether suggestions are shown

  // Handle the search logic after the search button is clicked
  const handleSearch = () => {
    // Only filter if the query length is 10 or more characters
    if (query.length >= 4) {
      const filtered = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered); // Update the filtered posts
      setShowSuggestions(false); // Hide suggestions after search
    } else {
      setFilteredPosts([]); // Clear filtered posts if query is less than 4
      setShowSuggestions(true); // Show suggestions when query is short
    }
  };

  // Filter blog posts for suggestions when query is short (less than 4 characters)
  const getSuggestions = () => {
    return blogPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Blog Search</h1>

      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query as the user types
          placeholder="Search blog posts..."
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Show search suggestions if query is short (less than 4 characters) */}
      {showSuggestions && query.length >= 1 && query.length < 4 && (
        <div className="suggestions-box">
          <h3>Suggestions:</h3>
          {getSuggestions().length === 0 ? (
            <p>No suggestions found</p>
          ) : (
            getSuggestions().map((suggestion) => (
              <div key={suggestion.id} className="suggestion-item">
                <h4>{suggestion.title}</h4>
                <p>{suggestion.content.substring(0, 100)}...</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Show search results after the search button is clicked */}
      {filteredPosts.length > 0 && (
        <div className="blog-list">
          {filteredPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 150)}...</p>
              <p>
                <strong>Author:</strong> {post.author}
              </p>
              <p>
                <strong>Tags:</strong> {post.tags}
              </p>
              <p>
                <strong>Published on:</strong>{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Display a message if no results are found after search */}
      {filteredPosts.length === 0 && query.length >= 10 && (
        <p className="no-results">No blog posts found</p>
      )}
    </div>
  );
};

export default BlogSearch;
