import { useState } from "react";
import { Link } from "react-router-dom";
import useLikeToggle from "../utils/useLikeToggle";
import LikeButton from "./LikeButton";
import { API_URL } from "../config/Api";
// import Share from "./Share";

// Card component receives data as props
const Card = ({ data }) => {
    
    const [loaded, setLoaded] = useState(false);
    const { liked, toggleLike } = useLikeToggle();

    // Handle image load
    const handleImageLoad = () => {
        setLoaded(true); // Set loaded to true once the image is loaded
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {data.length > 0 && data?.map((post) => (
                <article key={post._id}
                    className="group dark:bg-gradient-to-b dark:from-[#000000] dark:to-[#0e0e00] bg-white dark:bg-black rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="relative h-60 overflow-hidden">
                        {/* Skeleton Loader for Image */}
                        {!loaded && (
                            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                        )}
                        {/* Image */}
                        <img
                            src={`${API_URL}/${post.image}`}
                            alt="Blog Post"
                            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${loaded ? "" : "opacity-0"
                                }`}
                            onLoad={handleImageLoad}
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Skeleton Loader for Category */}
                        {!loaded ? (
                            <div className="absolute bottom-6 left-6 w-32 h-8 bg-gray-300 animate-pulse rounded-full"></div>
                        ) : (
                            <span className="absolute bottom-3 left-3 text-sm text-white bg-blue-500 px-4 py-2 rounded-full">
                                {post.category}
                            </span>
                        )}
                    </div>

                    <div className="p-6">
                        {/* Skeleton Loader for Title */}
                        {!loaded ? (
                            <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4 mb-4"></div>
                        ) : (
                            <h2 className="text-xl font-semibold mt-2 mb-4 dark:text-white group-hover:text-blue-500 transition-colors">
                                <Link to={`/blog/${post._id}`}>
                                {post.title.length > 100? post.title.slice(0,100)+ "..." : post.title}
                                </Link>
                            </h2>
                        )}

                        {/* Skeleton Loader for Description */}
                        {!loaded ? (
                            <div className="h-4 bg-gray-300 animate-pulse rounded w-full mb-4"></div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">
                            {post.description.length > 100? post.description.slice(0,100)+ "..." : post.description}</p>
                        )}

                        <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                            {/* Skeleton Loader for Author */}
                            {!loaded ? (
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
                                    <div className="flex flex-col space-y-2">
                                        <div className="w-24 h-4 bg-gray-300 animate-pulse"></div>
                                        <div className="w-16 h-3 bg-gray-300 animate-pulse"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={`${API_URL}/${post.userId.profile}`}
                                        alt="Author"
                                        className="w-10 h-10 rounded-full ring-4 ring-blue-500/20"
                                    />
                                    <div>
                                        <span className="font-medium block dark:text-white">{post.userId.username}</span>
                                        <span className="text-sm text-gray-500"> {new Date(post.createdAt)
                                            .toLocaleString("en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true
                                                })}</span>
                                    </div>
                                </div>
                            )}

                            {/* Skeleton Loader for Reading Time */}
                            {!loaded ? (
                                <div className="flex items-center space-x-2 text-gray-500">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg> */}
                                    <span className="text-sm bg-gray-300 animate-pulse rounded w-5 h-3"></span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2 text-gray-500 cursor-pointer" onClick={toggleLike}>
                                    {/* {liked ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#78c0ff">
                                            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#78c0ff">
                                            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                                        </svg>
                                    )} */}
                                    {!loaded ? (
                                        <div className="h-5 bg-gray-300 animate-pulse rounded w-5 h-3"></div>
                                    ) : (
                                        <div className="flex items-center space-x-2 text-gray-500 cursor-pointer">
                                            <LikeButton
                                                postId={post._id}
                                                liked={post.liked}
                                            />
                                            {/* <Share link={`/blog/${post.id}`} title={post.id}/> */}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default Card;
