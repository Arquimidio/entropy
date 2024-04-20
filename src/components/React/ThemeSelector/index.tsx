import {useEffect} from "react";

export function ThemeSelector() {
    const changeTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem("theme", "dark");
        }
    }

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    })

    return (
        <button className="cursor-pointer" onClick={changeTheme}>Toggle</button>
    )
}