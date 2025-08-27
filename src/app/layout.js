import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Car Rental App",
  description: "Next.js + PrimeReact Car Rental App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
