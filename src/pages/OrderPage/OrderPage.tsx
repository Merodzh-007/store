import  { useState } from "react";
import { Form, Input, Button, DatePicker, message } from "antd";
import "antd/dist/reset.css";
import { Container, Typography } from "@mui/material";
import categoryStore from "../../store/store";
import "./OrderPage.css";
import { useNavigate } from "react-router";
import moment from "moment";
import Back from "../../components/Back/Back";
const { Item } = Form;
const { TextArea } = Input;

interface Ivalues{
  address: string;
  name: string;
  phone: string;
  dateTime: Date;
}
const OrderPage = () => {
  const { calculateTotal, shoppingCart, clearCart, addToHistory } = categoryStore;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const generateRandomFourDigitNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const onFinish = (values: Ivalues) => {
    console.log(values);
    
    if (shoppingCart.length === 0) {
      message.error("Корзина пуста. Добавьте товары перед оформлением заказа.");
      return;
    }

    setLoading(true);

  
    const orderDetails = {
      time: moment(values.dateTime).format("YYYY-MM-DD HH:mm"),
      status: true, 
      address: values.address, 
      items: shoppingCart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      })),
      
      number: generateRandomFourDigitNumber(),
      total: (parseFloat(calculateTotal) + 200).toFixed(2), 
    };


    addToHistory(orderDetails);

    setTimeout(() => {
      setLoading(false);
      message.success("Заказ успешно оформлен!");
      form.resetFields();
      clearCart()
      navigate('/')
    }, 1500);
  };

  const handleSubmit = () => {
    form
      .validateFields() 
      .then((values) => {
        onFinish(values);
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
        message.error("Пожалуйста, заполните все обязательные поля!");
      });
  };

  return (
    <Container>
      <Back />
      <Typography className="delivery-title">Доставка</Typography>
      <div className="order-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
        >

          <Item
            label="Ваше имя"
            name="name"
            rules={[{ required: true, message: "Пожалуйста, введите ваше имя!" }]}
          >
            <Input placeholder="Иван Иванов" />
          </Item>

 
          <Item
            label="Телефон"
            name="phone"
            rules={[{ required: true, message: "Пожалуйста, введите ваш телефон!" }]}
          >
            <Input placeholder="+79991234567" />
          </Item>

    
          <Item
            label="Введите адрес доставки"
            name="address"
            rules={[{ required: true, message: "Пожалуйста, введите адрес доставки!" }]}
          >
            <TextArea rows={3} placeholder="ул. Примерная, д. 10" />
          </Item>

     
          <Item
            label="Дата и время доставки"
            name="dateTime"
            rules={[{ required: true, message: "Пожалуйста, выберите дату и время!" }]}
          >
            <DatePicker
              showTime
              placeholder="Выберите дату и время"
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
            />
          </Item>
        </Form>

        
        <div>
          <div className="summary-block">
           
            <div className="summary-row">
              <Typography className="summary-text">Стоимость товаров:</Typography>
              <Typography className="summary-text-bold">{calculateTotal}₽</Typography>
            </div>

            
            <div className="divider" />

          
            <div className="summary-row">
              <Typography className="summary-text">Стоимость доставки:</Typography>
              <Typography className="summary-text-bold">200₽</Typography>
            </div>

         
            <div className="divider" />

          
            <div className="summary-row">
              <Typography className="summary-text-total">Итого:</Typography>
              <Typography className="summary-text-total">
                {parseFloat(calculateTotal) !== 0
                  ? (parseFloat(calculateTotal) + 200).toFixed(2) + "₽"
                  : "нет заказов"}
              </Typography>
            </div>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={handleSubmit}
            className="order-button"
          >
            Сделать заказ
          </Button>
        </div>
        {loading && (
          <div>
            Доставка принята!
          </div>
        )}
      </div>
    </Container>
  );
};

export default OrderPage;