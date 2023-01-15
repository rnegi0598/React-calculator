import styles from "./app.module.css";
import { useState } from "react";
function App() {
  const [result, setResult] = useState(0);
  const [firstOp, setFirstOp] = useState(0);
  const [secondOp, setSecondOp] = useState(0);
  const [operator, setOperator] = useState(null);
  // dot=0 means decimal input is disabled and dot=n means n decimal numbers after decimal point(helps in getting exp of 10 to divide with)
  const [dot, setDot] = useState(0);
  const [display, setDisplay] = useState("0");

  const updateOperand = (operand) => {
    // update first operand
    if (operator === null) {
      // handling decimal numbers
      if (dot !== 0) {
        if (firstOp < 0) {
          operand = parseFloat((firstOp - operand / 10 ** dot).toPrecision(5));
        } else {
          operand = parseFloat((firstOp + operand / 10 ** dot).toPrecision(5));
        }

        setDot((prevDot) => prevDot + 1);
      } else {
        operand = firstOp * 10 + operand;
      }
      setDisplay("" + operand);
      setFirstOp(operand);
    } else {
      if (dot !== 0) {
        if (secondOp < 0) {
          operand = parseFloat((secondOp - operand / 10 ** dot).toPrecision(5));
        } else {
          operand = parseFloat((secondOp + operand / 10 ** dot).toPrecision(5));
        }

        setDot((prevDot) => prevDot + 1);
      } else {
        operand = secondOp * 10 + operand;
      }
      setDisplay("" + firstOp + operator + operand);

      setSecondOp(operand);
    }

    setResult(operand);
  };

  const evaluate = () => {
   
    setDot(0);
    let res = 0;
    if (operator === "/") {
      res = parseFloat((firstOp / secondOp).toPrecision(5));
    } else if (operator === "*") {
      res = firstOp * secondOp;
      if (res % 1 !== 0) {
        res = parseFloat(res.toPrecision(5));
      }
    } else if (operator === "-") {
      res = firstOp - secondOp;
      if (res % 1 !== 0) {
        res = parseFloat(res.toPrecision(5));
      }
    } else if (operator === "+") {
      res = firstOp + secondOp;
      //if res is float, set its precision
      if (res % 1 !== 0) {
        res = parseFloat(res.toPrecision(5));
      }
    }

    setResult(res);
    // setFirstOp(res);
    setDisplay(res);

    setFirstOp(0);
    setSecondOp(0);
    setOperator(null);
  };

  const reset = () => {
    setResult(0);
    setOperator(null);
    setFirstOp(0);
    setSecondOp(0);
    setDot(0);
    setDisplay("");
  };

  const updateOperator = (opr) => {
    setOperator((prevOperator) => {
      // if any operator is clicked just after the result
      if (prevOperator === null && firstOp === 0 && secondOp === 0) {
        setFirstOp(result);
        if (opr === "%") {
          setDisplay(parseFloat((result / 100).toPrecision(5)) + "");
          setResult(parseFloat((result / 100).toPrecision(5)));
          setFirstOp(parseFloat((result / 100).toPrecision(5)));
        } else {
          setDisplay(result + opr);
        }
      } else {
        if (opr === "%") {
          setDisplay(parseFloat((firstOp / 100).toPrecision(5)) + "");
          setResult(parseFloat((firstOp / 100).toPrecision(5)));
          setFirstOp(parseFloat((firstOp / 100).toPrecision(5)));
        }
      }

      setOperator(opr === "%" ? "*" : opr);
    });
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.display}>
          <span className={styles.history}>{display===''?'0':display}</span>
        </div>

        <div
          onClick={() => {
            reset();
          }}
        >
          <span>C</span>
        </div>
        <div
          onClick={() => {
            setFirstOp(result * -1);
            setResult((prevResult) => prevResult * -1);
            setDisplay(result * -1);
          }}
        >
          <span>+/-</span>
        </div>
        <div
          onClick={() => {
            setFirstOp(result / 100);
            setResult((prevResult) => prevResult / 100);
            updateOperator("%");
            setDot(0);
          }}
        >
          {" "}
          <span>% </span>
        </div>
        <div
          className={styles.orange}
          onClick={() => {
            updateOperator("/");
            setDot(0);
            setDisplay((prevDisplay) => prevDisplay + "/");
          }}
        >
          <span>/ </span>
        </div>

        <div
          onClick={() => {
            updateOperand(7);
          }}
        >
          <span>7</span>
        </div>
        <div
          onClick={() => {
            updateOperand(8);
          }}
        >
          <span>8</span>
        </div>
        <div
          onClick={() => {
            updateOperand(9);
          }}
        >
          <span>9</span>
        </div>
        <div
          className={styles.orange}
          onClick={() => {
            updateOperator("*");
            setDot(0);
            setDisplay((prevDisplay) => prevDisplay + "*");
          }}
        >
          <span>*</span>
        </div>

        <div
          onClick={() => {
            updateOperand(4);
          }}
        >
          <span>4</span>
        </div>
        <div
          onClick={() => {
            updateOperand(5);
          }}
        >
          <span>5</span>
        </div>
        <div
          onClick={() => {
            updateOperand(6);
          }}
        >
          <span>6</span>
        </div>
        <div
          className={styles.orange}
          onClick={() => {
            updateOperator("-");
            setDot(0);
            setDisplay((prevDisplay) => prevDisplay + "-");
          }}
        >
          <span>-</span>
        </div>

        <div
          onClick={() => {
            updateOperand(1);
          }}
        >
          <span>1</span>
        </div>
        <div
          onClick={() => {
            updateOperand(2);
          }}
        >
          <span>2</span>
        </div>
        <div
          onClick={() => {
            updateOperand(3);
          }}
        >
          <span>3</span>
        </div>
        <div
          className={styles.orange}
          onClick={() => {
            updateOperator("+");
            setDot(0);
            setDisplay((prevDisplay) => prevDisplay + "+");
          }}
        >
          <span>+</span>
        </div>

        <div
          onClick={() => {
            updateOperand(0);
          }}
          className={styles.zero}
        >
          <span>0</span>
        </div>
        <div
          onClick={() => {
            setDot(1);
            setDisplay((prevDisplay) => {
              if(firstOp===0 && secondOp===0 ){
                return '0.';
              }
            
              return prevDisplay + "."
              }
              );
          }}
        >
          <span>.</span>
        </div>
        <div className={styles.orange} onClick={evaluate}>
          <span>=</span>
        </div>
      </div>
    </div>
  );
}

export default App;
