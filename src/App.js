import styles from './app.module.css'
import {useState} from 'react';
function App() {
  const [result,setResult]=useState(0);
  const [firstOp,setFirstOp]=useState(0);
  const [secondOp,setSecondOp]=useState(0);
  const [operator,setOperator] =useState(null);
  const [dot,setDot] =useState(0);
  const [history,setHistory]=useState('0');

 const setOperand=(operand)=>{
   
    if(operator===null){
        if(dot!==0){
          if(firstOp<0){
            operand=parseFloat((firstOp-operand/(10**dot)).toPrecision(5));
          }else{
            operand=parseFloat((firstOp+operand/(10**dot)).toPrecision(5));
          }
          
          setDot(prevDot=>prevDot+1);
        }else{
          operand=firstOp*10+operand;
        }
        setHistory(''+operand);
        setFirstOp(operand);
        
    }else{
        if(dot!==0){ 
          if(secondOp<0){
            operand=parseFloat((secondOp-operand/(10**dot)).toPrecision(5));
          }else{
            operand=parseFloat((secondOp+operand/(10**dot)).toPrecision(5));
          }
          
          setDot(prevDot=>prevDot+1);
        }else{
          operand=secondOp*10+operand;

        }
        setHistory(''+firstOp+operator+operand);

        setSecondOp(operand);
    }
    
    setResult(operand);
 }

 const evaluate=()=>{
  setOperator('=');
  setDot(0);
  let res=0;
  if(operator==='/'){
    res=parseFloat((firstOp/secondOp).toPrecision(5));
  
  }else if(operator==='*'){
    res=firstOp*secondOp;
    if(res%1!==0){
      res=parseFloat((res).toPrecision(5));
    }
   
  }else if(operator==='-'){
    res=firstOp-secondOp;
    if(res%1!==0){
      res=parseFloat((res).toPrecision(5));
    }
      
  }else if(operator==='+'){
    res=firstOp+secondOp
    //if res is float, set its precision
    if(res%1!==0){
      res=parseFloat((res).toPrecision(5));
    }
   
  }

  setResult(res);
  // setFirstOp(res);
  setHistory(res);
  
  setFirstOp(0);
  setSecondOp(0);
  setOperator(null);

 }

 const reset=()=>{
  setResult(0);
  setOperator(null);
  setFirstOp(0);
  setSecondOp(0);
  setDot(0);
  setHistory('');
 }

 const updateOperator=(operator)=>{
    
   
    setOperator(
      (prevOperator)=>{
        if(prevOperator===null && firstOp===0 && secondOp===0){
          setFirstOp(result);
          if(operator==='%'){
            setHistory(parseFloat((result/100).toPrecision(5))+'');
            setResult(parseFloat((result/100).toPrecision(5)));
            setFirstOp(parseFloat((result/100).toPrecision(5)));
          }else{
            setHistory(result+operator);
          }
          
        }else{
          if(operator==='%'){
            setHistory(parseFloat((firstOp/100).toPrecision(5))+'');
            setResult(parseFloat((firstOp/100).toPrecision(5)));
            setFirstOp(parseFloat((firstOp/100).toPrecision(5)));
          }
        }

        setOperator(operator==='%'?'*':operator);
      }
    )
    
 }
  

  return (
    <div className={styles.app}>
    
    

      <div className={styles.container}>
        <div className={styles.display}>
         <span className={styles.history}>{history}</span>
          {/* <span>
          {result}{dot===1?'.':''}
          </span> */}
        </div>

        <div onClick={()=>{reset()}}><span>C</span></div>
        <div onClick={()=>{setFirstOp(result*-1);setResult(prevResult=>prevResult*-1);setHistory(result*-1)}}>
        <span>+/-</span>
        </div>
        <div onClick={()=>{setFirstOp(result/100);setResult(prevResult=>prevResult/100);updateOperator('%');  setDot(0);}}> <span>% </span></div>
        <div className={styles.orange} onClick={()=>{updateOperator('/'); setDot(0);setHistory(prevHistory=>prevHistory+'/')}}><span>/ </span></div>

        <div onClick={()=>{setOperand(7)}}><span>7</span></div>
        <div onClick={()=>{setOperand(8)}}><span>8</span></div>
        <div onClick={()=>{setOperand(9)}}><span>9</span></div>
        <div className={styles.orange} onClick={()=>{updateOperator('*');  setDot(0);setHistory(prevHistory=>prevHistory+'*')}}><span>*</span></div>

        <div onClick={()=>{setOperand(4)}}><span>4</span></div>
        <div onClick={()=>{setOperand(5)}}><span>5</span></div>
        <div onClick={()=>{setOperand(6)}}><span>6</span></div>
        <div className={styles.orange} onClick={()=>{updateOperator('-');  setDot(0);setHistory(prevHistory=>prevHistory+'-')}}><span>-</span></div>

        <div onClick={()=>{setOperand(1)}}><span>1</span></div>
        <div onClick={()=>{setOperand(2)}}><span>2</span></div>
        <div onClick={()=>{setOperand(3)}}><span>3</span></div>
        <div className={styles.orange} onClick={()=>{updateOperator('+');  setDot(0);setHistory(prevHistory=>prevHistory+'+')}}><span>+</span></div>

        <div onClick={()=>{setOperand(0)}} className={styles.zero}><span>0</span></div>
        <div onClick={()=>{setDot(1);setHistory(prevHistory=>prevHistory+'.')}}><span>.</span></div>
        <div className={styles.orange} onClick={evaluate}><span>=</span></div>
        
      </div>
      
    </div>
  );
}

export default App;
