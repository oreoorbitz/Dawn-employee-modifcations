// constants
const closeButtonMiniCart = document.querySelector('[data-mini-cart-close-btn]')
const openButtonMiniCart = document.querySelector('[data-mini-cart-open-btn]')
const addButtonMiniCart = document.querySelector('[data-mini-cart-add]')
const miniCart = document.querySelector('[data-mini-cart-main-container]')
const itemsContainerMiniCart = document.querySelector('[data-mini-cart-items-container]')
const checkoutButtonsMiniCart = document.querySelector('[data-mini-cart-checkout-btns]')
const deleteButtonMiniCart = document.querySelector('[data-mini-cart-remove-link]')
const miniCartWrapper = document.querySelector('[data-mini-cart-event]')
const bodyBehindMiniCart = document.body
const MINI_CART_OPEN_CLASS = 'open--mini-cart'
const MINI_CART_CLOSED_CLASS = 'closed--mini-cart'

const quantityButtonsMiniCart = () => Array.from(document.querySelectorAll('[data-mini-cart-quantity-btn]'))
const itemCountElementsMiniCart = () => Array.from(document.querySelectorAll('[data-mini-cart-item-quantity]'))
const itemsInMiniCart = () => Array.from(document.querySelectorAll('[data-mini-cart-key]'))

// utility functions
const addClass = (element, className) => element.classList.add(className)
const removeClass = (element, className) => element.classList.remove(className)
const preventScroll = (element, classToAdd) => addClass(element, classToAdd)
const allowScroll = (element, classToRemove) => removeClass(element, classToRemove)
const showHiddenElement = (element, classToRemove) => removeClass(element, classToRemove)
const hideElement = (element, classToAdd) => addClass(element, classToAdd)
const findSiblingFromParent = (element, selector) => element.parentElement.querySelector(selector)

const disableQuantityButton = (buttons) => {
  buttons.forEach(button => {
    const input = findSiblingFromParent(button, '[data-mini-cart-item-quantity]')
    if (input.value === '1' && button.dataset.miniCartQuantityBtn === 'minus' || input.value === input.max && button.dataset.miniCartQuantityBtn === 'plus') {
      button.disabled = true
    }
  })
}

disableQuantityButton(quantityButtonsMiniCart())

// add to cart

const addToMiniCart = async (key, quantity) => {
  let formData = JSON.stringify({
    'id': key,
    'quantity': quantity,
    'sections': sectionsToUpdateMiniCart().map((section) => section.section)
  })

  let response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: formData
  })
  if (response.ok) {
    console.log('Success:', response.status, response.statusText)
    const data = await response.text()
    const jsonForHTMLCreation = JSON.parse(data)
    updateSections(sectionsToUpdateMiniCart(), jsonForHTMLCreation)
    disableQuantityButton(quantityButtonsMiniCart())
  } else {
    console.error('Error:', response.status, response.statusText)
  }
}

// update the cart
const changeItemQuantity = async (key, quantity) => {
  const scrollPosition = document.querySelector('[data-mini-cart-items-container]').dataset.miniCartItemsContainer
  let formData = JSON.stringify({
    'id': key,
    'quantity': quantity,
    'sections': sectionsToUpdateMiniCart().map((section) => section.section)
  })

  let response = await fetch(`${window.Shopify.routes.root}cart/change.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: formData
  })
  if (response.ok) {
    const data = await response.text()
    const jsonForHTMLCreation = JSON.parse(data)
    updateSections(sectionsToUpdateMiniCart(), jsonForHTMLCreation)
    const scrollItems = document.querySelector('[data-mini-cart-items-container]')
    if (scrollItems) {
      scrollItems.scrollTo(0, scrollPosition)
      scrollItems.addEventListener('scroll', () => {
        scrollItems.dataset.miniCartItemsContainer = scrollItems.scrollTop
      })
    }
    disableQuantityButton(quantityButtonsMiniCart())
  } else {
    console.error('Error:', response.status, response.statusText)
  }
}

const sectionsToUpdateMiniCart = () =>
  [
    {
      id: 'mini-cart',
      section: miniCart.dataset.miniCartMainContainer,
      selector: '.content-to-update--mini-cart'
    },
    {
      id: 'cart-icon-bubble',
      section: 'cart-icon-bubble',
      selector: '.shopify-section'
    }
  ]

const getSectionInnerHtmlMiniCart = (htmlString, selector) => {
  return new DOMParser()
    .parseFromString(htmlString, 'text/html')
    .querySelector(selector).innerHTML;
}

const updateSections = (sections, returnedJSON) => {
  sections.forEach((section) => {
    const sectionElement = document.getElementById(section.id).querySelector(section.selector)
    const sectionElementOrBackup = sectionElement || document.getElementById(section.id)
    const htmlToInjectInMiniCart = getSectionInnerHtmlMiniCart(returnedJSON.sections[section.section], section.selector)
    sectionElementOrBackup.innerHTML = htmlToInjectInMiniCart
  });
}

// event handlers
const handleCloseMiniCart = () => {
  hideElement(miniCart, MINI_CART_CLOSED_CLASS)
  allowScroll(bodyBehindMiniCart, MINI_CART_OPEN_CLASS)
}

const handleOpenMiniCart = () => {
  if (openButtonMiniCart.dataset.miniCartOpenBtn === 'cart') return
  showHiddenElement(miniCart, MINI_CART_CLOSED_CLASS)
  preventScroll(bodyBehindMiniCart, MINI_CART_OPEN_CLASS)
  miniCart.focus()
}

const handleAddToMiniCart = (event) => {
  const key = event.target.closest('[data-mini-cart-add]').dataset.miniCartAdd
  const quantity = 1
  addToMiniCart(key, quantity)
}

const handleChangeItemCount = (event) => {
  if (event.target.parentElement === checkoutButtonsMiniCart || event.target.parentElement === deleteButtonMiniCart) return
  const key = event.target.closest('[data-mini-cart-key]').dataset.miniCartKey
  const currentCountElement = findSiblingFromParent(event.target, '[data-mini-cart-item-quantity]')
  if (quantityButtonsMiniCart().includes(event.target) && itemCountElementsMiniCart().includes(currentCountElement)) {
    event.preventDefault()
    if (event.target.innerText === '+' && currentCountElement.value < currentCountElement.max) {
      currentCountElement.stepUp()
      const quantity = parseInt(currentCountElement.value)
      changeItemQuantity(key, quantity)
    } else if (event.target.innerText === '-' && currentCountElement.value > currentCountElement.min) {
      currentCountElement.stepDown()
      const quantity = parseInt(currentCountElement.value)
      changeItemQuantity(key, quantity)
    } 
  } else if (event.target === document.querySelector('[data-mini-cart-remove-link]')) {
    changeItemQuantity(key, 0)
  }
}

// add event listeners 
closeButtonMiniCart.addEventListener('click', handleCloseMiniCart)
openButtonMiniCart.addEventListener('click', handleOpenMiniCart)
addButtonMiniCart.addEventListener('click', handleAddToMiniCart)
miniCartWrapper.addEventListener('click', handleChangeItemCount)
itemsInMiniCart().length > 0 && itemsContainerMiniCart.addEventListener('scroll', () => {
  itemsContainerMiniCart.dataset.miniCartItemsContainer = itemsContainerMiniCart.scrollTop
})
