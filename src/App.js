import { useEffect, useState } from "react";
// Importing Components..
import { Cards } from "./Components/Cards/Cards";
import { Chart } from "./Components/Chart/Chart";
import { CountryPicker } from "./Components/CountryPicker/CountryPicker";

// Importing CSS for APP
import styles from "./App.module.css";

// Importing Image
import cronaimage from './images/image.png'

export const App = () => {
  // Managing states for global data & dailyData
  const [globalData, setGlobalData] = useState({});
  const [dailyData, setDailyData] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("global");

  const url = "https://covid19.mathdro.id/api";

  async function getGlobalData(selectedCountry) {
    let changeableURl = url;

    switch (selectedCountry) {
      case "global":
        changeableURl = "https://covid19.mathdro.id/api";
        break;
      default:
        changeableURl = `${url}/countries/${selectedCountry}`;
    }

    const globalResponse = await fetch(`${changeableURl}`);
    const globalData = await globalResponse.json();

    // Filtering out the "Required globalData" out of JSON format of our "API"
    const requiredGlobalData = {
      confirmed: globalData.confirmed,
      recovered: globalData.recovered,
      deaths: globalData.deaths,
      lastUpdate: globalData.lastUpdate,
    };
    setGlobalData(requiredGlobalData);
  }

  async function getDailyData() {
    const response = await fetch(`${url}/daily`);
    const alldata = await response.json();
    const data = alldata.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    setDailyData(data);
  }

  async function countriesNames() {
    const response = await fetch(`${url}/countries`);
    const { countries } = await response.json();
    const realData = countries.map((country) => country.name);
    setCountryNames(realData);
  }

  useEffect(() => {
    getGlobalData(selectedCountry);
    getDailyData();
    countriesNames();
  }, []);

  // Function for handling Change in Selection CoutryPicker
  const handleCountryChange = async (selectedCountry) => {
    // Calling the function again with selectedCOuntry selected by CountryPicker Component
    getGlobalData(selectedCountry);
    setSelectedCountry(selectedCountry);
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={cronaimage} alt="covid-19-text"/>
      <Cards data={globalData} />
      <CountryPicker
        data={countryNames}
        handleCountryChange={handleCountryChange}
      />
      <Chart
        data={dailyData}
        countryData={globalData}
        country={selectedCountry}
      />
    </div>
  );
};
