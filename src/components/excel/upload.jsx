import React, { useRef } from "react"
import * as XLSX from "xlsx"
import { Button } from "../ui/button"
import { ArrowUpFromLine } from "lucide-react"

export default function ExcelUpload({ handleUploadVocabularies }) {
  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    // Kích hoạt click vào input ẩn
    fileInputRef.current.click()
  }
  // const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const binaryStr = event.target.result
      const workbook = XLSX.read(binaryStr, { type: "binary" })
      const sheetName = workbook.SheetNames[0] // lấy sheet đầu tiên
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" }) // convert thành JSON
      // setData(jsonData);
      const clearedOBject = jsonData.map(item => {
        const { __EMPTY, ...cleanObj } = item
        return {...cleanObj, hidden: false};
      })
      handleUploadVocabularies(clearedOBject)
    }
    reader.readAsBinaryString(file)
  }
  return (
    <div className="p-4">
      {/* Input ẩn */}
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Nút hiển thị */}
      <Button  
      variant={"ghost"} 
      className={"border border-chart-2"} 
      onClick={handleButtonClick}>
        <ArrowUpFromLine />
        Upload
      </Button>
    </div>
  )
}
