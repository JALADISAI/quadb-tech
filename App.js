import React, { useState, useEffect } from "react";

const App = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const showDetails = (show) => {
    setSelectedShow(show);
  };

  const closeDetails = () => {
    setSelectedShow(null);
  };

  return (
    <div>
      <h1>WELCOME TO QUADB TECH</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.show.id}>
            {show.show.name}
            <button onClick={() => showDetails(show)}>Show Details</button>
          </li>
        ))}
      </ul>

      {selectedShow && (
        <div>
          <h2>Show Details</h2>
          <button onClick={closeDetails}>Close Details</button>
          <p>Name: {selectedShow.show.name}</p>
          <p>Summary: {selectedShow.show.summary}</p>
        </div>
      )}
    </div>
  );
};

export default App;
