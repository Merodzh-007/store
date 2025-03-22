import { useNavigate } from "react-router";
import './Back.css'
const Back = () => {
  const navigate = useNavigate();

  return (
     <div className="back-button" onClick={() => navigate(-1)}>
        <div className="back-arrow">
          <div className="back-arrow-line"></div>
          <div className="back-arrow-line"></div>
        </div>
        <div className="back-text">Назад</div>
      </div>
  );
};

export default Back;