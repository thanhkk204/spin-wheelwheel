import { useState } from "react"
import { Wheel } from "react-custom-roulette"
import { motion } from "framer-motion"
import { Button } from "./components/ui/button"
import SplineScene from "./spline/SplineScene"
import { backendURL } from "./instant"
import { WheelDataSheet } from "./components/wheel-data-sheet"
import CardButtonFeature from "./components/card-button-feature"
import { ArrowRightLeft } from "lucide-react"
const exampleData = [
  {
    option: "khán giả",
    pinyin: "guānzhòng",
    hanyu: "观众",
  },
  {
    option: "quản lý",
    pinyin: "guǎnlǐ",
    hanyu: "管理",
  },
  {
    option: "quảng cáo",
    pinyin: "guǎnggào",
    hanyu: "广告",
  },
  {
    option: "quảng bá",
    pinyin: "guǎngbō",
    hanyu: "广播",
  },
  {
    option: "đi dạo",
    pinyin: "guàng",
    hanyu: "逛",
  },
]

export default function SpinWheel() {
  const [data, setData] = useState(exampleData)
  const [uploadedOriginalData, setUploadedOriginalData] = useState([])
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
    const newPrizeNumber = Math.floor(Math.random() * data.length)
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
    setUploadedOriginalData(uploadedData)

    const newData = uploadedData.map((item) => ({
      option: item["Tiếng việt"],
      pinyin: item["Pinyin"],
      hanyu: item["Tiếng trung"],
    }))
    setData(newData)
    setWheelKey(wheelKey + 1) // reset wheel
  }
  const handleDeletePrize = () => {
    if (data.length < 2) return
    const newData = data.filter((_, i) => i !== prizeNumber)
    setData(newData)
  }
  const handleAddRoundTwo = () => {
    setRoundTwoData([data[prizeNumber], ...roundTwoData])
    handleDeletePrize()
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
  }
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
              data={data}
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
              <p className="px-4 text-2xl flex items-center justify-center text-gray-600">
                {data[prizeNumber]?.option}
              </p>
              <CardButtonFeature
                handleClosePopup={handleClosePopup}
                handleAddRoundTwo={handleAddRoundTwo}
                handleDeletePrize={handleDeletePrize}
                isRoundTwo={isRoundTwo}
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

              <p className="px-4 border-b border-gray-300 w-full pb-2 text-start">
                🎁 Mặt sau của phần thưởng!
              </p>
              <p className="px-4 text-gray-600 mt-2 mx-auto text-2xl">
                {data[prizeNumber]?.hanyu}{" "}
                <span className="text-lg">({data[prizeNumber]?.pinyin})</span>
              </p>
              <CardButtonFeature
                handleClosePopup={handleClosePopup}
                handleAddRoundTwo={handleAddRoundTwo}
                handleDeletePrize={handleDeletePrize}
                isRoundTwo={isRoundTwo}
              />
            </div>
          </motion.div>
        </div>
      )}
      {/* Drawer for displaying data */}
      <WheelDataSheet
        handleUploadVocabularies={handleUploadVocabularies}
        uploadedData={
          uploadedOriginalData.length > 0 ? uploadedOriginalData : exampleData
        }
        results={results}
        roundTwoData={roundTwoData}
      />
    </>
  )
}
