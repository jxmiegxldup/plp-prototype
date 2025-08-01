import React from 'react';
import Button from './Button';

export default function BottomNav() {
  return (
    <nav className="plp-bottom-nav">
      <div className="plp-bottom-nav__row">
        <Button variant="tertiary" shape="round" aria-label="Menu">
          <span className="ds-btn__icon ds-btn__icon--before">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id=" 24 / Menu">
                <path id="Combined Shape" fillRule="evenodd" clipRule="evenodd" d="M19.5 10.5H4.5C3.672 10.5 3 9.828 3 9C3 8.172 3.672 7.5 4.5 7.5H19.5C20.328 7.5 21 8.172 21 9C21 9.828 20.328 10.5 19.5 10.5ZM31.5 19.5H4.5C3.672 19.5 3 18.828 3 18C3 17.172 3.672 16.5 4.5 16.5H31.5C32.328 16.5 33 17.172 33 18C33 18.828 32.328 19.5 31.5 19.5ZM4.5 28.4993H25.5C26.328 28.4993 27 27.8273 27 26.9993C27 26.1713 26.328 25.4993 25.5 25.4993H4.5C3.672 25.4993 3 26.1713 3 26.9993C3 27.8273 3.672 28.4993 4.5 28.4993Z" fill="currentColor"/>
              </g>
            </svg>
          </span>
          <span className="plp-bottom-nav__label">Menu</span>
        </Button>
        <Button variant="tertiary" shape="round" aria-label="Search">
          <span className="ds-btn__icon ds-btn__icon--before">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id=" 24 / Search ">
                <path id="Combined Shape" fillRule="evenodd" clipRule="evenodd" d="M3 14.2496C3 8.03663 8.037 2.99963 14.25 2.99963C20.463 2.99963 25.5 8.03663 25.5 14.2496C25.5 20.4641 20.463 25.4996 14.25 25.4996C8.037 25.4996 3 20.4641 3 14.2496ZM22.5 14.2496C22.5 9.70013 18.7995 5.99963 14.25 5.99963C9.7005 5.99963 6 9.70013 6 14.2496C6 18.7991 9.7005 22.4996 14.25 22.4996C18.7995 22.4996 22.5 18.7991 22.5 14.2496ZM24.9193 22.8149C24.3309 22.3574 23.4801 22.399 22.9393 22.9397C22.3536 23.5255 22.3536 24.4753 22.9393 25.061L30.4393 32.561L30.5807 32.6858C31.1691 33.1434 32.0199 33.1018 32.5607 32.561C33.1464 31.9753 33.1464 31.0255 32.5607 30.4397L25.0607 22.9397L24.9193 22.8149Z" fill="currentColor"/>
              </g>
            </svg>
          </span>
          <span className="plp-bottom-nav__label">Search</span>
        </Button>
        <Button variant="tertiary" shape="round" aria-label="Bag">
          <span className="ds-btn__icon ds-btn__icon--before">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id=" 24 / Bag">
                <path id="Combined Shape" fillRule="evenodd" clipRule="evenodd" d="M18.7384 3.01042L17.991 3.00073C12.3479 3.00073 10.8073 4.53395 10.5438 9.38038H8.88497C7.09347 9.38038 5.54266 10.6433 5.35239 12.3806L3.02293 29.6489C2.79584 31.7029 4.48179 33.3804 6.55097 33.3804H29.447C31.5176 33.3804 33.2035 31.703 32.9809 29.6836L30.644 12.342C30.4553 10.6421 28.9065 9.38038 27.1175 9.38038H25.454C25.1969 4.75143 23.7834 3.14698 18.7384 3.01042ZM22.4615 9.38038C22.3325 6.3207 21.8077 6.01557 18.2912 6.0013L17.1194 6.00713C14.1329 6.05997 13.6522 6.49841 13.5354 9.38038H22.4615ZM27.1175 12.3804H8.88497C8.56626 12.3804 8.35116 12.5555 8.33001 12.7444L6.00042 30.0139C5.98307 30.1711 6.19341 30.3804 6.55097 30.3804H29.447C29.8061 30.3804 30.0165 30.171 30.0034 30.0482L27.6667 12.7083C27.6497 12.5557 27.4345 12.3804 27.1175 12.3804ZM22.5 18.3804C23.3284 18.3804 24 19.052 24 19.8804C24 23.9782 21.8388 25.8804 18 25.8804C14.1616 25.8804 12 23.9789 12 19.8804C12 19.052 12.6716 18.3804 13.5 18.3804C14.3284 18.3804 15 19.052 15 19.8804C15 22.2304 15.7389 22.8804 18 22.8804C20.2612 22.8804 21 22.2301 21 19.8804C21 19.052 21.6716 18.3804 22.5 18.3804Z" fill="currentColor"/>
              </g>
            </svg>
          </span>
          <span className="plp-bottom-nav__label">Bag</span>
        </Button>
        <Button variant="tertiary" shape="round" aria-label="Saved">
          <span className="ds-btn__icon ds-btn__icon--before">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id=" 24 / Heart Filled ">
                <g id="Group">
                  <path id="Stroke 1" d="M7.28098 6.08514C2.25356 9.71374 1.58839 15.9703 5.62992 20.5945L5.91988 20.924L15.5069 30.3863C16.8264 31.8981 19.177 31.8981 20.5694 30.3059L30.0097 21.0009L30.3676 20.5996C34.4123 15.9718 33.7471 9.71524 28.7197 6.08664L28.4103 5.87324C25.1849 3.74972 21.1032 4.15033 18.1166 6.66756L18 6.76798L17.8827 6.66509C14.8991 4.15137 10.824 3.74914 7.60039 5.86516L7.28098 6.08514Z" fill="currentColor" stroke="#FEFEFE"/>
                </g>
              </g>
            </svg>
          </span>
          <span className="plp-bottom-nav__label">Saved</span>
        </Button>
      </div>
    </nav>
  );
} 