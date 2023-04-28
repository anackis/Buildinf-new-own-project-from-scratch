

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/home/home';
import Main from './components/main/main';

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
