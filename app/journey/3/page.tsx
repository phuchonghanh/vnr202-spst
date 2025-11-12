'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Journey3() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Data cho slides với nội dung từ file
  const slidesData = [
    {
      id: 1,
      title: "Tinh hoa văn hóa nhân loại",
      content: "Tinh hoa văn hóa nhân loại là một trong những nguồn cơ sở lý luận quan trọng hình thành tư tưởng Hồ Chí Minh. Người đã tiếp thu, kế thừa và phát triển sáng tạo tinh hoa văn hóa cả phương Đông lẫn phương Tây để phục vụ cho sự nghiệp cách mạng của dân tộc Việt Nam.",
      images: ["/context/images/tinh-hoa-van-hoa.jpg"]
    },
    {
      id: 2,
      title: "Tinh hoa văn hóa phương Đông",
      content: "Tinh hoa văn hoá, tư tưởng phương Đông kết tinh trong ba học thuyết lớn: Nho giáo, Phật giáo, Lão giáo. Đó là những học thuyết có ảnh hưởng sâu rộng ở phương Đông, và ở Việt Nam trước đây. Hồ Chí Minh đã nghiên cứu, tiếp thu và vận dụng sáng tạo những tinh hoa từ các học thuyết này.",
      images: ["/context/images/phuong-dong.jpg", "/context/images/ba-hoc-thuyet.jpg"]
    },
    {
      id: 3,
      title: "Kế thừa từ Nho giáo",
      content: "Về Nho giáo, Hồ Chí Minh phân tích: 'Tuy Khổng Tử là phong kiến và tuy trong học thuyết của Khổng Tử có nhiều điều không đúng song những điều hay trong đó thì chúng ta nên học.' Người đã kế thừa tư tưởng dùng nhân trị, đức trị để quản lý xã hội, đặc biệt chú trọng tinh thần trọng đạo đức trong tu dưỡng và xây dựng Đảng.",
      images: ["/context/images/nho-giao.png", "/context/images/khong-tu.jpg"]
    },
    {
      id: 4,
      title: "Tiếp thu từ Phật giáo",
      content: "Đối với Phật giáo, Hồ Chí Minh chú ý kế thừa tư tưởng từ bi, vị tha, yêu thương con người, khuyến khích làm việc thiện, chống lại điều ác. Trong thư gửi Hội Phật tử năm 1947, Người viết: 'Đức Phật là đại từ đại bi, cứu khổ cứu nạn... Nay đồng bào ta đại đoàn kết, hy sinh của cải xương máu, kháng chiến đến cùng, để đánh tan thực dân phản động'.",
      images: ["/context/images/phat-giao.jpg", "/context/images/tu-bi-vi-tha.jpg"]
    },
    {
      id: 5,
      title: "Học hỏi từ Lão giáo",
      content: "Đối với Lão giáo, Hồ Chí Minh kế thừa tư tưởng của Lão Tử về việc sống gắn bó với thiên nhiên, hoà đồng với thiên nhiên, bảo vệ môi trường sống. Người kêu gọi nhân dân trồng cây, tổ chức 'Tết trồng cây'. Hồ Chí Minh cũng kế thừa tư tưởng thoát mọi ràng buộc của vòng danh lợi, khuyên cán bộ thực hiện cần kiệm liêm chính, chí công vô tư.",
      images: ["/context/images/lao-giao.jfif", "/context/images/lao-tu.jpg"]
    },
    {
      id: 6,
      title: "Các trường phái tư tưởng khác",
      content: "Hồ Chí Minh còn chú ý kế thừa nhiều ý tưởng của các trường phái khác nhau trong các nhà tư tưởng phương Đông cổ đại như Mặc Tử, Hàn Phi Tử, Quản Tử. Người cũng tìm hiểu những trào lưu tư tưởng tiến bộ thời cận hiện đại ở Ấn Độ, Trung Quốc như chủ nghĩa Găngđi, chủ nghĩa Tam dân của Tôn Trung Sơn.",
      images: ["/context/images/mac-tu.jpg", "/context/images/ton-trung-son.jpg"]
    },
    {
      id: 7,
      title: "Tinh hoa văn hóa phương Tây",
      content: "Ngay từ khi còn học ở Trường tiểu học Pháp-bản xứ ở thành phố Vinh (1905), Hồ Chí Minh đã quan tâm tới khẩu hiệu nổi tiếng của Đại Cách mạng Pháp năm 1789: Tự do - Bình đẳng - Bác ái. Đi sang phương Tây, Người quan tâm tìm hiểu những khẩu hiệu này trong các cuộc cách mạng tư sản ở Anh, Pháp, Mỹ.",
      images: ["/context/images/phuong-tay.png", "/context/images/cach-mang-phap.jpg"]
    },
    {
      id: 8,
      title: "Nhân quyền và dân quyền",
      content: "Hồ Chí Minh đã kế thừa, phát triển những quan điểm nhân quyền, dân quyền trong Bản Tuyên ngôn Độc lập năm 1776 của Mỹ, Bản Tuyên ngôn Nhân quyền và Dân quyền năm 1791 của Pháp và đề xuất quan điểm về quyền mưu cầu độc lập, tự do, hạnh phúc của các dân tộc trong thời đại ngày nay.",
      images: ["/context/images/nhan-quyen.jpg", "/context/images/dan-quyen.jpg"]
    },
    {
      id: 9,
      title: "Nghiên cứu tại các trung tâm văn hóa",
      content: "Trong hành trình đi tìm đường cứu nước, Hồ Chí Minh đã sống, hoạt động thực tiễn, nghiên cứu lý luận tại những trung tâm chính trị kinh tế văn hóa lớn ở các cường quốc như Mỹ, Anh, Pháp, Nga, Trung Quốc bằng chính ngôn ngữ của các nước đó. Người trực tiếp nghiên cứu tư tưởng nhân văn, dân chủ của các nhà khai sáng phương Tây như Vonte, Rutxô, Môngtétxkiơ.",
      images: ["/context/images/nghien-cuu-quoc-te.png", "/context/images/khai-sang.jpg"]
    },
    {
      id: 10,
      title: "Văn học và nghệ thuật",
      content: "Hồ Chí Minh thích đọc sách văn học của Shakespeare bằng tiếng Anh, Lỗ Tấn bằng tiếng Trung Hoa, Hugo, Zola bằng tiếng Pháp. Hai nhà văn Anatole France và Léon Tolstoi 'có thể nói là những người đỡ đầu văn học' cho Hồ Chí Minh. Điều này cho thấy Người đã tiếp thu rộng rãi tinh hoa văn học nghệ thuật thế giới.",
      images: ["/context/images/van-hoc-the-gioi.jpg", "/context/images/shakespeare-hugo.jpg"]
    },
    {
      id: 11,
      title: "Kết luận",
      content: "Hồ Chí Minh đã tích hợp thành công tinh hoa văn hóa phương Đông và phương Tây, tạo nên một hệ thống tư tưởng phong phú và toàn diện. Việc kế thừa và phát triển sáng tạo tinh hoa văn hóa nhân loại đã giúp Người xây dựng được một nền tảng lý luận vững chắc cho tư tưởng cách mạng của mình.",
      images: ["/context/images/tich-hop-dong-tay.jpg"]
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
  const borderColor = isEvenSlide ? 'border-white' : 'border-gray-800';
  const frameColor = isEvenSlide ? 'border-gray-800' : 'border-white';

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header với nút Back */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2">
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
                  <div className={`w-24 h-1 ${isEvenSlide ? 'bg-white' : 'bg-gray-800'}`}></div>
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
                            ? (isEvenSlide ? 'bg-white border border-gray-800' : 'bg-gray-800')
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
            isEvenSlide ? 'bg-white' : 'bg-gray-800'
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