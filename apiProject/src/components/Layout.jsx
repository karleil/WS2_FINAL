import React from "react";
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className=" bg-neutral-850 p-1">
            <header className="flex justify-between items-center  w-[80%] mx-auto py-4">
                <Link to="/"><img className="w-9" src="/logo.svg" alt="logo" /></Link>
                <nav>
                    <ul className="flex item-center text-white ">
                        <li className="px-4 hover:text-cyan-300 transition duration-300 hover:underline underline-offset-4"><Link to="/">Home</Link></li>
                        <li className="px-4 hover:text-cyan-300 transition duration-300 hover:underline underline-offset-4"><Link to="/favourites">Favourites</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
            <Outlet />
            </main>

        </div>
    )
}

export default Layout 