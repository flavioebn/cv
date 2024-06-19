import React, { useState } from "react";

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
];

const singles = [
  { title: "Hoist the colours", id: "cbn1PFvKu6U" },
  { title: "Wellerman", id: "bNQSMTNSnUw" },
  { title: "Baleiro", id: "rKyuLzadyFY" },
  { title: "Hoist the colours", id: "cbn1PFvKu6U" },
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
    <div className={`youtube-modal ${visible ? "visible" : "hide"}`}>
      <embed
        src={`https://youtube.com/embed/${youtubeId}?autoplay=1`}
        allowscriptaccess="always"
        allowfullscreen="false"
        width="480"
        height="200"
      ></embed>
      <div className="list">
        <div className="selectors">
          <p onClick={() => setList(mixes)}>Mixes</p>
          <p onClick={() => setList(singles)}>Singles</p>
        </div>
        <div className="songs">
          {list.map((i) => {
            return (
              <button
                className="list-option"
                onClick={() => setYoutubeId(i.id)}
              >
                {i.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YoutubeModal;
