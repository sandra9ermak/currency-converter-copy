import s from "./Header.module.css";
import EU from "../../images/EU.png";
import USA from "../../images/USA.png";
import { getCurrentCurrency } from "../../api";

import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    getCurrentCurrency().then((results) => {
      const newArray = results.filter(
        (el) => el.ccy === "USD" || el.ccy === "EUR"
      );
      setCurrency(newArray);
    });
  }, []);

  return (
    <header className={s.header}>
      <div className={s.headerDiv}>
        <p className={s.logo}>CurrencyExchange</p>
        <div className={s.currencyDiv}>
          <ul className={s.currencyNameList}>
            <li className={s.currencyNameListItem}>
              <img src={USA} width="40" height="30" alt="USA-flag" />
            </li>
            <li className={s.currencyNameListItem}>
              <img src={EU} width="40" height="30" alt="EU-flag" />
            </li>
          </ul>
          <div>
            <p className={s.amountText}>Buy</p>
            <ul className={s.amountList}>
              {currency.length !== 0 &&
                currency.map((item) => (
                  <li className={s.amountListItem}>
                    {Math.floor(item.buy * 100) / 100}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className={s.changeText}>Sale</p>
            <ul className={s.changeList}>
              {currency.length !== 0 &&
                currency.map((item) => (
                  <li className={s.amountListItem}>
                    {Math.floor(item.sale * 100) / 100}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
