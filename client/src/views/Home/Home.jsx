import React from "react";
import Button from "../../components/Button/Button.jsx";
import photo from "../../assets/myPhoto.jpg";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./Home.css";

export default function Home() {
  return (
    <main className="Home">
      <section className="Home__1__section">
        <div className="Home__1__section__content">
          <h1 className="Home__title">ICELINK.</h1>
          <div className="Home__links">
            <Link to={"https://github.com/IceLink1"} target="_blank">
              <Button>
                <GitHubIcon />
                GitHub
              </Button>
            </Link>
            <Link to={"https://t.me/icelink39"} target="_blank">
              <Button>
                <TelegramIcon /> Telegram
              </Button>
            </Link>
            <Link
              to={"https://www.instagram.com/icelinko2/?igsh=eG10NnN2YzVyM2cw#"}
              target="_blank"
            >
              <Button>
                <InstagramIcon />
                Facebook
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="Home__2__section">
        <div className="Home__2__section__image">
          <img src={photo} alt="" />
        </div>
        <div className="Home__2__section__decription">
          <div>
            <h1>Salohiddin</h1>
            <p>
              Я веб-разработчик с более чем годом опыта, активно работаю над
              множеством пет-проектов. Несмотря на ограниченный опыт в
              компаниях, я обладаю глубокими знаниями и навыками в
              веб-разработке, что позволяет мне создавать качественные и
              эффективные решения.
            </p>
            <Link to="/more">
              <Button>More</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
