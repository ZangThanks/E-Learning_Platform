import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockCourses } from "../mocks/mockData";
import CourseForm from "../components/teacher/CourseForm";

function TeacherCourseManagement({ isAdding = false, isEditing = false }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu từ localStorage thay vì mockCourses
    const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    const teacherCourses = storedCourses.filter(
      (course) => course.actor === "John Doe"
    );
    setCourses(teacherCourses);
    setLoading(false);
  }, []);

  const handleAddCourse = () => {
    setSelectedCourse(null);
    navigate("/teacher/courses/add");
  };

  const handleEditCourse = (courseId) => {
    // Tìm khóa học được chọn từ danh sách courses
    const courseToEdit = courses.find((course) => course.id === courseId);
    if (courseToEdit) {
      setSelectedCourse(courseToEdit);
      navigate(`/teacher/courses/edit/${courseId}`);
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Bạn có chắc muốn xóa khóa học này?")) {
      // Xóa khỏi localStorage
      const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]");
      const updatedCourses = storedCourses.filter(
        (course) => course.id !== courseId
      );
      localStorage.setItem("courses", JSON.stringify(updatedCourses));

      // Cập nhật state
      setCourses(courses.filter((course) => course.id !== courseId));
    }
  };

  // Hiển thị form thêm mới
  if (isAdding) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Thêm khóa học mới</h1>
        <CourseForm />
      </div>
    );
  }

  // Hiển thị form chỉnh sửa với dữ liệu của khóa học được chọn
  if (isEditing && selectedCourse) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa khóa học</h1>
        <CourseForm initialData={selectedCourse} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý khóa học</h1>

      <div className="mb-6">
        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm khóa học mới
        </button>
      </div>

      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="flex flex-cols gap-6">
        <div className="w-full p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Khóa học của bạn</h2>
          {courses.length === 0 ? (
            <p>Chưa có khóa học nào. Hãy bắt đầu thêm khóa học mới.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex h-full">
                    <div className="">
                      <h3 className="font-medium text-lg mb-2">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Ngày tạo: {new Date(course.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Trạng thái:{" "}
                        <span
                          className={`px-2 py-1 rounded ${
                            course.statusbar === "Đã duyệt"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {course.statusbar}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => handleEditCourse(course.id)}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseManagement;
