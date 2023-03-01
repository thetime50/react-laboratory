import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Picker extends Component<{
  value: string;
  onChange: (value: string) => void;
  options: string[];
}> {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  // https://reactjs.org/docs/context.html#classcontexttype
  static contextTypes = {
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  render() {
    const { value, onChange, options } = this.props;

    return (
      <span>
        <h1>{value} </h1>
        <select onChange={(e) => onChange(e.target.value)} value={value}>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    );
  }
}

// Picker.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
