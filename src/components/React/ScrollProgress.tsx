import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const trackScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight =
      document.body.scrollHeight - document.body.clientHeight;
    const scrollPercentRounded = Math.round((scrollTop / scrollHeight) * 100);

    setScrollProgress(scrollPercentRounded);
  };

  useEffect(() => {
    window.addEventListener("scroll", trackScroll);

    return () => {
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[2px]">
      <div
        className="h-full bg-rose-500"
        style={{
          width: `${scrollProgress}%`,
        }}
      ></div>
    </div>
  );
}
