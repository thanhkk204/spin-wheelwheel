import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataTable from "./data-table"

export function DataTab({ uploadedData, results, roundTwoData }) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="wheel-1">
        <TabsList>
          <TabsTrigger value="wheel-1">Mục</TabsTrigger>
          <TabsTrigger value="result">Kết quả</TabsTrigger>
          <TabsTrigger value="wheel-2">Vòng 2</TabsTrigger>
        </TabsList>
        <TabsContent value="wheel-1">
          <DataTable data={uploadedData} />
        </TabsContent>
        <TabsContent value="result">
          <DataTable data={results} />
        </TabsContent>
        <TabsContent value="wheel-2">
            <DataTable data={roundTwoData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
