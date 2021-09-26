import styles from "./CountryPicker.module.css";
import { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

export const CountryPicker = ({ data, handleCountryChange }) => {
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="global">Global</option>
        {data.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
