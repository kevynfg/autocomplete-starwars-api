import React, { useEffect, useState } from 'react';

import './style.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const swapiURL = 'https://swapi.dev/api/people/?search=';

  useEffect(() => {
    async function getData(string) {
      const data = await fetch(swapiURL + string);
      const result = await data.json();
      console.log(result.results);
      setSearchResult(result.results);
    }
    getData(query);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQueryResult = (e) => {
    const searchResultId = e.target.id;
    setSelectedCharacter(searchResult[searchResultId]);
    setQuery([]);
  };

  const result = React.Children.toArray(
    searchResult.map((item, index) => (
      <li id={index} onClick={handleQueryResult}>
        {item.name}
      </li>
    ))
  );

  return (
    <form className="search__container">
      <h1>Search for star wars characters</h1>
      <div>
        <input type="text" onChange={handleInputChange} value={query} />
      </div>
      {query.length >= 1 && <ul>{result}</ul>}
      <div>
        {selectedCharacter ? (
          <div>
            <p>Name: {selectedCharacter.name}</p>
            <p>Altura: {selectedCharacter.height}</p>
            <p>Peso: {selectedCharacter.mass}</p>
          </div>
        ) : (
          <p>Theres no result.</p>
        )}
      </div>
    </form>
  );
}
