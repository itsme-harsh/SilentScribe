import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../../store/Blog/blogSlice";
import Loader from "../../Loader";
import { API_URL } from "../../config/Api";
import parse from "html-react-parser";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentBlog, loading, error } = useSelector((state) => state.blog);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, id]);

  const handleImageLoad = () => {
    setLoaded(true);
  }

  if (loading) return <Loader />;

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  if (!currentBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Blog post not found!
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-all duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Skeleton Loader for Image */}
          {/* {!loaded ? (
            <div className="w-full h-72 bg-gray-300 animate-pulse"></div>
          ) : ( */}
          <img
            src={`${API_URL}/${currentBlog.image}`}
            alt="Blog Post"
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${loaded ? "" : "opacity-0"
              }`}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          {/* )} */}

          {/* Blog Content */}
          <div>
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{currentBlog.title}</h1>

            {/* Author */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={`${API_URL}/${currentBlog.userId.profile}`}
                alt="Author"
                className="w-10 h-10 rounded-full ring-4 ring-blue-500/20"
              />
              <div className="flex flex-col">
                <span className="font-medium text-black dark:text-white">{currentBlog.userId.username}</span>
                <span className="text-sm text-gray-500">
                  {new Date(currentBlog.createdAt)
                    .toLocaleString("en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      })}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 pl-4 border-l-4 border-blue-500 dark:border-blue-300">
              {currentBlog.description}
            </p>


            {/* Content */}
            <div className="text-lg text-gray-700 dark:text-gray-300 bg-[#f0f8ff] dark:bg-[#121212] p-8">{parse(currentBlog.content)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
