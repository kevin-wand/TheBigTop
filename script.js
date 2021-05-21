// ============ DECLARING GLOBAL VARIABLES ==============

const SEARCH = "events";
const DISCOVERY = "stateCode";
const DOMAIN = `https://app.ticketmaster.com/discovery/v2/${SEARCH}.json?`;
const API_KEY = "8dcrqNGbAz3pZiCLzRV0bxReOgbzOSDW";
const BASE_URL = `${DOMAIN}apikey=${API_KEY}`;

const form = document.querySelector("form");
const btnReset = document.querySelector("#reset");

const genreMusic = "Music";
const genreSport = "Sports";
const genreMisc = "Miscellaneous";
const genreIndividual = "Individual";
// const genreArt = 'Arts & Theatre'
// const genreEvent = 'Event Style'

const catMusic = document.querySelector(".music");
const catSport = document.querySelector(".sport");
const catMisc = document.querySelector(".misc");
const catIndividual = document.querySelector(".individual");
// const btnArt = document.querySelector('#btnArt')
// const btnEvent = document.querySelector('#btnEvent')

// ============ EVENT LISTENER - SEARCH RESULTS ==============

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const searchContainerMusic = document.querySelector('.music')
  const searchContainerSport = document.querySelector('.sport')
  const searchContainerMisc = document.querySelector('.misc')
  const searchContainerIndividual = document.querySelector('.individual')
  removePrevious(searchContainerMusic)
  removePrevious(searchContainerSport)
  removePrevious(searchContainerMisc)
  removePrevious(searchContainerIndividual)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  if (userValue === '') {
    // console.log("value is null")
    return
  }
  
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;
  const searchSize = "9"; // default size is 20
  const urlMusic = `${urlConcat}&classificationName=${genreMusic}&size=${searchSize}`;
  const urlSport = `${urlConcat}&classificationName=${genreSport}&size=${searchSize}`;
  const urlMisc = `${urlConcat}&classificationName=${genreMisc}&size=${searchSize}`;
  const urlIndividual = `${urlConcat}&classificationName=${genreIndividual}&size=${searchSize}`;
  // const urlArt = `${urlConcat}&classificationName=${genreArt}&size=${searchSize}`
  // const urlEvent = `${urlConcat}&classificationName=${genreEvent}&size=${searchSize}`
  getLocation();
  
  async function getLocation() {
    try {
      const musicQ = await axios.get(urlMusic);
      const sportQ = await axios.get(urlSport);
      const miscQ = await axios.get(urlMisc);
      const individualQ = await axios.get(urlIndividual);
      let musicResults = musicQ.data._embedded.events;
      let sportResults = sportQ.data._embedded.events;
      let miscResults = miscQ.data._embedded.events;
      let individualResults = individualQ.data._embedded.events;
      
      musicResults.forEach((result) => {
        musicList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
        .querySelector('.music')
        .insertAdjacentHTML("afterbegin", musicList);
      });
      sportResults.forEach((result) => {
        sportList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
        .querySelector('.sport')
        .insertAdjacentHTML("afterbegin", sportList);
      });
      miscResults.forEach((result) => {
        miscList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
        .querySelector('.misc')
        .insertAdjacentHTML("afterbegin", miscList);
      });
      individualResults.forEach((result) => {
        individualList = `
        <li class="list-search">${result.name}</li>
        <li class="list-search">${result.dates.start.localDate}</li>
        `;
        document
        .querySelector('.individual')
        .insertAdjacentHTML("afterbegin", individualList);
        
      });
      // console.log(musicResults)
    } catch (error) {
      console.error(error);
    }
  }
});

// ============ EVENT LISTENER - DISPLAY MORE DETAIL ==============

// DETAIL - MUSIC
catMusic.addEventListener('click', (e) => {
  e.preventDefault()
  const searchContainers = document.querySelector('#result-container')
  removePrevious(searchContainers)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;
  const searchSize = "9"; // default size is 20
  const urlMusic = `${urlConcat}&classificationName=${genreMusic}&size=${searchSize}`;
  
  displayMoreInfo();
  
  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlMusic);
      let attachResults = moreInfo.data._embedded.events;
      attachResults.reverse()
      attachResults.forEach((result) => {
        const imageUrl = result.images.find((image) => image.url.substring(image.url.length - 19) === 'ARTIST_PAGE_3_2.jpg')
        const backgroundUrl = imageUrl.url
        
        let priceResults = ''
        if (result.priceRanges === undefined) {
            priceResults = "Tickets TBA"
          } else {
            priceResults = `Tickets from $${Math.floor(result.priceRanges[0].min)} to $${Math.floor(result.priceRanges[0].max)}`
          }

        let appendToResultGrid = `
          <div class="result-card" style="background-image: url('${backgroundUrl}')">
            <div class="list-result" id="event-name">${result.name}</div>
            <div class="list-result" id="event-date">${result.dates.start.localDate}</div>
            <div class="list-result" id="event-time">${result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
            }</div>
            <a class="list-result" id="ticketmaster" href="${result.url}">Go To Page</a>
            <div class="list-result" id="price-range">${priceResults}</div>
            `;
        document
        .querySelector("#result-container")
        .insertAdjacentHTML("afterbegin", appendToResultGrid);
          
      });
    } catch (error) {
      console.error(error);
    }
  }
});

