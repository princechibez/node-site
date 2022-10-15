import React, { useEffect, useLayoutEffect, useState } from "react";
import Card from "../components/card";
import classes from "./homepage.module.css";
import axios from "axios";
import Spinner from "../components/spinner/spinner";
import lazyloader from "../utility/lazyloader";
import sorter from "../assets/images/sorter.png";
import list from "../assets/images/list.png";
import grid from "../assets/images/grid.png";
import search from "../assets/images/search.png";
import ErrorHandler from "../utility/errorHandler";
import Modal from "../ui/modal/modal";

const cardLazyLoader = lazyloader(() => {
  return import("../components/card");
});

const Homepage = (props) => {
  const [filterdUsers, setfilteredUsers] = useState([]);
  const colorShuffle = ["#E8CDAD", "#E1D3C7", "#A7B8A8"];
  const [searchMessage, setSearchMessage] = useState(null);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  useLayoutEffect(() => {
      const fetchData = () => {
          //   try {
      setLoading(true); //Set loader before fetching data
      axios
        .get("https://randomuser.me/api/?results=10")
        .then((res) => {
          setLoading(false);
          setfilteredUsers(res.data.results);
          setUsers(res.data.results);
        })
        //   }
        .catch((err) => {
          setLoading(false);
          setError(err);
        });
    };
    fetchData();
}, []);


  //   function for randomly choosing colors
  const randomColorPicker = () => {
    const randomColor = Math.floor(Math.random() * colorShuffle.length);
    return colorShuffle[randomColor];
  };

  // Function for changing mode
  const changeViewMode = () => {
    if (viewMode === "grid") {
      setViewMode("list");
    }
    if (viewMode === "list") {
      setViewMode("grid");
    }
  };

  //   Search by name filter function
  const searchByName = (e) => {
    if (!users) return;
    const query = e.target.value;
    // Create copy of item list
    let newList = [...filterdUsers];
    let updatedList = [];
    // Include all elements which includes the search query
    updatedList = newList.filter((item) => {
      setSearchMessage(null);
      const name = item.name.first + " " + item.name.last;
      return name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    if (updatedList.length === 0) {
      setSearchMessage("No user matched your search");
    }
    if (query === "") {
      setSearchMessage(null);
    }

    // Trigger render with updated values
    setUsers(updatedList);
  };

  return (
    <section className={classes.body_wrapper}>
      {/* <Modal show /> */}
      <div className={classes.top_area}>
        <h1>Meet the team</h1>
        <div className={classes.functionality_controllers}>
          <div>
            <img src={search} height={15} width={15} />
            <input
              type="text"
              onKeyUp={searchByName}
              placeholder="Search for users"
            />
          </div>
          <div>
            <img src={sorter} height={30} width={30} />
            <img
              onClick={changeViewMode}
              src={viewMode === "grid" ? grid : list}
              height={30}
              width={30}
            />
          </div>
        </div>
      </div>
      <main
        className={viewMode == "grid" ? classes.grid_area : classes.list_view}
      >
        {loading && <Spinner />}
        {users &&
          !loading &&
          users.map((e, i) => {
            return (
              // Load card lazily
              <Card
                key={i}
                mode={viewMode}
                color={randomColorPicker()}
                name={e.name ? e.name.first + " " + e.name.last : ""}
                picture={e.picture ? e.picture.medium : ""}
                city={e.location.city}
              />
            );
          })}
        {searchMessage && (
          <h3 style={{ color: "#292929", textAlign: "center", padding: "20px" }}>
            {searchMessage}
          </h3>
        )}
        {/* {!loading && !users && <h3>No users</h3>} */}
      </main>
    </section>
  );
};

export default ErrorHandler(Homepage, axios);
