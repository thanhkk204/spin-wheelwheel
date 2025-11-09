import React from "react"

function DataTable({data}) {
  return (
    <>
      {
        data && data.length > 0 && 
        <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="border p-2 bg-gray-100">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((val, i) => (
                <td key={i} className="border p-2">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      }
    </>
  )
}

export default DataTable
