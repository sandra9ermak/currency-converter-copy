import axios from "axios";

// axios.defaults.baseURL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/";
axios.defaults.baseURL = "https://api.privatbank.ua/p24api/";

export const getCurrentCurrency = () => {
  return (
    axios
      // .get(`exchangenew?json`)
      .get(`pubinfo?json&exchange&coursid=5`)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      })
  );
};

// https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5
