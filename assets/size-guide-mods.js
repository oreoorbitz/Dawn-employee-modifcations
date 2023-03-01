
// Constants
const tabpanels = [...document.querySelectorAll('.tabpanel--size-guide-modal')]
const sizeGuideModal = document.querySelector('[data-size-guide-modal]')
const sizeGuideModalOpenButton = document.querySelector('[data-size-guide-modal-open-button]')
const sizeGuideModalCloseButton = document.querySelector('[data-size-guide-modal-close-button]')
const overlayForOpenSizeGuideModal = document.querySelector('[data-size-guide-modal-overlay]')
const focusableElements = sizeGuideModal.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
const focusableElementsArray = [...focusableElements]

// Utility functions
// const addClass = string => el => el.classList.addClass(string)
// const removeClass = string => el => el.classList.remove(string)
// const hide = addClass('hidden')
// const makeBlue = addClass()
// const show = removeClass('hidden')
// const map = fn => arr => arr.map(fn)
// const showAll = map(show)
// const hideAll = map(hide)
// const contains = string => el => el.classList.contains(string)
// const isHidden = contains('hidden')
// const bodyMakeOverflowHidden = () => {
//   document.body.style.overflow = 'hidden'
// }
// const bodyRemoveOverflowStyle = () => {
//   document.body.style.removeProperty('overflow')
// }

// const modulo = (x,y) => ((y % x) + x)  % x

// Functions

// const keyPressIs = ( keyCode, event) => event.code || event.key === keyCode 

const getTabDirection = event => {
  if (event.shiftKey && keyPressIs('Tab', event)) return -1
  if (keyPressIs('Tab', event)) return +1
  return 0
}

// const combine = (a, b) => a + b

const getValidDirection = (length, desiredIndex) => modulo(length, desiredIndex)

// const closeSizeGuideModalOnEsc = (event) => {
//   if ( keyPressIs('Escape', event) && !isHidden(sizeGuideModal) ) closeSizeGuideModal()
// }

const trapFocusInModal = (event) => {
  const length = focusableElementsArray.length
  const desiredIndex = combine(length, getTabDirection(event))
  const index = getValidDirection(length, desiredIndex)
  console.log(index)
}


// const listentToKeyDownForModal = () => {
//   document.addEventListener('keydown', closeSizeGuideModal )
//   document.addEventListener('keydown', trapFocusInModal)
// }

// const removeKeyDownEventListenersForModal = () => {
//   document.removeEventListener('keydown', closeSizeGuideModalOnEsc)
//   document.removeEventListener('keydown', trapFocusInModal)
// }

// const openSizeGuideModal = () => {
//   showAll([sizeGuideModal, overlayForOpenSizeGuideModal])
//   bodyMakeOverflowHidden()
//   listentToKeyDownForModal()
// }

// const closeSizeGuideModal = () => {
//   hideAll([sizeGuideModal, overlayForOpenSizeGuideModal])
//   bodyRemoveOverflowStyle()
//   removeKeyDownEventListenersForModal()
// }



// Event listeners
// const initSizeGuideListeners = (openButton, closeButton, overlay) => {
//   openButton && openButton.addEventListener('click', openSizeGuideModal)
//   closeButton && closeButton.addEventListener('click', closeSizeGuideModal)
//   overlay && overlay.addEventListener('click', closeSizeGuideModal)
// }

// API
// const initSizeGuide = () => 
//   initSizeGuideListeners(sizeGuideModalOpenButton, sizeGuideModalCloseButton, overlayForOpenSizeGuideModal)

// console.log('test0r3')
// initSizeGuide()
