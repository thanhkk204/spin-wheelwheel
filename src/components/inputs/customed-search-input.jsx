import { useState } from "react"
import { Input } from "@/components/ui/input" // nếu mày dùng shadcn/ui
import { detectLanguage } from "@/utils/detect-language"

export default function SearchBox({ data, itemRefs }) {
  const [search, setSearch] = useState("")
  const [matches, setMatches] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSearch = (value) => {
    // delete class when research
    itemRefs.current.forEach((el) => {
      if (el) {
        el.classList.remove("bg-yellow-200")
      }
    })
    setSearch(value)
    //    vietnamese
    //     chinese
    const lang = detectLanguage(value)
    const matchedIndexed = data
      .map((item, i) => {
        const target = lang === "vietnamese" ? item.option : item.hanyu
        console.log({target})
        return target.toLowerCase().includes(value.toLowerCase().trim()) ? i : -1
      })
      .filter((i) => i !== -1)

    // Set state
    console.log({matchedIndexed})
    setMatches(matchedIndexed)
    setCurrentIndex(0)
  }

  const scrollToIndex = (index) => {
    const el = itemRefs.current[matches[index]]
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      el.classList.add("bg-yellow-200")
    }
  }

  const handlePrev = () => {
    if (matches.length === 0) return
    // remove current class
    itemRefs.current[matches[currentIndex]].classList.remove("bg-yellow-200")
    // set new index
    const newIndex = (currentIndex - 1 + matches.length) % matches.length
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const handleNext = () => {
    if (matches.length === 0) return
    // remove current class
    itemRefs.current[matches[currentIndex]].classList.remove("bg-yellow-200")
    // set new index
    const newIndex = (currentIndex + 1) % matches.length
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  return (
    <div className="flex items-center gap-2 mb-3 p-2 border rounded bg-white shadow-sm w-[300px]">
      <Input
        placeholder="Tìm kiếm"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-1 focus-visible:ring-0"
      />
      <div className="text-sm">
        {matches.length > 0 ? `${currentIndex + 1}/${matches.length}` : "0/0"}
      </div>
      <button
        onClick={handlePrev}
        className="px-2 py-1 border rounded hover:bg-gray-100"
      >
        ↑
      </button>
      <button
        onClick={handleNext}
        className="px-2 py-1 border rounded hover:bg-gray-100"
      >
        ↓
      </button>
      <button
        onClick={() => {
          setSearch("")
          setMatches([])
          setCurrentIndex(0)
        }}
        className="px-2 py-1 border rounded hover:bg-gray-100"
      >
        ✕
      </button>
    </div>
  )
}
