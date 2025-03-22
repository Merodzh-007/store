import React from "react";

import "./Banners.css"; 

const Banners = () => {
  return (
    <div style={{margin: '20px'}} className="banner-container">
     
      <img
        src='https://avatars.mds.yandex.net/i?id=452810a81ff0b31001f68b06aa10b214adbf26fc-5965946-images-thumbs&n=13'
        alt="Горизонтальный баннер"
              
              className="horizontal-image"
      />

     
      <img
        src='https://zvetnoe.ru/upload/resize_cache/catalog/w750h1000/70a/70af6ccff999c11f39a78d91d67d4656.jpg'
        alt="Вертикальный баннер"
              className="vertical-image"
               
      />

    
      <div className="banner-text">
        <h1>Новая коллекция</h1>
      </div>
    </div>
  );
};

export default Banners;