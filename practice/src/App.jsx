import { useEffect, useState } from "react";
function App() {

  const[count, setCount] = useState(1);
  
  function increaseCount() {
    setCount(currentValue => currentValue + 1);
  }

  useEffect(function() {
    console.log("above setInterval")
    setInterval(increaseCount, 1000);
  }, [])

  // [] this is called dependency array which is
  // used to control the execution of useEffect hook.

  // This effect will run on mount, because array is empty.

  return (
    <div>
       {count}
      </div>
  );
}

export default App;

//useEffect Hook : helps to perform side effects in function components,
// code runs only on mount
