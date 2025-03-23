import { useState } from "react";
import { Typography, Box, Paper, Container, Modal } from "@mui/material";
import categoryStore from "../store/store";
import {IHistory, ICartItem} from '../store/store'


const HistoryPage = () => {
  const [openValue, setOpenValue] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IHistory | null>(null);
  const { history } = categoryStore;

  const orderContainerStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2D2D2F",
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#8D8D8E",
  };

  const valueStyle = {
    fontSize: "16px",
    color: "#2D2D2F",
    fontWeight: "500",
  };

  const statusStyle = (status: boolean) => ({
    fontSize: "16px",
    color: status ? "#4CAF50" : "#FFA000",
    fontWeight: "500",
  });

  const handleOpenDetails = (order: IHistory) => {
    setSelectedOrder(order);
    setOpenValue(true);
  };

  const handleCloseDetails = () => {
    setOpenValue(false);
    setSelectedOrder(null);
  };

  return (
    <Container>
      <Modal open={openValue} onClose={handleCloseDetails}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Детали заказа
          </Typography>
          {selectedOrder && (
            <>
              <Typography style={subtitleStyle}>Товары:</Typography>
              {selectedOrder.items.map((item: ICartItem, index: number) => (
                <Box key={index} sx={{ marginTop: "8px" }}>
                  <Typography style={valueStyle}>
                    {item.name} - {item.quantity} шт. × {item.price.toFixed(2)} руб.
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Modal>

      <Box sx={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom>
          История заказов
        </Typography>

        {history.length === 0 ? (
          <Typography variant="body1">Заказов пока нет.</Typography>
        ) : (
          history.map((order: IHistory, index: number) => (
            <Paper key={index} style={orderContainerStyle}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Box>
                  <Typography style={titleStyle}>
                    Заказ #{order.number || "Номер не указан"}
                  </Typography>
                  <Typography style={subtitleStyle}>
                    {order.time || "Время не указано"}
                  </Typography>
                </Box>
                <div
                  onClick={() => handleOpenDetails(order)}
                  style={{
                    fontSize: "14px",
                    color: "#2967FF",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Подробнее
                </div>
              </Box>

              <Box sx={{ display: "flex", marginBottom: "16px" }}>
                <Box sx={{ marginRight: "24px" }}>
                  <Typography style={subtitleStyle}>Статус заказа</Typography>
                  <Typography style={statusStyle(order.status)}>
                    {order.status ? "Оплачен/Завершен" : "В процессе"}
                  </Typography>
                </Box>
                <Box>
                  <Typography style={subtitleStyle}>Адрес доставки</Typography>
                  <Typography style={valueStyle}>
                    {order.address || "Адрес не указан"}
                  </Typography>
                </Box>
              </Box>

              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ marginBottom: "16px" }}>
                  <Typography style={subtitleStyle}>Товары:</Typography>
                  {order.items.map((item: ICartItem, itemIndex: number) => (
                    <Box key={itemIndex} sx={{ marginTop: "8px" }}>
                      <Typography style={valueStyle}>
                        Кол-во {item.quantity} шт. × {item.price.toFixed(2)} руб.
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box>
                  <Typography style={subtitleStyle}>Общая стоимость:</Typography>
                  <Typography style={valueStyle}>
                    {order.total || "0.00"} руб.
                  </Typography>
                </Box>
                <Box>
                  <Typography style={subtitleStyle}>Номер доставки</Typography>
                  <Typography style={valueStyle}>
                    #{order.number || "Номер не указан"}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Container>
  );
};

export default HistoryPage;