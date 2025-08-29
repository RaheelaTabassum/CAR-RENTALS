import "./globals.css";


export const metadata = {
  title: "Car Rental App",
  description: "Next.js + PrimeReact Car Rental App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
