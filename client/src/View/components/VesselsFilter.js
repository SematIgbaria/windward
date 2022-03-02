import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import { useEffect} from 'react';

export const VesselsFilter = (props) => {
  const [searchIn, setValue] = useState(null)
 // const [fleetsN, setFleetsN] = useState(null);
  const onChange = useAsyncDebounce(value => {
    setValue(value || undefined)
  }, 500)

//   const search = () => {
//         fetch(`http://localhost:3002/veseels/${searchIn}`)
//           .then(res => {
//             if (res.ok) {
//               console.log('SUCCESS');
//             } else {
//               console.log('not Successful');
//             }
//             return res.json();
//           })
//           .then(data => {
//             setFleetsN(() => [...data.fleets]);
//           //  console.log(searchIn)
//           //  console.log(fleetsN)
//             let change = () =>props.onChangeFleets([...fleetsN]);
//             change()
//           })
//           .catch(error => console.log('ERROR!Vessel'));
//  }

//  const search2 = () => {
//     props.onChangeFleets(fleetsN);
//  }
  return (
    <div>
    <span>
      Vessels Search:{' '}
      <input
        value={searchIn || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
         // search();
        }}
        placeholder="⚓By(name, flag or MMSI)"
      />
      <button className='search'
        onClick={() => props.search(searchIn)}
      >search in Vessels</button>
    </span>
    </div>
  )
}
