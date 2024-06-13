import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icons from "../../utils/moduels/icons";
import { useTranslation } from 'react-i18next';

function Header() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const changeLanguage = (language) => { i18n.changeLanguage(language); };

  // const [isElectron, setIsElectron] = useState(false);    

  // setIsElectron(typeof window !== 'undefined' && window.isElectron);
  // console.log(window.isElectron);

  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    const storedItem = localStorage.getItem("activeItem");
    if (storedItem) {
      setActiveItem(storedItem);
    }
  }, []); // 仅在组件挂载时执行

  const handleItemClick = (item) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item);
  };


  return (
    <header>
      <nav>
        <ul className='windowcontral'>
          <li style={{ paddingLeft: '4rem' }}>
            <a href="/" onClick={() => handleItemClick('all')}>
              <span className="logo"><Icons name="keebone" /></span>
            </a>
          </li>
            <li className={`nav-item ${activeItem === 'home' ? 'active' : ''}`}>
              <Link to="/" onClick={() => handleItemClick('home')}>{t("home")}</Link>
            </li>
            <li className={`nav-item ${activeItem === 'create' ? 'active' : ''}`}>
              <Link to="/create" onClick={() => handleItemClick('create')}>{t("descreate")}</Link>
            </li>
            <li className={`nav-item ${activeItem === 'translate' ? 'active' : ''}`} >
              <Link to="/translate" onClick={() => handleItemClick('translate')}>{t("translate")}</Link>
            </li>
            {/* <li className={`nav-item ${activeItem === 'dimension' ? 'active' : ''}`} >
              <Link to="/dimension" onClick={() => handleItemClick('dimension')}>{t("dimensionconversion")}</Link>
            </li> */}
        </ul>
        <ul>
          <li className="dragwindow">
            <span style={{ fontSize: '12px', paddingRight: '1rem' }} onClick={() => changeLanguage('en')}>English</span>
            <span style={{ fontSize: '12px', paddingRight: '1rem' }} onClick={() => changeLanguage('zh')}>Chinese</span>
            <span className="imini">
              <Icons name="drag" />
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
