import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataTable from "./data-table"

const renderBadge = (number) => {
  return Number(number) === 0 ? (
    ""
  ) : (
    <p
      className="absolute top-0 right-0 z-9999 w-5 h-5 translate-x-1/2 -translate-y-1/4 rounded-full bg-red-400
               font-semibold text-white cursor-pointer flex items-center justify-center
              "
    >
      {number}
    </p>
  )
}
export function DataTab({
  data,
  originalData,
  results,
  roundTwoData,
  handleHiddenPrize,
  handleDeletePrize,
  handleAddRoundTwo,
  handleSpeakChinese,
}) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="wheel-1">
        <TabsList className={"flex gap-8 h-10"}>
          <TabsTrigger value="wheel-1" className={"relative"}>
            Mục
            {renderBadge(data.length)}
          </TabsTrigger>
          <TabsTrigger value="result" className={"relative"}>
            Kết quả {renderBadge(results.length)}
          </TabsTrigger>
          <TabsTrigger value="wheel-2" className={"relative"}>
            Vòng 2 {renderBadge(roundTwoData.length)}
          </TabsTrigger>
          <TabsTrigger value="all" className={"relative"}>
            Tất cả {renderBadge(originalData.length)}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="wheel-1">
          <DataTable
            data={data}
            type={"roundOne"}
            handleHiddenPrize={handleHiddenPrize}
            handleDeletePrize={handleDeletePrize}
            handleAddRoundTwo={handleAddRoundTwo}
            handleSpeakChinese={handleSpeakChinese}
          />
        </TabsContent>
        <TabsContent value="result">
          <DataTable
            data={results}
            type={"result"}
            handleSpeakChinese={handleSpeakChinese}
          />
        </TabsContent>
        <TabsContent value="wheel-2">
          <DataTable
            data={roundTwoData}
            type={"roundTwo"}
            handleSpeakChinese={handleSpeakChinese}
          />
        </TabsContent>
        <TabsContent value="all">
          <DataTable
            data={originalData}
            type={"all"}
            handleHiddenPrize={handleHiddenPrize}
            handleDeletePrize={handleDeletePrize}
            handleAddRoundTwo={handleAddRoundTwo}
            handleSpeakChinese={handleSpeakChinese}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
