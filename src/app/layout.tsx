import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="end">
      <head>
        <title>TODO List</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
