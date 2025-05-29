import React, { useState } from "react";
import OstPlayer from "./ost/ostPlayer";
import { osts } from "./ost";

const mixes = [
  { title: "Battle", id: "w0sUw735gRw" },
  { title: "Battle 2", id: "t3B802PIuB0" },
  { title: "Battle Heavy", id: "CLAa1urufGE" },
  { title: "Dark Dungeon", id: "W2NAblVD70Q" },
  { title: "Tense", id: "fv_7EurNAss" },
  { title: "Chase", id: "fq8OSrIUST4" },
  { title: "Ruins", id: "205meIww0zg" },
  { title: "Dark & Mistery", id: "CDWtH8eHeEU" },
  { title: "Calm & Explore", id: "sHA_4wfQhE8" },
  { title: "Tavern", id: "vyg5jJrZ42s" },
  { title: "Ominous", id: "3FNuE_sBquk" },
  { title: "Adventure", id: "quVtvaDT_mM" },
  { title: "Strixhaven", id: "eIiuFWSobnQ" },
  { title: "Whimsical", id: "dmlqoxtxeFc" },
  { title: "Suspense", id: "EApZmmYg_oQ" },
  { title: "Relax", id: "HB50lp5N0Uk" },
  { title: "Festival", id: "8u9ZC8WLIiU" },
  { title: "Deep waters", id: "MhiSjz0c7MI" },
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

  return (
    <div className={`media-modal ${visible ? "visible" : "hide"}`}>
      <div className="youtube-player">
        <iframe
          id="youtuber-player"
          title="player"
          type="text/html"
          width="480"
          height="200"
          src={`https://youtube.com/embed/${youtubeId}?autoplay=1&showinfo=0&loop=1&playlist=${youtubeId}`}
          frameborder="0"
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
        <div className="one-shots"></div>
      </div>
    </div>
  );
};

export default YoutubeModal;
