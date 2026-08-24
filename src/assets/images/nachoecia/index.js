function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "").replace(/\.(jpe?g|png|gif|svg)$/i, "")] =
      r(item);
  });
  return images;
}

export const menacho2025 = importAll(
  require.context("./menacho2025", false, /\.(jpe?g|png|gif|svg)$/i),
);

export const gabi2025 = importAll(
  require.context("./gabi2025", false, /\.(jpe?g|png|gif|svg)$/i),
);

export const jo2025 = importAll(
  require.context("./jo2025", false, /\.(jpe?g|png|gif|svg)$/i),
);

export const nic2025 = importAll(
  require.context("./feijunic2025", false, /\.(jpe?g|png|gif|svg)$/i),
);

export const mauda2026 = importAll(
  require.context("./mauda2026", false, /\.(jpe?g|png|gif|svg)$/i),
);

export const junina2026 = importAll(
  require.context("./junina2026", false, /\.(jpe?g|png|gif|svg)$/i),
);

export const krikki2026 = importAll(
  require.context("./krikki2026", false, /\.(jpe?g|png|gif|svg)$/i),
);

export const hyram2026 = importAll(
  require.context("./hyram2026", false, /\.(jpe?g|png|gif|svg)$/i),
);
