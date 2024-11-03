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
    audio: selector('[data-audio]')
  }

  const {
    outerPlate,
    cover,
    tonearm,
    featureContainer,
    artistName,
    songName,
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
    audio
  } = htmlRefs;

  const icons = {
    play: '<i class="fa-solid fa-play"></i>',
    pause: '<i class="fa-solid fa-pause"></i>',
    repeatAll: '<i class="fa-solid fa-repeat"></i>',
    repeateOne: '../assets/icons/repeat-1.svg',
    shuffle: '<i class="fa-solid fa-shuffle"></i>',
    low: '<i class="fa-solid fa-volume-xmark"></i>',
    high: '<i class="fa-solid fa-volume-high"></i>'
  }

  const {
    play,
    pause,
    repeatAll,
    repeatOne,
    shuffle,
    low,
    high
  } = icons

  let index = 0;
  let timeout = 300;
  let playlist;
  let isPlaying = false;
  let isShuffle = false;
  let mousedown = false;
  let isMute = false;
  const getCurrentSong = [];

  const fetchData = async () => {
    const requestURL = '../json/index.json';
    try {
      const response = await fetch(requestURL);
      const json = await response.json();
      playlist = json
      loadCurrentSong(playlist[index])
    } catch(error) {
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

  const handlePlaySong = () => {
    if(!isPlaying) {
      isPlaying = true;
      playSong()
    }else {
      isPlaying = false;
      pauseSong()
    }
  }

  const handlePrevSong = () => {
    index--;

    if(!isShuffle) {
      isShuffle = true;

      if(index < 0) playlist.length - 1;
      audio.currentTime = 0;
      progress.style.width = 0;
      
      loadCurrentSong(playlist[index]);
      playSong()
    }else {
      isShuffle = false;
      chooseRandomMusic()
    }

  }

  const handleNextSong = () => {
    index++;

    if(!isShuffle) {
      isShuffle = true;

      if(index > playlist.length - 1) index = 0;
      audio.currentTime = 0;
      progress.style.width = 0;

      loadCurrentSong(playlist[index]);
      playSong()
    }else {
      isShuffle = false;
      chooseRandomMusic()
    }

  }

  const handleMuteSong = () => {
    const isMuted = audio.muted ? audio.muted = false : audio.muted = true;

    if(!isMuted && !isMute) {
      volumeBtn.innerHTML = high;
      slider.value = 50;
      isMute = true
    }else {
      volumeBtn.innerHTML = low;
      slider.value = 0;
      isMute = false
    }
  }

  const handleVolumeSlider = () => {
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

  const chooseRandomMusic = () => {
    const getRandomIndex = Math.floor(Math.random() * playlist.length);
    const randomMusic = playlist[getRandomIndex];

    audio.currentTime = 0;
    progress.style.width = 0;

    loadCurrentSong(randomMusic);
    playSong();
  };

  const playCurrentSong = () => {
    const getRandomIndex = Math.floor(Math.random() * playlist.length);
    const randomMusic = playlist[getRandomIndex];

    if(getCurrentSong.includes(randomMusic)) {
      return chooseRandomMusic();
    }else {
      getCurrentSong.push(randomMusic);
      loadCurrentSong(randomMusic);
    }
  };

  const selectRandomMusic = () => {
    if(!isShuffle) {
      isShuffle = true;
      repeatBtn.innerHTML = repeatAll
      playSong()
    }else {
      isShuffle = false;
      repeatBtn.innerHTML = shuffle;
      chooseRandomMusic();
    }
  }
  
  // events
  eventHandler(playBtn, 'click', debounce(() => handlePlaySong()), timeout);
  eventHandler(forwardBtn, 'click', debounce(() => handleNextSong()), timeout);
  eventHandler(backwardBtn, 'click', debounce(() => handlePrevSong()), timeout);
  eventHandler(repeatBtn, 'click', debounce(() => selectRandomMusic()), timeout);
  eventHandler(volumeBtn, 'click', debounce(() => handleMuteSong()), timeout);

  eventHandler(progressBar, 'click', updateProgressBar);
  eventHandler(progressBar, 'mousemove', debounce((e) => mousedown && updateProgressBar(e)), timeout);
  eventHandler(progressBar, 'mousedown', debounce(() => mousedown = true), timeout);
  eventHandler(progressBar, 'mouseup', debounce(() => mousedown = false), timeout);
  eventHandler(slider, 'change', debounce(() => handleVolumeSlider()), timeout);

  eventHandler(audio, 'timeupdate', seekTimeUpdate);
  eventHandler(audio, 'loadedmetadata', seekTimeUpdate);
  eventHandler(audio, 'ended', debounce(() => handleNextSong()))
}