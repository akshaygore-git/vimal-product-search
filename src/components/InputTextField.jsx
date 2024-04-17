import React from "react";
import { TextField, FormHelperText } from "@mui/material";

const InputTextField = ({
  label,
  isRequired,
  value,
  onChange,
  disabled,
  helperText,
  name,
  multiLine,
  rows,
  regex,
  errMessage,
  maxLength,
  minLength,
  placeholder,
  onFocus,
  onMouseDown
}) => {
  // const regEx = "^((?!>|<|--).)*$";
  const msg1 = "It should not contain following strings. i.e. ' < ' , ' > ' , ' -- ' etc. ";
  const handleChange = (e) => {
    if(e.target.validity.valid){
      e.target.setCustomValidity("");
    }else{
      if (regex) {
        errMessage && e.target.setCustomValidity(errMessage);
      } else {
        e.target.setCustomValidity(msg1);
      }
    }
    onChange(e?.target?.value);
  };
  
  return (
    <div className="inputpadding">
      {/* <CommonLabel label={label} mandatory={isRequired} /> */}
      <TextField
        type="text"
        name={name}
        label={label}
        id={"outlined"}
        variant="outlined"
        size="Medium"
        onChange={handleChange}
        onInput={(e)=> e.target.setCustomValidity("")}
        onFocus={onFocus}
        onMouseDown={onMouseDown}        
        placeholder={placeholder}
        value={value}
        required={isRequired}
        inputProps={{ pattern: regex && regex, maxLength: maxLength, minLength:minLength }}
        style={{ width: "100%" }}
        disabled={disabled}
        multiline={multiLine}
        rows={rows}
        InputProps={{
          style: { fontSize: '16px' } // Adjust the font size here
        }}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </div>
  );
};

export default InputTextField;
