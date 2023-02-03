const tabMenuListElements = document.querySelectorAll('[data-tm-list-item]')
const tabMenuLinkElements = document.querySelectorAll('[data-tm-link]')
const tabMenuContent = document.querySelectorAll('[data-tm-content]')
const tabMenuList = document.querySelectorAll('[data-tm-list]')
const link = 'data-tm-link'
const listItem = '[data-tm-list-item]'
const underline = 'underline'
const visible = 'visible'

const setSelectedTab = (element) => {
  const selectedId = element.id

  tabMenuLinkElements.forEach((linkElement) => {
    const id = linkElement.getAttribute('id')
    if (id === selectedId) {
      linkElement.removeAttribute('tabindex')
      linkElement.setAttribute('aria-selected', 'true')
    } else {
      linkElement.setAttribute('tabindex', '-1')
      linkElement.setAttribute('aria-selected', 'false')
    }
  })
}

const handleClickOnTabLink = () => {
  tabMenuLinkElements.forEach((element) => {
    element.addEventListener('click', function () {
      setSelectedTab(element)
    })
  })

  tabMenuLinkElements.forEach((element) => {
    element.addEventListener('keydown', function (e) {
      if ((e.keyCode || e.which) === 32) {
        setSelectedTab(element)
        element.click()
      }
    })
  })
}

const determineTabIndex = () => {
  tabMenuContent.forEach((element) => {
    const focusableElements = element.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
    ).length
    focusableElements
      ? element.setAttribute('tabindex', '-1')
      : element.setAttribute('tabindex', '0')
  })
}

const createArrowNavigation = () => {
  const firstTab = tabMenuLinkElements[0]
  const lastTab = tabMenuLinkElements[0]
}

const activateFirstPanel = (tabs, tabpanels) => {
  tabs[0].setAttribute('tabindex', '0')
  tabs[0].setAttribute('aria-selected', 'true')
  tabs[0].closest(listItem).classList.add(underline)
  tabpanels[0].classList.add(visible)
}

activateFirstPanel(tabMenuLinkElements, tabMenuContent)

const checkInitialSelectedTab = () => {
  const targetedTabPanel = document
  .querySelector('.tab-menu--content:target')
  .getAttribute('aria-labelledby')
  const selectedTab = document.querySelector(`#${targetedTabPanel}`)
  selectedTab.setAttribute('aria-selected', 'true')
  selectedTab.removeAttribute('tabindex')
}

const handleInitialState = () => {
  tabs.forEach((e) => {
    e.setAttribute('tabindex', '-1')
    e.setAttribute('aria-selected', 'false')
  })
}


const removeClassFromAll = (elements, elementClass) => {
  elements.forEach(element => {
    element.classList.remove(elementClass)
  })
}

const addClassToParent = (elementSelector, parentElementSelector, elementClass, event) => {
  if (event.target.hasAttribute(elementSelector)) {
    event.target.closest(parentElementSelector).classList.add(elementClass)
  }
}
const addAttribute = (event) => {
  if (event.target.hasAttribute(elementSelector)) {
    event.target
  }
}

// tabMenuListElements.forEach(element => {
//   element.addEventListener('click', (event) => { addClass(link, listItem, underline, event) })
// })


class TabMenu extends HTMLElement {
  constructor() {
    super();

  }
}

customElements.define('tab-menu', TabMenu)
