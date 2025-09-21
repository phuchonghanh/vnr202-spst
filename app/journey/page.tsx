export default function Journey() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Tìm hiểu hành trình
        </h1>
        <p className="text-gray-600">
          Bạn đã truy cập trực tiếp vào trang này. Vui lòng quay lại trang chủ để điều hướng đúng cách.
        </p>
        <a href="/" className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Về trang chủ
        </a>
      </div>
    </div>
  );
}