"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, X, Meh, RotateCcw, Sparkles } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

// 汎用的な観光地データ生成関数
const generateAttractions = (destination: string) => {
  const baseAttractions = [
    {
      id: "landmark-1",
      name: `${destination}の象徴的ランドマーク`,
      description: `${destination}で最も有名な観光スポット。絶対に見逃せない定番の場所です。`,
      category: "ランドマーク",
      duration: "2-3時間",
      image: "/placeholder.svg?height=400&width=300&text=ランドマーク",
    },
    {
      id: "nature-1",
      name: `${destination}の自然スポット`,
      description: `美しい自然に囲まれた癒しのスポット。写真撮影にも最適です。`,
      category: "自然・景観",
      duration: "半日",
      image: "/placeholder.svg?height=400&width=300&text=自然スポット",
    },
    {
      id: "culture-1",
      name: `${destination}の文化体験`,
      description: `現地の文化や歴史を深く学べる貴重な体験ができます。`,
      category: "文化・歴史",
      duration: "3-4時間",
      image: "/placeholder.svg?height=400&width=300&text=文化体験",
    },
    {
      id: "food-1",
      name: `${destination}のグルメスポット`,
      description: `現地の美味しい料理が楽しめる人気のレストランエリア。`,
      category: "グルメ",
      duration: "1-2時間",
      image: "/placeholder.svg?height=400&width=300&text=グルメ",
    },
    {
      id: "shopping-1",
      name: `${destination}のショッピング`,
      description: `お土産や現地の商品が購入できるショッピングエリア。`,
      category: "ショッピング",
      duration: "2-3時間",
      image: "/placeholder.svg?height=400&width=300&text=ショッピング",
    },
    {
      id: "entertainment-1",
      name: `${destination}のエンターテイメント`,
      description: `現地ならではのエンターテイメントが楽しめるスポット。`,
      category: "エンタメ",
      duration: "2-4時間",
      image: "/placeholder.svg?height=400&width=300&text=エンタメ",
    },
  ]

  // 特定の目的地用のカスタマイズ
  if (destination.toLowerCase().includes("ハワイ") || destination.toLowerCase().includes("hawaii")) {
    return [
      {
        id: "diamond-head",
        name: "ダイヤモンドヘッド",
        description: "ハワイの象徴的な火山クレーター。頂上からの絶景が楽しめます。",
        category: "自然・景観",
        duration: "2-3時間",
        image: "/placeholder.svg?height=400&width=300&text=ダイヤモンドヘッド",
      },
      {
        id: "waikiki-beach",
        name: "ワイキキビーチ",
        description: "世界的に有名なビーチ。サーフィンや海水浴が楽しめます。",
        category: "ビーチ・海",
        duration: "半日〜1日",
        image: "/placeholder.svg?height=400&width=300&text=ワイキキビーチ",
      },
      {
        id: "pearl-harbor",
        name: "パールハーバー",
        description: "歴史的な戦艦ミズーリ記念館。歴史を学べる重要なスポット。",
        category: "歴史・文化",
        duration: "3-4時間",
        image: "/placeholder.svg?height=400&width=300&text=パールハーバー",
      },
      {
        id: "hanauma-bay",
        name: "ハナウマ湾",
        description: "シュノーケリングで有名な美しい湾。熱帯魚と泳げます。",
        category: "ビーチ・海",
        duration: "半日",
        image: "/placeholder.svg?height=400&width=300&text=ハナウマ湾",
      },
      {
        id: "polynesian-center",
        name: "ポリネシア文化センター",
        description: "ポリネシアの文化を体験できるテーマパーク。",
        category: "文化体験",
        duration: "1日",
        image: "/placeholder.svg?height=400&width=300&text=ポリネシア文化センター",
      },
      {
        id: "koko-head",
        name: "ココヘッド",
        description: "ハイキングコースとして人気。頂上からの景色は絶景。",
        category: "自然・景観",
        duration: "2-3時間",
        image: "/placeholder.svg?height=400&width=300&text=ココヘッド",
      },
    ]
  }

  return baseAttractions
}

type Preference = "like" | "dislike" | "neutral"

