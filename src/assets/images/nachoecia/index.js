function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "").replace(/\.(jpe?g|png|gif|svg)$/i, "")] =
      r(item);
  });
  return images;
}

// Import all images from this folder
export const menacho2025 = importAll(
  require.context("./menacho2025", false, /\.(jpe?g|png|gif|svg)$/i)
);

export const gabi2025 = importAll(
  require.context("./gabi2025", false, /\.(jpe?g|png|gif|svg)$/i)
);

// You can also export individual images by name if needed
