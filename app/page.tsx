'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main'); // 'main', 'tim-hieu', 'co-so-ly-luan'
  const [isTransitioning, setIsTransitioning] = useState(false);

  const backgroundImages = [
    '/background-img/bg1.jpg',
    '/background-img/bg2.jpg',
    '/background-img/bg3.jpg',
    '/background-img/bg4.jpg',
    '/background-img/bg5.jpg'
  ];

  // Slideshow background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Fade in content after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleMenuChange = (newMenu: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentMenu(newMenu);
      setIsTransitioning(false);
    }, 300);
  };

  const getTitle = () => {
    switch(currentMenu) {
      case 'tim-hieu':
        return 'Tìm hiểu';
      case 'co-so-ly-luan':
        return 'Cơ sở lý luận';
      default:
        return (
          <>
            <span className="text-red-600">Cơ sở hình thành</span>
            <br />
            <span className="text-yellow-400">tư tưởng Hồ Chí Minh</span>
          </>
        );
    }
  };

  const getButtons = () => {
    switch(currentMenu) {
      case 'tim-hieu':
        return [
          {
            href: '/journey/co-so-thuc-tien',
            text: 'Cơ sở thực tiễn',
            color: 'bg-red-600 hover:bg-red-700',
            borderColor: 'border-yellow-400'
          },
          {
            onClick: () => handleMenuChange('co-so-ly-luan'),
            text: 'Cơ sở lý luận',
            color: 'bg-yellow-500 hover:bg-yellow-600 text-red-800',
            borderColor: 'border-red-600'
          },
          {
            href: '/journey/nhan-to-chu-quan',
            text: 'Nhân tố chủ quan HCM',
            color: 'bg-red-600 hover:bg-red-700',
            borderColor: 'border-yellow-400'
          }
        ];
      
      case 'co-so-ly-luan':
        return [
          {
            href: '/journey/gia-tri-truyen-thong',
            text: 'Giá trị truyền thống',
            color: 'bg-red-600 hover:bg-red-700',
            borderColor: 'border-yellow-400'
          },
          {
            href: '/journey/tinh-hoa-van-hoa-nhan-loai',
            text: 'Tinh hoa văn hóa nhân loại',
            color: 'bg-yellow-500 hover:bg-yellow-600 text-red-800',
            borderColor: 'border-red-600'
          },
          {
            href: '/journey/chu-nghia-mac-lenin',
            text: 'Chủ nghĩa Mác-Lênin',
            color: 'bg-red-600 hover:bg-red-700',
            borderColor: 'border-yellow-400'
          }
        ];
      
      default:
        return [
          {
            onClick: () => handleMenuChange('tim-hieu'),
            text: 'Tìm hiểu',
            color: 'bg-red-600 hover:bg-red-700',
            borderColor: 'border-yellow-400'
          },
          {
            href: '/chatbot',
            text: 'Chatbot',
            color: 'bg-yellow-500 hover:bg-yellow-600 text-red-800',
            borderColor: 'border-red-600'
          },
          {
            href: '/quiz',
            text: 'Quiz',
            color: 'bg-red-600 hover:bg-red-700',
            borderColor: 'border-yellow-400'
          }
        ];
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        {/* Overlay để làm mờ background */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Back button for sub-menus */}
      {currentMenu !== 'main' && (
        <div className="absolute top-4 left-4 z-50">
          <button 
            onClick={() => handleMenuChange(currentMenu === 'co-so-ly-luan' ? 'tim-hieu' : 'main')}
            className="bg-black/40 hover:bg-black/60 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2 backdrop-blur-sm"
          >
            <span>←</span>
            <span>Quay lại</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div 
          className={`text-center transition-all duration-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
        >
          {/* Background Box với độ mờ */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl -m-8 md:-m-12" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-12 leading-tight transition-all duration-500">
              {getTitle()}
            </h1>

            {/* Navigation Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {getButtons().map((button, index) => (
                <div key={index}>
                  {button.href ? (
                    <Link href={button.href}>
                      <button className={`group relative ${button.color} text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-xl min-w-[200px]`}>
                        <div className="flex items-center justify-center gap-3">
                          <span>{button.text}</span>
                        </div>
                        <div className={`absolute inset-0 rounded-lg border-2 ${button.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      </button>
                    </Link>
                  ) : (
                    <button 
                      onClick={button.onClick}
                      className={`group relative ${button.color} text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-xl min-w-[200px]`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span>{button.text}</span>
                      </div>
                      <div className={`absolute inset-0 rounded-lg border-2 ${button.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
