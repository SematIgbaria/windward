import React, { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' //instead of useHistory
import { FilteringTable } from './components/FiltertingTable';
import { useState } from 'react';
import { FLEET_COLUMNS } from './components/columns'
import { VesselsFilter } from './components/VesselsFilter';

export default function Main(props) {
 const [fleets, setFleets] = useState(props.fleets);
 
console.log(fleets)



const searchV = (searchIn) => {
  fetch(`http://localhost:3002/veseels/${searchIn}`)
    .then(res => {
      if (res.ok) {
        console.log('SUCCESS');
      } else {
        console.log('not Successful');
      }
      return res.json();
    })
    .then(data => {
      setFleets(() => [...data.fleets]);
    })
    .catch(error => console.log('ERROR!Vessel'));
}


  return (
    <div>
      <h1>Main Page</h1>
      <VesselsFilter search={value =>{ 
        searchV(value)
      }
     
    } />
     {fleets && <FilteringTable page={'Main Page'} MOCK_DATA={fleets} COLUMNS_TYPE={FLEET_COLUMNS}  />}
    </div>
  );
}
