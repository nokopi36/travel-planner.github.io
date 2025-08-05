"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Car, Camera, Download, Share2, Home } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface ScheduleItem {
  time: string
  activity: string
  location: string
  duration: string
  description: string
  type: "attraction" | "transport" | "meal" | "rest"
}

const generateSchedule = (attractionIds: string[], destination: string): ScheduleItem[] => {
  // ハワイ特有の観光地詳細
  const hawaiiAttractionDetails = {
    "diamond-head": {
      name: "ダイヤモンドヘッド",
      duration: "2時間30分",
      description: "早朝のハイキングで美しい日の出を楽しみます",
    },
    "waikiki-beach": {
      name: "ワイキキビーチ",
      duration: "3時間",
      description: "ビーチでリラックス、サーフィン体験も可能",
    },
    "pearl-harbor": {
      name: "パールハーバー",
      duration: "3時間",
      description: "歴史的な戦艦ミズーリ記念館を見学",
    },
    "hanauma-bay": {
      name: "ハナウマ湾",
      duration: "3時間",
      description: "シュノーケリングで熱帯魚と泳ぐ",
    },
    "polynesian-center": {
      name: "ポリネシア文化センター",
      duration: "6時間",
      description: "ポリネシア文化の体験とディナーショー",
    },
    "koko-head": {
      name: "ココヘッド",
      duration: "2時間30分",
      description: "ハイキングで絶景を楽しむ",
    },
  }

  // 汎用的な観光地詳細（その他の目的地用）
  const genericAttractionDetails = {
    "landmark-1": {
      name: `${destination}の象徴的ランドマーク`,
      duration: "2-3時間",
      description: `${destination}で最も有名な観光スポットを見学します`,
    },
    "nature-1": {
      name: `${destination}の自然スポット`,
      duration: "半日",
      description: "美しい自然に囲まれた癒しのスポットを訪れます",
    },
    "culture-1": {
      name: `${destination}の文化体験`,
      duration: "3-4時間",
      description: "現地の文化や歴史を深く学べる貴重な体験をします",
    },
    "food-1": {
      name: `${destination}のグルメスポット`,
      duration: "1-2時間",
      description: "現地の美味しい料理が楽しめる人気のレストランを訪れます",
    },
    "shopping-1": {
      name: `${destination}のショッピング`,
      duration: "2-3時間",
      description: "お土産や現地の商品が購入できるショッピングエリアを楽しみます",
    },
    "entertainment-1": {
      name: `${destination}のエンターテイメント`,
      duration: "2-4時間",
      description: "現地ならではのエンターテイメントを楽しみます",
    },
  }

  // ハワイかどうかで使用する詳細を決定
  const isHawaii = destination.toLowerCase().includes("ハワイ") || destination.toLowerCase().includes("hawaii")
  const attractionDetails = isHawaii ? hawaiiAttractionDetails : genericAttractionDetails

  const schedule: ScheduleItem[] = []
  let currentTime = 8 // 8:00 AM start
  let timeSlots = ["8:00", "10:30", "13:00", "15:30", "18:00"]
  let slotIndex = 0

  // ホテル出発
  schedule.push({
    time: "8:00",
    activity: "ホテル出発",
    location: destination,
    duration: "15分",
    description: "最初の観光地へ向かいます",
    type: "transport",
  })
  slotIndex++

  // 選択された観光地を動的にスケジュールに追加
  attractionIds.forEach((attractionId, index) => {
    const attraction = attractionDetails[attractionId as keyof typeof attractionDetails]
    if (attraction && slotIndex < timeSlots.length) {
      schedule.push({
        time: timeSlots[slotIndex],
        activity: attraction.name,
        location: `${destination}`,
        duration: attraction.duration,
        description: attraction.description,
        type: "attraction",
      })
      slotIndex++

      // 昼食を追加（最初の観光地の後）
      if (index === 0 && slotIndex < timeSlots.length) {
        schedule.push({
          time: timeSlots[slotIndex],
          activity: "ランチ",
          location: `${destination}市内`,
          duration: "1時間",
          description: "現地の美味しい料理を楽しみます",
          type: "meal",
        })
        slotIndex++
      }
    }
  })

  // ディナーを追加
  if (schedule.length > 0) {
    schedule.push({
      time: "19:00",
      activity: "ディナー",
      location: `${destination}市内`,
      duration: "1時間30分",
      description: `${destination}の名物料理をお楽しみください`,
      type: "meal",
    })
  }

  return schedule
}

// 目的地別の旅行のコツを生成
const getTravelTips = (destination: string) => {
  const dest = destination.toLowerCase()
  
  if (dest.includes("ハワイ") || dest.includes("hawaii")) {
    return [
      "早朝のダイヤモンドヘッドは混雑を避けられます",
      "ハナウマ湾は事前予約がおすすめです",
      "日焼け止めと水分補給を忘れずに"
    ]
  } else if (dest.includes("パリ") || dest.includes("paris")) {
    return [
      "美術館は事前予約で待ち時間を短縮できます",
      "メトロの1日券がお得で便利です",
      "カフェではチップは不要です"
    ]
  } else if (dest.includes("ニューヨーク") || dest.includes("new york") || dest.includes("ny")) {
    return [
      "地下鉄は24時間運行で便利です",
      "ブロードウェイのチケットは事前購入がおすすめ",
      "タクシーではチップ18-20%が目安です"
    ]
  } else if (dest.includes("ロンドン") || dest.includes("london")) {
    return [
      "オイスターカードで交通費を節約できます",
      "多くの博物館は入場無料です",
      "雨具は必須アイテムです"
    ]
  } else if (dest.includes("韓国") || dest.includes("korea") || dest.includes("ソウル")) {
    return [
      "T-moneyカードで地下鉄・バスが便利です",
      "明洞や東大門は夜遅くまで営業しています",
      "Wi-Fiが普及しているので通信の心配なし"
    ]
  } else if (dest.includes("台湾") || dest.includes("taiwan") || dest.includes("台北")) {
    return [
      "悠遊カードで交通・支払いが便利です",
      "夜市は夕方以降がおすすめの時間帯です",
      "コンビニでは様々なサービスが利用できます"
    ]
  }
  
  // 汎用的な旅行のコツ
  return [
    `${destination}の観光スポットは事前予約がおすすめです`,
    "現地の文化や習慣を事前に調べておきましょう",
    "歩きやすい靴と水分補給を忘れずに"
  ]
}

