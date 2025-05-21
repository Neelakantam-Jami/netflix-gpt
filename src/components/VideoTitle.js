import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
      <div className="pt-36 px-6 md:px-16 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
          <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
          <p className="hidden md:inline-block py-6 text-lg w-1/2">{overview}</p>
          <div className="">
              <button className="bg-white text-black p-2 px-10 text-xs md:text-lg rounded-lg hover:bg-opacity-80">▶ Play</button>
              <button className="hidden md:inline-block bg-gray-500 text-white p-2 px-10 text-lg bg-opacity-50 rounded-lg mx-2">More Info</button>
          </div>
    </div>
  )
}

export default VideoTitle;