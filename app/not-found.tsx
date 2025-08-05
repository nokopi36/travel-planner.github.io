import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">ページが見つかりません</h2>
        <p className="text-gray-500 mb-8">お探しのページは存在しないか、移動されました。</p>
        <Link 
          href="/" 
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}