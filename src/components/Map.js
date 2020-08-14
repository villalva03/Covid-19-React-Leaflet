import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import '../Map.css';
//import { icon } from 'leaflet';
import { dataMap, dataMapGlobal } from './util';
            
function Mapa({ code, countries, casesType, center, zoom }) {
  console.log(countries)
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
              <TileLayer
                url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                //"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                //'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {code === 'Global' ? dataMapGlobal(countries, casesType) : dataMap(countries, casesType, code)}
            </LeafletMap>    
        </div>
    )
}

export default Mapa;