export default function PreferencesPage() {
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "目的地"
  const [attractions, setAttractions] = useState<any[]>([])
  const [preferences, setPreferences] = useState<Record<string, Preference>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [backgroundIndex, setBackgroundIndex] = useState(1) // 背景カード用のインデックス
  const [isAnimating, setIsAnimating] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const generatedAttractions = generateAttractions(destination)
    setAttractions(generatedAttractions)
  }, [destination])

  const handlePreference = (attractionId: string, preference: Preference) => {
    if (isAnimating) return

    // アニメーション開始
    setIsAnimating(true)
    setSwipeDirection(preference === "like" ? "right" : preference === "dislike" ? "left" : "up")

    setPreferences((prev) => ({
      ...prev,
      [attractionId]: preference,
    }))

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setBackgroundIndex((prev) => prev + 1) // 背景インデックスもアニメーション完了後に更新
      setIsAnimating(false)
      setSwipeDirection(null)
      // アニメーション完了後にドラッグ状態を完全にリセット
      setDragOffset({ x: 0, y: 0 })
    }, 300)
  }

  const handleUndo = () => {
    if (currentIndex > 0 && !isAnimating) {
      const prevIndex = currentIndex - 1
      const prevAttractionId = attractions[prevIndex]?.id

      setCurrentIndex(prevIndex)
      setBackgroundIndex(prevIndex + 1) // 背景インデックスも調整
      setPreferences((prev) => {
        const newPrefs = { ...prev }
        delete newPrefs[prevAttractionId]
        return newPrefs
      })
    }
  }

  // マウス/タッチドラッグ開始
  const handleDragStart = (clientX: number, clientY: number) => {
    if (isAnimating) return
    setDragStart({ x: clientX, y: clientY })
    setIsDragging(true)
  }

  // マウス/タッチドラッグ中
  const handleDragMove = (clientX: number, clientY: number) => {
    if (!dragStart || !isDragging || isAnimating) return
    
    const deltaX = clientX - dragStart.x
    const deltaY = clientY - dragStart.y
    setDragOffset({ x: deltaX, y: deltaY })
  }

  // マウス/タッチドラッグ終了
  const handleDragEnd = () => {
    if (!dragStart || !isDragging || isAnimating) return
    
    const threshold = 100 // スワイプ判定の閾値
    const { x, y } = dragOffset
    
    // 右スワイプ（好き）
    if (x > threshold) {
      // ドラッグ状態を保持してPreferenceを実行
      setIsDragging(false)
      setDragStart(null)
      handlePreference(currentAttraction.id, "like")
    }
    // 左スワイプ（嫌い）
    else if (x < -threshold) {
      // ドラッグ状態を保持してPreferenceを実行
      setIsDragging(false)
      setDragStart(null)
      handlePreference(currentAttraction.id, "dislike")
    }
    // 上スワイプ（どちらでも）
    else if (y < -threshold) {
      // ドラッグ状態を保持してPreferenceを実行
      setIsDragging(false)
      setDragStart(null)
      handlePreference(currentAttraction.id, "neutral")
    }
    // スワイプが不十分な場合はカードを元の位置に戻す
    else {
      // アニメーションでカードを元の位置に戻す
      setDragOffset({ x: 0, y: 0 })
      setTimeout(() => {
        setDragStart(null)
        setIsDragging(false)
      }, 200)
      return
    }
  }

  // マウスイベントハンドラー
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  // タッチイベントハンドラー
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragMove(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  const handleGeneratePlan = () => {
    const likedAttractions = Object.entries(preferences)
      .filter(([_, pref]) => pref === "like")
      .map(([id, _]) => id)

    const queryParams = new URLSearchParams({
      destination,
      attractions: likedAttractions.join(","),
    })

    window.location.href = `/plan?${queryParams.toString()}`
  }

  const completedCount = Object.keys(preferences).length
  const likedCount = Object.values(preferences).filter((p) => p === "like").length
  const currentAttraction = attractions[currentIndex]
  const isCompleted = currentIndex >= attractions.length

  if (attractions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">選択完了！</h2>
            <p className="text-gray-600 mb-6">{likedCount}個の観光地があなたの好みにマッチしました✨</p>
            <Button
              onClick={handleGeneratePlan}
              disabled={likedCount === 0}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              size="lg"
            >
              プランを生成する
            </Button>
            {likedCount === 0 && <p className="text-sm text-gray-500 mt-2">少なくとも1つの観光地を選択してください</p>}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{destination}の観光地</h1>
            <p className="text-gray-600 mb-4">スワイプして好みを選択しよう</p>
            <div className="flex justify-center space-x-4">
              <Badge variant="outline" className="bg-white">
                {completedCount}/{attractions.length}
              </Badge>
              <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                ❤️ {likedCount}
              </Badge>
            </div>
          </div>

          <div className="relative h-[600px] mb-6">
            {/* 次のカード（背景） */}
            {backgroundIndex < attractions.length && (
              <Card className={`absolute inset-0 bg-white shadow-lg transition-all duration-300 ${
                isAnimating 
                  ? "transform scale-100 opacity-100"
                  : "transform scale-95 opacity-60"
              }`}>
                <div className="h-full flex flex-col">
                  <div className="relative flex-1">
                    <Image
                      src={attractions[backgroundIndex].image || "/placeholder.svg"}
                      alt={attractions[backgroundIndex].name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                      {backgroundIndex + 1} / {attractions.length}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{attractions[backgroundIndex].name}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{attractions[backgroundIndex].description}</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{attractions[backgroundIndex].category}</Badge>
                      <Badge variant="outline">{attractions[backgroundIndex].duration}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* さらに次のカード（より後ろ） */}
            {backgroundIndex + 1 < attractions.length && (
              <Card className="absolute inset-0 transform scale-90 opacity-30 bg-white shadow-md">
                <div className="h-full rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-400 text-sm font-medium">
                    {backgroundIndex + 2} / {attractions.length}
                  </div>
                </div>
              </Card>
            )}

            {/* 現在のカード */}
            <Card
              className={`absolute inset-0 bg-white shadow-xl cursor-grab active:cursor-grabbing select-none ${
                isAnimating
                  ? swipeDirection === "right"
                    ? "transform translate-x-full rotate-12 opacity-0 transition-all duration-300"
                    : swipeDirection === "left"
                      ? "transform -translate-x-full -rotate-12 opacity-0 transition-all duration-300"
                      : "transform -translate-y-full opacity-0 transition-all duration-300"
                  : isDragging && dragStart
                    ? "transition-none"
                    : dragOffset.x !== 0 || dragOffset.y !== 0
                      ? "transition-transform duration-200 ease-out"
                      : "transform translate-x-0 rotate-0 opacity-100 transition-all duration-200"
              }`}
              style={{
                transform: !isAnimating && (isDragging || dragOffset.x !== 0 || dragOffset.y !== 0)
                  ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`
                  : undefined,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={isDragging ? handleMouseMove : undefined}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="h-full flex flex-col">
                <div className="relative flex-1">
                  <Image
                    src={currentAttraction.image || "/placeholder.svg"}
                    alt={currentAttraction.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                    {currentIndex + 1} / {attractions.length}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{currentAttraction.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{currentAttraction.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{currentAttraction.category}</Badge>
                    <Badge variant="outline">{currentAttraction.duration}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 操作ボタン */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handlePreference(currentAttraction.id, "dislike")}
              disabled={isAnimating}
              className="w-16 h-16 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50"
            >
              <X className="h-6 w-6 text-red-500" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => handlePreference(currentAttraction.id, "neutral")}
              disabled={isAnimating}
              className="w-14 h-14 rounded-full border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              <Meh className="h-5 w-5 text-gray-500" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => handlePreference(currentAttraction.id, "like")}
              disabled={isAnimating}
              className="w-16 h-16 rounded-full border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50"
            >
              <Heart className="h-6 w-6 text-pink-500" />
            </Button>
          </div>

          {/* 操作説明 */}
          <div className="text-center text-sm text-gray-500 mb-4">
            <div className="flex justify-center items-center space-x-6 mb-2">
              <div className="flex items-center">
                <X className="h-4 w-4 text-red-500 mr-1" />
                <span>興味なし</span>
              </div>
              <div className="flex items-center">
                <Meh className="h-4 w-4 text-gray-500 mr-1" />
                <span>どちらでも</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-pink-500 mr-1" />
                <span>行きたい</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              カードをドラッグ・スワイプ | 左←興味なし | 上↑どちらでも | 右→行きたい
            </div>
          </div>

          {/* 戻るボタン */}
          {currentIndex > 0 && (
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={handleUndo}
                disabled={isAnimating}
                className="text-gray-500 hover:text-gray-700"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                前に戻る
              </Button>
            </div>
          )}

          {/* プログレスバー */}
          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / attractions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* ステップ表示 */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-8 text-gray-600">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                  ✓
                </div>
                <span className="text-sm">目的地入力</span>
              </div>
              <div className="w-8 h-0.5 bg-pink-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                  2
                </div>
                <span className="text-sm">スワイプ選択</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                  3
                </div>
                <span className="text-sm">プラン生成</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
