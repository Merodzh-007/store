import { Typography, Box, Grid, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram"; // Иконка Instagram
import FacebookIcon from "@mui/icons-material/Facebook"; // Иконка Facebook
import TelegramIcon from "@mui/icons-material/Telegram"; // Иконка Telegram
import img1 from '../assets/App_Store.png';
import img2 from '../assets/Google_Play.png';

const FooterCom = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: '215px',
        textAlign: "center",
        background: "#F8F8F8",
        padding: "24px",
        zIndex: "1000",
      }}
    >
      {/* Логотип и название */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px", textAlign: 'left' }}>
        React
      </Typography>

      {/* Социальные сети и приложения */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "end", gap: '32px' }}>
        {/* Социальные сети */}
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '140%',
              letterSpacing: '0%',
              fontVariantNumeric: 'lining-nums proportional-nums',
             
            }}
          >
            Присоединяйтесь к нам
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <IconButton
                color="primary"
                aria-label="Facebook"
                onClick={() => window.open("https://facebook.com", "_blank")}
              >
                <FacebookIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                aria-label="VK"
                onClick={() => window.open("https://vk.com", "_blank")}
              >
                <TelegramIcon /> {/* Используем TelegramIcon для VK */}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                aria-label="Instagram"
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <InstagramIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        {/* Установка приложения */}
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '140%',
              letterSpacing: '0%',
              fontVariantNumeric: 'lining-nums proportional-nums',
              marginBottom: '8px',
            }}
          >
            Устанавливайте приложение
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <img
                style={{ maxWidth: '100px', cursor: 'pointer' }}
                aria-label="apple"
                onClick={() => window.open("https://apple.com", "_blank")}
                src={img1}
                alt="App Store"
              />
            </Grid>
            <Grid item>
              <img
                style={{ maxWidth: '100px', cursor: 'pointer' }}
                aria-label="Google Play"
                onClick={() => window.open("https://google.com", "_blank")}
                src={img2}
                alt="Google Play"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
  <div
  style={{
    display: 'flex',
    maxWidth: '700px',
    margin: '0px auto',
    marginTop: '40px',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '122%',
    letterSpacing: '0px',
    fontVariantNumeric: 'lining-nums proportional-nums',
    color: '#8D8D8E',
    justifyContent: 'space-between',
  }}
>
  <div>© Sionic</div>
  <div>Правовая информация</div>
  <div>Политика конфиденциальности</div>
</div>
    </Box>
  );
};

export default FooterCom;