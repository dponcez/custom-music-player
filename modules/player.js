import { log } from "./custom_functions.js";
import { selector } from "./custom_functions.js";
import { selectorAll } from "./custom_functions.js";
import { eventHandler } from "./custom_functions.js";
import { debounce } from "../utils/debounce.js";
import { formatTime } from "../utils/formatTime.js";

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
      loadCurrentSong(playlist[index])
    } catch (error) {
      log(`Failure to load data: ${error}`)
    }
  }

  fetchData();
  
  const loadCurrentSong = (current) => {
    const { artist, song, title, poster } = current;

    try {
      cover.style.backgroundImage = `url(${poster})`;
      artistName.innerText = `${artist}`;
      songName.innerText = `${title}`;

      audio.src = `${song}`;
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

  const handlePlaySong = () => {
    if(!isPlaying){
      isPlaying = true;
      playSong()
    }else {
      isPlaying = false;
      pauseSong()
    }
  }

  const handlePrevSong = () => {
    index--;

    if(index < 0) playlist.length - 1;
    audio.currentTime = 0;

    loadCurrentSong(playlist[index]);
    playSong()
  }

  const handleNextSong = () => {
    index++;

    if(index > playlist.length - 1) index = 0;
    audio.currentTime = 0;

    loadCurrentSong(playlist[index]);
    playSong()
  }

  const setTimeUpdate = (e) => {
    const { currentTime, duration } = e.srcElement;
    const percent = ( currentTime / duration ) * 100;
    progress.style.width = `${percent}%`
  }

  const updateProgressBar = (e) => {
    const width = e.offsetWidth;
    const offset = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (offset / width) * duration;
  }

  let timeout = 300;

  // events
  eventHandler(playBtn, 'click', debounce(() => handlePlaySong()), timeout);
  eventHandler(forwardBtn, 'click', debounce(() => handleNextSong()), timeout);
  eventHandler(backwardBtn, 'click', debounce(() => handlePrevSong()), timeout);
  eventHandler(audio, 'timeupdate', setTimeUpdate);
  eventHandler(progressBar, 'click', updateProgressBar)
}