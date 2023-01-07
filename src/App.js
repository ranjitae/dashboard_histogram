// import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // import Dashboard from "./pages/Dashboard";
// // import Users from "./pages/Users";
// // import Messages from "./pages/Messages";
// // import FileManager from "./pages/FileManager";
// // import Analytics from "./pages/Analytics";
// // import Order from "./pages/Order";
// // import Saved from "./pages/Saved";
// // import Setting from "./pages/Setting";
// import Histogram from "./components/Histogram";
// function App() {
//   return (
//     <Router>
//       <SideBar>
//         <Routes>
//           <Route path="/chart" element={<Histogram  width={800} height={700}/>} />
//           {/* <Route path="/users" element={<Users />} />
//           <Route path="/messages" element={<Messages />} /> */}
//           {/* <Route path="/analytics" element={<Analytics />} />
//           <Route path="/file-manager" element={<FileManager />} />
//           <Route path="/order" element={<Order />} />
//           <Route path="/saved" element={<Saved />} />
//           <Route path="/settings" element={<Setting />} /> */}

//           <Route path="*" element={<> not found</>} />
//         </Routes>
//       </SideBar>
//     </Router>
//   );
// }

// export default App;


import './App.css';
import Histogram from './components/Histogram';



function App() {
  return (
    <div className="App">
      <Histogram width={1200} height={800} /> 
    </div>
    // </div>
  );
}

export default App;

