import React, { useEffect, useState } from "react";
import InputGroup from "../components/InputGroup";
import RowDetails from "../components/RowDetails";
import axios from "axios";
import Header from "../components/Header";
import ClientImg from "../asstets/images/client.jpg";
// import ClientImg from "../asstets/images/order.png";

function Home() {
  console.log(Date.now());
  const [clients, setClients] = useState();
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("id");
  console.log(searchBy);
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    axios.post("http://localhost:3001/clients", form).then((res) => {
      setForm({});
      getClients();
    });
  };

  /* delete */
  const OnDelete = (id) => {
    if (window.confirm(`are you sure to delete this client`)) {
      axios.delete(`http://localhost:3001/clients/${id}`).then((res) => {
        getClients();
      });
    }
  };
  /* find all clients */
  const getClients = async () => {
    await axios.get("http://localhost:3001/clients").then((res) => {
      console.log(res.data);
      setClients(res.data);
    });
  };
  useEffect(async () => {
    getClients();
  }, []);

  return (
    <>
      <Header />
      <img alt="client" style={{ width: "100%" }} src={ClientImg}></img>
      <div style={{ width: "100vw" }} className="row">
        <div style={{ margin: "auto" }} className="mt-3 col-12 col-lg-4">
          <form onSubmit={onSubmitHandler}>
            <InputGroup
              label="Email"
              type="text"
              name="email"
              onChangeHandler={onChangeHandler}
            />
            <InputGroup
              label="Lastname"
              type="text"
              name="lastName"
              onChangeHandler={onChangeHandler}
            />
            <InputGroup
              label="Firstname"
              type="text"
              name="firstName"
              onChangeHandler={onChangeHandler}
            />
            <InputGroup
              label="Adresse"
              type="text"
              name="adresse"
              onChangeHandler={onChangeHandler}
            />
            <InputGroup
              label="Phone"
              type="text"
              name="phone"
              onChangeHandler={onChangeHandler}
            />
            <button className="mt-3 btn btn-primary" type="submit">
              Add client
            </button>
          </form>
        </div>
        {clients?.length !== 0 ? (
          <div style={{ margin: "auto" }} className="mt-4 col-12 col-lg-7">
            <div>
              <div style={{ width: "70%", float: "left" }}>
                <InputGroup
                  label="Search"
                  type="text"
                  name="search"
                  onChangeHandler={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <div style={{ marginLeft: "10px", width: "20%", float: "left" }}>
                <label for="Email" className="form-label">
                  Search by
                </label>
                <select
                  value={searchBy}
                  onChange={(e) => {
                    setSearchBy(e.target.value);
                    console.log(searchBy);
                  }}
                  className="form-control"
                >
                  <option value="id">ID</option>
                  <option value="email">Email</option>
                  <option value="firstName">First name</option>
                  <option value="lastName">Last name</option>
                  <option value="age">Age</option>
                </select>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Email</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Adresse</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients
                  ?.filter((client) => {
                    const { email, firstName, lastName, id } = client;
                    if (search === "") {
                      return client;
                    } else if (
                      searchBy === "id" &&
                      id.toString().includes(search)
                    ) {
                      return client;
                    } else if (
                      searchBy === "email" &&
                      email.toLowerCase().includes(search.toLocaleLowerCase())
                    ) {
                      return client;
                    } else if (
                      searchBy === "firstName" &&
                      firstName
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return client;
                    } else if (
                      searchBy === "lastName" &&
                      lastName
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return client;
                    }
                  })
                  .map(({ email, lastName, firstName, adresse, phone, id }) => (
                    <RowDetails
                      Email={email}
                      Lastname={lastName}
                      Firstname={firstName}
                      Adresse={adresse}
                      Phone={phone}
                      key={id}
                      id={id}
                      OnDelete={OnDelete}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "auto",
            }}
            className="mt-5 col-12 col-lg-7"
          >
            You have no clients for now.
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
