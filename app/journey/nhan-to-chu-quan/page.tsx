'use client';

import { useState } from 'react';

const personalityTraits = [
    {
        id: 1,
        title: "Lý tưởng và hoài bão cứu nước",
        position: "top",
        summary: "Lý tưởng cao cả cứu dân, cứu nước",
        detail: "Hồ Chí Minh có lý tưởng cao cả và hoài bão lớn cứu dân, cứu nước thoát khỏi cảnh lầm than, cơ cực để đuổi kịp các nước tiên tiến trên thế giới."
    },
    {
        id: 2,
        title: "Ý chí, nghị lực phi thường",
        position: "top-right",
        summary: "Ý chí mạnh mẽ, dám khám phá",
        detail: "Người có ý chí, nghị lực to lớn, một mình dám đi ra nước ngoài khảo sát thực tế các nước đế quốc giàu có cũng như các dân tộc thuộc địa nghèo nàn, lạc hậu, mà chỉ với hai bàn tay trắng."
    },
    {
        id: 3,
        title: "Khả năng tự học, ngoại ngữ, vốn sống quốc tế",
        position: "top-left",
        summary: "Tự học, đa ngôn ngữ",
        detail: "Người đã làm nhiều nghề nghiệp khác nhau để kiếm sống, biết rất nhiều ngoại ngữ, tự học hỏi và hoạt động cách mạng. Kết hợp học ở nhà trường, học trong sách vở, học trong thực tế hoạt động cách mạng."
    },
    {
        id: 4,
        title: "Tư duy độc lập, sáng tạo",
        position: "bottom-right",
        summary: "Tư duy độc lập, sáng tạo",
        detail: "Hồ Chí Minh là người có bản lĩnh tư duy độc lập, tự chủ, sáng tạo, giàu tính phê phán, đổi mới và cách mạng; đã vận dụng đúng quy luật chung của xã hội loài người vào hoàn cảnh riêng, cụ thể của Việt Nam."
    },
    {
        id: 5,
        title: "Năng lực tổ chức, tổng kết thực tiễn",
        position: "bottom-left",
        summary: "Tổ chức và thực tiễn",
        detail: "Hồ Chí Minh là nhà tổ chức vĩ đại của cách mạng Việt Nam. Người đã hiện thực hóa tư tưởng, lý luận cách mạng thành hiện thực sinh động; đồng thời tổng kết thực tiễn cách mạng, bổ sung, phát triển lý luận."
    }
];

export default function NhanToChuQuan() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const getPositionClasses = (position: string) => {
        switch (position) {
            case 'top':
                // Top point of the star
                return 'absolute top-16 left-1/2 transform -translate-x-1/2';
            case 'top-left':
                // Top left point of the star
                return 'absolute top-32 left-1/4 transform -translate-x-1/2';
            case 'top-right':
                // Top right point of the star
                return 'absolute top-32 right-1/4 transform translate-x-1/2';
            case 'bottom-left':
                // Bottom left point of the star
                return 'absolute bottom-24 left-1/3 transform -translate-x-1/2';
            case 'bottom-right':
                // Bottom right point of the star
                return 'absolute bottom-24 right-1/3 transform translate-x-1/2';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background with Vietnam flag - same method as homepage */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/background-img/vietnam-flag.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
                {/* Overlay để làm mờ background - same as homepage */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Central Ho Chi Minh image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                    <div className="w-80 h-80 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-4 border-red-600">
                        {/* Test with actual image */}
                        <img
                            src="/context/images/ho-chi-minh-1.jpg"
                            alt="Hồ Chí Minh"
                            className="w-72 h-72 rounded-full object-cover"
                            onError={(e) => {
                                // Fallback if image fails to load
                                e.currentTarget.style.display = 'none';
                                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                            }}
                        />
                        <div className="w-72 h-72 bg-gray-200 rounded-full flex items-center justify-center" style={{ display: 'none' }}>
                            <span className="text-gray-500 text-center text-sm">
                                Ảnh Bác Hồ<br />
                                (sẽ được cung cấp)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personality trait cards positioned around the center */}
            {personalityTraits.map((trait) => (
                <div
                    key={trait.id}
                    className={`${getPositionClasses(trait.position)} z-20 max-w-sm`}
                    onMouseEnter={() => setHoveredCard(trait.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-red-200 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                                {trait.id}
                            </div>
                            <h3 className="font-bold text-red-700 text-sm">
                                {trait.title}
                            </h3>
                        </div>

                        <p className="text-gray-700 text-sm mb-2">
                            {trait.summary}
                        </p>

                        {/* Detailed information on hover */}
                        {hoveredCard === trait.id && (
                            <div className="mt-3 p-3 bg-red-50 rounded border-l-4 border-red-600 animate-fade-in">
                                <p className="text-gray-800 text-xs leading-relaxed">
                                    {trait.detail}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Back to home button */}
            <div className="absolute bottom-4 left-4 z-20">
                <a
                    href="/"
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg bg-opacity-90 backdrop-blur-sm"
                >
                    ← Về trang chủ
                </a>
            </div>

            {/* CSS for fade-in animation */}
            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}