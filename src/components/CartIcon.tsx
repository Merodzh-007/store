import React from "react";
import basket from "../assets/Basket.png";

interface ICArIcon {
  count: number,
  click: () => void
}
const CartIcon :React.FC<ICArIcon> = ({ count, click }) => {
  return (
    <div
      style={{
        display: "flex",
        cursor: 'pointer',
        alignItems: "center",
        gap: "8px", 
        position: "relative",
        border: "1px solid #727280",
        padding: "10%",
        borderRadius: "50%",
        userSelect: "none"
      }}
      onClick={click}
    >
   
      <img
        src={basket}
        alt="Корзина"
        style={{
          width: "24px", 
          height: "24px",
          filter: "brightness(0.9)", 
          userSelect: "none", 
        }}
      />

  
      {count > 0 && ( 
        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            backgroundColor: "#2967FF",
            color: "white",
            borderRadius: "50%", 
            width: "20px", 
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px", 
            fontWeight: "600",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
            userSelect: "none", 
          }}
        >
          {count}
        </div>
      )}
    </div>
  );
};

export default CartIcon;