import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ItchEmbed from "./ItchEmbed";

const games = [
    {
        url: "https://itch.io/embed-upload/15402893",
        thumb: "game1",
        width: '1152px',
        height: '668px',
        title: 'Moguween Crane Game'
    }, 
    {
        url: "https://itch.io/embed-upload/15402901",
        thumb: "game2",
        width: '800px',
        height: '600px',
        title: 'Moguween Snake Game'
    },
    {
      url: "https://itch.io/embed-upload/15403134",
      thumb: "game3",
      width: '960px',
      height: '600px',
      title: 'Moguween Flapping Bird'
    }];

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
      <div className="flex-games">
        {games.map((game, index) => (
            <ItchEmbed key={index} iframeSrc={game.url} thumbnail={game.thumb} height={game.height} width={game.width} title={game.title} />
        ))}
      </div>
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
