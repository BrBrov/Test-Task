const { log } = console;

log('Script have been connected yet!!!');

//Mocked data location

const locationData = {
  updateDate: '17.05.2024 15.23.21',
  data: [
    {
      name: 'Локация 1',
      subscribe: '',
      addition: '',
      count: 512,
      subTree: [
        {
          name: 'Подотдел 1',
          subscribe: 'Для утерь',
          addition: '',
          count: 10,
          subTree: []
        },
        {
          name: 'Подотдел 2',
          subscribe: '',
          addition: '',
          count: 100,
          subTree: [
            {
              name: 'Подотдел 1',
              subscribe: 'Виртуальная',
              addition: 'Без штрихкода',
              count: 2,
              subTree: []
            }
          ]
        },
        {
          name: 'Подотдел 3',
          subscribe: '',
          addition: '',
          count: 400,
          subTree: []
        }
      ]
    },
    {
      name: 'Локация 2',
      subscribe: '',
      addition: '',
      count: 100,
      subTree: []
    },
    {
      name: 'Локация 3',
      subscribe: '',
      addition: '',
      count: 100,
      subTree: []
    }
  ]
};

class StateApp {
  constructor() {
    this.route = this._detectQueryParams();
    this.updateView();
  }

  changeRoute(routeString) {
    this.route = routeString;
  }

  updateView() {
    switch (this.route) {
      case 'location':
        const menu = new LocationMenu(locationData);
        menu.appendLocation();
        break;
      default:
        const noneElement = new NoneExistent();
        noneElement.addNoneExistent();
        break;
    }
  }

  _detectQueryParams() {
    if (!location.search) return null;

    const url = new URL(`${location.href}`);
    const query = url.searchParams.get('menu');

    if(!query) return null;

    return query;
  }
}

class LocationMenu {
  constructor(data) {
    this.data = data;
    this.title = this._createTitleRoute();
    this.menu = this._createLocationMenu();
    this.bar = this._createLocationBar();
  }

  appendLocation() {
    const container = document.querySelector('.main__block');
    container.appendChild(this.title);
    container.appendChild(this.menu);
    container.appendChild(this.bar);
  }

  _createTitleRoute() {
    const title = document.createElement('h2');
    title.className = 'main__route';
    title.textContent = 'Локации / Все локации';

    return title;
  }

  _createLocationMenu() {
    const wrapperTop = document.createElement('div');
    wrapperTop.className = 'main__location-menu';

    let btnLocation = document.createElement('button');
    btnLocation.className = 'main__location-all';

    let textElem = document.createElement('span');
    textElem.className = 'main__location-btn';
    textElem.textContent = 'Все локации';

    btnLocation.appendChild(textElem);
    wrapperTop.appendChild(btnLocation);

    btnLocation = document.createElement('button');
    btnLocation.className = 'main__location-all';

    textElem = document.createElement('span');
    textElem.className = 'main__location-btn';
    textElem.textContent = 'Импорт/Экспорт';

    btnLocation.appendChild(textElem);
    wrapperTop.appendChild(btnLocation);

    btnLocation = document.createElement('button');
    btnLocation.className = 'main__location-all';

    textElem = document.createElement('span');
    textElem.className = 'main__location-btn';
    textElem.textContent = 'Настройки';

    btnLocation.appendChild(textElem);
    wrapperTop.appendChild(btnLocation);

    const buttonUpdate = document.createElement('button');
    buttonUpdate.className = 'main__location-update';

    const img = document.createElement('img');
    img.className = 'main__location-upd';
    img.alt = 'Обоновить локации';
    img.src = './assets/svg/update.svg';

    buttonUpdate.appendChild(img);

    textElem = document.createElement('span');
    textElem.className = 'main__location-sync';
    textElem.textContent = 'Синхронизация';

    buttonUpdate.appendChild(textElem);

    textElem = document.createElement('span');
    textElem.className = 'main__location-date';
    textElem.textContent = `( ${this.data.updateDate} )`;

    buttonUpdate.appendChild(textElem);
    wrapperTop.appendChild(buttonUpdate);

    return wrapperTop;
  }

  _createLocationBar() {
    const wrapper = document.createElement('div');
    wrapper.className = 'main__location-bar';

    let button = document.createElement('button');
    button.className = 'main__location-create';

    const imgCreate = document.createElement('img');
    imgCreate.className = 'main__location-plus';
    imgCreate.alt = 'Создать';
    imgCreate.src = './assets/svg/add.svg';

    button.appendChild(imgCreate);

    let textElem = document.createElement('span');
    textElem.className = 'main__location-add';
    textElem.textContent = 'Создать локацию';

    button.appendChild(textElem);
    wrapper.appendChild(button);

    const searchBlock = document.createElement('div');
    searchBlock.className = 'main__location-searcher';

    const criteria = document.createElement('div');
    criteria.className = 'main__criteria-block';

    const checkbox = document.createElement('input');
    checkbox.id = 'search__check';
    checkbox.className = 'main__criteria-checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = true;

    const label = document.createElement('label');
    label.className = 'main__criteria-label';
    label.htmlFor = 'search__check';
    label.textContent = 'Поиск по точному вхождению';

    criteria.appendChild(checkbox);
    criteria.appendChild(label);

    searchBlock.appendChild(criteria);

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'main__input-icon';

    const input = document.createElement('input');
    input.className = 'main__input-search';
    input.type = 'text';
    input.placeholder = 'поиск';

    inputWrapper.appendChild(input);
    searchBlock.appendChild(inputWrapper);

    wrapper.appendChild(searchBlock);

    return wrapper;
  }

}

class NoneExistent {
  constructor() {
    this.elem = this._createNoneElem();
  }

  _createNoneElem() {
    const wrapper = document.createElement('div');
    wrapper.className = 'main__none-wrapper';

    const text = document.createElement('span');
    text.className = 'main__none-element';
    text.textContent = 'Функционал не разработан';

    wrapper.appendChild(text);

    return wrapper;
  }

  addNoneExistent() {
    document.querySelector('.main__block').appendChild(this.elem);
  }
}

const state = new StateApp();