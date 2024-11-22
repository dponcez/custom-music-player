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

  let index = 0;
  let timeout = 300;
  let playlist;
  let playing = false;
  let randomMode = false;
  let mousedown = false;
  let isMute = false;
  let repeatOne = false;
  let repeatMode = "repeat-all";

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
    if(!playing) {
      playing = true;
      playSong()
    }else {
      playing = false;
      pauseSong()
    }
  }

  const handlePrevSong = () => {
    index--;

    if(randomMode) {
      randomMode = false;

      if(index < 0) playlist.length - 1;
      audio.currentTime = 0;
      progress.style.width = 0;
      
      loadCurrentSong(playlist[index]);
      playSong()
    }else {
      randomMode = true;
      chooseRandomMusic()
    }

  }

  const handleNextSong = () => {
    index++;

    if(randomMode) {
      randomMode = false;

      if(index > playlist.length - 1) index = 0;
      audio.currentTime = 0;
      progress.style.width = 0;

      loadCurrentSong(playlist[index]);
      playSong()
    }else {
      randomMode = true;
      chooseRandomMusic()
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

  const handleRandomMusic = () => {
    repeatOne = !repeatOne;

    switch(repeatMode){
      case "repeat-all":
        repeatMode = "shuffle";
        randomMode = true;
        repeatBtn.innerHTML = shuffle;

        audio.loop = true;
        chooseRandomMusic();
        break;
      case "shuffle":
        repeatMode = "one";
        randomMode = false;
        repeatBtn.textContent = "one";

        audio.loop = true;
        loadSingleSong(playlist, repeatOne);
        break;
      default:
        repeatMode = "repeat-all";
        randomMode = false;
        repeatBtn.innerHTML = repeatAll;

        audio.loop = false;
        playSong()
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

  const loadSingleSong = (source, repeatOne) => {
    if(repeatOne){
      audio.src = source[index].src;
      audio.loop = true;
      audio.play()
    }
  }
  
  // events
  eventHandler(playBtn, 'click', debounce(() => handlePlaySong()), timeout);
  eventHandler(forwardBtn, 'click', debounce(() => handleNextSong()), timeout);
  eventHandler(backwardBtn, 'click', debounce(() => handlePrevSong()), timeout);
  eventHandler(repeatBtn, 'click', debounce(() => handleRandomMusic()), timeout);
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