// DETAIL - SPORT
catSport.addEventListener('click', (e) => {
  e.preventDefault()
  const searchContainers = document.querySelector('#result-container')
  removePrevious(searchContainers)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;
  const searchSize = "9"; // default size is 20
  const urlSport = `${urlConcat}&classificationName=${genreSport}&size=${searchSize}`;
  
  displayMoreInfo();
  
  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlSport);
      let attachResults = moreInfo.data._embedded.events;
      attachResults.reverse()
      attachResults.forEach((result) => {
        const imageUrl = result.images.find((image) => image.url.substring(image.url.length - 19) === 'ARTIST_PAGE_3_2.jpg')
        const backgroundUrl = imageUrl.url
        
        let priceResults = ''
        if (result.priceRanges === undefined) {
            priceResults = "Tickets TBA"
          } else {
            priceResults = `Tickets from $${Math.floor(result.priceRanges[0].min)} to $${Math.floor(result.priceRanges[0].max)}`
          }

        let appendToResultGrid = `
          <div class="result-card" style="background-image: url('${backgroundUrl}')">
            <div class="list-result" id="event-name">${result.name}</div>
            <div class="list-result" id="event-date">${result.dates.start.localDate}</div>
            <div class="list-result" id="event-time">${result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
            }</div>
            <a class="list-result" id="ticketmaster" href="${result.url}">Go To Page</a>
            <div class="list-result" id="price-range">${priceResults}</div>
            `;
        document
        .querySelector("#result-container")
        .insertAdjacentHTML("afterbegin", appendToResultGrid);
          
      });
    } catch (error) {
      console.error(error);
    }
  }
});

// DETAIL - MISC
catMisc.addEventListener('click', (e) => {
  e.preventDefault()
  const searchContainers = document.querySelector('#result-container')
  removePrevious(searchContainers)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;
  const searchSize = "9"; // default size is 20
  const urlMisc = `${urlConcat}&classificationName=${genreMisc}&size=${searchSize}`;
  
  displayMoreInfo();
  
  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlMisc);
      let attachResults = moreInfo.data._embedded.events;
      attachResults.reverse()
      attachResults.forEach((result) => {
        const imageUrl = result.images.find((image) => image.url.substring(image.url.length - 19) === 'ARTIST_PAGE_3_2.jpg')
        const backgroundUrl = imageUrl.url
        
        let priceResults = ''
        if (result.priceRanges === undefined) {
            priceResults = "Tickets TBA"
          } else {
            priceResults = `Tickets from $${Math.floor(result.priceRanges[0].min)} to $${Math.floor(result.priceRanges[0].max)}`
          }

        let appendToResultGrid = `
          <div class="result-card" style="background-image: url('${backgroundUrl}')">
            <div class="list-result" id="event-name">${result.name}</div>
            <div class="list-result" id="event-date">${result.dates.start.localDate}</div>
            <div class="list-result" id="event-time">${result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
            }</div>
            <a class="list-result" id="ticketmaster" href="${result.url}">Go To Page</a>
            <div class="list-result" id="price-range">${priceResults}</div>
            `;
        document
        .querySelector("#result-container")
        .insertAdjacentHTML("afterbegin", appendToResultGrid);
          
      });
    } catch (error) {
      console.error(error);
    }
  }
});

// DETAIL - INDIVIDUAL
catIndividual.addEventListener('click', (e) => {
  e.preventDefault()
  const searchContainers = document.querySelector('#result-container')
  removePrevious(searchContainers)
  
  const userLocation = document.querySelector("#user-input-location");
  const userValue = userLocation.value;
  const urlConcat = `${BASE_URL}&${DISCOVERY}=${userValue}`;
  const searchSize = "9"; // default size is 20
  const urlIndividual = `${urlConcat}&classificationName=${genreIndividual}&size=${searchSize}`;
  
  displayMoreInfo();
  
  async function displayMoreInfo() {
    try {
      const moreInfo = await axios.get(urlIndividual);
      let attachResults = moreInfo.data._embedded.events;
      attachResults.reverse()
      attachResults.forEach((result) => {
        const imageUrl = result.images.find((image) => image.url.substring(image.url.length - 19) === 'ARTIST_PAGE_3_2.jpg')
        const backgroundUrl = imageUrl.url
        
        let priceResults = ''
        if (result.priceRanges === undefined) {
            priceResults = "Tickets TBA"
          } else {
            priceResults = `Tickets from $${Math.floor(result.priceRanges[0].min)} to $${Math.floor(result.priceRanges[0].max)}`
          }

        let appendToResultGrid = `
          <div class="result-card" style="background-image: url('${backgroundUrl}')">
            <div class="list-result" id="event-name">${result.name}</div>
            <div class="list-result" id="event-date">${result.dates.start.localDate}</div>
            <div class="list-result" id="event-time">${result.dates.start.timeTBA === false
            ? result.dates.start.localTime
            : "TBA"
            }</div>
            <a class="list-result" id="ticketmaster" href="${result.url}">Go To Page</a>
            <div class="list-result" id="price-range">${priceResults}</div>
            `;
        document
        .querySelector("#result-container")
        .insertAdjacentHTML("afterbegin", appendToResultGrid);
          
      });
    } catch (error) {
      console.error(error);
    }
  }
});
  
  // ========================== REMOVE PREVIOUS ELEMENTS =======================
  
  function removePrevious(parentElement) {
    while (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild)
    }
  }
  
  // ========================== MODAL CLICKS =============================
  
  const modalClick = document.querySelector('#modal')
  const lightSwitch = modalClick.classList
  const modalAction = document.querySelector('#result-container')

  window.addEventListener('click', (e) => {
    if (e.target !== modalAction) {
        lightSwitch.toggle('popup')
    }
    // else {
    //     modalClick.classList.add('active')
    //   }
    })
