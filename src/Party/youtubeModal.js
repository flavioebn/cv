import React, { useEffect, useRef, useState } from "react";
import OstPlayer from "./ost/ostPlayer";
import { osts, singles as singleShots } from "./ost";

const mixes = [
  { title: "Quircky Combat", id: "QnX4rkyygOg" },
  { title: "Battle", id: "w0sUw735gRw" },
  { title: "Battle 2", id: "t3B802PIuB0" },
  { title: "Fiend Fight", id: "ZXXGpziGgs4" },
  { title: "Combat", id: "1P9tY69ZO8s" },
  { title: "Combat Deadly", id: "m-1S1V1PZHA" },
  { title: "Battle Heavy", id: "CLAa1urufGE" },
  { title: "Dark Dungeon", id: "W2NAblVD70Q" },
  { title: "Tense", id: "fv_7EurNAss" },
  { title: "Chase", id: "fq8OSrIUST4" },
  { title: "Ruins", id: "205meIww0zg" },
  { title: "Panic Crowd", id: "whtz44p9oII" },
  { title: "Dark & Mistery", id: "CDWtH8eHeEU" },
  { title: "Dark Horror", id: "w4g2c-FudpU" },
  { title: "Abyss", id: "7-pWjbIxaUU" },
  { title: "Tense", id: "RPkHu8M_U4c" },
  { title: "Ominous", id: "3FNuE_sBquk" },
  { title: "Sorrow", id: "fXA8zHLdYF0" },
  { title: "Suspense", id: "EApZmmYg_oQ" },
  { title: "Deep waters", id: "MhiSjz0c7MI" },
  { title: "Heist", id: "WW4bdFhcZgw" },
  { title: "Calm & Explore", id: "sHA_4wfQhE8" },
  { title: "Cozy Tavern", id: "orgikrTCKTc" },
  { title: "Bonfire Rest", id: "ugTluz9d3eg" },
  { title: "Quiet and Focus", id: "xxYJONmXE8w" },
  { title: "Small City", id: "lFBS_dMtoO4" },
  { title: "Tavern", id: "vyg5jJrZ42s" },
  { title: "Marketplace", id: "-r9cvBWjGKM" },
  { title: "Gala Night", id: "ulplqXTp4R0" },
  { title: "Harbour", id: "t0AmfPQMs4k" },
  { title: "Feast", id: "JL3DTrP_tUI" },
  { title: "Peace", id: "ewceCUF4qtU" },
  { title: "Adventure", id: "quVtvaDT_mM" },
  { title: "Strixhaven", id: "eIiuFWSobnQ" },
  { title: "Whimsical", id: "dmlqoxtxeFc" },
  { title: "City Temple", id: "6H2JbT4BRDU" },
  { title: "Festival", id: "8u9ZC8WLIiU" },
  { title: "Snow", id: "mDn-DNVfr-o" },
  { title: "Xmas", id: "PPZ6fMdjQC4" },
];

const singles = [
  { title: "Hoist the colours", id: "cbn1PFvKu6U" },
  { title: "Wellerman", id: "bNQSMTNSnUw" },
  { title: "Baleiro", id: "rKyuLzadyFY" },
  { title: "Priscila's", id: "Lg2TTkhFy40" },
  { title: "Raphael", id: "xMo7ugWudCA" },
  { title: "Build that wall", id: "Jz8c17upEwM" },
  { title: "Mother i'm here", id: "YlfUcnSbKDA" },
  { title: "Misty mountains", id: "Erkv1-_xR7U" },
];

const YoutubeModal = ({ visible }) => {
  const [youtubeId, setYoutubeId] = useState("rKyuLzadyFY");
  const [list, setList] = useState(mixes);
  const playerRef = useRef(null); // reference to YT player
  const seekRef = useRef(null); // reference to the seek slider
  const intervalRef = useRef(null);
  const [volume, setVolume] = useState(50);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    if (!window.YT) {
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const initPlayer = () => {
    window.YT.ready(function () {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: youtubeId,
        width: "480",
        height: "200",
        playerVars: { controls: 1, playsinline: 1 },
        events: {
          onReady: onPlayerReady,
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              playerRef.current.playVideo();
            }
          },
        },
      });
    });
  };

  const onPlayerReady = () => {
    playerRef.current.setVolume(volume);
    setDuration(playerRef.current.getDuration());
    setIsPlayerReady(true);

    intervalRef.current = setInterval(() => {
      const current = playerRef.current.getCurrentTime();
      if (seekRef.current && duration > 0) {
        seekRef.current.value = ((current / duration) * 100).toString();
      }
    }, 1000);
  };

  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;

    playerRef.current.loadVideoById(youtubeId);
  }, [youtubeId, isPlayerReady]);

  return (
    <div className={`media-modal ${visible ? "visible" : "hide"}`}>
      <div className="youtube-player">
        <div className="youtube-player" id="yt-player"></div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          disabled={!isPlayerReady}
          onChange={(e) => {
            const val = Number(e.target.value);
            setVolume(val);
            playerRef.current.setVolume(val);
          }}
          style={{
            appearance: "slider-vertical",
            width: "24px",
            height: "150px",
          }}
        />
        <div className="list">
          <div className="selectors">
            <p
              onClick={() => setList(mixes)}
              className={`${
                mixes.filter((i) => i.id === youtubeId).length > 0 && "selected"
              }`}
            >
              Mixes
            </p>
            <p
              onClick={() => setList(singles)}
              className={`${
                singles.filter((i) => i.id === youtubeId).length === 1 &&
                "selected"
              }`}
            >
              Singles
            </p>
          </div>
          <div className="songs">
            {list.map((i) => {
              return (
                <button
                  className={`list-option ${i.id === youtubeId && "selected"}`}
                  onClick={() => setYoutubeId(i.id)}
                >
                  {i.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="ambient">
        <div className="ambient-player">
          {osts.map((i) => {
            return <OstPlayer id={i.src} title={i.title} />;
          })}
        </div>
        <div className="one-shots">
          {singleShots.map((i) => {
            return <OstPlayer id={i.src} title={i.title} single />;
          })}
        </div>
      </div>
    </div>
  );
};

export default YoutubeModal;