// 目的地別の持ち物チェックリストを生成
const getPackingList = (destination: string) => {
  const dest = destination.toLowerCase()
  
  if (dest.includes("ハワイ") || dest.includes("hawaii")) {
    return [
      "シュノーケリング用具（レンタル可）",
      "歩きやすい靴（ハイキング用）",
      "防水カメラ・スマホケース"
    ]
  } else if (dest.includes("パリ") || dest.includes("paris")) {
    return [
      "歩きやすい靴（石畳が多いため）",
      "軽めのジャケット（朝晩の寒さ対策）",
      "ミュージアムパス（事前購入推奨）"
    ]
  } else if (dest.includes("ニューヨーク") || dest.includes("new york") || dest.includes("ny")) {
    return [
      "歩きやすいスニーカー",
      "季節に応じた防寒具",
      "ポータブル充電器（外出時間が長いため）"
    ]
  } else if (dest.includes("ロンドン") || dest.includes("london")) {
    return [
      "折りたたみ傘・レインコート",
      "重ね着できる服装",
      "オイスターカード（交通カード）"
    ]
  } else if (dest.includes("韓国") || dest.includes("korea") || dest.includes("ソウル")) {
    return [
      "歩きやすい靴（坂道が多い）",
      "Wi-Fiルーター（念のため）",
      "エコバッグ（買い物用）"
    ]
  } else if (dest.includes("台湾") || dest.includes("taiwan") || dest.includes("台北")) {
    return [
      "折りたたみ傘（スコール対策）",
      "薄手の長袖（冷房対策）",
      "胃腸薬（食べ歩き用）"
    ]
  }
  
  // 汎用的な持ち物チェックリスト
  return [
    "歩きやすい靴とカジュアルな服装",
    "カメラ・スマホの充電器",
    "現地通貨と身分証明書"
  ]
}

export default function PlanPage() {
  const searchParams = useSearchParams()
  const destination = searchParams.get("destination") || "hawaii"
  const attractionsParam = searchParams.get("attractions") || ""
  const attractionIds = attractionsParam.split(",").filter(Boolean)

  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    // Simulate plan generation
    setTimeout(() => {
      const generatedSchedule = generateSchedule(attractionIds, destination)
      setSchedule(generatedSchedule)
      setIsGenerating(false)
    }, 2000)
  }, [attractionIds, destination])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "attraction":
        return <Camera className="h-5 w-5 text-blue-600" />
      case "transport":
        return <Car className="h-5 w-5 text-gray-600" />
      case "meal":
        return <MapPin className="h-5 w-5 text-green-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "attraction":
        return "bg-blue-50 border-blue-200"
      case "transport":
        return "bg-gray-50 border-gray-200"
      case "meal":
        return "bg-green-50 border-green-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">プランを生成中...</h2>
            <p className="text-gray-600">あなたの好みに合わせて最適なスケジュールを作成しています</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
              あなたの旅行プラン
            </h1>
            <p className="text-gray-600 mb-4">TripMatchがあなたの好みに合わせて最適なスケジュールを生成しました✨</p>
            <div className="flex justify-center space-x-4 mb-4">
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none hover:from-pink-600 hover:to-purple-700"
              >
                <Home className="h-4 w-4 mr-2" />
                新しい旅行を計画
              </Button>
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                PDFダウンロード
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                プランを共有
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  旅行概要
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">目的地</p>
                    <p className="font-semibold">{destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">期間</p>
                    <p className="font-semibold">2日間</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">選択した観光地</p>
                    <p className="font-semibold">{attractionIds.length}箇所</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>詳細スケジュール</CardTitle>
                <CardDescription>時間は目安です。交通状況や現地の状況により変更される場合があります。</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule.map((item, index) => (
                    <div key={index}>
                      <div className={`p-4 rounded-lg border-2 ${getTypeColor(item.type)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            {getTypeIcon(item.type)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-lg">{item.time}</span>
                                <Badge variant="outline" className="text-xs">
                                  {item.duration}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-1">{item.activity}</h3>
                              <p className="text-sm text-gray-600 mb-2">📍 {item.location}</p>
                              <p className="text-sm text-gray-700">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < schedule.length - 1 && (
                        <div className="flex justify-center my-2">
                          <div className="w-0.5 h-4 bg-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>おすすめポイント</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 旅行のコツ</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {getTravelTips(destination).map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">🎒 持ち物チェック</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      {getPackingList(destination).map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-8 text-gray-600">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                  ✓
                </div>
                <span>目的地入力</span>
              </div>
              <div className="w-8 h-0.5 bg-pink-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                  ✓
                </div>
                <span>スワイプ選択</span>
              </div>
              <div className="w-8 h-0.5 bg-pink-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-2">
                  ✓
                </div>
                <span>プラン完成</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
