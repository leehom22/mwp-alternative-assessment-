import { useEffect, useState } from "react";
import "./ScrollProgress.css";

function ScrollProgress() {

    const [progress, setProgress] = useState(0);

    useEffect(() => {

        const updateProgress = () => {

            const scrollTop = window.scrollY;
            const height =
                document.documentElement.scrollHeight -
                window.innerHeight;
            setProgress((scrollTop / height) * 100);
        };

        window.addEventListener("scroll", updateProgress);

        return () =>
            window.removeEventListener("scroll", updateProgress);
    }, []);

    return (

        <div
            className="progress-bar"
            style={{
                width: `${progress}%`
            }}
        />
    );
}

export default ScrollProgress;