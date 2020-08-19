import React from 'react'
import Data from './../data'

const Map = ({ routes, airportClick }) => {
  const getAirport = (code) => 
    Data.airports.find((airport) => airport.code === code)

  const handleClick = (e) => {
    airportClick(e.target.attributes.value.nodeValue)  
  }

  const displayRoutes = routes.map((route) => {
    const srcAirport = getAirport(route.src) 
    const destAirport = getAirport(route.dest)
    const linePath = `M${srcAirport.long} ${srcAirport.lat} `
      + `L${destAirport.long} ${destAirport.lat}`

    return (
      <g key={route.airline + route.src + route.dest}>
        <circle 
          className='source' 
          cx={srcAirport.long} 
          cy={srcAirport.lat}
          value={route.src}
          onClick={handleClick}
        >
          <title>{srcAirport.name}</title>
        </circle>
        <circle 
          className='destination' 
          cx={destAirport.long} 
          cy={destAirport.lat}
          value={route.dest}
          onClick={handleClick}
        >
          <title>{destAirport.name}</title>
        </circle>
        <path d={linePath} />
      </g>
    )
  })

  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
        {displayRoutes}  
      </g>
    </svg>
  )
}

export default Map
