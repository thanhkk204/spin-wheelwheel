import { useEffect, useState } from "react"
import { Wheel } from "react-custom-roulette"
import { motion } from "framer-motion"
import { Button } from "./components/ui/button"
import SplineScene from "./spline/SplineScene"
import { backendURL } from "./instant"
import { WheelDataSheet } from "./components/wheel-data-sheet"
import CardButtonFeature from "./components/card-button-feature"
import { ArrowRightLeft, Volume2 } from "lucide-react"
import { speakChinese } from "./utils/speaker"
const exampleData = [
  {
    option: "khán giả",
    pinyin: "guānzhòng",
    hanyu: "观众",
    hidden: true,
  },
  {
    option: "quản lý",
    pinyin: "guǎnlǐ",
    hanyu: "管理",
    hidden: false,
  },
  {
    option: "quảng cáo",
    pinyin: "guǎnggào",
    hanyu: "广告",
    hidden: false,
  },
  {
    option: "quảng bá",
    pinyin: "guǎngbō",
    hanyu: "广播",
    hidden: false,
  },
  {
    option: "đi dạo",
    pinyin: "guàng",
    hanyu: "逛",
    hidden: false,
  },
]

export default function SpinWheel() {
  const [data, setData] = useState(exampleData)
  const [originalData, setOriginalData] = useState([])
  const [results, setResults] = useState([])
  const [roundOneData, setRoundOneData] = useState([])
  const [roundTwoData, setRoundTwoData] = useState([])
  const [isRoundTwo, setIsRoundTwo] = useState(false)
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [wheelKey, setWheelKey] = useState(0) // to reset wheel

  const handleSpinClick = () => {
    // Lọc ra các ô không bị ẩn
    const visibleItems = data.filter((item) => !item.hidden)

    // Nếu không còn ô nào hợp lệ thì dừng
    if (visibleItems.length === 0) return

    // Random trong danh sách không ẩn
    const randomItem =
      visibleItems[Math.floor(Math.random() * visibleItems.length)]

    // Lấy index thật của item đó trong mảng gốc
    const newPrizeNumber = data.findIndex(
      (item) => item.option === randomItem.option
    )

    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
    setResults([data[newPrizeNumber], ...results])
  }

  const handleFlip = () => setFlipped(!flipped)
  const handleClosePopup = () => {
    setShowPopup(false)
    setFlipped(false)
  }

  const handleUploadVocabularies = (uploadedData) => {
    const newData = uploadedData?.map((item) => {
      const { "Tiếng việt": _, Pinyin: __, "Tiếng trung": ___, ...rest } = item
      const modifiedData = {
        option: item["Tiếng việt"],
        pinyin: item["Pinyin"],
        hanyu: item["Tiếng trung"],
        ...rest,
      }
      return modifiedData
    })
    setOriginalData(newData)
    setData(newData)
    setRoundTwoData([]) // reset round two data
    setResults([]) // reset results
    setWheelKey(wheelKey + 1) // reset wheel
    setIsRoundTwo(false)
  }
  const handleChangeRoundTwo = () => {
    if (roundTwoData.length === 0) return
    setRoundOneData(data)
    setData(roundTwoData)
    setWheelKey(wheelKey + 1)
    setIsRoundTwo(true)
  }
  const handleChangeRoundOne = () => {
    setIsRoundTwo(false)
    setData(roundOneData)
    setWheelKey(wheelKey + 1)
    // update roundTwo data into updated round two data
    setRoundTwoData(data)
  }
  const handleDeletePrize = (currentPrizeIndex) => {
    if (data.length < 2) return
    const newData = data.filter((_, i) => i !== currentPrizeIndex)
    setData(newData)
  }
  const handleHiddenPrize = (currentPrizeIndex) => {
    const isCurrentHidden = data[currentPrizeIndex].hidden
    setData(
      data.map((_, index) =>
        index === currentPrizeIndex
          ? { ...data[index], hidden: isCurrentHidden ? false : true }
          : data[index]
      )
    )
  }
  const handleAddRoundTwo = (currentPrizeIndex) => {
    setRoundTwoData([data[currentPrizeIndex], ...roundTwoData])
    handleDeletePrize(currentPrizeIndex)
  }
  const handleSpeakChinese = (row) => {
    row ? speakChinese(row.hanyu) : speakChinese(data[prizeNumber].hanyu)
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Nếu Ctrl, Alt, Meta (Command trên Mac) được nhấn thì bỏ qua
      if (e.ctrlKey || e.altKey || e.metaKey) return
      // Ngăn browser cuộn trang khi nhấn phím cách
      if (e.code === "Space" && showPopup) {
        e.preventDefault()
        handleSpeakChinese()
      }
      if (e.key.toLowerCase() === "v") {
        e.preventDefault() // Ngăn chuyển focus phần tử
        !showPopup && handleSpinClick()
      }
      if (e.key.toLowerCase() === "x") {
        e.preventDefault() // Ngăn chuyển focus phần tử
        showPopup && handleFlip()
      }
      if (e.key.toLowerCase() === "c") {
        e.preventDefault() // Ngăn chuyển focus phần tử
        console.log("c")
        showPopup && handleClosePopup()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prizeNumber, flipped, showPopup])
  return (
    <>
      {/* Background 3D */}
      <div className="fixed w-screen h-screen top-0 left-0 -z-10">
        <SplineScene url={backendURL} />
      </div>
      {/* Interactive Robot 3D */}
      {/* <div className="fixed top-[35%] translate-y-[-50%] left-[5%] w-[500px]">
        <SplineScene 
          url="https://prod.spline.design/IgSpSlYTYt6KNjdh/scene.splinecode"
          height={500} />
      </div> */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-h-fit flex flex-col items-center justify-start">
        <div className="w-[600px] h-[600px] flex items-center justify-center">
          <div className="scale-125">
            <Wheel
              key={wheelKey}
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data.map((d) => {
                // gạch unicode (nếu wheel render bằng canvas / không nhận HTML)
                const optionText = d.hidden
                  ? d.option
                      .split("")
                      .map((c) => c + "\u0336")
                      .join("")
                  : d.option

                // gán đúng vào property `style`
                const itemStyle = {
                  ...d.style,
                  backgroundColor: d.hidden && "#444",
                }

                return {
                  ...d,
                  option: optionText,
                  style: itemStyle, // <-- quan trọng: phải ở đây
                }
              })}
              backgroundColors={["#ffb703", "#fb8500", "#8ecae6", "#219ebc"]}
              textColors={["#fff"]}
              spinDuration={0.2}
              // outerBorderColor="#FF0000"
              outerBorderWidth={2}
              fontSize={data.length > 20 ? 14 : 18} // ✅ chỉnh cỡ chữ
              fontFamily="Poppins" // ✅ đổi font chữ
              // perpendicularText={true} // ✅ làm chữ nằm vuông góc (đỡ bị méo)
              // innerRadius={0} // giữ inner radius nhỏ để chữ ra ngoài dễ hơn
              radiusLineWidth={1}
              textDistance={data.length > 20 ? 80 : 60}
              onStopSpinning={() => {
                setMustSpin(false)
                setShowPopup(true)
              }}
            />
          </div>
        </div>
        <button
          onClick={handleSpinClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-lg cursor-pointer"
        >
          Quay ngay 🎡
        </button>
        <Button
          onClick={isRoundTwo ? handleChangeRoundOne : handleChangeRoundTwo}
          variant={"destructive"}
          className={"mt-4 cursor-pointer"}
        >
          {isRoundTwo ? "Chuyển đổi round 1" : "Chuyển đổi round 2"}
          <ArrowRightLeft />
        </Button>
      </div>
      {/* Popup JSX */}
      {showPopup && (
        <div className="fixed w-screen h-screen top-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            className="relative w-100 h-66 transform-3d cursor-pointer -z-10"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleFlip}
          >
            {/* Mặt trước */}
            <div className="absolute inset-0 py-3 flex flex-col items-center justify-between bg-yellow-100 rounded-2xl shadow-xl text-center text-xl font-semibold backface-hidden">
              {/* Nút đóng */}
              <button
                className="absolute top-0 right-0 z-20 w-6 h-6 translate-x-1/4 -translate-y-1/4 rounded-full bg-red-400
               font-semibold text-white cursor-pointer flex items-center justify-center
              "
                onClick={(e) => {
                  handleClosePopup()
                  e.stopPropagation()
                }}
              >
                X
              </button>
              <div className="px-4 w-full flex justify-start border-b border-gray-300">
                {/* <RainbowText /> */}
                <h1 className="text-2xl mb-3 font-bold">🎉 Kết quả</h1>
              </div>
              <div className="px-4 text-2xl flex items-center justify-center gap-1 text-gray-600">
                <p onClick={(e) => e.stopPropagation()} className="align-top">
                  {data[prizeNumber]?.option}
                </p>
              </div>
              <CardButtonFeature
                handleClosePopup={handleClosePopup}
                handleAddRoundTwo={handleAddRoundTwo}
                handleDeletePrize={handleDeletePrize}
                handleHiddenPrize={handleHiddenPrize}
                isRoundTwo={isRoundTwo}
                prizeNumber={prizeNumber}
              />
            </div>

            {/* Mặt sau */}
            <div className="absolute inset-0 flex flex-col items-start py-3 justify-between bg-yellow-100 rounded-2xl shadow-xl text-center text-lg font-medium rotate-y-180 backface-hidden">
              {/* Nút đóng */}
              <button
                className="absolute top-0 right-0 z-20 w-6 h-6 translate-x-1/4 -translate-y-1/4 rounded-full bg-red-400
               font-semibold text-white cursor-pointer flex items-center justify-center
              "
                onClick={(e) => {
                  handleClosePopup()
                  e.stopPropagation()
                }}
              >
                X
              </button>

              <div className="px-4 border-b select-none border-gray-300 w-full pb-2 text-start flex items-center gap-4">
                <p className="select-none">🎁 Mặt sau của phần thưởng!</p>
                <Volume2
                  onClick={(e) => {
                    handleSpeakChinese()
                    e.stopPropagation()
                  }}
                  className="w-6 h-6 transition-all hover:text-blue-300 ease-out text-gray-600"
                />
              </div>
              <p
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="px-4 text-gray-600 mt-2 mx-auto text-2xl"
              >
                {data[prizeNumber]?.hanyu}{" "}
                <span className="text-lg">({data[prizeNumber]?.pinyin})</span>
              </p>
              <CardButtonFeature
                handleClosePopup={handleClosePopup}
                handleAddRoundTwo={handleAddRoundTwo}
                handleDeletePrize={handleDeletePrize}
                isRoundTwo={isRoundTwo}
                prizeNumber={prizeNumber}
              />
            </div>
          </motion.div>
        </div>
      )}
      {/* Drawer for displaying data */}
      <WheelDataSheet
        handleUploadVocabularies={handleUploadVocabularies}
        handleHiddenPrize={handleHiddenPrize}
        handleDeletePrize={handleDeletePrize}
        handleAddRoundTwo={handleAddRoundTwo}
        handleSpeakChinese={handleSpeakChinese}
        data={data.length > 0 ? data : exampleData}
        originalData={originalData.length > 0 ? originalData : exampleData}
        results={results}
        roundTwoData={roundTwoData}
        isRoundTwo={isRoundTwo}
      />
    </>
  )
}
