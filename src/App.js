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
      "http://api.exchangeratesapi.io/v1/latest?access_key=035c5f73845e6a22ea7415b83908a8a1"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.rates);
        ratesRef.current = data.rates;
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

  console.log(ratesRef.current);

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
