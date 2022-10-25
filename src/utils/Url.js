export const openExternalLink = (url) => {
  if (window.opener == null) {
    window.location.href = url;
  } else {
    window.open(url);
  }
};
