import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TextField, InputAdornment, IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CartIcon from './CartIcon';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import categoryStore from '../store/store';

const Header = observer(() => {
  const { shoppingCart } = categoryStore;
  const [searchValue, setSearchValue] = React.useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 700,
              fontSize: 'clamp(24px, 4vw, 37px)',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#2D2D2F',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            React
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 400,
              fontSize: 'clamp(12px, 2vw, 14px)',
              color: '#727280',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/history')}
          >
            История заказов
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1, maxWidth: '800px', width: '100%' }}>
          <TextField
            placeholder="Поиск бренда, товара, категории..."
            value={searchValue}
            onChange={handleInputChange}
            sx={{
              width: '100%',
              maxWidth: '600px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton sx={{ backgroundColor: '#F0F4FB' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <CartIcon click={() => navigate('/cart')} count={shoppingCart.length} />
            <Avatar
              alt="User Avatar"
              src="/path/to/avatar.jpg"
              sx={{ width: 'clamp(30px, 5vw, 40px)', height: 'clamp(30px, 5vw, 40px)' }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default Header;