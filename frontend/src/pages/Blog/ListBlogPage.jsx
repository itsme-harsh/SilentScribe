import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../store/Blog/blogSlice";
import { useEffect } from "react";
import Loader from "../../Loader";

const BlogPage = () => {
    const dispatch = useDispatch();

    // Access blogs, loading, and error from Redux store
    const { blogs, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(getAllBlogs()).catch((error) => {
            // console.error("Error fetching blogs:", error);
        });
    }, [dispatch]);

    const handleEdit = (id) => {
        alert(id);
        // Add your edit logic here (e.g., redirect to edit page)
    };

    const handleDelete = (id) => {
        alert(id);
        // Add your delete logic here
    };

    const handleToggleActive = (id) => {
        alert(id);
        // Add your toggle logic here (active/hide functionality)
    };

    return (
        <div className="overflow-x-hidden dark:bg-black transition-all duration-300">
            <main className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-center dark:text-white flex border-b border-gray-100 dark:border-gray-700 pb-4">
                    All Blogs
                </h1>

                {loading && <div><Loader /></div>} {/* Show loading */}
                {error && <div className="text-red-500">Error: {error}</div>} {/* Show error message */}

                {/* Wrapper for table to allow horizontal scroll */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-[#f0f8ff] dark:bg-gray-800 dark:text-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Author</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="border-b dark:bg-[#121212] text-black dark:text-white dark:border-gray-700">
                                    <td className="px-6 py-4">{blog.title}</td>
                                    <td className="px-6 py-4">{blog.userId.username}</td>
                                    <td className="px-6 py-4">{blog.category}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleActive(blog._id)}
                                            className={`px-2 py-2 text-xs rounded-full font-medium ${blog.isActive ? "bg-green-500 text-white" : "bg-red-100 text-red-500"} rounded`}
                                        >
                                            {blog.isActive ? "Active" : "Hidden"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex cursor-pointer space-x-4">
                                            <button onClick={() => handleEdit(blog._id)} className="bg-blue-100 py-1 px-1 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#51a2ff">
                                                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleDelete(blog._id)} className="bg-blue-100 py-1 px-1 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fb2c36">
                                                    <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
};

export default BlogPage;
