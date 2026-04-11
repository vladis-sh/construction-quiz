import { useState } from "react";
import styles from "./header.module.scss";
import logo from "../../../../public/alex-logo.png";
import Container from "../../../shared/ui/container/container";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__container}>
          <a href="/" className={styles.header__logo}>
            <img src={logo} alt="ALEX GROUP" />
          </a>

          <nav
            className={`${styles.header__nav} ${menuOpen ? styles.header__nav_open : ""}`}
          >
            <a
              href="#about"
              className={styles.header__link}
              onClick={closeMenu}
            >
              О компании
            </a>
            <a
              href="#stages"
              className={styles.header__link}
              onClick={closeMenu}
            >
              Этапы строительства
            </a>
            <a
              href="#projects"
              className={styles.header__link}
              onClick={closeMenu}
            >
              Проекты
            </a>
            <a
              href="#mortgage"
              className={styles.header__link}
              onClick={closeMenu}
            >
              Ипотека
            </a>

            {/* Mobile nav items */}
            <a
              href="tel:+79242820220"
              className={`${styles.header__phone} ${styles.header__phone_mobile}`}
            >
              +7 (924) 282 02 20
            </a>
            <div className={`${styles.socials} ${styles.socials_mobile}`}>
              <button className={styles.socialBtn} aria-label="WhatsApp">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.422A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a8 8 0 0 1-4.073-1.115l-.292-.174-3.027.865.843-3.055-.19-.314A8 8 0 1 1 12 20Zm4.406-5.845c-.241-.12-1.427-.704-1.648-.784-.221-.08-.382-.12-.543.12-.161.241-.623.784-.764.944-.14.161-.281.181-.522.06-.24-.12-1.016-.374-1.934-1.194-.715-.638-1.198-1.426-1.338-1.667-.14-.24-.015-.37.105-.489.109-.107.241-.281.362-.421.12-.14.16-.24.24-.4.08-.161.04-.302-.02-.422-.06-.12-.542-1.307-.742-1.788-.195-.47-.394-.406-.543-.414l-.462-.008c-.16 0-.422.06-.643.302-.22.24-.843.824-.843 2.01 0 1.186.863 2.332.982 2.492.12.16 1.697 2.591 4.115 3.633.575.248 1.023.396 1.372.507.576.184 1.1.158 1.514.096.462-.069 1.427-.583 1.628-1.147.2-.563.2-1.046.14-1.147-.06-.1-.221-.161-.462-.281Z" />
                </svg>
              </button>
              <button className={styles.socialBtn} aria-label="Telegram">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.93 7.3-1.67 7.87c-.12.55-.45.68-.91.42l-2.5-1.84-1.21 1.16c-.13.13-.25.25-.51.25l.18-2.57 4.66-4.21c.2-.18-.04-.28-.31-.1l-5.76 3.62-2.48-.78c-.54-.17-.55-.54.11-.8l9.68-3.73c.45-.16.84.11.75.71Z" />
                </svg>
              </button>
            </div>
            <button className={`${styles.cta} ${styles.cta_mobile}`}>
              Расчет стоимости
            </button>
          </nav>

          {/* Desktop right elements */}
          <div className={styles.header__actions}>
            <a href="tel:+79242820220" className={styles.header__phone}>
              +7 (924) 282 02 20
            </a>
            <div className={styles.socials}>
              <button className={styles.socialBtn} aria-label="WhatsApp">
                <a href="https://wa.me/79242820220?text=" target="_blank">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                        fill="currentColor"
                      ></path>{" "}
                    </g>
                  </svg>
                </a>
              </button>
              <button className={styles.socialBtn} aria-label="Telegram">
                <a
                  href="http://t.me/llcalexgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.93 7.3-1.67 7.87c-.12.55-.45.68-.91.42l-2.5-1.84-1.21 1.16c-.13.13-.25.25-.51.25l.18-2.57 4.66-4.21c.2-.18-.04-.28-.31-.1l-5.76 3.62-2.48-.78c-.54-.17-.55-.54.11-.8l9.68-3.73c.45-.16.84.11.75.71Z" />
                  </svg>
                </a>
              </button>
            </div>
            <button className={styles.cta}>Расчет стоимости</button>
          </div>

          {/* Burger */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burger_open : ""}`}
            onClick={() => setMenuOpen(visible => !visible)}
            aria-label="Меню"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>

      {/* Overlay */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </header>
  );
}
