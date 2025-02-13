import { useState } from "react";
import { gsap } from "gsap";

const LikeButton = ({ postId, liked }) => {
    const [like, setlike] = useState(liked);

    // Trigger the heart animation when the button is clicked
    const triggerHeartAnimation = () => {
        setlike((prev) => !prev);

        // Create the hearts inside the container
        createHeartAnimation();
    };

    // Create hearts and animate them
    const createHeartAnimation = () => {
        const container = document.querySelector(`#heart-container-${postId}`);

        for (let i = 0; i < 8; i++) {
            const heart = document.createElement("span");
            heart.className = "absolute";
            heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" tabIndex="-1" height="24px" viewBox="0 -960 960 960" width="24px" fill="#78c0ff">
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                </svg>`;

            const randomX = (Math.random() - 0.5) * 100; // Random X movement
            const randomScale = Math.random() * 0.5 + 0.5; // Random size
            const randomDuration = Math.random() * 1.5 + 1; // Random speed

            container.appendChild(heart);

            gsap.to(heart, {
                y: -100,
                x: randomX,
                scale: randomScale,
                opacity: 0,
                duration: randomDuration,
                ease: "power1.out",
                onComplete: () => heart.remove(),
            });
        }
    };

    return (
        <div onClick={triggerHeartAnimation} style={{ position: "relative", cursor: "pointer" }}>
            {/* Container for hearts */}
            <div
                id={`heart-container-${postId}`}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            ></div>

            {like ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#78c0ff"
                >
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#78c0ff"
                >
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                </svg>
            )}
        </div>
    );
};

export default LikeButton;
