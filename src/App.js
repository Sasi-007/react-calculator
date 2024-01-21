import React, { useState, useEffect } from 'react';
import Wrapper from "./components/Wrapper";
import Screen from './components/Screen';
import Button from './components/Button';
import ButtonBox from './components/ButtonBox';
import MiniScreen from './components/MiniScreen';

const btnValues = [
  ["C","+-","%","/"],
  [7,8,9,"X"],
  [4,5,6,"-"],
  [1,2,3,"+"],
  [0,".","="],
];

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
    firstVal: '',
    secondVal: '',
    entire: '',
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    let total;
  
    if (!calc.sign) {
      total = calc.firstVal + value;
      setCalc({
        ...calc,
        firstVal: total,
        num: toLocaleString(Number(removeSpaces(total))), // Update num with the new value
        res: !calc.sign ? 0 : calc.res,
      });
    } else {
      total = calc.secondVal + value;
      setCalc({
        ...calc,
        secondVal: total,
        num: toLocaleString(Number(removeSpaces(total))), // Update num with the new value
      });
    }

    setCalc(prevCalc => ({
      ...prevCalc,
      entire: getOverall(),
    }));
  };
  

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "", 
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
      firstVal: '',
      secondVal: '',
      entire: '',
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const equalsClickHandler = () => {
    if(calc.sign && calc.num) {
      const math = (a,b,sign) => sign === "+" ? a+b : sign === "-" ? a - b : sign === "X" ? a*b : a/b;
      setCalc ({
        ...calc,
        res: calc.num === "0" && calc.sign === "/" ? "Cant divide with 0" : toLocaleString(math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign)),
        // sign: "",
        num: 0,
        entire: getOverall(),
      });
    }
  };

  useEffect(() => {
    // Log the updated state after each render
    console.log("Updated state:", calc);
  }, [calc]);

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const getOverall = () => {
    const {
      firstVal,
      secondVal,
      sign,
    } = calc; 
    return firstVal + ' ' + sign + ' ' + secondVal;
  };

  return (
    <Wrapper>
      <MiniScreen value={getOverall()} />
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn,i) => {
            return (
              <Button 
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
