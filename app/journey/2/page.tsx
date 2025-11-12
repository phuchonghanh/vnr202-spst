'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Journey2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Data cho slides với nội dung từ file
  const slidesData = [
    {
      id: 1,
      title: 'II. Đảng lãnh đạo đấu tranh giành chính quyền (1930–1945)',
      content:
        'Từ sau khi Đảng ra đời, phong trào cách mạng bùng nổ mạnh mẽ, trải qua các cao trào 1930–1931, khôi phục 1932–1935 và phong trào Dân chủ 1936–1939 — tạo tiền đề quyết định cho Cách mạng Tháng Tám 1945.',
      images: ['https://vietjack.com/giai-bai-tap-lich-su-12/images/ly-thuyet-phong-trao-cach-mang-1930-1935-1.PNG']
    },
    {
      id: 2,
      title: '1930–1931: Cao trào cách mạng bùng nổ',
      content:
        'Đảng (lúc đầu mang tên ĐCSVN, sau là ĐCS Đông Dương) lãnh đạo nhân dân đứng lên đấu tranh kịch liệt chống thực dân Pháp và phong kiến tay sai trên phạm vi cả nước., tiêu biểu là phong trào Xô viết Nghệ - Tĩnh',
      images: ['https://vietjack.com/giai-bai-tap-lich-su-12/images/ly-thuyet-phong-trao-cach-mang-1930-1935-1.PNG']
    },
    {
      id: 3,
      title: 'Đỉnh cao: Xô viết Nghệ Tĩnh',
      content:
        'Phong trào đạt đỉnh ở Nghệ An, Hà Tĩnh. Chính quyền Xô viết hình thành dưới dạng các ủy ban tự quản ở nông thôn — biểu hiện tập dượt cho chính quyền cách mạng sau này.',
      images: ['https://vietjack.com/giai-bai-tap-lich-su-12/images/ly-thuyet-phong-trao-cach-mang-1930-1935-1.PNG']
    },
    {
      id: 4,
      title: 'Luận cương Chính trị (10–1930)',
      content:
        'Xác định tính chất cách mạng: tư sản dân quyền (thổ địa và phản đế). Nhấn mạnh vấn đề thổ địa là cái cốt; hạn chế: nặng đấu tranh giai cấp, chưa đặt giải phóng dân tộc lên hàng đầu như Cương lĩnh đầu tiên.',
      images: ['https://nghiavuquansu.vn/wp-content/uploads/2024/12/tom-tat-luan-cuong-chinh-tri-thang-10.jpg']
    },
    {
      id: 5,
      title: '1931: Tổn thất nặng – 11/4/1931: QTCS công nhận',
      content:
        'Tháng 4–1931, nhiều cán bộ chủ chốt bị bắt, hệ thống tổ chức bị tổn thất.Tại phiên họp thứ 25 của hội nghị toàn thể lần thứ 11 Ban Chấp hành Quốc tế Cộng sản, ngày 11/4/1931, Quốc tế Cộng sản công nhận ĐCS Đông Dương là chi bộ độc lập — chỗ dựa quốc tế quan trọng.(Ảnh: Nguyễn Ái Quốc (hàng đầu, thứ nhất từ trái qua) chụp ảnh chung cùng với một số đại biểu dự Đại hội Quốc tế Cộng sản lần thứ 5)',
      images: ['https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/490346476_1076021561232917_5612550192512286017_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=aOfCri5t97YQ7kNvwG3-h9w&_nc_oc=AdmwSAriEIvBls0TeX7WS-SDaulqY3cXarhoQDrALCmaJOql4gNUQRl8KFkXWRiPQdU&_nc_zt=23&_nc_ht=scontent.fsgn2-3.fna&_nc_gid=C5ZWkzDR2L9HYalD86WZNw&oh=00_AfjbEXaFPwbC3ZoXYRf_hhtTBD6e2CsKU0HsURZJ4f04bg&oe=691A3029']
    },
    {
      id: 6,
      title: '1932–1935: Khôi phục phong trào – Đại hội I',
      content:
        'Đảng khôi phục hệ thống tổ chức, củng cố lực lượng. Đại hội I (3–1935) đánh dấu sự phục hồi về tổ chức, đường lối, kiện toàn lãnh đạo.',
      images: ['https://vnanet.vn/Data/Articles/2021/01/16/5238063/vna_potal_dai_hoi_lan_thu_nhat_cua_dang_khoi_phuc_to_chuc_thong_nhat_cac_phong_trao_dau_tranh_cach_mang_duoi_su_lanh_dao_cua_dang_145518042_stand.jpg','https://vnanet.vn/Data/Articles/2021/01/16/5238069/vna_potal_dai_hoi_lan_thu_nhat_cua_dang_khoi_phuc_to_chuc_thong_nhat_cac_phong_trao_dau_tranh_cach_mang_duoi_su_lanh_dao_cua_dang_145540734_stand.jpg']
    },
    {
      id: 7,
      title: 'Bối cảnh 1936–1939',
      content:
        'Đại hội VII Quốc tế Cộng sản (7-1935) xác định kẻ thù nguy hiểm là chủ nghĩa phát xít. Chính phủ Mặt trận Nhân dân Pháp lên nắm quyền (1936) tạo điều kiện thuận lợi cho cuộc đấu tranh đòi quyền dân chủ ở thuộc địa',
      images: ['https://file3.qdnd.vn/data/images/0/2021/06/05/viethungvn/7.jpg?dpi=150&quality=100&w=1420&h=1080']
    },
    {
      id: 8,
      title: 'Chủ trương phong trào Dân chủ 1936–1939',
      content:
        'Nhiệm vụ: chống phát xít, chống chiến tranh đế quốc, chống phản động thuộc địa; đòi tự do, dân chủ, cơm áo và hòa bình. Trọng tâm từng bước chuyển sang nhiệm vụ phản đế khi cần thiết. (một số báo trong thời kì Mặt trận dân chủ 1936 – 1939)',
      images: ['http://cadasa.vn/wp-content/uploads/2022/07/lich-su-lop-12-bai-15-hinh-5.jpg?quality=100&h=120']
    },
    {
      id: 9,
      title: 'Mặt trận Dân chủ Đông Dương – Hình thức đấu tranh',
      content:
        'Thành lập Mặt trận Dân chủ Đông Dương. Phương pháp: công khai, nửa công khai; hợp pháp, nửa hợp pháp — mở rộng mặt trận quần chúng, rèn luyện lực lượng chính trị.(ảnh Phong trào vận động dân chủ 1936 – 1939 tại Huế)',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Phan_%C4%90%C4%83ng_L%C6%B0u_during_the_democratic_movement_of_1936-1939_in_Hue.jpg/500px-Phan_%C4%90%C4%83ng_L%C6%B0u_during_the_democratic_movement_of_1936-1939_in_Hue.jpg?quality=100&w=1420&h=1080' ]
    },
    {
      id: 10,
      title: 'Ý nghĩa: Chuẩn bị cho Cách mạng Tháng Tám',
      content:
        'Phong trào dân chủ tạo ra "đội quân chính trị" gồm hàng triệu quần chúng được giác ngộ, tổ chức, rèn luyện — tiền đề quyết định dẫn tới thắng lợi 1945.',
      images: ['https://edumedia.dalat.vn//Images/LDG/khoa.sgd/TUYENTRUYENPHOBIENGDPHAPLUAT/1_638263080831680930.png?quality=100&w=1420&h=1080']
    },
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

      {/* Progress Bar */}
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
                  ? (isEvenSlide ? 'bg-white animate-ping' : 'bg-gray-800 animate-ping')
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