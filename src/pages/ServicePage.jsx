import { useEffect, useState } from "react";
import CourseCard from "../components/card/CourseCard";

// Dữ liệu mẫu
const mockCourses = [
  {
    id: 1,
    actor: "John Doe",
    cover_image: "../design_figma.png",
    name: "React JS từ cơ bản đến nâng cao",
    category: {
      field: "Lập trình",
      name: "Web Development",
    },
    price: 1200000,
    date: "2025-05-10",
    statusbar: "Đã duyệt",
    certificate: true,
    description: "Khóa học React toàn diện từ cơ bản đến nâng cao",
    outstanding: true,
  },
  {
    id: 2,
    actor: "Jane Smith",
    cover_image: "../design_figma.png",
    name: "UI/UX Design Masterclass",
    category: {
      field: "Thiết kế",
      name: "UI/UX",
    },
    price: 1500000,
    date: "2025-05-09",
    statusbar: "Đã duyệt",
    certificate: true,
    description: "Học thiết kế UI/UX chuyên nghiệp",
    outstanding: false,
  },
  {
    id: 3,
    actor: "Mike Johnson",
    cover_image: "../javabg.png",
    name: "Digital Marketing",
    category: {
      field: "Marketing",
      name: "Digital Marketing",
    },
    price: 0,
    date: "2025-05-08",
    statusbar: "Đã duyệt",
    certificate: true,
    description: "Khóa học Digital Marketing miễn phí",
    outstanding: true,
  },
];

function ServicePage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    // Thay thế API call bằng dữ liệu mẫu
    const formattedData = mockCourses.map((course) => ({
      id: course.id,
      actor: course.actor,
      image: course.cover_image || "../avatarAdmin.png",
      name: course.name,
      category: `${course.category.field} - ${course.category.name}`,
      categoryObject: course.category,
      price: course.price,
      date: course.date,
      statusbar: course.statusbar,
      certificate: course.certificate,
      outstanding: course.outstanding,
      description: course.description,
    }));

    setCourses(formattedData);
    setFilteredCourses(formattedData);

    // Tạo danh sách categories từ dữ liệu mẫu
    const uniqueCategories = [
      ...new Set(formattedData.map((course) => course.categoryObject?.field)),
    ];
    setCategories(["All", ...uniqueCategories]);
  }, []);

  useEffect(() => {
    let result = [...courses];

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (course) => course.categoryObject?.field === selectedCategory
      );
    }

    if (priceFilter === "free") {
      result = result.filter((course) => course.price === 0);
    } else if (priceFilter === "paid") {
      result = result.filter((course) => course.price > 0);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredCourses(result);
  }, [courses, searchTerm, selectedCategory, priceFilter, sortBy]);

  return (
    <div className="flex flex-col py-8 bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-xl mb-8">
        <h1 className="text-4xl font-bold mb-2">Find Your Perfect Course</h1>
        <p className="text-lg opacity-90 mb-6">
          Explore our wide range of courses and start learning today
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full p-4 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-6 h-6 text-gray-500 absolute right-4 top-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === "all"}
                  onChange={() => setPriceFilter("all")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>All Prices</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === "free"}
                  onChange={() => setPriceFilter("free")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Free</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === "paid"}
                  onChange={() => setPriceFilter("paid")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Paid</span>
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Available Courses</h2>
            <p className="text-gray-600">
              {filteredCourses.length} courses found
            </p>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center">
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
