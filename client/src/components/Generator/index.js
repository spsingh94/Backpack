import React, { useState, useEffect } from "react";
// import React from "react";
import fetch from "node-fetch";

function Generator() {
  const [apiResponse, setApiResponse] = useState();
  const [responseArray, setResponseArray] = useState(null);
  const [selection, setSelection] = useState(null);
  const [location, setLocation] = useState(null);
  //used to get random list from api
  const [number, setNumber] = useState();
//   const [randomSelection, setRandomSelection] = useState();
  //   const [randomLocation, setRandomLocation] = useState();

  console.log(apiResponse);
  console.log(selection);
  console.log(location);
  console.log(number);
  console.log(responseArray);
//   console.log(randomSelection);
  //   console.log(randomLocation);

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
            "x-rapidapi-key":
              `${apiKey}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setApiResponse([data]);
          setLocation(null);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setSelection(null);
    setApiResponse(null);
  }, [apiKey, location, number]);

  useEffect(() => {
    if (apiResponse != null) {
      setResponseArray(apiResponse);
    }
    setApiResponse(null);
  }, [apiResponse, responseArray]);

//   useEffect(() => {
//     if (responseArray != null) {
//       setRandomSelection(responseArray[0].data[0].name);
//     }
//   }, [responseArray]);

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
    </>
  );
}

export default Generator;
