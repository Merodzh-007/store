import React, { useState } from "react";
import { Container, Typography, Box, useMediaQuery } from "@mui/material";
import img1 from "../../assets/cartpage1.png";
import img2 from "../../assets/cartpage2.png";
import img3 from "../../assets/cartpage3.png";
import deleteImg from '../../assets/delete.png';
import categoryStore from "../../store/store";
import { observer } from "mobx-react-lite";
import AlertDialogSlide from "../../components/AlertDialogSlide";
import Back from "../../components/Back/Back";
import { useNavigate } from "react-router";
import "./CartPage.css";

const CartPage: React.FC = observer(() => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");
  const { shoppingCart, handleIncrease, handleDecrease, calculateTotal, clearCart, removeFromCart } = categoryStore;

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Back />
      <Box className="clear-cart-container">
        <Typography className="clear-cart-text" onClick={clearCart}>
          Очистить корзину
        </Typography>
      </Box>

      <Box className={`summary-container ${isMobile ? "mobile" : ""}`}>
        <Typography className="cart-title">Корзина</Typography>
        <Typography className="cart-total">Стоимость корзины: {calculateTotal} руб.</Typography>
        <button
          className="checkout-button"
          onClick={() => setOpen(true)}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1E4DB7")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2967FF")}
        >
          Оформить
        </button>
        <Box className="image-container">
          <img src={img1} alt="" className="cart-image" />
          <img src={img2} alt="" className="cart-image" />
          <img src={img3} alt="" className="cart-image" />
        </Box>
      </Box>

      <Box className={`cart-items-container ${isMobile ? "mobile" : ""}`}>
        {shoppingCart.length === 0 ? (
          <Typography className="empty-cart">Корзина пуста</Typography>
        ) : (
          shoppingCart.map((item) => (
            <Box key={item.productId} className="cart-item">
              <img
                onClick={() => removeFromCart(item.productId)}
                src={deleteImg}
                className="delete-icon"
                alt="Удалить"
              />
              <img
                className="product-imageCart"
                onClick={() => navigate(`/product/${item.productId}`)}
                src={item.image}
                alt={item.name}
              />
              <Box
                className="product-name"
                onClick={() => navigate(`/product/${item.productId}`)}
              >
                <Typography>{item.name}</Typography>
              </Box>
              <Box className="quantity-control">
                <button onClick={() => handleDecrease(item.productId)}>-</button>
                <Typography>{item.quantity}</Typography>
                <button onClick={() => handleIncrease(item.productId)}>+</button>
              </Box>
              <Typography className="product-price">{item.price} руб.</Typography>
            </Box>
          ))
        )}
      </Box>

      <AlertDialogSlide check={shoppingCart.length > 0 ? open : false} onClose={handleDialogClose} />
    </Container>
  );
});

export default CartPage;