import { useEffect, useState } from "react";
import { useParams } from "react-router";
import categoryStore from "../../store/store";
import { Typography, Grid, Box, Container } from "@mui/material";
import "./ProductPage.css";
import Back from "../../components/Back/Back";

interface IProduct {
  id: number;
  name: string;
  description: string;
}

interface IProductImage {
  image_url: string;
}

interface IProductPrice {
  price: number;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  const { getOneProduct, productOne } = categoryStore;
  const [loading, setLoading] = useState(true);
  const { addToCart } = categoryStore;

  useEffect(() => {
    if (id) {
      setLoading(true);
      getOneProduct(parseInt(id)).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (productOne.length === 0) {
    return <div>Товар не найден</div>;
  }

  const formatNumber = (number: number): string => {
    const str = number.toString();
    if (str.length > 1) {
      const formatted = str.charAt(0) + "," + str.slice(1);
      const parts = formatted.split(",");
      if (parts[1] && parts[1].length > 4) {
        return parts[0] + "," + parts[1].slice(0, 4);
      }
      return formatted;
    }
    return str;
  };

  const product = productOne[0] as IProduct;
  const productImage = productOne[1] as IProductImage;
  const productPrice = productOne[2] as IProductPrice;

  return (
    <Container className="no-select">
      <Back />
      <Typography variant="h3" className="product-name" gutterBottom>
        {product.name}
      </Typography>
      <Grid container style={{ marginTop: "20px" }} spacing={4}>
        <Grid item xs={12} md={6}>
          <Box className="product-image-container">
            <img
              src={productImage.image_url}
              alt={product.name}
              className="product-image"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="product-info">
          <Box className="price-container">
            <Typography variant="h4" className="price">
              {formatNumber(productPrice.price)}₽
            </Typography>
            <Typography className="price-unit">за шт.</Typography>
          </Box>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              className="add-to-cart-button"
              disabled={!productPrice.price}
              onClick={() =>
                addToCart({
                  productId: product.id,
                  name: product.name,
                  image: productImage.image_url,
                  price: productPrice.price,
                  quantity: 1,
                })
              }
            >
              {productPrice.price
                ? `В корзину за ${formatNumber(productPrice.price)}₽`
                : "Цена недоступна"}
            </button>
          </div>
          <Box
            className={`product-description ${isExpanded ? "expanded" : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Описание: {product.description}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;