import React, { useMemo } from 'react'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export const FilteringTable = (props) => {
  const COLUMNS_TYPE = props.COLUMNS_TYPE;
  const MOCK_DATA = props.MOCK_DATA;
  const page = props.page;
  const columns = useMemo(() => COLUMNS_TYPE, [])
  const data = useMemo(() => MOCK_DATA, [])
  const [name, setName] = useState('');


  let navigate = useNavigate();
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFilters,
    useGlobalFilter
  )

  const { globalFilter } = state

  const handleFleet = (myRow) => {
    let fleetId = myRow._id;
    setName(myRow.name);
    navigate(`/fleet/${fleetId}`);


  }

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={() => handleFleet(row.original)}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
