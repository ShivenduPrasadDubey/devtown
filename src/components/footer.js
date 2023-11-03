import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return (
        <div className="footer">
            <p>COPYRIGHT @2023</p>
            <div className="social">
                <FontAwesomeIcon className='fa fa-facebook' icon={faFacebook} />
                <FontAwesomeIcon className='fa fa-instagram' icon={faInstagram} />
            </div>
        </div>
    )
}
