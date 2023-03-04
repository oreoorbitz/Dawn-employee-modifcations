const backgroundVideo = document.querySelector('[data-video-player]')
backgroundVideoPauseButton = document.querySelector('[data-video-pause]')
backgroundVideoPlayButton = document.querySelector('[data-video-play]')

const pauseVideo = () => {
  const data = { method: 'pause' }
  backgroundVideo.contentWindow.postMessage(JSON.stringify(data), '*')
}

const playVideo = () => {
  const data = { method: 'play' }
  backgroundVideo.contentWindow.postMessage(JSON.stringify(data), '*')
}


backgroundVideoPauseButton.addEventListener('click', pauseVideo)
backgroundVideoPlayButton.addEventListener('click', playVideo)
