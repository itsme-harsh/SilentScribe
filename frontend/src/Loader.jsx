function Loader() {
    return (
        <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
          <div className="flex flex-col items-center">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      );
}

export default Loader