import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import { Maps } from "../Maps";
// require('dotenv').config(path.resolve(process.cwd(), '.env'))

function Generator() {
  const [apiResponse, setApiResponse] = useState();
  const [responseArray, setResponseArray] = useState(null);
  const [selection, setSelection] = useState(null);
  const [location, setLocation] = useState(null);
  const [number, setNumber] = useState();
  const [currentLocation, setCurrentLocation] = useState(undefined);
  const [mapLocation, setMapLocation] = useState();
  const [locationLat, setLocationLat] = useState(null);
  const [locationLong, setLocationLong] = useState(null);
  const [destAirportCode, setDestAirportCode] = useState(null);
  const [currAirportCode, setCurrAirportCode] = useState(null);

  // https://www.travelocity.com/Flights-Search?flight-type=on&starDate=11%2F18%2F2020&endDate=11%2F23%2F2020&_xpid=11905%7C1&mode=search&trip=roundtrip&leg1=from%3AChicago%2C+IL+%28ORD-O%27Hare+Intl.%29%2Cto%3AParis+%28PAR-All+Airports%29%2Cdeparture%3A11%2F18%2F2020TANYT&leg2=from%3AParis+%28PAR-All+Airports%29%2Cto%3AChicago%2C+IL+%28ORD-O%27Hare+Intl.%29%2Cdeparture%3A11%2F23%2F2020TANYT&passengers=children%3A0%2Cadults%3A1%2Cseniors%3A0%2Cinfantinlap%3AY

  console.log(apiResponse);
  console.log(responseArray);
  console.log(mapLocation);
  console.log(locationLat);
  console.log(locationLong);
  // console.log(destAirportInfo);
  // console.log(currAirportInfo);
  console.log(currentLocation);
  console.log(currAirportCode);

  const rapidKey = process.env.REACT_APP_RAPID_KEY;
  const googleKey = process.env.REACT_APP_GOOGLE_KEY;

  const mapsSource = `https://www.google.com/maps/embed/v1/place?key=${googleKey}&q=${mapLocation}`;

  useEffect(() => {
    if(currentLocation === undefined)  {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentLocation([position.coords.latitude, position.coords.longitude]);
    });
    }
  });

  useEffect(() => {
    if (selection != null) {
      setLocation(selection);
    }
  }, [selection]);

  useEffect(() => {
    if (location != null) {
      fetch(
        `https://rapidapi.p.rapidapi.com//v1/geo/${location}?offset=${number}&limit=5`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": `${rapidKey}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setResponseArray([data]);
          setLocation(null);
        })
        .then(() => {
          if (responseArray[0].metadata.totalCount === 198) {
            setMapLocation(responseArray[0].data[0].name);
            setDestAirportCode(responseArray[0].data[0].code);
          } else {
            setMapLocation(
              responseArray[0].data[0].region +
                "," +
                responseArray[0].data[0].name
            );
            setLocationLat(responseArray[0].data[0].latitude);
            setLocationLong(responseArray[0].data[0].longitude);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setSelection(null);
    setApiResponse(null);
    setResponseArray(null);
  }, [rapidKey, location, number, responseArray]);

      //setting the airports for the destination into an array
      useEffect(() => {
        if (locationLat != null || locationLong != null) {
          fetch(
            `https://rapidapi.p.rapidapi.com/airports/search/location/${locationLat}/${locationLong}/km/100/5?withFlightInfoOnly=false`,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
                "x-rapidapi-key": `${rapidKey}`,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setLocationLat(null);
              setLocationLong(null);
              console.log(data);
              setDestAirportCode(data.items[0].iata);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, [rapidKey, locationLat, locationLong]);

  //setting the airports for the current location into an array
  useEffect(() => {
    if (currentLocation != null || currentLocation !== undefined) {
      fetch(
        `https://rapidapi.p.rapidapi.com/airports/search/location/${currentLocation[0]}/${currentLocation[1]}/km/100/5?withFlightInfoOnly=false`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key": `${rapidKey}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCurrAirportCode(data.items[0].iata);
          // setCurrentLocation(null);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [rapidKey, currentLocation]);

  // function that gets random city
  function selectedCity(e) {
    setSelection(e.currentTarget.value);
    let x = Math.floor(Math.random() * 273684 + 1);
    setNumber(x);
  }

  // function that gets random country
  function selectedCountry(e) {
    setSelection(e.currentTarget.value);
    let x = Math.floor(Math.random() * 194 + 1);
    setNumber(x);
  }
  return (
    <>
      <input
        type="radio"
        id="city"
        name="location"
        value="cities"
        onChange={selectedCity}
      />
      <label htmlFor="city">City</label>
      <br></br>
      <input
        type="radio"
        id="country"
        name="location"
        value="countries"
        onChange={selectedCountry}
      />
      <label htmlFor="country">Country</label>
      <br></br>
      <br />
      <h1>{mapLocation}</h1>

      <Maps src={mapsSource} />
      <button
        onClick={() => {
          window.open(
            `https://www.skyscanner.com/transport/flights/${currAirportCode}/${destAirportCode}/201024/201031/?adults=1&adultsv2=1&cabinclass=economy&children=0&childrenv2=&destinationentityid=46516321&destinationgsid=46516321&inboundaltsenabled=false&infants=0&originentityid=27544948&outboundaltsenabled=false&preferdirects=false&preferflexible=false&ref=home&rtn=1`
          );
        }}
      >
        Redirect
      </button>
    </>
  );
}

export default Generator;
