import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockCourses, mockPaymentInfo } from "../mocks/mockData";

function PaymentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState({ minutes: 30, seconds: 0 });
  const [userName, setUserName] = useState("");
  const [orderId] = useState(`ORDER${Date.now()}`);

  useEffect(() => {
    // Get course from mock data
    const foundCourse = mockCourses.find((c) => c.id === parseInt(courseId));
    if (foundCourse) {
      setCourse(foundCourse);
    }

    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUserName(userInfo.name);
    } else {
      navigate("/login");
    }

    setLoading(false);
  }, [courseId, navigate]);

  // Timer countdown effect
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer.seconds > 0) {
        setTimer((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
      } else if (timer.minutes > 0) {
        setTimer({ minutes: timer.minutes - 1, seconds: 59 });
      } else {
        clearInterval(countdown);
        navigate("/");
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, navigate]);

  if (loading || !course) {
    return <div>Loading...</div>;
  }

  const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Payment Information</h1>

        {/* Timer */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">Time remaining to complete payment:</p>
          <p className="text-3xl font-bold text-red-600">
            {formatTime(timer.minutes)}:{formatTime(timer.seconds)}
          </p>
        </div>

        {/* Order Details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="space-y-2">
            <p>Order ID: {orderId}</p>
            <p>Course: {course.name}</p>
            <p>Student: {userName}</p>
            <p>Amount: {course.price.toLocaleString()} VND</p>
          </div>
        </div>

        {/* Bank Transfer Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Bank Transfer Information
          </h2>
          <div className="space-y-2">
            <p>Bank: {mockPaymentInfo.bankName}</p>
            <p>Account Number: {mockPaymentInfo.accountNumber}</p>
            <p>Account Holder: {mockPaymentInfo.accountHolder}</p>
            <p>Amount: {course.price.toLocaleString()} VND</p>
          </div>
        </div>

        {/* QR Code */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold mb-4">Scan QR Code to Pay</h2>
          <div className="inline-block p-4 bg-white rounded-lg shadow-md">
            <img
              src={mockPaymentInfo.qrCode}
              alt="QR Code"
              className="w-48 h-48"
            />
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Payment Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Transfer the exact amount shown above</li>
            <li>Include your Order ID in the transfer description</li>
            <li>Keep your transfer receipt for reference</li>
            <li>Do not close this page until payment is completed</li>
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(`/success/${courseId}`)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            I have completed the payment
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
