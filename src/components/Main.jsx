import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Main() {
  const [state, setState] = useState("tajikistan");
  const [state2, setState2] = useState("");
  const [state3, setState3] = useState(null);
  const [state4, setState4] = useState("");
  const [state6, setState6] = useState(true);
  const [closeState, setCloseState] = useState(false);

  const api_url = "https://restcountries.com/v3.1/name/";

  useEffect(() => {
    apiBtn();
  }, []);

  const func = (e) => {
    if (e.keyCode == 13) {
      apiBtn();
    } else if (e.keyCode == 27) {
      setState2("");
      console.log("eee");
    }
  };

  const apiBtn = () => {
    fetch(`${api_url}${state}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.length > 0){
        console.log(data);
        setState3(data[0]);
        setState4(data[0].languages);
       
        }else{
            setState6(false)
            console.log('No');
        }
       
      });
  };
  const keyUpFunc = () => {
    if (state2 === "") {
      setCloseState(false);
      setState6(false);
    } else {
      setCloseState(true);
      setState6(true);
    }
  };
  const onChangeFunc = (e) => {
    setState(e.target.value);
    setState2(e.target.value);
  };
  const languages = Object.values(state4).toString().split(",").join(", ");

  const closeBtn = () => {
    setState2("");
    setCloseState(false);
    setState6(false);
  };

  return (
    <div className="main">
      <div className="form">
        <button onClick={apiBtn} className="searchBtn">
          <i className="fas fa-search"></i>
        </button>
        <input
          onChange={onChangeFunc}
          onKeyDown={func}
          type="text"
          placeholder="Search for a Country"
          onKeyUp={keyUpFunc}
          value={state2}
        />
        <i
          className={`fas fa-times ${closeState ? "block" : "hidden"}`}
          id="close"
          onClick={closeBtn}
        ></i>
      </div>
      {state6 ? (
        <div className="main_part">
          <div className="image">
            <img src={`${state3?.flags.svg}`} alt="" />
          </div>
          <div className="info">
            <h2 className="country_title">{state3?.name.common}</h2>
            <div className="infos">
              <div className="first_row">
                <p className="official_name">
                  Official Name : <span>{state3?.name.official}</span>
                </p>
                <p className="population">
                  Population :{" "}
                  <span>{state3?.population.toLocaleString()}</span>
                </p>
                <p className="capital">
                  Capital City : <span>{state3?.capital[0]}</span>
                </p>
                <p className="continent">
                  Continent : <span>{state3?.continents[0]}</span>
                </p>
              </div>
              <div className="second_row">
                <p className="region">
                  Sub Regions : <span>{state3?.subregion}</span>
                </p>
                <p className="area">
                  Area :{" "}
                  <span>
                    {" "}
                    {`${state3?.area.toLocaleString()} km`}
                    <sup>2</sup>
                  </span>
                </p>

                <p className="languages">
                  Languages : <span> {languages}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="main_part">
            <h2 className="results">No results found</h2>
        </div>
      )}
      <footer>
            <h3 className="name">
                <a href="https://asliddin.com/">Asliddin Amirov </a>&copy;2022 | All
                rights reserved
            </h3>
        </footer>
    </div>
  );
}
