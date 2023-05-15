

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/home/home';
import Main from './pages/main/main';

import './App.scss';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/main" element={<Main/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
