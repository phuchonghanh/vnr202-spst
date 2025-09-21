'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CoSoThucTien() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Data cho 10 slides với nội dung từ file
  const slidesData = [
    {
      id: 1,
      title: "Cơ sở thực tiễn hình thành tư tưởng Hồ Chí Minh",
      content: "Tư tưởng Hồ Chí Minh được hình thành từ hai cơ sở chính: cơ sở thực tiễn và cơ sở lý luận. Cơ sở thực tiễn bao gồm thực tiễn Việt Nam và thực tiễn thế giới cuối thế kỷ XIX, đầu thế kỷ XX - thời kỳ quan trọng trong quá trình hình thành nhân cách và tư tưởng của Người.",
      images: ["/context/images/ho-chi-minh-1.jpg"]
    },
    {
      id: 2,
      title: "Thực tiễn Việt Nam cuối thế kỷ XIX",
      content: "Từ năm 1858, đế quốc Pháp bắt đầu tiến hành xâm lược Việt Nam. Triều đình nhà Nguyễn lần lượt ký kết các hiệp ước đầu hàng, từng bước trở thành tay sai của thực dân Pháp. Điều này đã tạo ra bối cảnh lịch sử quan trọng cho việc hình thành tư tưởng giải phóng dân tộc.",
      images: ["/context/images/vietnam-1858.jpg", "/context/images/french-invasion.jpg"]
    },
    {
      id: 3,
      title: "Các phong trào kháng chiến yêu nước",
      content: "Từ năm 1858 đến cuối thế kỷ XIX, các phong trào đấu tranh yêu nước chống Pháp xâm lược liên tục nổ ra. Ở miền Nam có Trương Định, Nguyễn Trung Trực. Ở miền Trung có Trần Tấn, Đặng Như Mai, Phan Đình Phùng. Ở miền Bắc có Nguyễn Thiện Thuật, Hoàng Hoa Thám và nhiều anh hùng khác.",
      images: ["/context/images/phan-dinh-phung.jpg", "/context/images/hoang-hoa-tham.jpg", "/context/images/can-vuong.png"]
    },
    {
      id: 4,
      title: "Thất bại của giai cấp phong kiến",
      content: "Các cuộc khởi nghĩa, trong đó có những cuộc dưới ngọn cờ 'Cần Vương', tuy đều rất anh dũng nhưng cuối cùng đều thất bại. Điều đó chứng tỏ nhân dân ta rất yêu nước, song giai cấp phong kiến và hệ tư tưởng của nó đã suy tàn, bất lực trước nhiệm vụ bảo vệ độc lập dân tộc.",
      images: ["/context/images/feudal-failure.jpg"]
    },
    {
      id: 5,
      title: "Thay đổi cơ cấu xã hội",
      content: "Thực dân Pháp biến nước ta từ một nước phong kiến thành nước thuộc địa và phong kiến, dẫn tới sự biến đổi về cơ cấu giai cấp. Thực dân Pháp vẫn duy trì nền kinh tế nông nghiệp lạc hậu với khoảng 95% dân số là nông dân, đồng thời tăng cường giai cấp địa chủ.",
      images: ["/context/images/colonial-society.jpg", "/context/images/peasants.jpg"]
    },
    {
      id: 6,
      title: "Sự xuất hiện của các giai cấp mới",
      content: "Trong xã hội Việt Nam xuất hiện những giai tầng mới: giai cấp công nhân, giai cấp tư sản và tầng lớp tiểu tư sản ở thành thị. Từ đó xuất hiện các mâu thuẫn mới: giữa công nhân với tư sản, và giữa toàn thể nhân dân Việt Nam với chủ nghĩa đế quốc Pháp.",
      images: ["/context/images/working-class.jpg", "/context/images/new-classes.jpg"]
    },
    {
      id: 7,
      title: "Các phong trào dân chủ tư sản",
      content: "Đầu thế kỷ XX, xuất hiện các phong trào yêu nước theo khuynh hướng dân chủ tư sản: Phong trào Đông Du do Phan Bội Châu khởi xướng (1905-1909), Phong trào Duy Tân do Phan Châu Trinh phát động (1906-1908), Phong trào Đông Kinh Nghĩa Thục (1907).",
      images: ["/context/images/phan-boi-chau.jpg", "/context/images/phan-chau-trinh.jpg", "/context/images/dong-kinh-nghia-thuc.jpg"]
    },
    {
      id: 8,
      title: "Khủng hoảng về đường lối cứu nước",
      content: "Các phong trào yêu nước theo khuynh hướng dân chủ tư sản đều thất bại do giai cấp tư sản Việt Nam còn non yếu và chưa có đường lối, phương pháp cách mạng đúng đắn. Xuất hiện câu hỏi: Cứu nước bằng con đường nào để có thể đi đến thắng lợi?",
      images: ["/context/images/crisis.pngks"]
    },
    {
      id: 9,
      title: "Sự ra đời giai cấp công nhân",
      content: "Cuối thế kỷ XIX, ở Việt Nam đã có công nhân. Đầu thế kỷ XX, công nhân phát triển hơn và trở thành một giai cấp. Công nhân Việt Nam chịu ba tầng áp bức: thực dân, tư bản, phong kiến. Họ sớm vùng dậy đấu tranh từ hình thức thô sơ đến đình công, bãi công.",
      images: ["/context/images/workers-movement.jpg", "/context/images/strikes.jpg"]
    },
    {
      id: 10,
      title: "Thực tiễn thế giới và Cách mạng Tháng Mười",
      content: "Cách mạng Tháng Mười Nga thành công đã mở ra thời đại mới, mở ra con đường giải phóng cho các dân tộc bị áp bức. Quốc tế Cộng sản ra đời (1919) trở thành lãnh đạo phong trào cách mạng thế giới, ảnh hưởng sâu sắc tới Hồ Chí Minh trên hành trình tìm con đường cứu nước.",
      images: ["/context/images/october-revolution.jpg", "/context/images/communist-international.jpg"]
    },
    {
      id: 11,
      title: "Kết luận",
      content: "Cơ sở thực tiễn đã tạo ra những điều kiện khách quan quan trọng cho việc hình thành tư tưởng Hồ Chí Minh. Thực tiễn Việt Nam với những thử thách và khủng hoảng, cùng với thực tiễn thế giới với những biến đổi lớn, đã cung cấp nền tảng vững chắc cho sự ra đời một tư tưởng cách mạng mới - tư tưởng Hồ Chí Minh.",
      images: ["/context/images/conclusion.jpg"]
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