import React, {useState} from "react";
import {Link, Outlet} from 'react-router-dom'
import { slide as Menu } from "react-burger-menu"; 
import "../burgerMenu.css"; 

const Layout = () => {

    const [menuOpen, setmenuOpen] = useState(false);
    const menuHandle = (state) => {
      setmenuOpen(state.isOpen);
    };
  
    const closeMenu = () => {
      setmenuOpen(false); 
    };

    return (
        <div >
            <div className="bg-lime-900">
                <header className="flex justify-between items-center mx-auto py-4 w-[80%]">
                    <Link to="/"><img src="/logo.svg" alt="logo" className="w-[50%] md:w-[15%]"/></Link>
                    <nav className="hidden md:flex flex-1 justify-end">
                        <ul className="flex items-center text-sm md:text-lg font-semibold text-orange-200">
                            <li><a className="px-4 hover:underline" href="/">Home</a></li>
                            <li><a className="px-4 hover:underline" href="/favourites">Favourites</a></li>
                        </ul>
                    </nav>

                    <div className="block md:hidden">
                        <Menu right isOpen={menuOpen} onStateChange={menuHandle}>
                            <Link to="/" onClick={closeMenu}>
                            Home
                            </Link>
                            <Link to="/favourites" onClick={closeMenu}>
                            Favourites
                            </Link>
                        </Menu>
                    </div>
                </header>
            </div>



            <main>
                <Outlet />
            </main>
            
            <footer className="bg-lime-900 py-4 ">
                <p className="text-center text-orange-200 font-semibold">Leil's Lyrics 2024 | Vancouver, BC </p>
            </footer>
        </div>
    )

}

export default Layout;