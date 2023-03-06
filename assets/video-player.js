const backgroundVideo = document.querySelector('[data-video-player]')
const backgroundVideoPlayOrPauseButton = document.querySelector('[data-video-pause-or-play]')

const togglePaused = () => backgroundVideo.classList.toggle('paused')

const postMessageToVideo = (video, action) => video.contentWindow.postMessage(JSON.stringify(action), '*')

const pauseOrPlayVideo = (video) => {
  const dataPause = { method: 'pause' }
  const dataPlay = { method: 'play' }
  video.classList.contains('paused') ? postMessageToVideo(video, dataPlay) : postMessageToVideo(video, dataPause)
}

backgroundVideoPlayOrPauseButton.addEventListener('click', () => { pauseOrPlayVideo(backgroundVideo) })
backgroundVideoPlayOrPauseButton.addEventListener('click', togglePaused)
