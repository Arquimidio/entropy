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

    return (
        <button className="cursor-pointer" onClick={changeTheme}>Toggle</button>
    )
}