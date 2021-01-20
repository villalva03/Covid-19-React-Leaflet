import React from 'react';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
  cases: {
    hex: "#EBD900",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#CC1034",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
    let sortedData = [...data];
    
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
    //   if (a.cases > b.cases) {
    //     return -1;
    //   } else {
    //     return 1;
    //   }
    // });
    // return sortedData;
};

export const dataMap = (data, casesType = 'cases', code) => 
  data.map((country) => (
    country.countryInfo.iso2 === code
    ? <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
    <Popup>
      <div className='infoContainer'>
        <div className='infoFlag' style={{ backgroundImage: `url(${country.countryInfo.flag})` }}/>
        <div className='infoName'>{country.country}</div>
        <div className='infoCases'>Cases: {country.cases}</div>
        <div className='infoRecovered'>Recovered: {country.recovered}</div>
        <div className='infoDeaths'>Deaths: {country.deaths}</div>
      </div>
    </Popup>
    </Circle>
    : ''
  ));

  export const dataMapGlobal = (data, casesType = 'cases') => 
  data.map((country, index) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
      key={index}
    >
      <Popup>
        <div className='infoContainer'>
          <div className='infoFlag' style={{ backgroundImage: `url(${country.countryInfo.flag})` }}/>
          <div className='infoName'>{country.country}</div>
          <div className='infoCases'>Cases: {country.cases}</div>
          <div className='infoRecovered'>Recovered: {country.recovered}</div>
          <div className='infoDeaths'>Deaths: {country.deaths}</div>
        </div>
      </Popup>
    </Circle>
    ));
