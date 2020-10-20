import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import { Maps } from "../Maps";

function Generator() {
  const [apiResponse, setApiResponse] = useState();
  const [responseArray, setResponseArray] = useState(null);
  const [selection, setSelection] = useState(null);
  const [location, setLocation] = useState(null);
  const [number, setNumber] = useState();
  const [mapLocation, setMapLocation] = useState();
  const [locationLat, setLocationLat] = useState(null);
  const [locationLong, setLocationLong] = useState(null);
  const [airportInfo, setAirportInfo] = useState();

  // https://www.travelocity.com/Flights-Search?flight-type=on&starDate=11%2F18%2F2020&endDate=11%2F23%2F2020&_xpid=11905%7C1&mode=search&trip=roundtrip&leg1=from%3AChicago%2C+IL+%28ORD-O%27Hare+Intl.%29%2Cto%3AParis+%28PAR-All+Airports%29%2Cdeparture%3A11%2F18%2F2020TANYT&leg2=from%3AParis+%28PAR-All+Airports%29%2Cto%3AChicago%2C+IL+%28ORD-O%27Hare+Intl.%29%2Cdeparture%3A11%2F23%2F2020TANYT&passengers=children%3A0%2Cadults%3A1%2Cseniors%3A0%2Cinfantinlap%3AY

  console.log(apiResponse);
  console.log(responseArray);
  console.log(mapLocation);
  console.log(locationLat);
  console.log(locationLong);
  console.log(airportInfo);

  const rapidKey = process.env.REACT_APP_RAPID_KEY;
  const googleKey = process.env.REACT_APP_GOOGLE_KEY;

  const mapsSource = `https://www.google.com/maps/embed/v1/place?key=${googleKey}&q=${mapLocation}`;

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

  function selectedCity(e) {
    setSelection(e.currentTarget.value);

    //get random number for offset
    let x = Math.floor(Math.random() * 273684 + 1);
    setNumber(x);
  }

  useEffect(() => {
    if (locationLat != null && locationLong != null) {
      fetch(
        `https://rapidapi.p.rapidapi.com/airports/search/location/${locationLat}/${locationLong}/km/100/5?withFlightInfoOnly=false`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key":
            `${rapidKey}`,
          },
        }
      )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAirportInfo(data.items);
      })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [rapidKey, locationLat, locationLong]);

  function selectedCountry(e) {
    setSelection(e.currentTarget.value);

    //get random number for offset
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
      <label for="city">City</label>
      <br></br>
      <input
        type="radio"
        id="country"
        name="location"
        value="countries"
        onChange={selectedCountry}
      />
      <label for="country">Country</label>
      <br></br>
      <br />
      <button>Search</button>
      <h1>{mapLocation}</h1>

      <Maps src={mapsSource} />
    </>
  );
}

export default Generator;
