import React from 'react'
import { useNavigate } from 'react-router-dom' //instead of useHistory
import { FilteringTable } from './components/FiltertingTable';
import { useState } from 'react';
import { FLEET_COLUMNS } from './components/columns'

export default function Main(props) {

  let navigate = useNavigate();
  const [fleets, setFleets] = useState(props.fleets);

  return (
    <div>
      <h1>Main Page</h1>
      <FilteringTable page={'Main Page'} MOCK_DATA={fleets} COLUMNS_TYPE={FLEET_COLUMNS} />
    </div>
  )
}
