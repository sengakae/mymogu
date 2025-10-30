import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ItchEmbed from "./ItchEmbed";

const games = [
    {
        url: "https://itch.io/embed-upload/15392115",
        thumb: "game1",
        height: '668px',
        width: '1152px',
        title: 'Moguween Crane Game'
    }, 
    {
        url: "https://itch.io/embed-upload/15397265",
        thumb: "game2",
        height: '600px',
        width: '800px',
        title: 'Moguween Snake Game'
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
            <ItchEmbed key={index} iframeSrc={game.src} thumbnail={game.thumb} height={game.height} width={game.width} title={game.title} />
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
