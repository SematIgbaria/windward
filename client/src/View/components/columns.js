export const FLEET_COLUMNS = [
  {
    Header: "Index",
    accessor: "",
    Cell: (row) => {
      return <div>🚢 {Number(row.row.id) + 1}</div>;
    },
    disableSortBy: true,
    disableFilters: true,
},
  {
    Header: 'Fleet Name',
    accessor: 'name',
    sticky: 'left'
  },
  {
    Header: 'Vessels Count',
    accessor: 'count',
    sticky: 'left'
  },
]


export const VESSELS_COLUMNS = [
  {
    Header: "Index",
    accessor: "",
    Cell: (row) => {
      return <div>🚢 {Number(row.row.id) + 1}</div>;
    },
    disableSortBy: true,
    disableFilters: true,
},
  {
    Header: 'Vessel Name',
    accessor: 'name',
  },
  {
    Header: 'Old Ship Id',
    accessor: 'oldShipId',
  },
  {
    Header: 'MMSI',
    accessor: 'mmsi',
  },
  {
    Header: 'imo',
    accessor: 'imo',
  },
  {
    Header: 'Callsign',
    accessor: 'callsign',
  },
  {
    Header: 'Owner',
    accessor: 'owner',
  },
  {
    Header: 'Vessel Class',
    accessor: 'vessel_class',
  },
  {
    Header: 'Size',
    accessor: 'size',
  },
  {
    Header: 'Drought',
    accessor: 'drought',
  },
  {
    Header: 'Flag',
    accessor: 'flag',
  },
]