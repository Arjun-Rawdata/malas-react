import "./globals.css";

// Local font imports
import "./fonts/Serenity.otf";
import "./fonts/Serenity-Thin.otf";

// Metadata setup
const metadata = {
  title: "Malas",
  description: "pick a pic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-primary-white">{children}</body>
    </html>
  );
}
