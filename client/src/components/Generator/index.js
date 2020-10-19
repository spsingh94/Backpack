import React, { useState, useEffect } from "react";
// import React from "react";
import fetch from "node-fetch";

function Generator() {
  const [apiResponse, setApiResponse] = useState();
  const [selection, setSelection] = useState();
  const [location, setLocation] = useState();
  //used to get random list from api
  const [countryOffsetNumber, setCountryOffsetNumber] = useState();
  const [cityOffsetNumber, setCityOffsetNumber] = useState();
  //   const [randomLocation, setRandomLocation] = useState();

  console.log(apiResponse);
  console.log(selection);
  console.log(location);
  console.log(countryOffsetNumber);
  console.log(cityOffsetNumber);
  //   console.log(randomLocation);

  //   const selectionRef = useRef();

  useEffect(() => {
    if (selection != null) {
      setLocation(selection);
    }
  });

  const apiKey = process.env.REACT_APP_RAPID_KEY;
  //   offset=273685&limit=5

  useEffect(() => {
    if (location === "countries") {
      // fetch(`https://rapidapi.p.rapidapi.com/v1/geo/${location}`,
      fetch(
        `https://rapidapi.p.rapidapi.com//v1/geo/${location}?offset=${countryOffsetNumber}&limit=5`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": `${apiKey}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setApiResponse([data]);
        })
        .catch((err) => {
          console.error(err);
        });

      //   fetch(
      //     "https://parseapi.back4app.com/classes/Continentscountriescities_Country?limit=10&keys=name",
      //     {
      //       headers: {
      //         "X-Parse-Application-Id":
      //           "Q8CoGDSW3oYZuGMWChYZHW5yff6Pa39dH6RXKdS8", // This is your app's application id
      //         "X-Parse-REST-API-Key": "Av3j1sexUW7oV9kQCnbiAYgKvYxBcezfTf5w3REr", // This is your app's REST API key
      //       },
      //     }
      //   )
      //     .then((data) => {
      //       setApiResponse([data]);
      //     })
      //     .catch((err) => {
      //       console.error(err);
      //     });
    }
    if (location === "cities") {
      // fetch(`https://rapidapi.p.rapidapi.com/v1/geo/${location}`,
      fetch(
        `https://rapidapi.p.rapidapi.com//v1/geo/${location}?offset=${cityOffsetNumber}&limit=5`,
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
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setSelection(null);
    setLocation(null);
  }, [location, apiKey, cityOffsetNumber, countryOffsetNumber]);

  //   useEffect(() => {
  //     if(apiResponse != null) {
  //         setRandomLocation(apiResponse[0].data[50]);
  //     }
  // }, [apiResponse]);

  function selectedCity(e) {
    setSelection(e.currentTarget.value);

    //get random number for offset
    let x = Math.floor(Math.random() * 273684 + 1);
    setCityOffsetNumber(x);
  }

  function selectedCountry(e) {
    setSelection(e.currentTarget.value);

    //get random number for offset
    let x = Math.floor(Math.random() * 194 + 1);
    setCountryOffsetNumber(x);
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
