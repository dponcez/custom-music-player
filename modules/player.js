import { log } from "./custom_functions.js";
import { selector } from "./custom_functions.js";
import { selectorAll } from "./custom_functions.js";
import { eventHandler } from "./custom_functions.js";
import { debounce } from "../utils/debounce.js";
import { formatTime } from "../utils/formatTime.js";

export const player = () => {

  const htmlRefs = {
    outerPlate: selector('[data-rotate]'),
    cover: selector('[data-poster]'),
    tonearm: selector('[data-tonearm]'),
    featureContainer: selector('[data-feature]'),
    artistName: selector('[data-artist-name]'),
    songName: selector('[data-song-name]'),
    albumName: selector('[data-album]'),
    progressBar: selector('[data-progress-bar]'),
    progress: selector('[data-progress]'),
    currentTxt: selector('[data-current-time]'),
    durationTxt: selector('[data-duration]'),
    skipBtns: selectorAll('[data-skip]'),
    backwardBtn: selector('[data-backward]'),
    playBtn: selector('[data-play]'),
    forwardBtn: selector('[data-forward'),
    repeatBtn: selector('[data-repeat]'),
    volumeBtn: selector('[data-volume]'),
    slider: selector('[data-slider]'),
    audio: selector('[data-audio]'),
    spinnerContainer: selector('[data-spinner')
  }

  const {
    outerPlate,
    cover,
    tonearm,
    featureContainer,
    artistName,
    songName,
    albumName,
    progressBar,
    progress,
    currentTxt,
    durationTxt,
    skipBtns,
    backwardBtn,
    playBtn,
    forwardBtn,
    repeatBtn,
    volumeBtn,
    slider,
    audio,
    spinnerContainer
  } = htmlRefs;

  const icons = {
    play: '<i class="fa-solid fa-play"></i>',
    pause: '<i class="fa-solid fa-pause"></i>',
    repeatAll: '<i class="fa-solid fa-repeat"></i>',
    shuffle: '<i class="fa-solid fa-shuffle"></i>',
    low: '<i class="fa-solid fa-volume-xmark"></i>',
    high: '<i class="fa-solid fa-volume-high"></i>'
  }

  const {
    play,
    pause,
    repeatAll,
    shuffle,
    low,
    high
  } = icons

  let current_index = 0;
  let timeout = 300;
  let playlist;
  let playing = false;
  let randomMode = false;
  let mousedown = false;
  let isMute = false;
  let repeatOnce = false;
  let repeatMode = "repeat-all";

  const path = '../assets/icon/repeat-1.svg';
  const SVG_URL = 'http://www.w3.org/2000/svg';
  const XLINK_URL = 'http://www.w3.org/1999/xlink';
  const size = {
    url: path,
    width: 16,
    height: 16,
    x: 0,
    y: 0
  }

  const fetchData = async (URL) => {
    try {
      const response = await fetch(URL);
      if(!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      if(!Array.isArray(data.playlist)) throw new Error('Playlist is not an array');

      playlist = data;
      loadCurrentSong(playlist, current_index)
    } catch(error) {
      log(`${error.message}`)
    }
  }
  
  const requestURL = '../json/index.json';
  fetchData(requestURL);
  
  const loadCurrentSong = (data, index) => {
    const source = data.playlist[index];
    const { artist, song, title, poster, album } = source;

    try {
      cover.style.backgroundImage = `url(${poster})`;
      artistName.innerText = `${artist}`;
      songName.innerText = `${title}`;
      albumName.innerText = `${album}`;

      audio.src = `${song}`;
      audio.load();
    } catch(error) {
      log(`Failure to parse the data: ${error}`)
    }
  }
  
  const playSong = () => {
    outerPlate.classList.add('play');
    tonearm.classList.add('active');
    featureContainer.classList.add('visible');

    playBtn.innerHTML = pause;
    audio.play()
  }

  const pauseSong = () => {
    outerPlate.classList.remove('play');
    tonearm.classList.remove('active');
    featureContainer.classList.remove('visible');

    playBtn.innerHTML = play;
    audio.pause()
  };

  // allows the browser to load multimedia
  // elements without pausing to load more data
  eventHandler(audio, 'canplaythrough', debounce(() => {
    spinnerContainer.style.display = 'none';
    
    const handlePlaySong = () => {
      if(!playing) {
        playing = true;
        playSong()
      }else {
        playing = false;
        pauseSong()
      }
    }

    eventHandler(playBtn, 'click', debounce(() => handlePlaySong(), timeout));
  }))

  const handlePrevSong = () => {
    current_index--;

    try {
      if(!randomMode) {
        randomMode = false;
  
        if(current_index < 0) current_index = playlist.playlist.length - 1;
        audio.currentTime = 0;
        progress.style.width = 0;
        
        loadCurrentSong(playlist, current_index);
        playSong();
      }else {
        randomMode = true;
        chooseRandomSong()
      }
    } catch (error) {
      log(`Error to play the previous song: ${error.message}`)
    }
  }

  const handleNextSong = () => {
    current_index++;

    try {
      if(!randomMode) {
        randomMode = false;
  
        if(current_index > playlist.playlist.length - 1) current_index = 0;
        audio.currentTime = 0;
        progress.style.width = 0;
  
        loadCurrentSong(playlist, current_index);
        playSong();
      }else {
        randomMode = true;
        chooseRandomSong()
      }
    } catch (error) {
      log(`Error to play the next song: ${error.message}`)
    }
  }

  const handleMuteSong = () => {
    const isMuted = audio.muted ? audio.muted = false : audio.muted = true;

    if(!isMuted && !isMute) {
      isMute = true;
      volumeBtn.innerHTML = high;
      slider.value = 50;
    }else {
      isMute = false;
      volumeBtn.innerHTML = low;
      slider.value = 0;
    }
  }

  const handleRandomSong = () => {
    repeatOnce = !repeatOnce;

    switch(repeatMode){
      case "repeat-all":
        repeatMode = "shuffle";
        randomMode = true;
        repeatBtn.innerHTML = shuffle;

        audio.loop = false;
        chooseRandomSong();
        break;
      case "shuffle":
        repeatMode = "one";
        randomMode = false;
        repeatBtn.innerHTML = loadSVGElement(size);

        audio.loop = true;
        loadSingleSong(playlist, repeatOnce);
        break;
      default:
        repeatMode = "repeat-all";
        randomMode = false;
        repeatBtn.innerHTML = repeatAll;

        audio.loop = false;
        playSong()
    }
  }

  const volumeSlider = () => {
    audio.volume = slider.value / 100;

    (slider.value === '0') ? 
      volumeBtn.innerHTML = low :
      volumeBtn.innerHTML = high;
  };

  const seekTimeUpdate = (e) => {
    const { currentTime, duration } = e.srcElement;
    const percent = ( currentTime / duration ) * 100;
    progress.style.width = `${percent}%`;

    const curTime = audio.currentTime;
    const durTime = audio.duration;

    currentTxt.innerText = `0${formatTime(Number(curTime))}`;
    durationTxt.innerText = `0${formatTime(Number(durTime))}`;
  }

  const updateProgressBar = (e) => {
    const width = progressBar.offsetWidth;
    const offset = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (offset / width) * duration;
  }

  // rewind or fast forward the current song
  skipBtns.forEach(skip => {
    eventHandler(skip, 'click', () => {
      const suffix = skip.dataset.skip;
      if(suffix === '-10') audio.currentTime -= 10

      if(suffix === '+25') audio.currentTime += 25
    })
  });

  const chooseRandomSong = () => {
    current_index = Math.floor(Math.random() * playlist.playlist.length);
    const getRandomIndex = Math.floor(Math.random() * playlist.playlist.length);
    const randomMusic = playlist.playlist[getRandomIndex];

    try {
      if(playlist !== "undefined"){
        randomMode = true;
        fetchData(requestURL);
        throw new Error('Playlist is not defined')
      }

      audio.currentTime = 0;
      progress.style.width = 0;
  
      loadCurrentSong(randomMusic, current_index);
      playSong();
    } catch (error) {
      log(`Failure to load data: ${error.message}`)
    }
  };

  const loadSingleSong = (source, repeatOnce) => {
    if(repeatOnce){
      audio.src = source[current_index].src;
      audio.loop = true;
      audio.play()
    }
  }
  
  const createSVGElement = (url, element) => document.createElementNS(url, element);

  const loadSVGElement = (size = {url, width, height, x, y}) => {
    const svg = createSVGElement(SVG_URL, 'svg');
    svg.setAttribute('width', size.width);
    svg.setAttribute('height', size.height);

    const image = createSVGElement(SVG_URL, 'image');
    image.setAttributeNS(XLINK_URL, 'xlink:href', size.url);
    image.setAttribute('x', size.x);
    image.setAttribute('y', size.y);
    image.setAttribute('width', size.width);
    image.setAttribute('height', size.height);
    image.setAttribute('preserveAspectRation', 'xMidYMid meet')

    svg.appendChild(image);
    return svg.outerHTML
  }

  // events
  eventHandler(forwardBtn, 'click', debounce(() => handleNextSong(), timeout));
  eventHandler(backwardBtn, 'click', debounce(() => handlePrevSong(), timeout));
  eventHandler(repeatBtn, 'click', debounce(() => handleRandomSong(), timeout));
  eventHandler(volumeBtn, 'click', debounce(() => handleMuteSong(), timeout));

  eventHandler(progressBar, 'click', updateProgressBar);
  eventHandler(progressBar, 'mousemove', debounce((e) => mousedown && updateProgressBar(e), timeout));
  eventHandler(progressBar, 'mousedown', debounce(() => mousedown = true, timeout));
  eventHandler(progressBar, 'mouseup', debounce(() => mousedown = false, timeout));
  eventHandler(slider, 'change', debounce(() => volumeSlider(), timeout));

  eventHandler(audio, 'timeupdate', seekTimeUpdate);
  eventHandler(audio, 'loadedmetadata', seekTimeUpdate);
  eventHandler(audio, 'ended', debounce(() => handleNextSong()));
}