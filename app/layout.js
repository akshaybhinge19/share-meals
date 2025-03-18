import { Toaster } from "react-hot-toast";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header.jsx";

export const metadata = {
  title: "All Meals",
  description: "Delicious meals, shared by a food-loving community.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        <Toaster />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
