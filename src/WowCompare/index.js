import { useEffect, useState } from "react";
import { bosses, classes } from "./data";
import Timeline from "./Timeline";
import Loader from "../components/loader";
import DamageComparison from "./DamageComparison";
import arrowRight from "../assets/icons/angle-right.svg";
import arrowLeft from "../assets/icons/angle-left.svg";
import arrowDown from "../assets/icons/arrow-down.svg";
import { formatFightDuration } from "../utils/utils";

const FETCH_URL = "https://pugilistically-nonbillable-sol.ngrok-free.dev/wlogs";

const mainStatusToCompare = [
  { label: "Int", key: "intellect" },
  { label: "Str", key: "strength" },
  { label: "Agi", key: "agility" },
];

const secondaryStatusToCompare = [
  { label: "Haste", key: "hasteMelee" },
  { label: "Crit", key: "critMelee" },
  { label: "Mastery", key: "mastery" },
  { label: "Versa", key: "versatilityDamageDone" },
];

const MajorCooldownUsageLine = ({ data, left }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: left ? "flex-end" : "flex-start",
        }}
        onClick={() => setOpen(!open)}
      >
        {left && (
          <span>
            {data.cooldown} - {data.totalCasts}x
          </span>
        )}
        <img
          style={{
            height: "24px",
            filter:
              "invert(100%) sepia(0%) saturate(0%) hue-rotate(77deg) brightness(103%) contrast(106%)",
          }}
          src={!open ? (left ? arrowLeft : arrowRight) : arrowDown}
          className={`arrow ${open ? "open" : "closed"}`}
          alt={!open ? (left ? "arrowLeft" : "arrowRight") : "arrowDown"}
        />
        {!left && (
          <span>
            {data.cooldown} - {data.totalCasts}x
          </span>
        )}
      </div>
      {open && (
        <div
          style={{
            marginLeft: left ? "0px" : "40px",
            marginRight: left ? "40px" : "0px",
            marginTop: "0px",
            marginBottom: "12px",
            textAlign: left ? "right" : "left",
          }}
        >
          {data.casts.map((i) => {
            return (
              <p style={{ margin: "0px" }}>
                {i.castTime}
                {i.targetName !== "Environment" && (
                  <span> - {i.targetName}</span>
                )}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

const WowCompare = () => {
  const [searchInfo, setSearchInfo] = useState({
    boss: bosses[0].id,
    className: classes[0].class,
    spec: classes[0].specs[0],
    difficulty: 4,
  });
  const [availableSpecs, setAvailableSpecs] = useState([]);
  const [topRanks, setTopRanks] = useState([]);
  const [personalReportLink, setPersonalReportLink] = useState(
    "https://www.warcraftlogs.com/reports/4qfAD97F2cTL1t3H?fight=77&type=damage-done&source=2984",
  );
  const [personalReportData, setPersonalReportData] = useState([]);
  const [reportToCompareData, setReportToCompareData] = useState([]);
  const [toCompareChosen, setToCompareChosen] = useState(false);
  const [toCompare, setToCompare] = useState("null");
  const [personalFetched, setPersonalFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const selectedClass = classes.find((c) => c.class === searchInfo.className);
    if (selectedClass) {
      setAvailableSpecs(selectedClass.specs);
      setSearchInfo((prev) => {
        return {
          ...prev,
          spec: selectedClass.specs[0],
        };
      });
    } else {
      setAvailableSpecs([]);
    }
  }, [searchInfo.className]);

  const handleSearchInfoChange = (field) => (event) => {
    setSearchInfo((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSearch = async () => {
    setToCompareChosen(false);

    const res = await fetch(
      `${FETCH_URL}/getTopRanks?boss=${searchInfo.boss}&className=${searchInfo.className}&spec=${searchInfo.spec}&difficulty=${searchInfo.difficulty}&length=${personalReportData.buffs.totalTime}`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    ).then((res) => res.json());

    setTopRanks(res.data.worldData.encounter.characterRankings.rankings);
  };

  const getReportDetails = async (charName) => {
    setIsLoading(true);
    const { report } = topRanks.find((c) => c.name === charName);
    const { code, fightID } = report;

    const res = await fetch(
      `${FETCH_URL}/getReportDetails?charName=${charName}&reportId=${code}&fightId=${fightID}`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    ).then((res) => res.json());

    setReportToCompareData(res);
    setToCompare(charName);
    setToCompareChosen(true);
    setIsLoading(false);
  };

  const getPersonalReport = async () => {
    setIsLoading(true);
    const parsed = new URL(personalReportLink);

    const pathParts = parsed.pathname.split("/");
    const codeIndex = pathParts.findIndex((p) => p === "reports");
    const code = pathParts[codeIndex + 1];

    const fightId = parsed.searchParams.get("fight");
    const source = parsed.searchParams.get("source");

    const res = await fetch(
      `${FETCH_URL}/getReportDetails?charName=${source}&reportId=${code}&fightId=${fightId}`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    ).then((res) => res.json());

    setPersonalReportData(res);
    setPersonalFetched(true);
    setIsLoading(false);
  };

  const getHigherFightLength = () => {
    const personalDuration = personalReportData.damagePerAbility.totalTime;
    const toCompareDuration = reportToCompareData.damagePerAbility.totalTime;
    return Math.max(personalDuration, toCompareDuration);
  };

  const getIlvl = (data) => {
    const gear = data.playerDetails.gear.filter((i) => i.itemLevel > 0);
    const ilvl = gear.reduce((sum, i) => sum + i.itemLevel, 0) / gear.length;
    return ilvl.toFixed(1);
  };

  const getDps = (data) => {
    const arr = data.damagePerAbility.entries.map((e) => e.total);
    const totalDamage = arr.reduce((sum, i) => sum + i, 0);
    const fightLengthSec = data?.damagePerAbility?.totalTime / 1000;
    return Math.floor(totalDamage / fightLengthSec).toLocaleString("en-US");
  };

  const getColor = (duration) => {
    if (
      duration + 2500 >= personalReportData?.buffs?.totalTime ||
      duration - 2500 >= reportToCompareData?.buffs?.totalTime
    )
      return "green";
    if (
      duration + 7500 >= personalReportData?.buffs?.totalTime ||
      duration - 7500 >= reportToCompareData?.buffs?.totalTime
    )
      return "yellow";
    return "red";
  };

  return (
    <div className="underCompare">
      {isLoading && <Loader />}
      <h1>UnderCompare</h1>
      {personalFetched && toCompareChosen && (
        <>
          <div className="nicks-header">
            <div>
              <h2>{personalReportData.playerName}</h2>
              <p>
                {getIlvl(personalReportData)} | {getDps(personalReportData)}
              </p>
            </div>
            <div>
              <h2>{toCompare}</h2>
              <p>
                {getIlvl(reportToCompareData)} | {getDps(reportToCompareData)}
              </p>
            </div>
          </div>
          <div>
            <Timeline
              leftEvents={personalReportData.filteredTimeline}
              rightEvents={reportToCompareData.filteredTimeline}
              duration={getHigherFightLength()}
            />
          </div>
          <div className="damageComparison">
            <h2 style={{ textAlign: "center" }}>Dano por habilidade</h2>
            <DamageComparison
              leftData={personalReportData.damagePerAbility}
              rightData={reportToCompareData.damagePerAbility}
              type="damage"
            />
          </div>

          <div className="damageComparison">
            <h2 style={{ textAlign: "center" }}>Buffs</h2>
            <DamageComparison
              leftData={personalReportData.buffs}
              rightData={reportToCompareData.buffs}
              type="uptime"
            />
          </div>

          <div className="majorCooldownsUsage">
            <h2 style={{ textAlign: "center" }}>Uso de cooldowns</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                width: "80%",
                margin: "auto",
              }}
            >
              <div>
                {personalReportData.filteredCasts
                  .sort((a, b) => b.totalCasts - a.totalCasts)
                  .map((i) => {
                    return <MajorCooldownUsageLine data={i} left={true} />;
                  })}
              </div>

              <div>
                {reportToCompareData.filteredCasts
                  .sort((a, b) => b.totalCasts - a.totalCasts)
                  .map((i) => {
                    return <MajorCooldownUsageLine data={i} left={false} />;
                  })}
              </div>
            </div>
            <div className="statsCompare">
              <h2>Stats</h2>
              {mainStatusToCompare.map((s) => (
                <div className="statsContainer">
                  <p>{personalReportData.playerDetails[s.key]}</p>
                  <p>{s.label}</p>
                  <p>{reportToCompareData.playerDetails[s.key]}</p>
                </div>
              ))}
              <br />
              {secondaryStatusToCompare.map((s) => (
                <div className="statsContainer">
                  <p>{personalReportData.playerDetails[s.key]}</p>
                  <p>{s.label}</p>
                  <p>{reportToCompareData.playerDetails[s.key]}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div
        style={{ display: "grid", gap: "50px", gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          <h2>Teu log pra análisar:</h2>
          <input
            type="text"
            placeholder="report link"
            onChange={(e) => setPersonalReportLink(e.target.value)}
            value={personalReportLink}
          />
          <button onClick={getPersonalReport}>Get personal report</button>

          {!toCompareChosen && personalFetched && (
            <div>
              <h2>
                Duração nessa tua luta: {personalReportData?.buffs?.totalTime}{" "}
                <br />
                {formatFightDuration(personalReportData?.buffs?.totalTime)}
                <br />
                (Os top logs vão levar esse tempo em consideração)
              </h2>
              <h2>Teu ilvl: {getIlvl(personalReportData)}</h2>
            </div>
          )}
        </div>
        <div>
          <h2>Buscar os melhores logs pra comparar</h2>
          <select
            onChange={handleSearchInfoChange("boss")}
            value={searchInfo.boss}
          >
            {bosses.map((i) => {
              return <option value={i.id}>{i.name}</option>;
            })}
          </select>
          <select
            onChange={handleSearchInfoChange("className")}
            value={searchInfo.className}
          >
            {classes.map((i) => {
              return <option value={i.class}>{i.class}</option>;
            })}
          </select>
          <select
            onChange={handleSearchInfoChange("spec")}
            value={searchInfo.spec}
          >
            {availableSpecs.map((spec) => (
              <option value={spec}>{spec}</option>
            ))}
          </select>
          <select
            onChange={handleSearchInfoChange("difficulty")}
            value={searchInfo.difficulty}
          >
            <option value={5}>Mythic</option>
            <option value={4}>Heroic</option>
            <option value={3}>Normal</option>
          </select>
          <button onClick={handleSearch}>Buscar</button>
          {topRanks.length > 0 && !toCompareChosen && (
            <div className="top-rankings-container">
              <div className="top-rankings-header">
                <p>Nome</p>
                <p>Dano</p>
                <p>iLvl</p>
                <p>Duração</p>
              </div>
              {topRanks.map((i) => {
                return (
                  <div
                    className="top-rankings-line"
                    onClick={() => getReportDetails(i.name)}
                  >
                    <p>{i.name}</p>
                    <p>{Math.floor(i.amount).toLocaleString("en-US")}</p>
                    <p>{i.bracketData}</p>
                    <p className={getColor(i.duration)}>
                      {formatFightDuration(i.duration)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {toCompareChosen && !personalFetched && (
            <h2>
              Escolhido o log do {toCompare}, agora coloca o teu report ali na
              esquerda
            </h2>
          )}
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};

export default WowCompare;
