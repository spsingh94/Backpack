import React, { useState, useEffect } from "react";
// import React from "react";
import fetch from "node-fetch";
import { Maps } from "../Maps";

function Generator() {
  const [apiResponse, setApiResponse] = useState();
  const [responseArray, setResponseArray] = useState(null);
  const [selection, setSelection] = useState(null);
  const [location, setLocation] = useState(null);
  //used to get random list from api
  const [number, setNumber] = useState();
  // const [countryName, setCountryName] = useState();
  // const [cityName, setCityName] = useState();
  const [mapLocation, setMapLocation] = useState();
  //   const [randomLocation, setRandomLocation] = useState();

  console.log(apiResponse);
  // console.log(selection);
  // console.log(location);
  // console.log(number);
  console.log(responseArray);
  // console.log(countryName);
  // console.log(cityName);
  console.log(mapLocation);

  //   const selectionRef = useRef();

  const apiKey = process.env.REACT_APP_RAPID_KEY;

  useEffect(() => {
    if (selection != null) {
      setLocation(selection);
    }
  }, [selection]);

  // offset=273685&limit=5

  // /v1/geo/countries?offset=192&limit=5

  useEffect(() => {
    if (location != null) {
      //   fetch(
      //     `https://rapidapi.p.rapidapi.com/v1/geo/${location}`,
      fetch(
        `https://rapidapi.p.rapidapi.com//v1/geo/${location}?offset=${number}&limit=5`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            // "x-rapidapi-key": `${apiKey}`,
            "x-rapidapi-key":
              "957c538eacmshfff2cc486070e3ep1fc406jsnf26db0ef2c8c",
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
            // setCountryName(responseArray[0].data[0].region);
            // setCityName(responseArray[0].data[0].name);
            setMapLocation(
              responseArray[0].data[0].region +
                "," +
                responseArray[0].data[0].name
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setSelection(null);
    setApiResponse(null);
    setResponseArray(null);
  }, [apiKey, location, number, responseArray]);

  // useEffect(() => {
  //   if (apiResponse != null) {
  //     setResponseArray(apiResponse);
  //   }
  //   setApiResponse(null);
  // }, [apiResponse, responseArray]);

  // useEffect(() => {
  //   // if (responseArray[0].metaData.totalCount <= 198)
  //   if (responseArray != null) {
  //     setCountryName(responseArray[0].data[0].name);
  //     // setMapLocation(countryName);
  //   }
  //   // else {
  //   // setCountryName(responseArray[0].data[0].country);
  //   // setCityName(responseArray[0].data[0].name);
  //   // setMapLocation(countryName + "," + cityName);
  //   // }
  // }, [responseArray, countryName, cityName]);

  function selectedCity(e) {
    setSelection(e.currentTarget.value);

    //get random number for offset
    let x = Math.floor(Math.random() * 273684 + 1);
    setNumber(x);
  }

  function selectedCountry(e) {
    setSelection(e.currentTarget.value);

    //get random number for offset
    let x = Math.floor(Math.random() * 194 + 1);
    setNumber(x);
  }

  // const API_KEY = process.env.REACT_APP_GOOGLE_KEY;
  const API_KEY = "AIzaSyCB562S4olyifwJ5yO8vBgNVnYk2KCcw_g";

  const mapsSource = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${mapLocation}`;
  console.log(mapsSource);

  return (
    <>
      {/* <form action="/action_page.php"> */}
      <input
        type="radio"
        id="city"
        name="location"
        value="cities"
        //   ref={selectionRef}
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
      {/* </form> */}
      <label for="country">Country</label>
      <br></br>
      <br />
      <button>Search</button>

      <Maps src={mapsSource} />
    </>
  );
}

export default Generator;