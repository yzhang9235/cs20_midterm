// menu container
const menuSection = document.querySelector('.menus');

let menuItems = [];
let active;
let activeItems;

// menu sections list
const menuSectionsList = document.createElement('ul');

// actively selected menu section
const activeSection = document.createElement('div');
activeSection.classList.add('active-section');

// load menu items from JSON file
// and initialize menu page
async function loadMenu() {
  const res = await fetch('./menu_items.json');
  menuItems = await res.json();

  initMenu();
}

// initialize menu page
function initMenu() {
  // create section tabs
  for (let i = 0; i < menuItems.length; i++) {
    const menuSectionItem = document.createElement('li');
    menuSectionItem.textContent = menuItems[i].section;

    menuSectionsList.appendChild(menuSectionItem);

    menuSectionItem.addEventListener('click', () => {
      updateActiveSection(menuItems[i].section);
      renderActiveSection();
    });

    if (i === 0) menuSectionItem.classList.add('active');
  }

  menuSection.appendChild(menuSectionsList);

  // initial section
  active = menuItems[0].section;
  activeItems = menuItems.find((item) => item.section === active).items;

  renderActiveSection();
  menuSection.appendChild(activeSection);
}

// handles switching between menu sections
function updateActiveSection(section) {
  if (section === active) return;

  active = section;
  activeItems = menuItems.find((item) => item.section === active).items;

  const menuSectionItems = menuSectionsList.querySelectorAll('li');

  menuSectionItems.forEach((item) => {
    if (item.textContent === active) item.classList.add('active');
    else item.classList.remove('active');
  });
}

// renders the active section with its items and image
function renderActiveSection() {
  activeSection.innerHTML = '';

  let selectedItem = activeItems[0];
  selectedItem.image = './images/bruschetta.jpg';

  // image area
  const activeItemImage = document.createElement('div');
  activeItemImage.classList.add('active-item-image');

  const imageElement = document.createElement('img');
  imageElement.src = selectedItem.image;
  imageElement.alt = selectedItem.name;

  activeItemImage.appendChild(imageElement);

  // items list
  const activeItemsList = document.createElement('ol');
  activeItemsList.classList.add('active-items-list');

  activeItems.forEach((item, index) => {
    item.image =
      index % 2 === 0 ? './images/bruschetta.jpg' : './images/fritti.jpg';

    const activeItem = document.createElement('li');
    activeItem.classList.add('active-item');

    if (item === selectedItem) activeItem.classList.add('selected');

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;

    const itemDescription = document.createElement('p');
    itemDescription.textContent = item.description;

    const itemPrice = document.createElement('span');
    itemPrice.textContent = `$${item.price.toFixed(2)}`;

    activeItem.appendChild(itemName);
    activeItem.appendChild(itemDescription);
    activeItem.appendChild(itemPrice);

    activeItemsList.appendChild(activeItem);

    activeItem.addEventListener('click', () => {
      activeItemsList
        .querySelectorAll('.active-item')
        .forEach((el) => el.classList.remove('selected'));

      activeItem.classList.add('selected');

      selectedItem = item;

      imageElement.src = selectedItem.image;
      imageElement.alt = selectedItem.name;
    });
  });

  activeSection.appendChild(activeItemsList);
  activeSection.appendChild(activeItemImage);
}

// load menu items and initialize menu page
loadMenu();
