import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <nav>
            <div className="logo">DevTown</div>
            <ul className='header-ul'>
                <li>Home</li>
                <li>Our Products</li>
                <li>About Us</li>
                <li>Contact</li>
            </ul>
            <div className="search">
                <FontAwesomeIcon className='fa fa-search' icon={faSearch} />
                <FontAwesomeIcon className='fa fa-shopping-basket' icon={faShoppingBasket} />
            </div>
        </nav>
    )
}
