import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from './utils';

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const [selectedResolution, setSelectedResolution] = useState('720p');

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const handleResolutionChange = (e) => {
    setSelectedResolution(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    

    const options = {
      method: 'get',
      url: 'https://www.youtube.com/watch?v=_N6vSc_mT6I',
      headers: {
        'X-RapidAPI-Key': '925324cd29mshc27a3ab1ad8dfe8p1b0b36jsncdd13be3c98b',
        'X-RapidAPI-Host': 'youtube-downloader-videos.p.rapidapi.com'
      },
    
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';

  }

  return (
    <div className="app">
      <span className="logo">youtube video downloader</span>
      <section className="content">
        <h1 className="content_title">YouTube video</h1>
       

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="Paste a Youtube video URL link..." className="form_input" type="text" />
          <button type="submit" className="form_button">Search</button>
        </form>

        <div>
        <span>
      <label htmlFor="format" >Format:</label>
      <select id="format" value={selectedFormat} 
      className="form-select"onChange={handleFormatChange}>
        <option value="mp4">MP4</option>
        <option value="flv">FLV</option>
      </select>
      </span>
      
      <span>
      <label htmlFor="resolution">Resolution:</label>
      <select
        className="form-select"
        id="resolution"
        value={selectedResolution}
        onChange={handleResolutionChange}
      >
        <option value="720p">720p</option>
        <option value="480p">480p</option>
        <option value="360p">360p</option>
      </select>
      </span>
        </div>
      <br />

        {urlResult ? <a href="" className="download_btn">Download video</a> : ''}
        
      </section>
    </div>
  )
}

export default App