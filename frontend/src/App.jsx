import React, { Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPage from "./pages/Blog/BlogPage";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PlayAudioOnPageChange from "./pages/Sound/PlayAudioOnPageChange";
import Protected from "./AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, refreshToken } from "./store/Auth/authSlice";
import Loader from "./Loader";
import NotFoundPage from "./pages/Error/Notfound";

// Lazy load pages
const BlogDetailsPage = React.lazy(() => import('./pages/Blog/BlogDetailsPage'));
const LoginPage = React.lazy(() => import('./pages/Auth/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/Auth/RegisterPage'));
const AddBlogPage = React.lazy(() => import('./pages/Blog/AddBlogPage'));
const FavouriteBlog = React.lazy(() => import("./pages/Blog/FavouriteBlog"));
const ListBlogPage = React.lazy(() => import("./pages/Blog/ListBlogPage"));
function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        // First, refresh the token if there's no token in Redux
        if (!token) {
          dispatch(refreshToken()).then(() => {
            dispatch(currentUser())
          })
        }
      } catch (error) {
        // console.error("Error in auth flow:", error);
      } finally {
        setLoading(false); // Set loading to false after the async operation
      }
    };

    fetchAuth();
  }, [dispatch, token]);

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <ThemeProvider>
      <Router>
        <PlayAudioOnPageChange />
        <Navbar />

        <div className="grid grid-rows-[1fr_auto] min-h-screen dark:bg-black transition-all duration-300">
          <ScrollToTop />

          {/* Wrap Routes with Suspense to show fallback */}
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Protected authentication={false}>
                    <BlogPage />
                  </Protected>
                }
              />
              <Route
                path="/Liked"
                element={
                  <Protected authentication>
                    <FavouriteBlog />
                  </Protected>
                } />
              <Route
                path="/signup"
                element={
                  <Protected authentication={false}>
                    <SignUpPage />
                  </Protected>
                } />
              <Route
                path="/login"
                element={
                  <Protected authentication={false}>
                    <LoginPage />
                  </Protected>
                } />
              <Route
                path="/blog/:id"
                element={
                  <BlogDetailsPage />
                } />
                <Route
                path="/blog/dashboard"
                element={
                  <Protected authentication><ListBlogPage /></Protected>
                } />
              <Route path="/blog/add" element={<Protected authentication><AddBlogPage /></Protected>} />
              <Route path="*" element={ <NotFoundPage />}/>
            </Routes>
          </Suspense>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
