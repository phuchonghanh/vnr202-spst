'use client';

import Link from 'next/link';

export default function VideoPage() {
  // Thay YOUR_VIDEO_ID bằng ID video YouTube của bạn
  // Ví dụ: nếu URL là https://www.youtube.com/watch?v=dQw4w9WgXcQ thì videoId = "dQw4w9WgXcQ"
  const videoId = "ymmSSBc2xMY"; // ← Thay bằng video ID của bạn
 
  return (
    <div className="min-h-screen bg-black relative">
      {/* Header với nút Back */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <button className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2">
            <span>←</span>
            <span>Về trang chủ</span>
          </button>
        </Link>
      </div>

      {/* Main Content - Video */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-4xl">
          
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              📺 Video Presentation
            </h1>
            <p className="text-gray-300 text-lg">
              Đảng Cộng sản Việt Nam ra đời và Cương lĩnh chính trị đầu tiên của Đảng
            </p>
          </div>

          {/* Video Player */}
          <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Video Info & Controls */}
          <div className="mt-6 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2"
              >
                <span>📱</span>
                <span>Xem trên YouTube</span>
              </a>

              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2"
              >
                <span>🔄</span>
                <span>Tải lại video</span>
              </button>
            </div>

            <div className="text-gray-400 text-sm max-w-2xl mx-auto">
              <p>
                Video này giới thiệu về quá trình hình thành Đảng Cộng sản Việt Nam 
                và ý nghĩa lịch sử của Cương lĩnh chính trị đầu tiên.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-1/4 -left-8 w-32 h-32 bg-white opacity-3 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-3/4 left-1/4 w-20 h-20 bg-white opacity-2 rounded-full"></div>
      </div>
    </div>
  );
}