import { useState } from 'react';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import default styles for Quill
import FileUpload from '../../components/FileUpload';
import { useDispatch } from 'react-redux';
import { addBlog } from '../../store/Blog/blogSlice';

const AddBlogPage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  const [errors, setErrors] = useState({}); // Form errors

  const dispatch = useDispatch();

  // Set file and reset errors
  const setFile = (file) => setImage(file);

  // Set error state
  const setError = (message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: message,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    let formErrors = {};
    if (!title) formErrors.title = 'Title is required';
    if (!category) formErrors.category = 'Category is required';
    if (!description) formErrors.description = 'Description is required';
    if (!content) formErrors.content = 'Content is required';
    if (!image) formErrors.image = 'Image is required';

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Submit the form data (for now, just log the data)
      const formData = {
        title,
        category,
        description,
        image,
        content,
      };
  
      dispatch(addBlog(formData)).then(result=>{
        console.log(result)
      })

      // Reset form state
      setTitle('');
      setCategory('');
      setDescription('');
      setImage(null);
      setContent('');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-all duration-300">
      <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create a New Blog Post</h2>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              id="title"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white dark:border-gray-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Category Input */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <input
              type="text"
              id="category"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white dark:border-gray-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* <CustomSelect/> */}

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              rows="4"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white dark:border-gray-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Author Input */}
          {/* <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author Name</label>
            <input
              type="text"
              id="author"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white dark:border-gray-600"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div> */}

          {/* File Upload Component */}
          <div className="mb-4">
            <FileUpload setFile={setFile} setError={setError} label="Upload Image" />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* React Quill Editor for Content */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              className="mt-1 dark:text-white"
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
