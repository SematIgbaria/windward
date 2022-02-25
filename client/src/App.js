import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Fleet from './View/Fleet';
import Main from './View/Main';
import ErrorPage from './View/ErrorPage';
import { useEffect, useState } from 'react';

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
    <div className='mycont'>
      <h1 className='logo'>WINDWARD</h1>


      <Routes>
        <Route path='/' element={fleets && <Main fleets={fleets} />} />
        <Route path='/fleet/:fleetId' element={<Fleet />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>

      <footer class="footer">
        <p>Data by <a href="https://windward.ai/" title="W3.CSS" target="_blank" class="w3-hover-text-green">Windward</a></p>
      </footer>

    </ div>
  );
}

export default App;
