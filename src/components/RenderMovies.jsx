import React from 'react'

const RenderMovies = ({ movies ,handleClick}) => {
  const Img_Path = 'https://image.tmdb.org/t/p/w500'
  console.log(movies)
  return (
   
    movies.map((movie, index) => (
      <div className='cardContainer' onClick={()=> handleClick(movie)}>
        <p className='title' key={index}>
        {movie.title}
        </p>
        {movie.poster_path ? <img className='cover' src={`${Img_Path}${movie.poster_path}`} alt="" /> :
          <div className="placeHolder">
            There is no Imge to display 
          </div>
        }
      </div>
    ))
 
    )

}

export default RenderMovies;

