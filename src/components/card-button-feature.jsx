import React from "react"
import { Button } from "./ui/button"

function CardButtonFeature({
  handleClosePopup,
  handleAddRoundTwo,
  handleHiddenPrize,
  handleDeletePrize,
  isRoundTwo,
  prizeNumber
}) {
  return (
    <div className="w-full border-t pt-3 border-gray-300">
      {!isRoundTwo && (
        <Button
          className={
            "cursor-pointer mx-1 bg-chart-5 hover:ring-1 hover:ring-chart-5/40 text-white hover:bg-chart-5/90"
          }
          onClick={(e) => {
            handleClosePopup()
            handleAddRoundTwo(prizeNumber)
            e.stopPropagation()
          }}
        >
          Vòng 2
        </Button>
      )}
      <Button
        className={"cursor-pointer mx-1"}
        variant={"destructive"}
        onClick={(e) => {
          handleClosePopup()
          handleDeletePrize(prizeNumber)
          e.stopPropagation()
        }}
      >
        Xóa ô này
      </Button>
      <Button
        className={"cursor-pointer mx-1 bg-chart-4"}
        onClick={(e) => {
          handleClosePopup()
          handleHiddenPrize(prizeNumber)
          e.stopPropagation()
        }}
      >
        Ẩn ô này
      </Button>
      <Button
        className={"cursor-pointer mx-1"}
        variant={"success"}
        onClick={(e) => {
          handleClosePopup()
          e.stopPropagation()
        }}
      >
        Đóng
      </Button>
    </div>
  )
}

export default CardButtonFeature
