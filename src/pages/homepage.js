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

const cardLazyLoader = lazyloader(() => {
  return import("../components/card");
});

const Homepage = () => {
  const colorShuffle = ["#E8CDAD", "#E1D3C7", "#A7B8A8"];
  const [users, setUsers] = useState(null);
  const [sortedUsers, setSortedUsers] = useState(null);
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
          setUsers(res.data.results);
        })
        //   }
        .catch((err) => {
          console.log(err);
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
    // console.log(name.includes(e.target.value))
    const filterMatch = users.find((user) => {
      const name = user.name.first + " " + user.name.last;
      return name.includes(e.target.value);
    });
    console.log(filterMatch);
  };
  return (
    <section className={classes.body_wrapper}>
      <div className={classes.top_area}>
        <h1>Meet the team</h1>
        <div className={classes.functionality_controllers}>
          <div>
            <img src={search} height={20} width={20} />
            <input type="text" onChange={searchByName} />
          </div>
          <div>
            <img src={sorter} height={30} width={30} />
            <img
              onClick={changeViewMode}
              src={viewMode === "grid" ? grid : list}
              height={30} width={30}
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
          users.map((e) => {
            return (
              // Load card lazily
              <Card
                mode={viewMode}
                color={randomColorPicker()}
                name={e.name ? e.name.first + " " + e.name.last : ""}
                picture={e.picture ? e.picture.medium : ""}
                city={e.location.city}
              />
            );
          })}
      </main>
    </section>
  );
};

export default Homepage;
