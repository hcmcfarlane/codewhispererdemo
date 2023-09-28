// React component for start page with an example toast
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

// React component that renders a simple integer calulcator
// supporting addition, subtraction, multiplication and division.
//
// example:
//   <CalculatorPage />

export default function CalculatorPage() {
  // internal documentation:
  //    first: <tbd> please provide more documentation
  const [first, setFirst] = useState("");
  const [lastOperand, setLastOperand] = useState("");
  const [second, setSecond] = useState("0");
  const [result, setResult] = useState("");

  function performIntegerOperation(first, second, operand) {
    switch (operand) {
      case "add":
        return first + second;
      case "sub":
        return first - second;
      case "mul":
        return first * second;
      case "div":
        return first / second;
      default:
        return 0;
    }
  }

  // invoked when clear button is clicked
  const handleClear = () => {
    setFirst("");
    setLastOperand("");
    setSecond("0");
    setResult("");
  };

  // <tbd> add documentation
  const handleDigit = (digit) => {
    setResult("");
    setSecond(second.toString().replace(/^0+/, "") + digit);
  };

  // <tbd> add documentation
  const handleOperand = (operand) => {
    if (lastOperand) {
      setFirst(
        Math.floor(
          performIntegerOperation(
            parseInt(first),
            parseInt(second),
            lastOperand
          )
        )
      );
    } else if (result) {
      setFirst(result);
    } else {
      setFirst(second);
    }
    setLastOperand(operand);
    setSecond("0");
    setResult("");
  };

  // <tbd> add documentation
  const handleEquals = () => {
    if (lastOperand) {
      setResult(
        Math.floor(
          performIntegerOperation(
            parseInt(first),
            parseInt(second),
            lastOperand
          )
        )
      );
    } else if (second) {
      setResult(second);
    }
    setFirst("");
    setLastOperand("");
    setSecond("");
  };

  // <tbd> add documentation
  const operandText = {
    add: "+",
    sub: "-",
    mul: "*",
    div: "/",
    clear: "AC",
    equals: "=",
  };

  const noBreakSpace = "\u0040";

  // render the calculator page
  return (
    <Card className="shadow" style={{ width: "300px" }}>
      <div className="bg-black text-white text-end p-2 h2 text-nowrap overflow-hidden ">
        <div className="bg-black text-white text-end fs-6">
          <span data-testid="history">
            {first && lastOperand
              ? first + (operandText[lastOperand] || "")
              : noBreakSpace}
          </span>
        </div>
        <span data-testid="result">{result || second || "0"}</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "10px",
          padding: "10px",
        }}
      >
        {["7", "8", "9"].map((digit) => (
          <Button
            className="btn btn-light border border-dark"
            onClick={() => handleDigit(digit)}
          >
            {digit}
          </Button>
        ))}

        <Button
          className="btn btn-secondary"
          onClick={() => handleOperand("div")}
        >
          {operandText.div}
        </Button>

        {["4", "5", "6"].map((digit) => (
          <Button
            className="btn btn-light border border-dark"
            onClick={() => handleDigit(digit)}
          >
            {digit}
          </Button>
        ))}
        <Button
          className="btn btn-secondary"
          onClick={() => handleOperand("mul")}
        >
          {operandText.mul}
        </Button>

        {["1", "2", "3"].map((digit) => (
          <Button
            className="btn btn-light border border-dark"
            onClick={() => handleDigit(digit)}
          >
            {digit}
          </Button>
        ))}

        <Button
          className="btn btn-secondary"
          onClick={() => handleOperand("sub")}
        >
          {operandText.sub}
        </Button>

        <Button
          className="btn btn-light border border-dark"
          onClick={() => handleDigit("0")}
        >
          0
        </Button>

        <Button className="btn btn-primary" onClick={() => handleEquals()}>
          {operandText.equals}
        </Button>
        <Button className="btn btn-danger" onClick={() => handleClear()}>
          {operandText.clear}
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => handleOperand("add")}
        >
          {operandText.add}
        </Button>
      </div>
    </Card>
  );
}
