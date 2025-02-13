import { useState } from "react";

const useLikeToggle = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return { liked, toggleLike };
};

export default useLikeToggle;