'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChuNghiaMacLenin() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Data cho slides với nội dung từ file
  const slidesData = [
    {
      id: 1,
      title: "Chủ nghĩa Mác-Lênin",
      content: "Chủ nghĩa Mác-Lênin là cơ sở lý luận quyết định bước phát triển mới về chất trong tư tưởng Hồ Chí Minh, khiến Người vượt hẳn lên phía trước so với những người yêu nước cùng thời. Đây là tiền đề lý luận quan trọng nhất, có vai trò quyết định trong việc hình thành tư tưởng Hồ Chí Minh.",
      images: ["/context/images/mac-lenin.jpg"]
    },
    {
      id: 2,
      title: "Cách mạng Tháng Mười và thời đại mới",
      content: "Cách mạng Tháng Mười Nga năm 1917 và thời đại mới cũng như chủ nghĩa Mác-Lênin đã tạo ra bước ngoặt quyết định trong tư duy của Hồ Chí Minh. Thành công của cách mạng xã hội chủ nghĩa đầu tiên trên thế giới đã chỉ ra con đường cách mạng mới cho các dân tộc thuộc địa.",
      images: ["/context/images/thang-muoi-nga.jpg", "/context/images/thoi-dai-moi.jpg"]
    },
    {
      id: 3,
      title: "Chủ nghĩa chân chính nhất",
      content: "Ngay từ cuối những năm 20 của thế kỷ XX, Hồ Chí Minh khẳng định rằng: 'Bây giờ học thuyết nhiều, chủ nghĩa nhiều, nhưng chủ nghĩa chân chính nhất, chắc chắn nhất, cách mạng nhất là chủ nghĩa Lênin'. Đây là sự lựa chọn có ý thức và kiên định của Người với chủ nghĩa Mác-Lênin.",
      images: ["/context/images/chu-nghia-chan-chinh.jpg"]
    },
    {
      id: 4,
      title: "Giải quyết khủng hoảng đường lối",
      content: "Vận dụng và phát triển sáng tạo chủ nghĩa Mác-Lênin, Hồ Chí Minh đã giải quyết được cuộc khủng hoảng đường lối cứu nước và người lãnh đạo cách mạng ở Việt Nam cuối thế kỷ XIX đầu thế kỷ XX. Chủ nghĩa Mác-Lênin đã cung cấp lý luận khoa học cho con đường cách mạng Việt Nam.",
      images: ["/context/images/giai-quyet-khung-hoang.jpg", "/context/images/duong-loi-moi.jpg"]
    },
    {
      id: 5,
      title: "Thế giới quan và phương pháp luận",
      content: "Đối với Hồ Chí Minh, chủ nghĩa Mác-Lênin là thế giới quan, phương pháp luận trong nhận thức và hoạt động cách mạng. Trên cơ sở lập trường, quan điểm và phương pháp của chủ nghĩa Mác-Lênin, Hồ Chí Minh đã triệt để kế thừa, đổi mới, phát triển những giá trị truyền thống tốt đẹp của dân tộc Việt Nam.",
      images: ["/context/images/the-gioi-quan.jpg", "/context/images/phuong-phap-luan.jpg"]
    },
    {
      id: 6,
      title: "Hệ thống quan điểm toàn diện",
      content: "Kết hợp tinh hoa văn hóa nhân loại với thực tiễn cách mạng trong nước và thế giới, Hồ Chí Minh đã hình thành lên một hệ thống các quan điểm cơ bản, toàn diện về cách mạng Việt Nam. Đây là sự vận dụng sáng tạo chủ nghĩa Mác-Lênin vào điều kiện cụ thể của Việt Nam.",
      images: ["/context/images/he-thong-quan-diem.jpg"]
    },
    {
      id: 7,
      title: "Trở thành người cộng sản",
      content: "Tiếp thu chủ nghĩa Mác-Lênin, Hồ Chí Minh đã trở thành người cộng sản với tầm vóc trí tuệ lớn như Lênin mong muốn: 'Người ta chỉ có thể trở thành người cộng sản khi biết làm giàu trí óc của mình bằng sự hiểu biết tất cả những kho tàng tri thức mà nhân loại đã tạo ra'.",
      images: ["/context/images/nguoi-cong-san.jpg", "/context/images/lenin-day.webp"]
    },
    {
      id: 8,
      title: "Hiểu biết sâu sắc kho tàng tri thức",
      content: "Hồ Chí Minh trở thành người cộng sản trên cơ sở hiểu biết sâu sắc kho tàng tri thức của nhân loại từ cổ chí kim, từ Đông sang Tây. Về việc đó, Hồ Chí Minh chỉ rõ: 'Học thuyết Khổng Tử có ưu điểm là sự tu dưỡng đạo đức cá nhân. Tôn giáo Giêxu có ưu điểm là lòng nhân ái cao cả. Chủ nghĩa Mác có ưu điểm là phương pháp làm việc biện chứng.'",
      images: ["/context/images/kho-tang-tri-thuc.jpg", "/context/images/hieu-biet-sau-sac.jpg"]
    },
    {
      id: 9,
      title: "Học trò nhỏ của các vị ấy",
      content: "Hồ Chí Minh khiêm tốn nói: 'Khổng Tử, Giêxu, Mác, Tôn Dật Tiên chẳng phải đã có những ưu điểm chung đó sao? Họ đều muốn mưu hạnh phúc cho loài người, mưu phúc lợi cho xã hội. Nếu hôm nay họ còn sống trên đời này, nếu họ hợp lại một chỗ, tôi tin rằng họ nhất định chung sống với nhau rất hoàn mỹ như những người bạn thân thiết. Tôi cố gắng làm học trò nhỏ của các vị ấy'.",
      images: ["/context/images/hoc-tro-nho.jpg", "/context/images/khong-tu.jpg"]
    },
    {
      id: 10,
      title: "Vũ khí không gì thay thế được",
      content: "Tổng kết kinh nghiệm thắng lợi của cách mạng Việt Nam, Hồ Chí Minh khẳng định: 'Chúng tôi giành được thắng lợi đó là do nhiều nhân tố, nhưng cần phải nhấn mạnh rằng - mà không phải chỉ nhân dịp kỷ niệm lần thứ 100 ngày sinh Lênin - chúng tôi giành được những thắng lợi đó trước hết là nhờ cái vũ khí không gì thay thế được là chủ nghĩa Mác-Lênin'.",
      images: ["/context/images/vu-khi-khong-the-thay-the.jpg"]
    },
    {
      id: 11,
      title: "Bổ sung và phát triển",
      content: "Trong quá trình lãnh đạo cách mạng Việt Nam, Chủ tịch Hồ Chí Minh không những đã vận dụng sáng tạo, mà còn bổ sung, phát triển và làm phong phú chủ nghĩa Mác-Lênin trong thời đại mới. Trong các vấn đề dân tộc và cách mạng giải phóng dân tộc; chủ nghĩa xã hội và xây dựng chủ nghĩa xã hội ở Việt Nam; các vấn đề xây dựng Đảng, Nhà nước, văn hóa, con người, đạo đức.",
      images: ["/context/images/bo-sung-phat-trien.jpg", "/context/images/lam-phong-phu.jpg"]
    },
    {
      id: 12,
      title: "Kết luận",
      content: "Tư tưởng Hồ Chí Minh là một bước nhảy vọt trong lịch sử tư tưởng Việt Nam. Chủ nghĩa Mác-Lênin đã cung cấp nền tảng lý luận khoa học vững chắc, giúp Hồ Chí Minh xây dựng được một hệ thống tư tưởng cách mạng hoàn chỉnh, phù hợp với điều kiện cụ thể của Việt Nam và xu hướng phát triển của thời đại.",
      images: ["/context/images/buoc-nhay-vot.jpg"]
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