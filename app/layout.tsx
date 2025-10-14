export const metadata = { title: 'HiFinder', description: 'Geo-vibe spots' } as const;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-[Inter] min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="container py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">HiFinder</h1>
            <nav className="text-sm text-zinc-600 dark:text-zinc-300">MVP</nav>
          </div>
        </header>
        <main className="container py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
