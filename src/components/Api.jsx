import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Api.css";
import exampleImage from "./example.jpg";

const Api = () => {
  let [data, setData] = useState([]);
  const [view, setView] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  let name = useRef();
  let price = useRef();

  //get data
  let fetchData = () => {
    axios.get("http://localhost:3001/post").then((res) => {
      setData(res.data);
    });
  };

  //add data
  let handleSubmit = () => {
    let newData = {
      name: name.current.value,
      price: price.current.value,
    };

    axios.post("http://localhost:3001/post", newData).then((res) => {
      setData([...data, res.data]);
    });
  };

  //delete data
  let deleteData = (id) => {
    axios.delete(`http://localhost:3001/post/${id}`).then((res) => {
      setData(data.filter((val) => val.id !== id));
    });
  };

  //update data
  //set view
  let viewData = (index) => {
    let user = data[index];
    setView(user);
  };

  let handleView = (e) => {
    setView({ ...view, [e.target.name]: e.target.value });
  };


  //updata
  let handleUpdate = () => {
    axios.put(`http://localhost:3001/post/${view.id}`, view).then((res) => {
      setData(
        data.map((val, ind) => {
          if (val.id === res.data.id) {
            return res.data;
          } else {
            return val;
          }
        })
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((val) =>
    val.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="input-section">
        <input type="text" name="name" ref={name} placeholder="Enter Name" />
        <input type="number" name="price" ref={price} placeholder="Enter Price" />
        <button onClick={handleSubmit}>Add</button>
      </div>
      <div className="update-section">
        <label>Update Data</label>
        <input
          type="text"
          name="name"
          value={view.name || ""}
          onChange={handleView}
          placeholder="Name"
        />
        <input
          type="number"
          name="price"
          value={view.price || ""}
          onChange={handleView}
          placeholder="Price"
        />
        <button onClick={handleUpdate}>Update</button>
        <button>Cancel</button>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search Book"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row ">
        {filteredData.map((val, ind) => (
          <div key={val.id} className="card">
            <div className="card-body">
              <h5 className="card-title"><b>{val.name}</b></h5>
              <img src={exampleImage} alt="Example" className="card-image" />
              <h6 className="card-subtitle mb-2 text-muted">{val.price}</h6>
              <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry...
              </p>
              <button onClick={() => deleteData(val.id)}>Delete</button>
              <button onClick={() => viewData(ind)}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Api;