function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">BookExplorer</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover books from Open Library, save your favorites, and build your
            personal digital bookshelf.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3">🔍 Search Books</h2>
            <p className="text-gray-600 mb-4">
              Find books by title, explore descriptions, and preview covers.
            </p>
            <a
              href="/search"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Start Searching
            </a>
          </div>

          <div className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3">📚 My Books</h2>
            <p className="text-gray-600 mb-4">
              View and manage the books you’ve saved to your collection.
            </p>
            <a
              href="/my-books"
              className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              View My Books
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
