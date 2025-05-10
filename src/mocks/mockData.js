export const mockCourses = [
  {
    id: 1,
    name: "React JS từ cơ bản đến nâng cao",
    actor: "John Doe",
    cover_image: "../design_figma.png",
    image: "../design_figma.png",
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
    promocode: "REACT25",
    lession: [
      {
        lession_id: "less1",
        name: "Giới thiệu React JS",
        video_courses: [
          {
            title: "React là gì?",
            link: "https://www.youtube.com/watch?v=example1",
            createAt: "2025-05-10",
          },
        ],
      },
    ],
  },
  // ...thêm các khóa học khác tương tự
];

export const mockAuthors = [
  {
    id: 1,
    name: "John Doe",
    avatarData: "../avatarAdmin.png",
    bio: "Senior React Developer",
  },
];

export const mockPaymentInfo = {
  bankName: "VietComBank",
  accountNumber: "1234567890",
  accountHolder: "NGUYEN VAN A",
  amount: 1200000,
  qrCode: "../qrPay.png",
};
