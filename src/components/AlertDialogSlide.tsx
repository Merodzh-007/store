import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from 'react-router';
import categoryStore from '../store/store';


interface IAlertDialogSlide {
  check: boolean;
  onClose: () => void
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide :React.FC<IAlertDialogSlide> = ({ check, onClose }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const {calculateTotal} = categoryStore
  React.useEffect(() => {
    setOpen(check);
  }, [check]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const handleOpen = () => {
     navigate('/order')
    setOpen(false);
    onClose(); 
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Оформление заказа"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Хотите заказать товары на сумму {calculateTotal} руб.?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Нет</Button>
        <Button onClick={handleOpen}>Да</Button>
      </DialogActions>
    </Dialog>
  );
}
export default AlertDialogSlide