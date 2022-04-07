import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [coordsList, setCoordsList] = useState<any[]>([]);

  useEffect(() => {
    axios.get("https://safe-atoll-31592.herokuapp.com/").then((response) => {
      setCoordsList(response.data);
      console.log(response.data);
    });
  }, []);

  const addCoords = () => {
    axios
      .post("https://safe-atoll-31592.herokuapp.com/create", {
        longitude: longitude,
        latitude: latitude,
      })
      .then((response) => {
        setCoordsList(response.data);
        console.log(response.data);
      });
  };

  const deleteCoords = (id: any) => {
    axios
      .delete(`https://safe-atoll-31592.herokuapp.com/delete/${id}`)
      .then((response) => {
        setCoordsList(
          coordsList.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <div className="App">
      <div className="text">
        <div className="welcome">
          <h1>Welcome to the Safe Atoll</h1>
          <h3>Making garbage collecting an easy job !</h3>
        </div>
        <div className="image"></div>
      </div>
      <div className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Latitude"
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="text"
            placeholder="Longitude"
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <button className="learn-more" onClick={addCoords}>
          ADD COORDS
        </button>
      </div>
      <div className="coords-list">
        {coordsList.map((val, key) => {
          return (
            <div className="coords">
              <h3>{val.longitude}</h3>
              <h3>{val.latitude}</h3>
              <button
                className="learn-more"
                onClick={() => deleteCoords(val.id)}
              >
                {" "}
                COLLECTED{" "}
              </button>
              <button
                className="learn-more2"
                onClick={() => {
                  let map: google.maps.Map;
                  map = new google.maps.Map(
                    document.getElementById("map") as HTMLElement,
                    {
                      center: { lat: val.latitude, lng: val.longitude },
                      zoom: 20,
                    }
                  );
                  let marker = new google.maps.Marker({
                    position: { lat: val.latitude, lng: val.longitude },
                    map: map,
                  });
                }}
              >
                VIEW POINT
              </button>
            </div>
          );
        })}
      </div>

      <div id="map" />

      <div className="about">
        <h1>About our company</h1>
        <div className="upper-text">
          <div className="mission">
            <h3>Mission Statement</h3>
            <p>We came in help for the people who need garbage collection.</p>
          </div>
          <div className="vision">
            <h3>Vision Statement</h3>
            <p>
              Right here, we talk about the future. The things that inspire us
              to go forward .
            </p>
          </div>
        </div>
        <div className="lower-text">
          <div className="target">
            <h3>Targetting Town Halls</h3>
            <div id="building"></div>
          </div>
          <div className="side-text">
            <div className="values">
              <h3>Core Values</h3>
              <div className="fk">
              <div id="thumbsup"></div>
              <div id="trophy"></div>
              <div id="goal"></div>
              <div id="sun"></div>
              </div>
            </div>
            <div className="history">
              <div id="hourglass"></div>
              <div className="hs">
                <h3>Brief Company History</h3>
                <p>Our company history doesn't go way back but we have some experience in this kind of things.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
