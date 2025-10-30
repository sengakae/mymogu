import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ItchEmbed from "./ItchEmbed";

const games = ["https://itch.io/embed-upload/15388939"];

function Home() {
  const navigate = useNavigate();
  return (
    <div
      className="home-bg"
      style={{
        background: 'url("/images/okumono_halloween2523.png") center center / cover no-repeat'
      }}
    >
      <img
        src="/images/front_title.png"
        alt="Front Title"
        className="home-title-img"
      />
    {games.map((game) => (
        <ItchEmbed key={game} iframeSrc={game} />
    ))}
      <button className="home-enter-btn" onClick={() => navigate("/password") }>
        <img
          src="/images/button_to_enter_the_pssword.png"
          alt="Enter Password"
          className="home-enter-btn-img"
        />
      </button>
    </div>
  );
}

export default Home;
