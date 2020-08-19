import React from 'react'

const Table = ({ columns, format, page, 
  perPage, rows, prevClick, nextClick }) => {
  const displayTableHeader = columns.map((col) => {
    return (
      <th key={col.name}>{col.name}</th>
    );
  });

  const routeIdx = (page - 1) * perPage
  const totalPages = () => {
    const total = Math.ceil(rows.length / perPage)
    return total > 0 ? total : 1
  }

  const displayRows = rows.slice(
    routeIdx, (routeIdx + perPage)
  ).map((row, idx) => {
    const cell = columns.map((col) => {
      const value = row[col.property] 
      return <td key={value}>{format(col.property, value)}</td>
    })

    return (
      <tr key={idx}>
        {cell}
      </tr>
    )
  });

  const displayPagination = (
    <div className='pagination'>
      <p>
        Showing page {page} of {totalPages()} (
          {rows.length} routes)
      </p>
      <p>
        <button 
          key='previous' 
          onClick={prevClick}
          disabled={routeIdx === 0}
        >
          Previous
        </button>
        &nbsp;
        <button 
          key='next'
          onClick={nextClick}
          disabled={routeIdx + perPage >= rows.length}
        >
          Next
        </button>
      </p>
    </div>
  )

  return (
    <div>
      <table className='routes-table'>
        <thead>
          <tr>
            {displayTableHeader}
          </tr>
        </thead>
        <tbody>
          {displayRows}
        </tbody>
      </table>
      {displayPagination}
    </div>
  );
}

export default Table
