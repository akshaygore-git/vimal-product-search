import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Button,
  Checkbox,
} from "@mui/material";
import CommonLabel from "./CommonLabel/CommonLabel";

const Dropdown = ({
  label,
  getOptionLabel,
  getOptionValue,
  isRequired,
  selectedValue,
  onChange,
  dataSet,
  helperText,
  name,
}) => {
  const handleChange = (e) => onChange(e.target.value);
  const check = (val) => {
    // console.log("Inside useEffect of dropdown =====>, getgetOptionValue == ", getgetOptionValue, " selectedValue == ", val, " dataSet == ", dataSet);
    if (getOptionValue && dataSet) {
      const val1 = dataSet?.filter((val2) => val2[getOptionValue] == val);
      console.log("filtered data =====>", val1, ...val1, typeof val1[0]);
      return val1[0] ? val1[0] : null;
    } else {
      // console.log("===== Inside else part =======");
      return val ? val : null;
    }
  };

  return (
    <>
      <div>
        <CommonLabel label={label} mandatory={isRequired} />
        <Select
          multiple
          name={name}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedValue}
          label="Age"
          size="small"
          onChange={handleChange}
          style={{ width: "100%", fontSize: "16px" }}
         
        >
          <MenuItem value="" style={{ fontSize: '16px' }}>
            <em>Select</em>
          </MenuItem>
          {dataSet?.length > 0 &&
            dataSet?.map((val) => {
              return (
                <MenuItem value={val[getOptionValue]} style={{ fontSize: '16px' }}>
                {/* <Checkbox checked={val[getOptionValue].indexOf(val[getOptionLabel]) > -1} /> */}
                  {val[getOptionLabel]}
                </MenuItem>
              );
            })}
          <div>Selected Options:</div>
          {selectedValue.map((option) => (
            <div key={option}>{option}</div>
          ))}
        </Select>
      </div>
    </>
  );
};

export default Dropdown;
