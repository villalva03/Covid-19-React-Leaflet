import React, {useState, useEffect} from 'react';
import InfoBox from './components/infoBox/InfoBox';
import Map from './components/map/Map';
import Table from './components/table/Table';
import axios from 'axios';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import { sortData } from './components/util/util';
import "leaflet/dist/leaflet.css";


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Global');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableDate, setTableDate] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");


  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://disease.sh/v3/covid-19/all'
    })
    .then(res => {
      setCountryInfo(res.data); 
    })
  }, [])

  useEffect(() => {
    const getCountries = async () => {
      await axios({
        method: 'GET',
        url: 'https://disease.sh/v3/covid-19/countries'
      })
      .then(res => { 
        //console.log(res.data)
        const countries = res.data.map((country)=>({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        setCountries(countries);
        const sortedData = sortData(res.data)
        setTableDate(sortedData)
        setMapCountries(res.data);

      });
    };
    getCountries();
  }, []);

  const useStyles = makeStyles({
    root: {
      background: 'white'
    },
  });

  const classes = useStyles();
  
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url = countryCode === 'Global' 
                ? 'https://disease.sh/v3/covid-19/all'
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await axios({
      method: 'GET',
      url: url
    })
    .then(res => {
      setCountry(countryCode);
      setCountryInfo(res.data);
      if (countryCode === 'Global'){
        setMapCenter({ lat: 34.80746, lng: -40.4796 });  
      } else{
        setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
      }
      setMapZoom(3);
    })
  }
  return (
    <div className='app'>
      <h1>React.js COVID-19</h1>
      <div className='appHeader'>
        <Map  center={mapCenter}
              zoom={mapZoom}
              countries={mapCountries}
              casesType={casesType}
              code={country}
        />
      </div>

      <div className='appLeft'>

        <FormControl className='appDropdown'>
          <Select className={classes.root} onChange={onCountryChange} variant='outlined' value={country}>
            <MenuItem value='Global'>Global</MenuItem>
            {
              countries.map((country, index)=>
                <div key={index}>
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                </div>
              )
            }
          </Select>
        </FormControl>
        
        <div className='appInfoBoxs'>
          <InfoBox  onClick={ (e) => setCasesType('cases') }
                    title='Coronavirus Cases' 
                    cases={countryInfo.todayCases} 
                    total={countryInfo.cases}
                    isCases
          />
          <InfoBox  onClick={ (e) => setCasesType('recovered') }
                    title='Recovered' 
                    cases={countryInfo.todayRecovered} 
                    total={countryInfo.recovered}
                    isRecovered
          />
          <InfoBox  onClick={ (e) => setCasesType('deaths') }
                    title='Deaths' 
                    cases={countryInfo.todayDeaths} 
                    total={countryInfo.deaths}
                    isDeaths
          />
        </div> 

        <Card className='appRight'>
          <CardContent>
            <h2>Cases by Country </h2>
            <Table countries={tableDate}/>
          </CardContent>
        </Card>
      </div> 
    </div>
  );
}

export default App;