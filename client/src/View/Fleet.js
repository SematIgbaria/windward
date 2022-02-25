import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VESSELS_COLUMNS } from './components/columns';
import { FilteringTable } from './components/FiltertingTable';
import { useEffect, useState } from 'react';

export default function Fleet() {
  let navigate = useNavigate();
  const [vessels, setVessels] = useState(null);
  let { fleetId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3002/fleet/${fleetId}`)
      .then(res => {
        if (res.ok) {
          console.log('SUCCESS');
        } else { console.log('not Successful'); }
        return res.json();
      })
      .then(data => {
        setVessels(data.vessels);
        console.log(vessels)
      })
      .catch(error => console.log('ERROR!'));
  }, [1]);


  return (
    <div>
      <h1>Fleet Page</h1>
      <h2>This is The Page Of Fleet { }</h2>
      {vessels && <FilteringTable page={'Fleet Page'} MOCK_DATA={vessels} COLUMNS_TYPE={VESSELS_COLUMNS} />}
      <button
        onClick={() => {
          navigate("/");
        }}>Go to Main</button>
    </div>
  )
}
