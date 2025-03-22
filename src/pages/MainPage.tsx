import { useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import categoryStore from "../store/store";
import { observer } from 'mobx-react-lite';
import { Box, Container } from "@mui/material";
import Cards from "../components/Cards/Cards";
import { Col, Row } from "antd";
import { useNavigate } from "react-router";
import InfiniteScroll from 'react-infinite-scroll-component';

const MainPage = observer(() => {
  const badgeColors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"];
  const { getCategories, categories, getProductsCategories, productsCategory, productImages, priceProduct, getMoreProduct, hasMore, addToCart, shoppingCart } = categoryStore;
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
    getProductsCategories('', 0);
  }, []);
console.log(shoppingCart);

   const isProductInCart = (productId) => {
    return shoppingCart.some(item => item.productId === productId);
  };
  
  return (
    <Container>
      <Stack style={{ padding: '15px' }} direction="horizontal" gap={2}>
        <Box sx={{ flexWrap: 'column-reverse' }}>
          <Badge
            pill
            onClick={() => getProductsCategories('', 0)}
            bg={'light'}
            style={{ color: "black", cursor: 'pointer', padding: '9px', border: '1px solid black' }}
          >
            Все категории
          </Badge>
          {categories.map((item, index) => (
            <Badge
              style={{ cursor: 'pointer', padding: '9px', marginLeft: '5px' }}
              key={item.id}
              onClick={() => getProductsCategories(item.id, 0)}
              pill
              bg={badgeColors[index % badgeColors.length]}
            >
              {item.name}
            </Badge>
          ))}
        </Box>
      </Stack>

      <InfiniteScroll
        dataLength={productsCategory.length}
        next={getMoreProduct}
        hasMore={hasMore}
        loader={<h4>Загрузка...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Больше нет</b>
          </p>
        }
      >
        <Row gutter={[16, 16]}>
          {productsCategory.length > 0 ? (
            productsCategory.map((item) => (
              <Col
                key={item.id}
                xs={24} // 1 колонка на очень маленьких экранах
                sm={12} // 2 колонки на маленьких экранах
                md={8}  // 3 колонки на средних экранах
                lg={6}  // 4 колонки на больших экранах
              >
                <Cards
                  click={() => navigate('/product/' + item.id)}
                  onClick={() => {
                    addToCart({
                      productId: item.id,
                      name: item.name,
                      image: productImages[item.id],
                      price: priceProduct[item.id],
                      quantity: 1,
                    })
                  }}
                  name={item.name}
                  text={item.description}
                  imageUrl={productImages[item.id]}
                  price={priceProduct[item.id]}
                  check={isProductInCart(item.id)}
                />
              </Col>
            ))
          ) : null}
        </Row>
      </InfiniteScroll>
    </Container>
  );
});

export default MainPage;