import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import axios from 'axios';

export default function App() {

  const [data, setData] = useState([]); // declare state
  const [loading, setLoading] = useState(true); // declare state
  const [query, setQuery] = useState('cats'); // declare new state



  // fetching data with axios when component mounts
  useEffect( () =>
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=8Zc8vruQ8HShTsmKIbnrtNrDkkkZOwcw&limit=20`)
    .then(response => {
      setData(response.data.data)
      setLoading(false)
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    }), [query]);

  // update query state
  const performSearch = (value) => setQuery(value);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={performSearch}/>
          </div>
        </div>
        <div className="main-content">
        { (loading) ? <p> Loading... </p> : <GifList data={data}/> }
        </div>
      </div>
    );
}
