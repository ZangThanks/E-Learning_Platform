export const mockCourses = [
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
    lession: [
      {
        lession_id: "less1",
        name: "Giới thiệu React",
        video_courses: [
          {
            title: "React là gì?",
            link: "https://www.youtube.com/watch?v=example1",
            createAt: "2025-05-10",
            duration: "15:00",
          },
          {
            title: "Cài đặt môi trường",
            link: "https://www.youtube.com/watch?v=example2",
            createAt: "2025-05-10",
            duration: "20:00",
          },
        ],
      },
    ],
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
    lession: [
      {
        lession_id: "less2",
        name: "Nguyên lý thiết kế",
        video_courses: [
          {
            title: "Color Theory",
            link: "https://www.youtube.com/watch?v=example3",
            createAt: "2025-05-09",
            duration: "25:00",
          },
        ],
      },
    ],
  },
];

export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    account: {
      user_name: "johndoe",
      password: "password123",
    },
    role: "student",
    avatarUrl: "../avatarAdmin.png",
    courses: [1, 2],
  },
];
