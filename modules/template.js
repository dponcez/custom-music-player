export const template = () => {
  const main = document.querySelector('.main');
  
  main.innerHTML = `
    <header class="header flex">
        <h2 class="logo">music<span>player</span></h2>
        <div class="toggle--container flex">
          <button class="toggle" id="dark-mode" aria-describedby="darkMode" role="button" data-toggle></button>
        </div>
      </header>
      <div class="music--player">
        <div class="turntable" id="turntable" aria-describedby="turntable" role="container">
          <div class="outer--plate flex" id="outerPlate" aria-describedby="outerPlate" role="doc-cover">
            <div class="inner--plate flex" id="innerPlate" aria-describedby="innerPlate" role="banner">
            </div>
          </div>
          <div class="outer--base flex">
            <div class="inner--base flex">
              <div class="tonearm--container">
                <div class="tone--arm"></div>
              </div>
            </div>
          </div>
          <section class="feature--section flex" id="featureSection" aria-describedby="featureSection" role="contentinfo">
            <p class="song--name" role="dialog">song name</p>
            <p class="artist--name" role="dialog">artist name</p>
          </section>
        </div>
      </div>
      <div class="control--container flex" id="controlContainer" aria-describedby="controlContainer" role="complementary">
        <div class="progress--bar" id="progressBar" aria-describedby="progressBar" role="progressbar" data-progress></div>
        <span class="current--time timer" aria-current="time" role="timer" data-current-time>00:00</span>
        <div class="controls flex" aria-describedby="controls" role="complementary">
          <button class="rewind--btn btn flex" id="rewind" aria-describedby="rewind" role="button" data-skip="-10">
            -10
            <i class="fa fa-solid fa-backward"></i>
          </button>
          <div class="player--container flex">
            <button class="chevron--left btn flex" id="chevron-left" aria-describedby="chevronLeft" role="button" data-backward>
              <i class="fa fa-solid fa-chevron-left"></i>
            </button>
            <button class="play--btn btn flex" id="playButton" aria-describedby="playButton" role="button" data-play>
              <i class="fa fa-solid fa-play"></i>
            </button>
            <button class="chevron--right btn flex" id="chevron-right" aria-describedby="chevronRight" role="button" data-forward>
              <i class="fa fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <button class="forward--btn btn flex" id="forwardButton" aria-describedby="playButton" role="button" data-skip="+25">
            <i class="fa fa-solid fa-forward"></i>
            +25
          </button>
          <button class="repeat--btn btn flex" id="repeatButton" aria-describedby="repeatButton" role="button" data-repeat>
            <i class="fa fa-solid fa-repeat"></i>
          </button>
          <div class="volume--container flex">
            <button class="volume flex" data-volume>
              <i class="fa fa-solid fa-volume-high"></i>
            </button>
            <input class="slider" type="range" name="slider" min="0" max="100" id="slider" aria-describedby="slider" role="slider" data-slider>
          </div>
        </div>
        <span class="duration timer" aria-current="time" role="timer" data-duration>00:00</span>
      </div>
  `;
}