import { useState } from "react";
function App() {

  const[count, setCount] = useState(1);
  
  function increaseCount() {
    setCount(count + 1);
  }
  setInterval(increaseCount, 3000);

  return (
    <div style={{ display: "flex"}}>
      <div
        style={{
          background: "aqua",
          borderRadius: 20,
          width: 25,
          height: 30,
          paddingLeft: 13,
          paddingTop: 5,
        }}
      >
        {count}
      </div>
      <img
        style={{ cursor: "pointer" }}
        src="https://imgs.search.brave.com/HkSkuh3l5WMMAS2QGB4PPujXteptm_xiTFH_N8xVHX0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzI4LzAyLzI3/LzM2MF9GXzUyODAy/Mjc5MF9lU0VvdHZ2/eXpabHV1R2cxWHFs/c2F0UUszU1VyQ3Zy/Ny5qcGc"
        width={40}
        
      />
     
    </div>
  );
}

export default App;

//useEffect Hook : helps to perform side effects in function components,
// code runs on mount
