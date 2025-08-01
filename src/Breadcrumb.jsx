import React from 'react';

export default function Breadcrumb() {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb navigation">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <a href="/fashion" className="breadcrumb__link">
            <span className="breadcrumb__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id=" 24 / Back / iOS">
                  <path id="Fill 1" fillRule="evenodd" clipRule="evenodd" d="M31.5 16.5H8.12101L13.0605 11.5605C13.647 10.974 13.647 10.026 13.0605 9.43951C12.474 8.85301 11.526 8.85301 10.9395 9.43951L3.43951 16.9395C2.85301 17.526 2.85301 18.474 3.43951 19.0605L10.9395 26.5605C11.232 26.853 11.616 27 12 27C12.384 27 12.768 26.853 13.0605 26.5605C13.647 25.974 13.647 25.026 13.0605 24.4395L8.12101 19.5H31.5C32.328 19.5 33 18.828 33 18C33 17.172 32.328 16.5 31.5 16.5Z" fill="currentColor"/>
                </g>
              </svg>
            </span>
            <span className="breadcrumb__label">Fashion</span>
          </a>
        </li>
        <li className="breadcrumb__item" aria-current="page">
          <span className="breadcrumb__current">Dresses</span>
        </li>
      </ol>
    </nav>
  );
} 