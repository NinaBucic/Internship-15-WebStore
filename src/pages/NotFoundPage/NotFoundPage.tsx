import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/404-page-not-found.png";
import { Button } from "@mui/material";
import "./NotFoundPage.css";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <img src={logo} alt="404" />
      <h2>Oops... The page you are looking for does not exist.</h2>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
