import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import BookingForm from "./pages/BookingForm";
import MyAppointment from "./pages/MyAppointment";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/appointment" element={<MyAppointment />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
