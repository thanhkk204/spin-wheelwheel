import traslateKey from "@/utils/translate-title"
import React, { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import SearchBox from "./inputs/customed-search-input"

function DataTable({
  data,
  handleHiddenPrize,
  handleDeletePrize,
  handleAddRoundTwo,
  handleSpeakChinese,
  originalData,
  type,
  isRoundTwo,
}) {
  const itemRefs = useRef([])

  return (
    <>
      {originalData?.length > 0 && (
        <SearchBox
          data={originalData}
          itemRefs={itemRefs}
          key={originalData.length}
        />
      )}
      {data && data.length > 0 && (
        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="border p-2 bg-gray-100">
                  {traslateKey(key) ? traslateKey(key) : key}
                </th>
              ))}
              {(type === "roundOne") && (
                <th className="border p-2 bg-gray-100">Chức năng</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleSpeakChinese(row)}
                className="group cursor-pointer border"
              >
                {Object.values(row).map((val, i) => (
                  <td
                    key={i}
                    className={`border p-2 ${
                      i === 0 && "group-hover:text-blue-500"
                    }`}
                  >
                    {val === true ? "X" : val}
                  </td>
                ))}
                {(type === "roundOne") && (
                  <td className="border p-2">
                    <div className="flex gap-2 justify-center items-center">
                      <Button
                        variant="link"
                        className={"p-0"}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleHiddenPrize(index)
                        }}
                      >
                        Ẩn
                      </Button>
                      <Button
                        variant="link"
                        className={"p-0"}
                        onClick={(e) => {
                          handleDeletePrize(index)
                          e.stopPropagation()
                        }}
                      >
                        Xóa
                      </Button>
                      {type === "roundOne" && !isRoundTwo && (
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={(e) => {
                            handleAddRoundTwo(index)
                            e.stopPropagation()
                          }}
                        >
                          Vòng 2
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default DataTable
