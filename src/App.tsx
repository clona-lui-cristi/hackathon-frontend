import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [available, setAvailable] = useState(false);

  const [bikeList, setBikeList] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/").then((response) => {
      setBikeList(response.data);
      console.log(response.data);
    });
  }, []);

  const addBike = () => {
    axios
      .post("http://localhost:5000/create", {
        name: name,
        location: location,
      })
      .then((response) => {
        setBikeList(response.data);
        console.log(response.data);
      });
  };

  const deleteBike = (id: any) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
      setBikeList(
        bikeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={addBike}>ADD</button>
      {bikeList.map((val, key) => {
        return (
          <div className="bike">
            <h3>{val.name}</h3>
            <h3>{val.location}</h3>
            <h3>{val.available}</h3>
            <button onClick={() => deleteBike(val.id)}> DELETE </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
