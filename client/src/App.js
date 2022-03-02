import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Fleet from './View/Fleet';
import Main from './View/Main';
import ErrorPage from './View/ErrorPage';
import { useEffect, useState } from 'react';
import windward from './imgs/wind3.jpg';

function App() {

  const [fleets, setFleets] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3002/')
      .then(res => {
        if (res.ok) {
          console.log('SUCCESS');
        } else {
          console.log('not Successful');
        }
        return res.json();
      })
      .then(data => {
        setFleets(data.fleets);
      })
      .catch(error => console.log('ERROR!'));
  }, [1]);


  return (
    <>
    <div className='mycont'>

<div className='header-cont'>
      <div className="w3-display-container w3-content w3-wide" id="home">
      <img className="w3-image" src={windward} />
      <div className="w3-display-topmiddle w3-margin-top w3-center" id="header-name">
        
        <h1 className="w3-xxlarge w3-text-white"><span className="w3-padding w3-black w3-opacity-min">
          <b>WINDWARD</b></span> <span className="w3-hide-small w3-text-blue">AI</span></h1>
      </div>
    </div>
    </div>

      <Routes>
        <Route path='/' element={fleets && <Main fleets={fleets} />} />
        <Route path='/fleet/:fleetId' element={<Fleet />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>

      <footer className='w3-center' id="footer">
        <p>Data by <a href="https://windward.ai/" title="W3.CSS" target="_blank" className="w3-hover-text-green">Windward</a></p>
      </footer>

    </ div>
    </>
  );
}

export default App;
