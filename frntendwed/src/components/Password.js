import React, { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";

const PasswordInput = () => {
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    symbol: false,
    number: false,
  });

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);

    // Check for requirements
    setValidation({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      number: /[0-9]/.test(value),
    });
  };

  return (
    <FormGroup>
      <Label for="password">Password:</Label>
      <Input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <div className="requirements">
        <p style={{ color: validation.length ? "green" : "red" }}>
          8 characters minimum
        </p>
        <p style={{ color: validation.uppercase ? "green" : "red" }}>
          Uppercase included
        </p>
        <p style={{ color: validation.lowercase ? "green" : "red" }}>
          Lowercase included
        </p>
        <p style={{ color: validation.symbol ? "green" : "red" }}>
          Symbol included
        </p>
        <p style={{ color: validation.number ? "green" : "red" }}>
          Number included
        </p>
      </div>
    </FormGroup>
  );
};

export default PasswordInput;
