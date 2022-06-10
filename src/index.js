console.log('connected');

const dropBar = document.querySelector('#sky-selector');
const skyBackground = document.querySelector('#sky-box');

const getSelectedSky = (backgrounds) => {
  const sky = dropBar.options[dropBar.selectedIndex].text;
  let background;
  switch (true) {
    default:
      background = backgrounds[0];
      break;
    case sky === "Sunny":
      background = backgrounds[1];
      break;
    case sky === "Cloudy":
      background = backgrounds[2];
      break;
    case sky === "Rainy":
      background = backgrounds[3];
      break;
    case sky === "Snowy":
      background = backgrounds[4];
      break;
    case sky === "Windy":
      background = backgrounds[5];
  
  }
  return background;
};

const changeSkyBackground = () => {
  const imgs = [
    '/assets/defaultSky.jpeg',
    '/assets/sunny.jpeg',
    '/assets/cloudy.jpeg',
    '/assets/rainy.jpeg',
    '/assets/snowy.jpeg',
    '/assets/windy.jpeg'
  ];
  const img = getSelectedSky(imgs);
  skyBackground.style.backgroundImage = `url(${img})`;
};
