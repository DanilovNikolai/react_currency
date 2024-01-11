import React, { useState, useEffect, useRef } from "react";
import { Block } from "./Block";
import "./index.scss";
import arrowsLeftRightIcon from "../src/assets/arrows_left_&_right.svg";
import arrowsUpDownIcon from "../src/assets/arrows_up_&_down.svg";

function App() {
  const ratesRef = useRef({});

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("RUB");
  const [fromPrice, setFromPrice] = useState(1);
  const [toPrice, setToPrice] = useState(0);

  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/49e5b52229b0f1d1dc90df14/latest/USD"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.conversion_rates);
        ratesRef.current = data.conversion_rates;
        onChangeFromPrice(1);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  function onChangeFromPrice(value) {
    const result =
      (value / ratesRef.current[fromCurrency]) * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  }

  function onChangeToPrice(value) {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  }

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <div className="arrows">
        {window.innerWidth >= 900 ? (
          <img src={arrowsLeftRightIcon} alt="" />
        ) : (
          <img src={arrowsUpDownIcon} alt="" />
        )}
      </div>
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
