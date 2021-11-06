import React, { useEffect } from "react";
import Button from "../Components/Button";

export default function Buttons(props) {
  const [clicked, setClicked] = props.function1;
  const [numArr, setNumArr] = props.function2;
  const [num, setNum] = props.function3;
  const [second, setSecond] = props.function4;
  const [m, setM] = props.function5;
  //  const [finished, setFinished] = props.function6;
  const [message, setMessage] = props.function7;
  const addNum = (a) => props.addNum(a);

  useEffect(() => {
    if (
      numArr.toString() === "I,n,f,i,n,i,t,y" ||
      numArr.toString() === "-,I,n,f,i,n,i,t,y"
    ) {
      setMessage("Overflow");
    }
  }, [numArr, message, setMessage]);
  const addNumber = (icon) => {
    if (clicked.some((e) => e) && !second) {
      setNumArr([icon]);
      setM(true);
      setSecond(true);
    } else {
      if (numArr.length === 1 && numArr[0] === "0") setNumArr([icon]);
      else addNum(icon);
    }
  };
  const getValue = (arr) => {
    let num = "";
    for (let i = 0; i < arr.length; i++) num += arr[i];
    return Number(num);
  };
  const operation = (numArr, clicked) => {
    setSecond(false);
    setNum(getValue(numArr));
    if (m) {
      if (clicked[0]) {
        setMessage("");
        let newValue = getValue(numArr) + num;
        setNumArr(Array.from(newValue.toString()));
        setNum(newValue);
      }
      if (clicked[1]) {
        setMessage("");
        let newValue = num - getValue(numArr);
        setNumArr(Array.from(newValue.toString()));
        setNum(newValue);
      }
      if (clicked[2]) {
        setMessage("");
        let newValue = getValue(numArr) * num;
        setNumArr(Array.from(newValue.toString()));
        setNum(newValue);
      }
      if (clicked[3]) {
        setMessage("");
        if (getValue(numArr) === 0) {
          setMessage("divided by 0");
        } else {
          let newValue = num / getValue(numArr);
          setNumArr(Array.from(newValue.toString()));
          setNum(newValue);
        }
      }
    } else {
      setMessage("");
      setM(true);
      if (clicked[0]) {
        let newValue = getValue(numArr);
        setNum(Array.from(newValue.toString()));
      }
      if (clicked[1]) {
        let newValue = getValue(numArr);
        setNum(Array.from(newValue.toString()));
      }
      if (clicked[2]) {
        let newValue = getValue(numArr);
        setNum(Array.from(newValue.toString()));
      }
      if (clicked[3]) {
        setMessage("");
        if (getValue(numArr) === 0) {
          setMessage("divided by 0");
        } else {
          let newValue = getValue(numArr);
          setNum(Array.from(newValue.toString()));
        }
      }
    }
  };
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>
              <Button
                icon="+"
                onClick={() => {
                  setClicked([true, false, false, false]);
                  operation(numArr, clicked);
                }}
              />
            </th>
            <th>
              <Button
                icon="-"
                onClick={() => {
                  setClicked([false, true, false, false]);
                  operation(numArr, clicked);
                }}
              />
            </th>
            <th>
              <Button
                icon="x"
                onClick={() => {
                  setClicked([false, false, true, false]);
                  operation(numArr, clicked);
                }}
              />
            </th>
            <th>
              <Button
                icon="÷"
                onClick={() => {
                  setClicked([false, false, false, true]);
                  operation(numArr, clicked);
                }}
              />
            </th>
            <th>
              <Button
                icon="="
                onClick={() => {
                  if (!m) {
                    setNum(getValue(numArr));
                  } else {
                    if (clicked[0]) {
                      let newValue = num + getValue(numArr);
                      setNumArr(Array.from(newValue.toString()));
                    }
                    if (clicked[1]) {
                      let newValue = num - getValue(numArr);
                      setNumArr(Array.from(newValue.toString()));
                    }
                    if (clicked[2]) {
                      let newValue = num * getValue(numArr);
                      setNumArr(Array.from(newValue.toString()));
                    }
                    if (clicked[3]) {
                      let newValue = num / getValue(numArr);
                      setNumArr(Array.from(newValue.toString()));
                    }
                  }
                  setM(false);
                  setSecond(false);
                  setClicked([false, false, false, false]);
                  setMessage("");
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Button
                icon="7"
                onClick={() => {
                  addNumber("7");
                  setMessage("");
                }}
              />
            </td>
            <td>
              <Button
                icon="8"
                onClick={() => {
                  addNumber("8");
                  setMessage("");
                }}
              />
            </td>
            <td>
              <Button
                icon="9"
                onClick={() => {
                  addNumber("9");
                  setMessage("");
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button
                icon="4"
                onClick={() => {
                  addNumber("4");
                  setMessage("");
                }}
              />
            </td>
            <td>
              <Button
                icon="5"
                onClick={() => {
                  addNumber("5");
                  setMessage("");
                }}
              />
            </td>
            <td>
              <Button
                icon="6"
                onClick={() => {
                  addNumber("6");
                  setMessage("");
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button
                icon="1"
                onClick={() => {
                  addNumber("1");
                  setMessage("");
                }}
              />
            </td>
            <td>
              <Button
                icon="2"
                onClick={() => {
                  addNumber("2");
                  setMessage("");
                }}
              />
            </td>
            <td>
              <Button
                icon="3"
                onClick={() => {
                  addNumber("3");
                  setMessage("");
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button
                icon="0"
                onClick={() => {
                  setMessage("");
                  addNumber("0");
                  if (
                    clicked[3] &&
                    (numArr.some((e) => e === "." || numArr.length === 0) ||
                      numArr.length === 1)
                  ) {
                    setMessage("divided by 0");
                  }
                }}
              />
            </td>
            <td>
              <Button
                icon="."
                onClick={() => {
                  setMessage("");
                  if (!numArr.some((n) => n === ".")) {
                    addNum(".");
                  }
                }}
              />
            </td>
            <td>
              <Button
                icon="AC"
                onClick={() => {
                  setNumArr(["0"]);
                  setMessage("");
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
