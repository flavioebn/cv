const DamageComparison = ({ leftData, rightData, type = "damage" }) => {
  const formatNumber = (num) => num?.toLocaleString("en-US");

  const normalize = (data, totalTime) => {
    if (!data?.length) return [];

    const getValue = (d) => (type === "uptime" ? d.totalUptime : d.total);

    const max = Math.max(...data.map(getValue));

    return data
      .sort((a, b) => getValue(b) - getValue(a))
      .map((d) => {
        const value = getValue(d);

        return {
          ...d,
          value,
          percent: max ? (value / max) * 100 : 0,
          uptimePercent:
            type === "uptime" && totalTime
              ? (d.totalUptime / totalTime) * 100
              : null,
        };
      });
  };

  // 🔥 escolhe fonte de dados
  const leftSource =
    type === "uptime" ? leftData.personalAuras : leftData.entries;
  const rightSource =
    type === "uptime" ? rightData.personalAuras : rightData.entries;

  const left = normalize(leftSource, leftData.totalTime);
  const right = normalize(rightSource, rightData.totalTime);

  const maxRows = Math.max(left.length, right.length);

  const totalLeft =
    type === "uptime"
      ? leftData.totalTime
      : leftData.entries?.reduce((sum, d) => sum + d.total, 0);

  const totalRight =
    type === "uptime"
      ? rightData.totalTime
      : rightData.entries?.reduce((sum, d) => sum + d.total, 0);

  return (
    <div className="damage-comp">
      {Array.from({ length: maxRows }).map((_, i) => {
        const l = left[i];
        const r = right[i];

        return (
          <div key={i} className="row">
            {/* LEFT */}
            <div className="side left">
              {l && (
                <div className="bar-wrapper">
                  <div
                    className="bar left-bar"
                    style={{ width: `${l.percent}%` }}
                  />
                  <span className="label">
                    {l.name}

                    {/* uses */}
                    {l.totalUses && ` (x${l.totalUses})`}

                    {/* valor */}
                    {type === "damage" && ` (${formatNumber(l.value)})`}

                    {/* uptime */}
                    {type === "uptime" && ` (${l.uptimePercent?.toFixed(1)}%)`}

                    {/* % relativo */}
                    {type === "damage" &&
                      ` - ${((l.value / totalLeft) * 100).toFixed(1)}%`}
                  </span>
                </div>
              )}
            </div>

            {/* CENTER */}
            <div className="center-line" />

            {/* RIGHT */}
            <div className="side right">
              {r && (
                <div className="bar-wrapper">
                  <div
                    className="bar right-bar"
                    style={{ width: `${r.percent}%` }}
                  />
                  <span className="label">
                    {/* % relativo */}
                    {type === "damage" &&
                      `${((r.value / totalRight) * 100).toFixed(1)}% - `}

                    {r.name}

                    {/* uses */}
                    {r.totalUses && ` (x${r.totalUses})`}

                    {/* valor */}
                    {type === "damage" && ` (${formatNumber(r.value)})`}

                    {/* uptime */}
                    {type === "uptime" && ` (${r.uptimePercent?.toFixed(1)}%)`}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DamageComparison;
