import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import { Maps } from "../Maps";

function Generator() {
  const [apiResponse, setApiResponse] = useState();
  const [responseArray, setResponseArray] = useState(null);
  const [selection, setSelection] = useState(null);
  const [location, setLocation] = useState(null);
  const [number, setNumber] = useState();
  const [currentLocation, setCurrentLocation] = useState(undefined);
  const [mapLocation, setMapLocation] = useState();
  const [locationCords, setLocationCords] = useState(null);
  const [destAirportCode, setDestAirportCode] = useState(null);
  const [currAirportCode, setCurrAirportCode] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cabin, setCabin] = useState();
  const [fields, setFields] = useState([]);
  const [ageUrl, setAgeUrl] = useState();

  console.log(apiResponse);
  console.log(ageUrl);
  console.log(responseArray);
  console.log(mapLocation);
  console.log(locationCords);
  console.log(currentLocation);
  console.log(currAirportCode);
  console.log(cabin);
  console.log(children);
  console.log(fields);

  const rapidKey = process.env.REACT_APP_RAPID_KEY;
  const googleKey = process.env.REACT_APP_GOOGLE_KEY;

  const mapsSource = `https://www.google.com/maps/embed/v1/place?key=${googleKey}&q=${mapLocation}`;

  useEffect(() => {
    if (currentLocation === "undefined") {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
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
            setLocationCords([
              responseArray[0].data[0].latitude,
              responseArray[0].data[0].longitude,
            ]);
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
    if (locationCords != null) {
      fetch(
        `https://rapidapi.p.rapidapi.com/airports/search/location/${locationCords[0]}/${locationCords[1]}/km/100/5?withFlightInfoOnly=false`,
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
          setLocationCords(null);
          console.log(data);
          setDestAirportCode(data.items[0].iata);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [rapidKey, locationCords]);

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

  function selectedCabin(e) {
    setCabin(e.currentTarget.value);
  }

  function incrementAdults(e) {
    e.preventDefault();
    if (adults < 8) {
      setAdults(adults + 1);
    }
  }

  function decrementAdults(e) {
    e.preventDefault();
    if (adults > 1) {
      setAdults(adults - 1);
    }
  }

  function incrementChildren(e) {
    e.preventDefault();
    if (children < 8) {
      setChildren(children + 1);
      const values = [...fields];
      values.push({ value: null });
      setFields(values);
    }
  }

  function selectedChildrenAge(i, e) {
    const values = [...fields];
    let firstVal = values[0].value;
    values[i].value = e.currentTarget.value + "%7c";
    if (values.length > 0 && values.length < 2) {
      values[0].value = e.currentTarget.value;
    } else if (values[0].value !== firstVal) {
      values[0].value = e.currentTarget.value;
    } else {
      values[i].value = e.currentTarget.value + "%7c";
    }
    setFields(values);
  }

  function flipArray() {
    setFields(fields.reverse());
    let arrayStringer = JSON.stringify(fields);
    let arraySplitter = arrayStringer.replace(
      /{|}|[[\]]|,|:|"|"|v|a|l|u|e|/gi,
      ""
    );
    setAgeUrl(arraySplitter);
  }

  // fields.forEach(selectedChildrenAge);

  function decrementChildren(e) {
    e.preventDefault();
    if (children > 0) {
      setChildren(children - 1);
      const values = [...fields];
      values.pop();
      setFields(values);
    }
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

      <br />

      {/* used to select cabin */}
      <div class="input-group mb-3">
        <select
          class="custom-select"
          id="inputGroupSelect01"
          onChange={selectedCabin}
        >
          <option selected>Please Choose Your Cabin Class</option>
          <option value="economy">Economy</option>
          <option value="premiumeconomy">Premium Economy</option>
          <option value="business">Business Class</option>
          <option value="first">First Class</option>
        </select>
      </div>

      {/* <incrementer */}
      <div>
        <h1>Adults</h1>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
              onClick={decrementAdults}
            >
              -
            </button>
          </div>
          <p
            style={{
              fontSize: "40px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            {adults}
          </p>
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
              onClick={incrementAdults}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div>
        <h1>Children</h1>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
              onClick={decrementChildren}
            >
              -
            </button>
          </div>
          <p
            style={{
              fontSize: "40px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            {children}
          </p>
          <div class="input-group-prepend">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
              onClick={incrementChildren}
            >
              +
            </button>

            {fields.map((field, idx) => {
              return (
                <div key={`${field}-${idx}`}>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    onChange={(e) => selectedChildrenAge(idx, e)}
                  >
                    <option selected>Please Choose Childs Age</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          if (children > 1) {
            window.open(
              `https://www.skyscanner.com/transport/flights/${currAirportCode}/${destAirportCode}/201024/201031/?adults=${adults}&adultsv2=${adults}&cabinclass=${cabin}&children=${children}&childrenv2=${ageUrl}&destinationentityid=27545162&inboundaltsenabled=false&infants=0&originentityid=27544948&outboundaltsenabled=false&preferdirects=false&preferflexible=false&ref=home&rtn=1`
            );
            // flipArray();
          } else {
            window.open(
              `https://www.skyscanner.com/transport/flights/${currAirportCode}/${destAirportCode}/201024/201031/?adults=${adults}&adultsv2=${adults}&cabinclass=${cabin}&children=0&childrenv2=&destinationentityid=46516321&destinationgsid=46516321&inboundaltsenabled=false&infants=0&originentityid=27544948&outboundaltsenabled=false&preferdirects=false&preferflexible=false&ref=home&rtn=1`
            );
          }
        }}
      >
        Redirect
      </button>

      <button onClick={flipArray}>flip</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Generator;
