import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowDownToLine, GamepadDirectional } from "lucide-react"
import ExcelUpload from "./excel/upload"
import { DataTab } from "./data-tab"

export function WheelDataSheet({
  handleUploadVocabularies,
  data,
  originalData,
  results,
  roundTwoData,
  handleHiddenPrize,
  handleDeletePrize,
  handleAddRoundTwo,
  handleSpeakChinese,
  isRoundTwo
}) {
  const handleDownloadExcelFile = () => {
    const link = document.createElement("a")
    link.href = "/template.xlsx" // đường dẫn trong thư mục public
    link.download = "Mau_Nhap_Excel.xlsx" // tên file khi tải về
    link.click()
  }
  return (
    <Sheet className="px-3">
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed top-16 right-0 cursor-pointer hover:ring-1 hover:ring-blue-300 transition-all duration-150"
        >
          <GamepadDirectional />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[500px]">
        <SheetHeader>
          <SheetTitle>Make It Reality</SheetTitle>
          <SheetDescription>
            Make your imagination come true by trying hard day by day!
          </SheetDescription>
        </SheetHeader>
        <div className="h-full overflow-y-auto overflow-x-hidden only-thumb">
          <DataTab
            data={data}
            originalData={originalData}
            results={results}
            roundTwoData={roundTwoData}
            handleHiddenPrize={handleHiddenPrize}
            handleDeletePrize={handleDeletePrize}
            handleAddRoundTwo={handleAddRoundTwo}
            handleSpeakChinese={handleSpeakChinese}
            isRoundTwo={isRoundTwo}
          />
        </div>
        <SheetFooter>
          <div className="w-full flex items-center justify-center gap-5">
            <ExcelUpload handleUploadVocabularies={handleUploadVocabularies} />
            <Button
              variant={"ghost"}
              className={
                "border border-chart-2 hover:text-red-400 transition-all duration-150 ease-out"
              }
              onClick={handleDownloadExcelFile}
            >
              <ArrowDownToLine />
              Download
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
