import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState("love");
  const [tracks, setTracks] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const getTracks = async (searchKeyword) => {
    setLoading(true);
    let data = await fetch(`https://v1.nocodeapi.com/webhdbw/spotify/BOLunMYXCDAGnAyv/search?q=${searchKeyword}&type=track&offset=0&limit=10`);
    let converted = await data.json();
    console.log(converted.tracks.items);
    setTracks(converted.tracks.items);
    setLoading(false);
  };

  useEffect(() => {
    getTracks(keyword);
  }, [keyword]);

  const handleSearch = () => {
    setKeyword(searchValue);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">V-music</a>
          <label>
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className='ps-50% me-5'
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" onClick={handleSearch}>
              Search
            </button>
          </label>
        </div>
      </nav>

      <div className="container">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid-container">
            {tracks.map((track) => (
              <div className="card" key={track.id}>
                <img src={track.album.images[0].url} className="card-img-top" alt={track.name} />
                <div className="card-body">
                  <h5 className="card-title">{track.name}</h5>
                  <p className="card-text">{track.artists[0].name}</p>
                  <p className="card-text">Release Date: {track.album.release_date}</p>
                  <audio src={track.preview_url} controls className='w-100'></audio>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
