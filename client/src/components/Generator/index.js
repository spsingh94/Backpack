import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
} from "reactstrap";
import Calendar from "../Calendar";
import fetch from "node-fetch";
import { Maps } from "../Maps";
import { format } from "date-fns";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addDays from "date-fns/addDays";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import "./style.css";

function Generator(props) {
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fromSelectedDate, setFromSelectedDate] = useState(null);
  const [toSelectedDate, setToSelectedDate] = useState(null);
  const [urlDate, setUrlDate] = useState();
  const [finalTo, setFinalTo] = useState(null);
  const [finalFrom, setFinalFrom] = useState(null);
  const [showElement, setShowElement] = useState("none");
  const [goVisibility, setGoVisibility] = useState("hidden");
  const [locationVisibility, setLocationVisibility] = useState("visible");

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
  // console.log(toCalendarDate);

  const rapidKey = process.env.REACT_APP_RAPID_KEY;
  const googleKey = process.env.REACT_APP_GOOGLE_KEY;

  const mapsSource = `https://www.google.com/maps/embed/v1/place?key=${googleKey}&q=${mapLocation}`;

  useEffect(() => {
    if (finalFrom != null && finalTo != null) {
      setUrlDate(finalFrom + "/" + finalTo);
    }
  }, [finalFrom, finalTo]);

  // useEffect(() => {
  //   if (currentLocation === undefined) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       setCurrentLocation([
  //         position.coords.latitude,
  //         position.coords.longitude,
  //       ]);
  //     });
  //     setLocationVisibility("visible");
  //   }
  // }, [currentLocation]);

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
    if (currentLocation != null) {
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
          setCurrentLocation(null);
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
    setShowElement("initial");
    setGoVisibility("hidden");
  }

  // function that gets random country
  function selectedCountry(e) {
    setSelection(e.currentTarget.value);
    let x = Math.floor(Math.random() * 194 + 1);
    setNumber(x);
    setShowElement("initial");
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
    setShowElement("none");
    setGoVisibility("visible");
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

  // calendar functionality
  const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  };

  const toHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  };

  const days = () => {
    const dateFormat = "ddd";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const toDays = () => {
    const dateFormat = "ddd";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, fromSelectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => onFromDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {" "}
          {days}{" "}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const toCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let today = startDate;
    let formattedDate = "";
    while (today <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(today, dateFormat);
        const cloneDay = today;
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(today, monthStart)
                ? "disabled"
                : isSameDay(today, toSelectedDate)
                ? "selected"
                : ""
            }`}
            key={today}
            onClick={() => onToDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        today = addDays(today, 1);
      }
      rows.push(
        <div className="row" key={today}>
          {" "}
          {days}{" "}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  function onFromDateClick(day) {
    setFromSelectedDate(day);
    let fromStringer = JSON.stringify(day);
    let fromSlicer = fromStringer.slice(3, 11);
    let fromSeperator = fromSlicer.split(["-"]);
    const fromDataString = JSON.stringify(fromSeperator);
    let fromCleaner = fromDataString.replace(/{|}|[[\]]|,|"|"|/gi, "");
    setFinalFrom(fromCleaner);
  }

  function onToDateClick(today) {
    setToSelectedDate(today);
    let stringer = JSON.stringify(today);
    let slicer = stringer.slice(3, 11);
    let seperator = slicer.split(["-"]);
    const dataString = JSON.stringify(seperator);
    let cleaner = dataString.replace(/{|}|[[\]]|,|"|"|/gi, "");
    setFinalTo(cleaner);
  }
  // calendar functionality

  function updateCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentLocation([position.coords.latitude, position.coords.longitude]);
    });
    setLocationVisibility("hidden");
  }

  return (
    <>
      <br />
      <Container>
        <Maps src={mapsSource} />
        <h2 className="map-location" style={{ display: showElement }}>
          Pack Your Bags, You're Going to {mapLocation} !
        </h2>
        <ButtonToolbar style={{ justifyContent: "center", paddingTop: "20px" }}>
          <ButtonGroup>
            <Button
              id="city"
              name="location"
              value="cities"
              onClick={selectedCity}
            >
              City
            </Button>
            <Button
              id="country"
              name="location"
              value="countries"
              onClick={selectedCountry}
            >
              Country
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <br />
        <div
          className="get-current"
          style={{ visibility: locationVisibility }}
          onClick={updateCurrentLocation}
        >
          <svg
            width="4em"
            height="4em"
            viewBox="0 0 16 16"
            class="bi bi-geo-alt"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
            />
            <path
              fill-rule="evenodd"
              d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            />
          </svg>
          <p>Current Location</p>
        </div>
        <div className="flight-form" style={{ display: showElement }}>
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
          <Row>
            <div>
              <h5>Adults</h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <Button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon1"
                    onClick={decrementAdults}
                  >
                    -
                  </Button>
                </div>
                <p
                  style={{
                    fontSize: "20px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {adults}
                </p>
                <div class="input-group-prepend">
                  <Button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon1"
                    onClick={incrementAdults}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h5>Children</h5>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <Button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon1"
                    onClick={decrementChildren}
                  >
                    -
                  </Button>
                </div>
                <p
                  style={{
                    fontSize: "20px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {children}
                </p>
                <div class="input-group-prepend">
                  <Button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon1"
                    onClick={incrementChildren}
                  >
                    +
                  </Button>

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
          </Row>
          <Calendar>
            <Col sm="6">
              <div className="calendar">
                <div>{header()}</div>
                <div>{days()}</div>
                <div>{cells()}</div>
              </div>
            </Col>
            <Col sm="6">
              <div className="calendar">
                <div>{toHeader()}</div>
                <div>{toDays()}</div>
                <div>{toCells()}</div>
              </div>
            </Col>
          </Calendar>
          {props.children}
          <ButtonToolbar style={{ justifyContent: "flex-end" }}>
            <ButtonGroup>
              <Button
                onClick={flipArray}
                style={{
                  display: showElement,
                  marginRight: "50px",
                  marginTop: "30px",
                }}
              >
                Done
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <p
          style={{ textAlign: "end", visibility: goVisibility }}
          onClick={selectedCity}
          className="change-option"
        >
          Make Changes +
        </p>
        <ButtonToolbar
          style={{ justifyContent: "center", visibility: goVisibility }}
        >
          <ButtonGroup>
            <Button
              onClick={() => {
                if (children > 1) {
                  window.open(
                    `https://www.skyscanner.com/transport/flights/${currAirportCode}/${destAirportCode}/${urlDate}/?adults=${adults}&adultsv2=${adults}&cabinclass=${cabin}&children=${children}&childrenv2=${ageUrl}&destinationentityid=27545162&inboundaltsenabled=false&infants=0&originentityid=27544948&outboundaltsenabled=false&preferdirects=false&preferflexible=false&ref=home&rtn=1`
                  );
                  // flipArray();
                } else {
                  window.open(
                    `https://www.skyscanner.com/transport/flights/${currAirportCode}/${destAirportCode}/${urlDate}/?adults=${adults}&adultsv2=${adults}&cabinclass=${cabin}&children=0&childrenv2=&destinationentityid=46516321&destinationgsid=46516321&inboundaltsenabled=false&infants=0&originentityid=27544948&outboundaltsenabled=false&preferdirects=false&preferflexible=false&ref=home&rtn=1`
                  );
                }
              }}
              className="go-button"
              style={{ display: "flex", justifyContent: "center" }}
            >
              View Tickets
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Container>
    </>
  );
}

export default Generator;
