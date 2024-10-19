import { log } from "./custom_functions.js";
import { selector } from "./custom_functions.js";
import { selectorAll } from "./custom_functions.js";
import { eventHandler } from "./custom_functions.js";
import { debounce } from "../utils/debounce.js";

export const player = () => {

  const htmlRefs = {
    darkModeToggle: selector('[data-dark-mode]'),
    outerPlate: selector('[data-rotate]'),
    cover: selector('[data-poster]'),
    tonearm: selector('[data-tonearm]'),
    featureContainer: selector('[data-feature]'),
    artistName: selector('[data-artist-name]'),
    songName: selector('[data-song-name]'),
    progressBar: selector('[data-progress-bar]'),
    progress: selector('[data-progress]'),
    currentTime: selector('[data-current]'),
    durationTime: selector('[data-duration]'),
    skipBtns: selectorAll('[data-skip]'),
    backwardBtn: selector('[data-backward]'),
    playBtn: selector('[data-play]'),
    forwardBtn: selector('[data-forward'),
    repeatBtn: selector('[data-repeat]'),
    volumeBtn: selector('[data-volume]'),
    slider: selector('[data-slider]'),
    audio: selector('[data-audio]')
  }

  const {
    darkModeToggle,
    outerPlate,
    cover,
    tonearm,
    featureContainer,
    artistName,
    songName,
    progressBar,
    progress,
    currentTime,
    durationTime,
    skipBtns,
    backwardBtn,
    playBtn,
    forwardBtn,
    repeatBtn,
    volumeBtn,
    slider,
    audio
  } = htmlRefs;

  const icons = {
    play: '<i class="fa-solid fa-play"></i>',
    pause: '<i class="fa-solid fa-pause"></i>',
    repeat: '<i class="fa-solid fa-repeat"></i>',
    repeateOne: '',
    shuffle: '<i class="fa-solid fa-shuffle>"</i>'
  }

  const {
    play,
    pause,
    repeat,
    repeatOne,
    shuffle
  } = icons

  let index = 0;
  let playlist;
  let isPlaying = false;

  const fetchData = async () => {
    const requestURL = '../json/index.json';
    try {
      const response = await fetch(requestURL);
      const json = await response.json();
      playlist = json
      loadCurrentSong(playlist)
    } catch (error) {
      log(`Failure to load data: ${error}`)
    }
  }

  fetchData();

  const loadCurrentSong = (current) => {
    const {"playlist": [{artist, song, title, poster}]} = current;
    try {
      cover.style.backgroundImage = `url(${poster})`
      artistName.innerText = `${artist}`;
      songName.innerText = `${title}`;

      audio.src = `${song}`

    } catch (error) {
      log(error.message)
    }
    
  }

  const playSong = () => {
    outerPlate.classList.add('play');
    tonearm.classList.add('active');
    playBtn.innerHTML = pause;

    audio.play()
  }

  const pauseSong = () => {
    outerPlate.classList.remove('play');
    tonearm.classList.remove('active');

    playBtn.innerHTML = play;
    audio.pause()
  };

  const handlePlay = () => {
    if(!isPlaying){
      isPlaying = true;
      playSong()
    }else {
      isPlaying = false;
      pauseSong()
    }
    // log('clicked')
  }

  // events
  eventHandler(playBtn, 'click', debounce(() => handlePlay()), 300)
}