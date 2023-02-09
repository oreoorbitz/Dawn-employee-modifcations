const tabMenuListElements = document.querySelectorAll('[data-tm-list-item]')
const tabMenuLinkElements = document.querySelectorAll('[data-tm-link]')
const tabMenuContent = document.querySelectorAll('[data-tm-content]')
const tabMenuList = document.querySelectorAll('[data-tm-list]')
const link = 'data-tm-link'
const listItem = '[data-tm-list-item]'


// const setSelectedTab = (element) => {
//   const selectedId = element.id

//   tabMenuLinkElements.forEach((linkElement) => {
//     const id = linkElement.getAttribute('id')
//     if (id === selectedId) {
//       linkElement.removeAttribute('tabindex')
//       linkElement.setAttribute('aria-selected', 'true')
//     } else {
//       linkElement.setAttribute('tabindex', '-1')
//       linkElement.setAttribute('aria-selected', 'false')
//     }
//   })
// }

// const handleClickOnTabLink = () => {
//   tabMenuLinkElements.forEach((element) => {
//     element.addEventListener('click', function () {
//       setSelectedTab(element)
//       showActivePanel(element)
//     })
//   })

//   tabMenuLinkElements.forEach((element) => {
//     element.addEventListener('keydown', function (e) {
//       if ((e.keyCode || e.which) === 32) {
//         setSelectedTab(element)
//         element.click()
//       }
//     })
//   })
// }

// const determineTabIndex = () => {
//   tabMenuContent.forEach((element) => {
//     const focusableElements = element.querySelectorAll(
//       'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
//     ).length
//     focusableElements
//       ? element.setAttribute('tabindex', '-1')
//       : element.setAttribute('tabindex', '0')
//   })
// }

// const createArrowNavigation = () => {
//   const firstTab = tabMenuLinkElements[0]
//   const lastTab = tabMenuLinkElements[tabMenuLinkElements.length - 1]

//   tabMenuLinkElements.forEach((element) => {
//     element.addEventListener('keydown', function (e) {
//       if ((e.keyCode || e.which) === 38 || (e.keyCode || e.which) === 37) {
//         if (element === firstTab) {
//           e.preventDefault()
//           lastTab.focus()
//         } else {
//           e.preventDefault()
//           const focusableElement = tabMenuLinkElements.indexOf(element) - 1
//           tabMenuLinkElements[focusableElement].focus()
//         }
//       } else if ((e.keyCode || e.which) === 40 || (e.keyCode || e.which) === 39) {
//         if (element === lastTab) {
//           e.preventDefault()
//           firstTab.focus()
//         }
//       } else {
//         e.preventDefault()
//         const focusableElement = tabMenuLinkElements.indexOf(element) + 1
//         tabMenuLinkElements[focusableElement].focus()
//       }
//     })
//   })
// }

// const showActivePanel = (element) => {
//   const selectedId = element.id
//   tabMenuLinkElements.forEach((linkElement) => {
//     linkElement.hidden = true
//   })
//   const activePanel = document.querySelector(`[aria-labelledby='${selectedId}']`)
//   activePanel.removeAttribute('hidden')
//   activePanel.focus()
// }

const activateFirstPanel = (tabs, tabpanels) => {
  tabs[0].setAttribute('tabindex', '0')
  tabs[0].setAttribute('aria-selected', 'true')
  // tabs[0].closest(listItem).classList.add(underline)
  tabpanels[0].classList.add('visible')
}

activateFirstPanel(tabMenuLinkElements, tabMenuContent)

// const checkInitialSelectedTab = () => {
//   const targetedTabPanel = document
//   .querySelector('.tab-menu--content:target')
//   .getAttribute('aria-labelledby')
//   const selectedTab = document.querySelector(`#${targetedTabPanel}`)
//   selectedTab.setAttribute('aria-selected', 'true')
//   selectedTab.removeAttribute('tabindex')
// }

// const handleInitialState = () => {
//   tabs.forEach((e) => {
//     e.setAttribute('tabindex', '-1')
//     e.setAttribute('aria-selected', 'false')
//   })
// }


const removeClassFromAll = (elements, elementClass) => {
    elements.forEach(element => {
      element.classList.remove(elementClass)
    })
}

const changeAttributeValue = (element, attribute, value) => element.setAttribute(attribute, value)
const changeAttributeForAll = (elements, attribute, value) => elements.forEach(element => {
  element.setAttribute(attribute, value)
})

const contentRelatedToLink = (linkElement) => {
  const idOfPanel = `#${linkElement.dataset.tmLink}`
  if (linkElement.closest('[data-tm-list]').nextElementSibling.hasAttribute('data-tm-content-container')) {
    return linkElement.closest('[data-tm-list]').nextElementSibling.querySelector(idOfPanel)
  }
}

const addClass = (element, classToAdd) => element.classList.add(classToAdd)

const onClickOfTabLink = (linkElements, siblingElements, element, siblingElementClass, attribute, value, selected, event) => {
    removeClassFromAll(siblingElements, siblingElementClass)
    changeAttributeForAll(linkElements, attribute, value)
    const contentElement = contentRelatedToLink(element)
    if (event.target.hasAttribute('data-tm-link')) {
      addClass(contentElement, siblingElementClass)
      changeAttributeValue(event.target, attribute, selected)
    }
  }

tabMenuLinkElements.forEach(link => {
  link.addEventListener('click', () => { onClickOfTabLink(tabMenuLinkElements, tabMenuContent, link, 'visible', 'aria-selected', 'false', 'true', event) })
})



class TabMenu extends HTMLElement {
  constructor() {
    super();

  }
}

customElements.define('tab-menu', TabMenu)
