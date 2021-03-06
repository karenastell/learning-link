import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="foot footer has-text-centered foot-font font-style">
        <h2 className="foot-font">Learning Link</h2>
        <p>
          &copy; 2020
          <a
            className="hover footer-links"
            href="https://github.com/Kaleighspurio"
            target="_blank"
            rel="noopener noreferrer"
            > Kaleigh </a
          >
           &  
          <a
            className="hover footer-links"
            href="https://github.com/karenastell"
            target="_blank"
            rel="noopener noreferrer"
            > Karen</a
          >
        </p>
      </footer>
    );
}