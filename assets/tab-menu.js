const tabMenuListElements = document.querySelectorAll('[data-tm-list-item]')
const tabMenuLinkElements = document.querySelectorAll('[data-tm-link]')
const tabMenuContent = document.querySelectorAll('[data-tm-content]')
const tabMenuList = document.querySelector('[data-tm-list]')
const linksArray = [...tabMenuList.querySelectorAll('[data-tm-link]')]
const link = 'data-tm-link'
const listItem = '[data-tm-list-item]'
const leftArrow = 37
const upArrow = 38
const rightArrow = 39
const downArrow = 40

const activateFirstPanel = (tabs, tabpanels) => {
  tabs[0].setAttribute('tabindex', '0')
  tabs[0].setAttribute('aria-selected', 'true')
  tabpanels[0].classList.add('visible')
}

activateFirstPanel(tabMenuLinkElements, tabMenuContent)

const setSelectedTab = (element, tabs) => {
  const selectedId = element.id
  tabs.forEach(tab => {
    const id = tab.getAttribute('id')
    if (id === selectedId) {
      tab.removeAttribute('tabindex')
      tab.setAttribute('aria-selected', 'true')
    } else {
      tab.setAttribute('tabindex', '-1')
      tab.setAttribute('aria-selected', 'false')
    }
  })
}

const arrowKeyPressIs = (event, keyCodeOne, keyCodeTwo) => (event.keyCode || event.which) === keyCodeOne || (event.keyCode || event.which) === keyCodeTwo

const createArrowNavigation = (links) => {
  const firstTab = links[0]
  const lastTab = links.length - 1
  if (links.length > 1) {
    links.forEach(link => {
      link.addEventListener('keydown', (event) => {
        if (arrowKeyPressIs(event, leftArrow, upArrow)) {
          const newIndexofPrevious = links.indexOf(link) - 1
          link === firstTab ? links[lastTab].focus() : links[newIndexofPrevious].focus()
        } else if (arrowKeyPressIs(event, rightArrow, downArrow)) {
          const newIndexOfNext = links.indexOf(link) + 1
          link === lastTab ? links[firstTab].focus() : links[newIndexOfNext].focus()
        } else {
          return
        }
      })
    })
  }
}

createArrowNavigation(linksArray)

const removeClassFromAll = (elements, elementClass) => {
  elements.forEach(element => {
    element.classList.remove(elementClass)
  })
}
const addClass = (element, classToAdd) => element.classList.add(classToAdd)

const changeAttributeValueForAll = (elements, attribute, value) => elements.forEach(element => {
  element.setAttribute(attribute, value)
})

const changeAttributeValue = (element, attribute, value) => element.setAttribute(attribute, value)

const contentRelatedToLink = (linkElement) => {
  const idOfPanel = `#${linkElement.dataset.tmLink}`
  if (linkElement.closest('[data-tm-list]').nextElementSibling.hasAttribute('data-tm-content-container')) {
    return linkElement.closest('[data-tm-list]').nextElementSibling.querySelector(idOfPanel)
  }
}


const onClickOfTabLink = (linkElements, siblingElements, element, siblingElementClass, event) => {
    removeClassFromAll(siblingElements, siblingElementClass)
    const contentElement = contentRelatedToLink(element)
    if (event.target.hasAttribute('data-tm-link')) {
      addClass(contentElement, siblingElementClass)
      setSelectedTab(event.target, linkElements)
    }
  }

tabMenuLinkElements.forEach(link => {
  link.addEventListener('click', () => { onClickOfTabLink(tabMenuLinkElements, tabMenuContent, link, 'visible', event) })
})



tabMenuLinkElements.forEach(link => {
  link.addEventListener("keydown", (event) => {
    if ((event.keyCode || event.which) === 32) {
      setSelectedTab(link);
      link.click();
    }
  });
});



class TabMenu extends HTMLElement {
  constructor() {
    super();

  }
}

customElements.define('tab-menu', TabMenu)
