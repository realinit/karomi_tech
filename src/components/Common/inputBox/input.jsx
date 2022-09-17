import React, { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "./style.less";

const InputBox = (props) => {
  const {
    type = "",
    name = "",
    value = "",
    placeholder = "",
    className = "",
    handleChange,
    maxlength = "10000",
    disabled = false,
    required = true,
    format = "DD-MMM-YYYY",
    maxDate = moment(),
    dateWrapClass = ''
  } = props;
  if (type == 'date') {
    return (
      <div className={`dateWrap ${dateWrapClass}`}>
        <DatePicker
          value={value ? moment(value).format(format) : ''}
          onChange={(date) => handleChange(date)}
          format={format}
          maxDate={maxDate}
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown={true}
          yearDropdownItemNumber={100}
          dropdownMode="scroll"
          className={className}
          placeholderText={placeholder}
          {...props}
        />
      </div>
    )
  } else {
    return (
      <Fragment>
        <input
          {...props}
          type={type}
          id={name}
          name={name}
          className={`formField_input ${className}`}
          placeholder={placeholder}
          onChange={handleChange}
          maxLength={maxlength}
          defaultValue={value}
          value={value}
          disabled={disabled}
          required={required}
          autocomplete="off"
        />
      </Fragment>
    );
  }
};

export default InputBox;
