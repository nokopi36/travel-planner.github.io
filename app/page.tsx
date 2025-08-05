"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MapPin, Plane, Search } from "lucide-react"

const popularDestinations = [
  "ハワイ",
  "パリ",
  "ニューヨーク",
  "ロンドン",
  "バリ島",
  "韓国",
  "台湾",
  "タイ",
  "シンガポール",
  "オーストラリア",
]

export default function HomePage() {
  const [destination, setDestination] = useState("")

  const handleDestinationSubmit = () => {
    if (destination.trim()) {
      window.location.href = `/preferences?destination=${encodeURIComponent(destination.trim())}`
    }
  }

  const handlePopularDestination = (dest: string) => {
    setDestination(dest)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Heart className="h-12 w-12 text-pink-500 mr-3" />
              <Plane className="h-6 w-6 text-blue-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              TripMatch
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">あなたの理想の旅行先を見つけよう</p>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            マッチングアプリのように、観光地をスワイプして好みを選択。あなただけの完璧な旅行プランを作成します✨
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">どこに行きたいですか？</CardTitle>
              <CardDescription>行きたい国や都市名を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="例: ハワイ、パリ、ニューヨーク..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleDestinationSubmit()}
                    className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-pink-400"
                  />
                </div>
                <Button
                  onClick={handleDestinationSubmit}
                  disabled={!destination.trim()}
                  size="lg"
                  className="h-12 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Search className="h-5 w-5 mr-2" />
                  検索
                </Button>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-3 text-center">人気の目的地から選ぶ</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularDestinations.map((dest) => (
                    <Button
                      key={dest}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePopularDestination(dest)}
                      className="hover:bg-pink-50 hover:border-pink-300 hover:text-pink-700"
                    >
                      {dest}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-8 text-gray-600">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                  1
                </div>
                <span className="font-medium">目的地入力</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                  2
                </div>
                <span className="font-medium">スワイプ選択</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                  3
                </div>
                <span className="font-medium">プラン生成</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-white/60 backdrop-blur rounded-xl">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">スワイプで選択</h3>
                <p className="text-sm text-gray-600">マッチングアプリのように直感的に観光地を選択</p>
              </div>
              <div className="p-6 bg-white/60 backdrop-blur rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI分析</h3>
                <p className="text-sm text-gray-600">あなたの好みを分析して最適なプランを提案</p>
              </div>
              <div className="p-6 bg-white/60 backdrop-blur rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">完璧なプラン</h3>
                <p className="text-sm text-gray-600">時間まで詳細に計画された旅行スケジュール</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
