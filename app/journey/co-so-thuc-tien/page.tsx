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
      title: 'Bối cảnh ra đời — Quốc tế',
      content:
        'Chủ nghĩa tư bản chuyển sang giai đoạn đế quốc, đẩy mạnh xâm chiếm thuộc địa.\n' +
        'Cách mạng Tháng Mười Nga (1917) thắng lợi mở ra thời đại giải phóng dân tộc.\n' +
        'Quốc tế Cộng sản (1919) do V.I.Lênin lãnh đạo định hướng đấu tranh cách mạng.',
      images: ['https://cand.com.vn/Files/Image/honghai/2019/11/05/338e1e7a-975c-4af8-a7d4-8c114f1cec7d.jpg']
    },
    {
      id: 2,
      title: 'Bối cảnh ra đời — Việt Nam',
      content:
        'Việt Nam dưới ách thực dân Pháp; mâu thuẫn cơ bản: toàn thể dân tộc VS thực dân Pháp và phong kiến tay sai.\n' +
        'Các phong trào yêu nước theo ngọn cờ phong kiến, dân chủ tư sản đều thất bại do thiếu đường lối đúng và tổ chức vững mạnh.',
      images: ['https://images.hcmcpv.org.vn/res/news/2021/08/31-08-2021-hai-cuoc-khang-phap-cua-dan-toc-viet-nam-E727E55B.jpg']
    },
    {
      id: 3,
      title: 'Nguyễn Ái Quốc — Hành trình 1911–1920',
      content:
        '1911: Nguyễn Tất Thành ra đi tìm đường cứu nước.\n' +
        'Tiếp xúc nhiều dòng tư tưởng, khảo nghiệm các con đường cứu nước ở phương Tây.',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fgwNjpCKPTDxdT9xqMhyT9qigTy7H9S-Gw&s']
    },
    {
      id: 4,
      title: 'Nguyễn Ái Quốc — Lựa chọn con đường',
      content:
        '12–1920: Bỏ phiếu tán thành Quốc tế Cộng sản tại Đại hội Tua; trở thành người cộng sản Việt Nam đầu tiên.\n' +
        'Khẳng định: con đường cứu nước là cách mạng vô sản; “Đảng muốn vững phải có chủ nghĩa làm cốt”.',
      images: ['https://mediafile.qdnd.vn//images/2022/6/4/khoi-1.jpg']
    },
    {
      id: 5,
      title: 'Chuẩn bị — Tư tưởng, tổ chức',
      content:
        '1925: Thành lập Hội Việt Nam Cách mạng Thanh niên ở Quảng Châu; mở lớp huấn luyện, gửi cán bộ về nước.\n' +
        '1927: Xuất bản “Đường Cách mệnh” — hệ thống hoá quan điểm cách mạng vô sản cho Việt Nam.',
      images: ['https://files-vnportal.camau.dcs.vn/tinhuy/2681/Banner/vanban/Hinhanh/images-qc.jpg', 'https://www.thuviendongnai.gov.vn/_layouts/LacVietBIO/fckUpload/2022-8/DKM2082022_13034.jpg']
    },
    {
      id: 6,
      title: 'Tiền đề tổ chức — Năm 1929',
      content:
        'Sự phát triển của phong trào công nhân và yêu nước dẫn tới sự ra đời: Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng, Đông Dương Cộng sản Liên đoàn.\n' +
        'Tuy nhiên gây phân tán lực lượng, đòi hỏi hợp nhất.\n' +
        '(ảnh Đông Dương Cộng sản Liên đoàn)',
      images: ['http://dinhnghia.com.vn/wp-content/uploads/2022/08/dong-duong-cong-san-lien-doan-hoan-canh-ra-doi-va-muc-tieu-hoat-dong-1.jpg']
    },
    {
      id: 7,
      title: 'Thành lập ĐCSVN — Hội nghị hợp nhất (2–1930)',
      content:
        'Nguyễn Ái Quốc, với tư cách phái viên Quốc tế Cộng sản, triệu tập Hội nghị tại Hương Cảng (TQ) để hợp nhất các tổ chức cộng sản.\n' +
        'Thống nhất thành ĐẢNG CỘNG SẢN VIỆT NAM.',
      images: ['https://cdn.baolaocai.vn/images/463974ce6d97d8cb8df387bbe715721ba55fab73fc22a03d0e5e6d06fcff08fdad548e768d09685db79e7f753f2e86761c9ac0d5b2e753947523111f2536b68953f6e28aecc261efb261caf1f0e1c402/bh9.jpg.webp']
    },
    {
      id: 8,
      title: 'Cương lĩnh chính trị đầu tiên — Mục tiêu',
      content:
        'Thông qua “Chánh cương vắn tắt”, “Sách lược vắn tắt”.\n' +
        'Mục tiêu chiến lược: làm “tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản”.',
      images: ['https://images.hcmcpv.org.vn//Uploads/Image/02022022AC1CA2D/02-02-2022Chanhcuong.jpg']
    },
    {
      id: 9,
      title: 'Cương lĩnh chính trị đầu tiên — Nhiệm vụ & lực lượng',
      content:
        'Nhiệm vụ trước mắt: đánh đổ đế quốc Pháp và phong kiến; làm cho nước Nam hoàn toàn độc lập (đặt giải phóng dân tộc lên hàng đầu).\n' +
        'Lực lượng: giai cấp công nhân lãnh đạo; liên minh công–nông là nền tảng; đoàn kết với tiểu tư sản, trí thức, trung nông…\n' +
        'Đảng: “đội tiên phong của giai cấp vô sản”, phải lãnh đạo được quần chúng.',
      images: ['https://images.hcmcpv.org.vn//Uploads/Image/02022022AC1CA2D/02-02-2022Chanhcuong.jpg']
    },
    {
      id: 10,
      title: 'Ý nghĩa lịch sử',
      content:
        'Chấm dứt khủng hoảng đường lối cứu nước; khẳng định giai cấp vô sản VN đủ sức lãnh đạo.\n' +
        'Đảng ra đời là sản phẩm kết hợp chủ nghĩa Mác–Lênin, tư tưởng Hồ Chí Minh với phong trào công nhân và yêu nước.\n' +
        'Xác lập con đường cách mạng vô sản đúng đắn cho dân tộc Việt Nam.',
      images: ['https://file.qdnd.vn/data/images/0/2020/01/11/tuanson/1%208.jpg?dpi=150&quality=100&w=700&h=380']
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