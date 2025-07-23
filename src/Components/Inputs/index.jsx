import React from "react";

const Input = ({ name, hint, required, type, value, onChangeListener }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={hint}
      className="auth-input"
      required={required}
      value = {value}
      onChange={onChangeListener}
    />
  );
};

export default Input;
