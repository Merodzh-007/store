import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Cards.css';
import categoryStore from '../../store/store';

const Cards = ({ text, name, imageUrl, price, click, onClick, check }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedName, setIsExpandedName] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Состояние для Snackbar
  const { addToCart } = categoryStore;

  const handleAddToCart = () => {
    onClick(); // Вызов функции добавления в корзину
    setOpenSnackbar(true); // Показать уведомление
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Закрыть уведомление
  };

  return (
    <Card sx={{ width: '100%', boxShadow: 'none' }}>
      <CardMedia
        onClick={click}
        style={{ height: '150px' }}
        image={imageUrl || "https://www.laser-bulat.ru/upload/medialibrary/735/2lj6sel8ygv8p6j2xj85gplt9ufd5xpn.png"}
        title="Product Image"
      />
      <CardContent sx={{ padding: '5px' }}>
        <Typography
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: isExpandedName ? 'unset' : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          variant="body1"
          onClick={() => setIsExpandedName(!isExpandedName)}
        >
          {name} ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitLineClamp: isExpanded ? 'unset' : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {text}ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
        </Typography>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="small" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Свернуть' : 'Показать больше'}
        </Button>
      </CardActions>
      <p className="price">Цена: от {price} ₽</p>
      <button onClick={handleAddToCart} className="button">
        Корзина
      </button>

      {/* Snackbar для уведомления */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Уведомление закроется через 3 секунды
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Товар добавлен в корзину!
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default Cards;