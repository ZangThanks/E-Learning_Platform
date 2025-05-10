import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockCourses } from "../mocks/mockData";
import Confetti from "react-confetti";

function SuccessPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Get course from mock data instead of API
    const foundCourse = mockCourses.find((c) => c.id === parseInt(courseId));
    if (foundCourse) {
      // Add course to user's enrolled courses in localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const purchaseDate = new Date().toISOString();
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Set expiry to 1 year

        const enrolledCourse = {
          ...foundCourse,
          purchaseDate,
          expiryDate: expiryDate.toISOString(),
        };

        const enrolledCourses = JSON.parse(
          localStorage.getItem("enrolledCourses") || "[]"
        );
        enrolledCourses.push(enrolledCourse);
        localStorage.setItem(
          "enrolledCourses",
          JSON.stringify(enrolledCourses)
        );
      }
      setCourse(foundCourse);
    }
  }, [courseId]);

  const handleStartLearning = () => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-50 to-indigo-100">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={200}
      />

      {course ? (
        <>
          <div className="text-center max-w-3xl px-6 relative">
            <div className="absolute -top-8 left-0 right-0 flex justify-center">
              <span className="text-4xl">🎉</span>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg border border-blue-200">
              <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                Chúc mừng bạn!
              </h1>

              <p className="text-xl leading-relaxed mb-6">
                Bạn đã đăng ký thành công khóa học{" "}
                <span className="font-bold text-blue-700">{course.name}</span>{" "}
                của{" "}
                <span className="italic font-semibold text-indigo-600">
                  HiGi
                </span>
                .
              </p>

              <p className="text-lg text-gray-700 mb-6">
                Chúc bạn có những phút giây học tập vui vẻ và đạt kết quả tốt
                nhất nhé!
              </p>

              <div className="flex items-center justify-center mb-6">
                <span className="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-500"></span>
                <span className="mx-4 text-blue-500">✨</span>
                <span className="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-500"></span>
              </div>

              <p className="text-gray-600 italic mb-8">
                Giảng viên: <span className="font-medium">{course.actor}</span>
              </p>

              <button
                onClick={handleStartLearning}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-md text-lg transition-all transform hover:scale-105 shadow-md"
              >
                BẮT ĐẦU HỌC
              </button>
            </div>

            <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
              <span className="text-4xl">🚀</span>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-xl text-gray-700 mb-4 flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang tải thông tin khóa học...
          </p>
        </div>
      )}
    </div>
  );
}

export default SuccessPage;
