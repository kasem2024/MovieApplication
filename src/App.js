import { AiFillPlayCircle } from 'react-icons/ai'
import { BsFillArrowDownSquareFill } from 'react-icons/bs';
import {PiStopCircleFill} from 'react-icons/pi'
import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import RenderMovies from './components/RenderMovies';
import { useRef } from 'react';
import YouTube from 'react-youtube'
import { Search } from 'lucide-react';


function App() {

  const MOVIE_API = "https://api.themoviedb.org/3/"
  const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "discover/movie"
     
  const background_path = 'https://image.tmdb.org/t/p/original';
  // const newImgAs = 'https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [selectmovie, setSelectmovie] = useState([]);
  const [isclick, setIsclick] = useState(false);
  const ref = useRef(null);
  const [isplay, setIsplay] = useState(false);
  

  const fetchdata = async () => {

  const {data:{results}} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
      params: {
      api_key: '68ea981acdd9c6d1b2860ff1f9fa1aeb',
      query: searchKey
      }
  })
  // console.log(results)
    setMovies(results)
    await firstmovie(results[0])
  }
  const fetchmovie = async (id) => {
    const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: '68ea981acdd9c6d1b2860ff1f9fa1aeb',
        append_to_response:'videos'
        
      }
    })
    return data
  }
    useEffect( () => {
      fetchdata()
    },[])
  const handleSubmit = (e)=>{
    e.preventDefault()
    fetchdata(searchKey)
  }
  const firstmovie = async(movie)=> {
    const newdatatodisplay = await fetchmovie(movie.id)
    if (newdatatodisplay) {
      setSelectmovie(newdatatodisplay)
    }
    console.log(newdatatodisplay)
      //  if (data.videos && data.videos.results) {
      //       const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
      //       setTrailer(trailer ? trailer : data.videos.results[0])
      //  
      if (newdatatodisplay.videos && newdatatodisplay.videos.results){
        const trailer = newdatatodisplay.videos.results.find(vid => vid.name === "Official Trailer")   
      setTrailer(trailer ? trailer : {})
      }
  }
    // console.log(selectmovie)
    const handleClick = async(movie) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsplay(false)
    const newdatatodisplay = await fetchmovie(movie.id)
      //  console.log(newdatatodisplay)
      if (newdatatodisplay) {
      setSelectmovie(newdatatodisplay)
    }
    if (newdatatodisplay.videos && newdatatodisplay.videos.results){
      const trailer = newdatatodisplay.videos.results.find(vid => vid.name === "Official Trailer")
      setTrailer(trailer ? trailer :  {})
      } 
    };
  console.log(selectmovie)
  console.log(trailer)
  const opts = {
      playerVars: {
      autoplay: 1,
      
      },
    };
  return (
    
      <div className='app'>
        <header  >
          <h1>Movies <span className='user'>Now</span></h1>
          <form onSubmit={handleSubmit} className='search'> 
            <input
              type='text'
              required
              onChange={(e)=>setSearchKey(e.target.value)}
              className='searchInput'
            />
            <button type='submit'><Search /></button>
          </form>
        </header>
      <section ref={ref}>
        <div className='heroContainer' style={{backgroundImage:`url(${background_path}${selectmovie.backdrop_path})`,backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
          height: '500px',
        }} >
          {/* {console.log(selectmovie)} */}
          {isplay ? <>
            <div className='videoPlayer'> {selectmovie.videos ? <YouTube videoId={trailer.key} opts={opts} /> : null} </div>

            <button title='close the video ' className='closebtn' onClick={()=>setIsplay(!isplay)}>
                <PiStopCircleFill/>
            </button>
          </> : null} 
          
          <button className='playicon' onClick={()=>setIsplay(!isplay)}><AiFillPlayCircle/></button>
          <div className="maintitle">
            {selectmovie.title}
          </div>
          <div className="overview">
            {selectmovie.overview ? <><div className='overviewcontainer'>
              <button onClick={() => setIsclick(!isclick)}><BsFillArrowDownSquareFill /></button>
              <p>{selectmovie.overview.length >= 25 ? selectmovie.overview.slice(0, 25).concat('...') : selectmovie.overview}</p>
            </div>{isclick ? <div className='moredetails'>{selectmovie.overview}</div> : null}</> : null}
          </div>
        </div>
      </section>
        <div className='container'>
        {movies.length ?<RenderMovies movies={movies}  handleClick={handleClick}/>:<div className='noResult'>there no resualt for you search babby try different name </div>}
        </div>
      </div>
    
  )
}
export default App;


//https://api.themoviedb.org/3/movie/157336?api_key=68ea981acdd9c6d1b2860ff1f9fa1aeb&append_to_response=videos
//PiStopCircleFill