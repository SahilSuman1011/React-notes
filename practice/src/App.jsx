// import { useEffect, useState } from "react";

// function App() {

//   const[currentTab, setCurrentTab] = useState("1");
//   const[tabData, setTabData] = useState({});
//   const[loading, setLoading] = useState(true);

//   useEffect(function() {
//     setLoading(true);
//     // Fetch data from the API
//     fetch("https://jsonplaceholder.typicode.com/todos/" + currentTab)
//     .then(async res => {
//       const json = await res.json();
//       setTabData(json);
//       setLoading(false);
//     });

//   }, [currentTab])

//   return <div>
//     <button onClick={function() {
//       setCurrentTab("1")
//     }} style={{color: currentTab == "1" ? 
//       "red" : "black"}}>Todo #1</button>

//     <button onClick={function() {
//       setCurrentTab("2")
//     }} style={{color: currentTab == "2" ? 
//       "red" : "black"}}>Todo #2</button>

//     <button onClick={function() {
//       setCurrentTab("3")
//     }} style={{color: currentTab == "3" ? 
//       "red" : "black"}}>Todo #3</button>

//     <button onClick={function() {
//       setCurrentTab("4")
//     }} style={{color: currentTab == "4" ? 
//       "red" : "black"}}>Todo #4</button>
// <br/>
//       {loading ? "Loading..." : tabData.title}
//     </div> 
// }

// export default App

// Children in React : 
// children prop allows to pass elements or components as
// props to other components. This is useful for creating reusable components that can accept different content.
// It allows for greater flexibility and modularity in React applications.


// function App(){
//   return <div style={{display: "flex", background: "gray"}}>
    
//     <Card>
//       <div style={{color: "green"}}>
//       What do you want to post
//       <br/>
//       <input type={"text"} />
//       </div>
//     </Card>

//     <Card>
//       <div>
//         Ram Ram
//       </div>
//     </Card>
//   </div>
// }

// function Card({children}) {
//   return <div style={{background: "gray", borderRadius: 10, 
//   color: "white",color: "black", padding: 10,
//   margin: 10}}>
//     upper topbar
//     {children}
//     lower footer
//   </div>
  
// }
// fragments in react

// function App (){
//   return (
//     <>
//     <div>App</div>
//     <div>App</div>
//     </>
//   )
// }

// export default App

// SPA + ROUTING + ALLEN PAGE CLONING 

// import './App.css'
// import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';

// function App () {
//   return (
//     <div>
//       ALLEN COACHING CENTRE
//       <BrowserRouter>
//         <Routes>
//           <Route path="neet/online-coaching-class-1" element={<Landing/>}/>
//           <Route path="neet/online-coaching-class-2" element={<class11Program/>}/>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
// function class11Program() {
//   return <div>
//     <h1>Class 11 Program</h1>
//     <p>Details about the class 11 program...</p>
//   </div>
// }
// function Landing() {
//   const navigate = useNavigate();

//   function redirectUser() {
//     navigate("/neet/online-coaching-class-2")
//   }

//   return <div>
//     Welcome to ALLEN
//     <button onClick={redirectUser}> Go back to LANDING Page </button>
//      </div>
// }
// export default App


// useRef in React : 

// useRef allows to create reference to a value such that
// when u change the value, the component does not re-render.
// eg. clock with start and stop functionality using useRef

// import { useState, useRef } from "react";
// import './App.css'

// function App() {

//   const [currentCount, setCurrentCount] = useState(1);
//   const timer = useRef(); 

//   function startClock(){
//      let value = setInterval(function(){
//       setCurrentCount(c => c + 1);
//     },1000);
//     timer.current = value;
//   }

//   function stopClock(){
//     clearInterval(timer.current);
//   }
//   return <div>
//     {currentCount}
//     <br/>
//     <button onClick={startClock}>Start</button>
//     <br/>
//       <button onClick={stopClock}>Stop</button>
//     </div>
  
// }

// export default App

// # state management -> context api 

// Rolling up the state -> unoptimal renders
// you might find multiple components needs access to the
// same state, instead of duplicating the state in each component,
//// you can lift the state up to the LCA (lowest common ancestor)
// allowing the common ancestor to manage it.

// prop drilling : 

// export const Parent = () => {

//   return (
//     <section>
//       <h1>Component A</h1>
//       <ChildComponent data = "tata"/>
//     </section>
//   );

// };

// const ChildComponent = (props) => {

//   return (
//     <section>
//       <h1>Component B</h1>
//       <GrandChildComponent data = {props.data}/>
//     </section>
//   );
// }

// const GrandChildComponent = (props) => {

//   return (
//     <section>
//       <h1>Component C</h1>
//       <GrandGrandChildComponent data = {props.data}/>
//     </section>
//   );
// };

// const GrandGrandChildComponent = (props) => {

//   return (
//     <section>
//       <h1>Component B{props.data}</h1>
     
//     </section>
//   );
// };

// this prop drilling can be fixed by context API : 
// Context API : 
// import { createContext } from "react";

// export const BioContext = createContext();

// export const BioProvider = () => {

//   const myName = "ram"
//   return <BioContext.Provider value = {myName}>

//   </BioContext.Provider>
//

// higher order functions : aisa fnc jo accept krle el aur fnc
// return krde ekaur func.

// eg. var arr = [1,2,3,4,5]
// arr.forEach(function(){})

// constructor function : normal func jismein this ka istemal ho;
// and fnc ko call krke waqt new keyword ka use hota hai;
//function Biscuit(){
//   this.name = "parle";
//   this.width = 12;
//   this.height = 10;
//   this.color = "red"; 
// }

// var bis1 = new biscuit();
// var bis2 = new biscuit();
// console.log(bis1);

