import './App.css'
import { NavigationBar } from './layouts/navigation-bars/NavigationBar'
import { HomePage } from './layouts/home-page/HomePage'
import { Footer } from './layouts/navigation-bars/Footer'
import { SearchBooksPage } from './layouts/search-books-page/SearchBooksPage'
import { Route, Routes } from 'react-router-dom'
import { BookCheckoutPage } from './layouts/book-checkout-page/BookCheckoutPage'
import { ReviewListPage } from './layouts/review-list-page/ReviewListPage'
import { AuthProvider } from './auth/AuthContext'
import { ProtectedPage } from './layouts/protected-page/ProtectedPage'
import { PrivateRoute } from './auth/PrivateRoute'

function App() {

  return (
    <AuthProvider>
    <div className="d-flex flex-column min-vh-100">
    <NavigationBar />
    <main className="flex-grow-1">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchBooksPage />} />
      <Route path="/checkout/:id" element={<BookCheckoutPage />} />
      <Route path="/reviewList/:bookId" element={<ReviewListPage />} />
      <Route path="/protectedpage" element={<PrivateRoute><ProtectedPage /></PrivateRoute>} />
    </Routes>
    </main>
    <Footer />
    </div>
    </AuthProvider>
  )
}

export default App
