import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useTranslation } from 'react-i18next';
import Apps from '@keebone/apps'
function Home() {
  window.$localDB.set('config',{activeItem: 'all', theme: 'light'})
  const { t } = useTranslation();


  console.log(Apps)

  return (
    <main>
      <Header />
      <div className="home">
        {/* <h1>{t('welcome')}</h1> */}
        {/* <a href="/create">Create Tools</a> */}
        <div className="toolslist">
        <ul>
          <li data-foo={t("descreate")}><a href="/create" style={{backgroundImage: 'url(https://view.lehuye.com/medias/webp/9a7ac6f7-fb5e-4730-aa07-c2f4f6809244_600.webp)', }}></a></li>
          <li data-foo={t("translate")}><a href="/translate" style={{backgroundImage: 'url(https://view.lehuye.com/medias/webp/14da04c0-767f-4e30-9011-742c96a5acfe_600.webp)', }}></a></li>
          <li data-foo={t("colors")}><a href="/colors" style={{backgroundImage: 'url(https://view.lehuye.com/medias/webp/14da04c0-767f-4e30-9011-742c96a5acfe_600.webp)', }}></a></li>
          {/* <li data-foo={t("dimensionconversion")}><a href="/dimension" style={{backgroundImage: 'url(https://view.lehuye.com/medias/webp/a8447e7f-5609-4cce-aecd-cc5a89a7b11c_600.webp)', }}></a></li> */}
          {/* <li data-foo={t("translate")}><a href="/create" style={{backgroundImage: 'url(https://view.lehuye.com/medias/webp/e733a5b5-e8d2-47c8-abd3-5540015edca1_600.webp)', }}></a></li> */}
        </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
