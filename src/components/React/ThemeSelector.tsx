export function ThemeSelector() {
  const changeTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div
      className="cursor-pointer fill-dark dark:fill-light ml-auto"
      onClick={changeTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3rem"
        height="3rem"
        viewBox="0 0 48 48"
      >
        <defs>
          <mask id="ipSDarkMode0">
            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="4"
            >
              <path
                fill="#fff"
                stroke="#fff"
                d="m24.003 4l5.27 5.27h9.457v9.456l5.27 5.27l-5.27 5.278v9.456h-9.456L24.004 44l-5.278-5.27H9.27v-9.456L4 23.997l5.27-5.27V9.27h9.456z"
              />
              <path
                stroke="#000"
                d="M27 17c0 8-5 9-10 9c0 4 6.5 8 12 4s2-13-2-13"
              />
            </g>
          </mask>
        </defs>
        <path d="M0 0h48v48H0z" mask="url(#ipSDarkMode0)" />
      </svg>
    </div>
  );
}
