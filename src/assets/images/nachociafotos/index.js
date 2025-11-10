function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "").replace(/\.(jpe?g|png|gif|svg)$/i, "")] =
      r(item);
  });
  return images;
}

// Import all images from this folder
const nachoCiaImages = importAll(
  require.context("./", false, /\.(jpe?g|png|gif|svg)$/i)
);

export default nachoCiaImages;

// You can also export individual images by name if needed
export const getAllImageNames = () => Object.keys(nachoCiaImages);
export const getImageByName = (name) => nachoCiaImages[name];
export const getAllImages = () =>
  Object.values(nachoCiaImages).map((img) => img.default || img);
