export const checkImageExists = (path) => {
  // return fetch(path, {})

  return new Promise((resolve, reject) => {
    const img = new Image(path);
    img.onerror = reject;
    img.onload = resolve;
    const timer = setInterval(() => {
      if (img.naturalWidth && img.naturalHeight) {
        img.src = ''; /* stop loading */
        clearInterval(timer);
        resolve();
      }
    }, 10);
    img.src = path;
  });
};
