'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GiaTriTruyenThong() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Data cho slides với nội dung từ file
  const slidesData = [
    {
      id: 1,
      title: "Giá trị truyền thống tốt đẹp của dân tộc Việt Nam",
      content: "Giá trị truyền thống tốt đẹp của dân tộc Việt Nam là một trong những cơ sở lý luận quan trọng hình thành tư tưởng Hồ Chí Minh. Các giá trị này đã được Người kế thừa, phát triển sáng tạo để phục vụ cho cuộc cách mạng giải phóng dân tộc và xây dựng đất nước.",
      images: ["/context/images/gia-tri-truyen-thong.jpg"]
    },
    {
      id: 2,
      title: "Chủ nghĩa yêu nước - Giá trị xuyên suốt",
      content: "Chủ nghĩa yêu nước là giá trị xuyên suốt trong những truyền thống tốt đẹp của dân tộc Việt Nam. Đó là động lực, sức mạnh giúp cho dân tộc Việt Nam tồn tại vượt qua mọi khó khăn trong dựng nước và giữ nước mà phát triển. Chính chủ nghĩa yêu nước là nền tảng tư tưởng, điểm xuất phát và động lực thúc đẩy Hồ Chí Minh ra đi tìm đường cứu nước.",
      images: ["/context/images/yeu-nuoc.jpg", "/context/images/ho-chi-minh-patriot.jpg"]
    },
    {
      id: 3,
      title: "Tinh thần đấu tranh anh dũng, bất khuất",
      content: "Hồ Chí Minh đã chú ý kế thừa, phát triển tinh thần đấu tranh anh dũng, bất khuất vì độc lập, tự do của Tổ quốc, nhằm bảo vệ chủ quyền quốc gia và sự toàn vẹn lãnh thổ của chủ nghĩa yêu nước Việt Nam. Trong Tuyên ngôn Độc lập, Hồ Chí Minh đã trịnh trọng tuyên bố: 'Nước Việt Nam có quyền hưởng tự do và độc lập'.",
      images: ["/context/images/tuyen-ngon-doc-lap.jpg", "/context/images/anh-dung-bat-khuot.jpg"]
    },
    {
      id: 4,
      title: "Không có gì quý hơn độc lập tự do",
      content: "'Không có gì quý hơn độc lập tự do' - chân lý lớn của thời đại được Hồ Chí Minh khẳng định, đồng thời cũng chính là một điểm cốt lõi trong tư tưởng Hồ Chí Minh. Đây là kết quả của việc kế thừa và phát triển tinh thần yêu nước của dân tộc Việt Nam.",
      images: ["/context/images/doc-lap-tu-do.jpg"]
    },
    {
      id: 5,
      title: "Yêu nước gắn liền với yêu dân",
      content: "Trong lãnh đạo nhân dân Việt Nam xây dựng và bảo vệ đất nước, Hồ Chí Minh hết sức chú trọng kế thừa, phát triển những giá trị truyền thống tốt đẹp của dân tộc Việt Nam: yêu nước gắn liền với yêu dân, có tinh thần đoàn kết, dân chủ, nhân ái, khoan dung trong cộng đồng và hòa hiếu với các dân tộc lân bang.",
      images: ["/context/images/yeu-nuoc-yeu-dan.jpg", "/context/images/doan-ket.jpg"]
    },
    {
      id: 6,
      title: "Con người là vốn quý nhất",
      content: "Trong tư tưởng Hồ Chí Minh, con người là vốn quý nhất, là nhân tố quyết định thành công của cách mạng; dân là gốc của nước; nước lấy dân làm gốc; gốc có vững cây mới bền; xây lầu thắng lợi trên nền nhân dân. Đây là sự kế thừa và phát triển tinh thần cần cù, dũng cảm, sáng tạo, lạc quan, vì nghĩa, thương người của dân tộc Việt Nam.",
      images: ["/context/images/con-nguoi-von-quy.jpg", "/context/images/dan-la-goc.jpg"]
    },
    {
      id: 7,
      title: "Đoàn kết dân tộc và quốc tế",
      content: "Đoàn kết dân tộc gắn liền với đoàn kết quốc tế là một nguyên tắc chiến lược quyết định thắng lợi của cách mạng Việt Nam. Đây là sự phát triển sáng tạo từ truyền thống đoàn kết của dân tộc Việt Nam, mở rộng ra phạm vi quốc tế.",
      images: ["/context/images/doan-ket-dan-toc.jpg", "/context/images/doan-ket-quoc-te.jpg"]
    },
    {
      id: 8,
      title: "Tự hào về lịch sử và văn hóa dân tộc",
      content: "Trong truyền thống dân tộc Việt Nam thường trực một niềm tự hào về lịch sử, trân trọng nền văn hóa, ngôn ngữ, phong tục tập quán và những giá trị tốt đẹp khác của dân tộc. Đó chính là một cơ sở hình thành nên tư tưởng, phẩm chất của nhà văn hóa kiệt xuất Hồ Chí Minh.",
      images: ["/context/images/tu-hao-lich-su.jpg", "/context/images/van-hoa-dan-toc.jpg"]
    },
    {
      id: 9,
      title: "Văn hóa là mục tiêu và động lực",
      content: "Hồ Chí Minh có chủ trương văn hóa là mục tiêu, động lực của cách mạng; cần giữ gìn cốt cách văn hóa dân tộc đồng thời tiếp thu tinh hoa văn hóa nhân loại, xây dựng nền văn hoá mới của Việt Nam. Chính Hồ Chí Minh là một biểu tượng cao đẹp của sự tích hợp tinh hoa văn hóa phương Đông và phương Tây.",
      images: ["/context/images/van-hoa-muc-tieu.jpg", "/context/images/van-hoa-dong-tay.jpg"]
    },
    {
      id: 10,
      title: "Kết luận",
      content: "Giá trị truyền thống tốt đẹp của dân tộc Việt Nam đã tạo nên nền tảng vững chắc cho sự hình thành tư tưởng Hồ Chí Minh. Việc kế thừa và phát triển sáng tạo những giá trị này đã giúp Người xây dựng được một hệ thống tư tưởng toàn diện, phù hợp với điều kiện cụ thể của Việt Nam và xu thế phát triển của thời đại.",
      images: ["/context/images/ket-luan-gia-tri.jpg"]
    }
  ];

  const totalSlides = slidesData.length;

  // Navigation functions
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setIsTransitioning(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setIsTransitioning(false);
    }, 150);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 150);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTransitioning]);

  const currentData = slidesData[currentSlide];
  const isEvenSlide = (currentSlide + 1) % 2 === 0;
  const borderColor = isEvenSlide ? 'border-yellow-400' : 'border-red-600';
  const frameColor = isEvenSlide ? 'border-red-600' : 'border-yellow-400';

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header với nút Back */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2">
            <span>←</span>
            <span>Về trang chủ</span>
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className={`h-screen flex items-center transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        <div className={`w-full h-full border-l-8 ${borderColor} relative`}>
          <div className="container mx-auto px-8 py-12 h-full">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center ${isEvenSlide ? 'lg:grid-flow-col-dense' : ''}`}>
              
              {/* Text Content */}
              <div className={`space-y-6 ${isEvenSlide ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                    {currentData.title}
                  </h1>
                  <div className={`w-24 h-1 ${isEvenSlide ? 'bg-yellow-400' : 'bg-red-600'}`}></div>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentData.content}
                </p>

                {/* Slide counter */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{currentSlide + 1} / {totalSlides}</span>
                  <div className="flex gap-1">
                    {Array.from({length: totalSlides}, (_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                          i === currentSlide 
                            ? (isEvenSlide ? 'bg-yellow-400' : 'bg-red-600')
                            : 'bg-gray-300'
                        }`}
                        onClick={() => goToSlide(i)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className={`${isEvenSlide ? 'lg:col-start-1' : ''}`}>
                <div className={`${
                  currentData.images.length >= 3 
                    ? 'grid grid-cols-2 gap-4' 
                    : 'space-y-4'
                }`}>
                  {currentData.images.map((image, index) => (
                    <div 
                      key={`${currentSlide}-${index}`} 
                      className={`border-4 ${frameColor} rounded-lg overflow-hidden shadow-lg bg-gray-100 aspect-video relative`}
                    >
                      <img 
                        src={image} 
                        alt={`${currentData.title} - Hình ${index + 1}`}
                        className="w-full h-full object-cover"
                        onLoad={(e) => {
                          // Show image and hide fallback when loaded successfully
                          e.currentTarget.style.display = 'block';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'none';
                        }}
                        onError={(e) => {
                          // Hide image and show fallback if loading fails
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-center bg-gray-100" style={{ display: 'none' }}>
                        <div>
                          <div className="text-4xl mb-2">🖼️</div>
                          <p className="text-sm">Hình ảnh không tải được</p>
                          <p className="text-xs text-gray-400 break-all px-2">{image}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 z-40"
      >
        <span className="text-2xl">‹</span>
      </button>
      
      <button 
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 z-40"
      >
        <span className="text-2xl">›</span>
      </button>

      {/* Progress Bar with Pulsing Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
        <div 
          className={`h-full transition-all duration-500 ${
            isEvenSlide ? 'bg-yellow-400' : 'bg-red-600'
          } animate-pulse`}
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
        {/* Pulsing dots */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center space-x-1">
          {Array.from({length: totalSlides}, (_, i) => (
            <div 
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-300 cursor-pointer ${
                i <= currentSlide 
                  ? (isEvenSlide ? 'bg-yellow-600 animate-ping' : 'bg-red-800 animate-ping')
                  : 'bg-gray-400'
              }`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}