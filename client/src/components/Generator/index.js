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

  console.log(apiResponse);
  console.log(responseArray);
  console.log(mapLocation);

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

      <Maps src={mapsSource} />
    </>
  );
}

export default Generator;
