import React from 'react'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      Search:{' '}
      <input className='cf'
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
        placeholder="⚓Search.."
      />
    </span>
  )
}
