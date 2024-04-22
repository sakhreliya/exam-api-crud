import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Api.css";

const Api = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const nameRef = useRef();
  const priceRef = useRef();

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:3001/post").then((res) => {
      setData(res.data);
    });
  };

  // Add data
  const handleSubmit = () => {
    const newData = {
      name: nameRef.current.value,
      price: priceRef.current.value,
    };

    axios.post("http://localhost:3001/post", newData).then((res) => {
      setData([...data, res.data]);
    });
  };

  // Delete data
  const deleteData = (id) => {
    axios.delete(`http://localhost:3001/post/${id}`).then(() => {
      setData(data.filter((val) => val.id !== id));
    });
  };

  // Update data
  const handleUpdate = () => {
    axios.put(`http://localhost:3001/post/${view.id}`, view).then((res) => {
      setData(
        data.map((val) => {
          return val.id === res.data.id ? res.data : val;
        })
      );
    });
  };

  // Set view
  const viewData = (index) => {
    setView(data[index]);
  };

  const handleView = (e) => {
    setView({ ...view, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((val) =>
    val.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="input-section">
        <input type="text" name="name" ref={nameRef} placeholder="Enter Name" />
        <input type="number" name="price" ref={priceRef} placeholder="Enter Price" />
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
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((val, ind) => (
            <tr key={val.id}>
              <td>{val.name}</td>
              <td>{val.price}</td>
              <td>
                <button onClick={() => deleteData(val.id)}>Delete</button>
                <button onClick={() => viewData(ind)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Api;
