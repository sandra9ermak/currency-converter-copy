import s from "./CurrencyExchange.module.css";
import swap from "../../images/right-arrow.png";
import { getCurrentCurrency } from "../../api";

import { useState } from "react";
import { useEffect } from "react";

const CurrencyExchange = () => {
  const [firstCurrency, setFirstCurrency] = useState("");
  const [secondCurrency, setSecondCurrency] = useState("");
  const [resultFrom, setResultFrom] = useState("");
  const [resultTo, setResultTo] = useState("");
  const [usdBuy, setUsdBuy] = useState("");
  const [eurBuy, setEurBuy] = useState("");
  const [usdSale, setUsdSale] = useState("");
  const [eurSale, setEurSale] = useState("");
  // const [result, setResult] = useState("");
  // const [UAH, setUAH] = useState("");

  // const usd = usdSale / eurSale;
  // const eur = eurSale / usdSale;

  useEffect(() => {
    getCurrentCurrency().then((results) => {
      results.filter((el) => {
        if (el.ccy === "USD") {
          setUsdBuy(el.buy);
          setUsdSale(el.sale);
        }
        if (el.ccy === "EUR") {
          setEurBuy(el.buy);
          setEurSale(el.sale);
        }
      });
    });
  }, []);

  // console.log("eurBuy", eurBuy);
  // console.log("usdBuy", usdBuy);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstCurrency":
        setFirstCurrency(value);
        break;
      case "secondCurrency":
        setSecondCurrency(value);
        break;
      default:
        return;
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();
    // setSecondCurrency("");
    if (resultFrom === "USDfrom" || resultTo === "UAHto") {
      const res = firstCurrency * usdBuy;
      setSecondCurrency(res);
    } else if (resultFrom === "EURfrom" || resultTo === "UAHto") {
      const res = firstCurrency * eurBuy;
      setSecondCurrency(res);
    } else if (resultFrom === "UAHfrom" || resultTo === "USDto") {
      const res = firstCurrency / usdSale;
      // console.log("firstCurrency", firstCurrency);
      // console.log("usdSale", usdSale);
      setSecondCurrency(res);
    } else if (resultFrom === "UAHfrom" || resultTo === "EURto") {
      const res = firstCurrency / eurSale;
      // console.log("firstCurrency", firstCurrency);
      // console.log("eurSale", eurSale);
      setSecondCurrency(res);
    } else if (resultFrom === "USDfrom" || resultTo === "EURto") {
      setSecondCurrency(firstCurrency * (usdSale / eurSale));
    } else if (resultFrom === "EURfrom" || resultTo === "USDto") {
      const res = firstCurrency * (eurSale / usdSale);
      setSecondCurrency(res);
      // } else {
      //   setSecondCurrency(firstCurrency);
    }
  };
  // console.log("RESULT", result);
  console.log(
    "firstCurrency * (usdSale / eurSale)",
    firstCurrency * (usdSale / eurSale)
  );
  console.log("firstCurrency", firstCurrency);
  console.log("usdSale", usdSale);
  console.log("eurSale", eurSale);

  // console.log("eurBuy", eurBuy);
  // console.log("eurSale", eurSale);

  const currencyFrom = (event) => {
    console.log("event", event.currentTarget.value);
    const value = event.currentTarget.value;
    if (value === "UAHfrom") {
      setResultFrom(value);
    } else if (value === "EURfrom") {
      setResultFrom(value);
    } else if (value === "USDfrom") {
      setResultFrom(value);
    }
  };
  // console.log("resultFrom", resultFrom);

  const currencyTo = (e) => {
    console.log("e", e.currentTarget.value);
    const value = e.currentTarget.value;
    if (value === "UAHto") {
      setResultTo(value);
    } else if (value === "EURto") {
      setResultTo(value);
    } else if (value === "USDto") {
      setResultTo(value);
    }
  };
  // console.log("resultTo", resultTo);

  return (
    <main className={s.mainContent}>
      <div className={s.container}>
        <form className={s.form} onSubmit={formSubmit}>
          <label>
            <div className={s.currencyAction}>
              <p>Amount</p>
              <p>From</p>
            </div>
            <input
              className={s.inputForm}
              placeholder="1.00"
              name="firstCurrency"
              value={firstCurrency}
              onChange={handleInputChange}
              //   type="number"
              required
            />
            <select
              name="select"
              className={s.selectForm}
              onChange={currencyFrom}
              required
            >
              <option name="UAH" value="UAHfrom">
                UAH
              </option>
              {/* <option name="USD" value={USD}> */}
              <option name="USD" value="USDfrom">
                USD
              </option>
              <option name="EUR" value="EURfrom">
                EUR
              </option>
            </select>
          </label>
          {/* <p className={s.exchangeText}>Exchange for</p> */}
          <span className={s.spanArrow}>
            <img src={swap} alt="swap" width="20" height="20" />
          </span>
          <label className={s.secondLabel}>
            <div className={s.secondInput}>
              <p className={s.secondInputText}>To</p>
              <input
                className={s.inputForm}
                placeholder="1.00"
                name="secondCurrency"
                value={secondCurrency}
                onChange={handleInputChange}
                //   type="number"
              />
            </div>
            <select
              name="select"
              className={s.secondSelect}
              onChange={currencyTo}
              required
            >
              <option name="UAH" value="UAHto">
                UAH
              </option>
              <option name="USD" value="USDto">
                USD
              </option>
              <option name="EUR" value="EURto">
                EUR
              </option>
            </select>
          </label>
          <button type="submit" className={s.btnSubmitForm}>
            Convert
          </button>
        </form>
        {/* <div className={s.resultDiv}>
          <p>Result: {result}</p>
        </div> */}
      </div>
    </main>
  );
};

export default CurrencyExchange;
