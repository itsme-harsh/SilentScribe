import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import { useEffect } from "react";
import { getAllBlogs } from "../../store/Blog/blogSlice";
import Loader from "../../Loader";
// import posts from "../../data/blog.json";

const FavouriteBlog = () => {

    const dispatch = useDispatch();
    // Access blogs, loading, and error from Redux store
    const { blogs, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(getAllBlogs()).catch((error) => {
            // console.error("Error fetching blogs:", error);
        });
    }, [dispatch]);

    return (
        <div className="min-h-screen  dark:bg-black transition-all duration-300">
            <main className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-center dark:text-white flex border-b border-gray-100 dark:border-gray-700 pb-4">
                    Favourite Blogs
                </h1>

                {loading && <div><Loader /></div>} {/* Show loading */}
                {error && <div>Error: {error}</div>} {/* Show error message */}

                {blogs.length === 0 && !loading && !error && <div className="pt-4">No blogs found</div>}

                <div className="grid grid-cols-1 gap-8 md:pt-10 pt-6">
                    <Card data={blogs} />
                </div>
            </main>
        </div>
    )
}

export default FavouriteBlog;