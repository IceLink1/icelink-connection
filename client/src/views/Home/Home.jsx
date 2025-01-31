import React from "react";
import Button from "../../components/Button/Button.jsx";
import photo from "../../assets/myPhoto.jpg";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
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
            <Link to={""} target="_blank">
              <Button>
                <TelegramIcon /> Telegram
              </Button>
            </Link>
            <Link to={"https://github.com/IceLink1"} target="_blank">
              <Button>
                <FacebookIcon />
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
              mollitia voluptatibus qui esse error illo ipsum exercitationem,
              velit hic necessitatibus quae. Qui dolorem quidem placeat quisquam
              sunt consequuntur nobis necessitatibus! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Velit, cumque ullam commodi
              voluptates aliquid dolor laudantium tempora tempore architecto!
            </p>
            <Link to="" target="_blank">
              <Button>More</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
