const { log, dir } = console;

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
    this.currentView = null;
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
        this.currentView = menu;
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
    this.records = this._createLocationRecords();
  }

  appendLocation() {
    const container = document.querySelector('.main__block');
    container.appendChild(this.title);
    container.appendChild(this.menu);
    container.appendChild(this.bar);
    container.appendChild(this.records);
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

  _createLocationRecords() {
    const wrapper = document.createElement('div');
    wrapper.className = 'main__location-records';

    this.data.data.forEach(recordData => {
      const record = new LocationRecord(0, recordData);
      wrapper.appendChild(record.getRecord());
    });

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

class LocationRecord {
  constructor(lvl = 0, location) {
    this.lvlNesting = lvl;
    this.location = location;
    this.listeners = [];
    this.isShowSubTree = false;
    this.record = this._createRecord();
    this.subTree = this._createSubTree();
  }

  getRecord() {
    this._addListeners();
    return this.record;
  }

  _createRecord(){
    const wrapper = document.createElement('div');
    wrapper.className = 'main__record-block';

    const record = document.createElement('div');
    record.className = 'main__location-record';

    const firstBlock = this._createFirstBlock();
    const secondBlock = this._createSecondBlock();
    const thirdBlock = this._createThirdBlock();

    record.appendChild(firstBlock);
    record.appendChild(secondBlock);
    record.appendChild(thirdBlock);

    record.style.marginLeft = this._calcMarginLeft();
    wrapper.appendChild(record);

    return wrapper;
  }

  _createSubTree() {
    if (this.location.subTree.length === 0) return null;

    return this.location.subTree.map(record => new LocationRecord(this.lvlNesting + 1, record));
  }

  _createFirstBlock() {
    const wrapper = document.createElement('div');
    wrapper.className = 'main__first-block';
    //there must be a different logic here
    if(this.lvlNesting < 2) {
      const img = document.createElement('img');
      img.className = 'main__open-close';
      img.alt = 'Развёртывание поддерева';
      img.src = './assets/svg/plus.svg';

      wrapper.appendChild(img);
    }

    const img = document.createElement('img');
    img.className = 'main__location-dots';
    img.alt = 'Точки';
    img.src = './assets/svg/dots.svg';

    wrapper.appendChild(img);

    const text = document.createElement('span');
    text.className = 'main__location-name';
    text.textContent = this.location.name;

    wrapper.appendChild(text);

    return wrapper;
  }

  _createSecondBlock() {
    const wrapper = document.createElement('div');
    wrapper.className = 'main__second-block';

    const text = document.createElement('span');
    text.className = 'main__count-location';
    text.textContent = this.location.count;

    wrapper.appendChild(text);

    return wrapper;
  }

  _createThirdBlock() {
    const wrapper = document.createElement('div');
    wrapper.className = 'main__third-block';

    if(this.lvlNesting === 0) {
      let button = document.createElement('button');
      button.className = 'main__record-edit';

      let img = document.createElement('img');
      img.className = 'main__edit-icon';
      img.alt = 'Редактировать';
      img.src = './assets/svg/pencil.svg';

      button.appendChild(img);

      let text = document.createElement('span');
      text.className = 'main__edit-text';
      text.textContent = 'Редактировать';

      button.appendChild(text);
      wrapper.appendChild(button);

      button = document.createElement('button');
      button.className = 'main__delete-record';

      img = document.createElement('img');
      img.className = 'main__delete-icon';
      img.alt = 'Удалить';
      img.src = './assets/svg/delete.svg';

      text = document.createElement('span');
      text.className = 'main__delete-text';
      text.textContent = 'Удалить';

      button.appendChild(img);
      button.appendChild(text);
      wrapper.appendChild(button);

      return wrapper;
    }

    if (this.location.subscribe) {
      const text = document.createElement('span');
      text.className = 'main__record-subscribe';
      text.textContent = this.location.subscribe;

      wrapper.appendChild(text);
    }

    if (this.location.addition) {
      const text = document.createElement('span');
      text.className = 'main__record-addition';
      text.textContent = this.location.addition;

      wrapper.appendChild(text);
    }

    return wrapper;
  }

  _calcMarginLeft() {
    if (this.lvlNesting === 0) return '0px';

    return `${this.lvlNesting * 45}px`;
  }

  _addListeners() {
    if (this.location.subTree) {
      const imagePlus = this.record.getElementsByClassName('main__open-close');
      if(imagePlus.length === 0) return;
      if (this.subTree) {
        imagePlus[0].addEventListener('click', this._clickHandler.bind(this));
      }
    }
  }

  _clickHandler(event) {
    event.stopPropagation();
    const target = event.target;

    if (this.subTree.length === 0) return;

    if (!this.isShowSubTree) {
      this.isShowSubTree = true;
      target.src = './assets/svg/minus.svg';
      return this.subTree.forEach(subRecord => this.record.appendChild(subRecord.getRecord()));
    }

    this.isShowSubTree = false;
    target.src = './assets/svg/plus.svg';
    this.subTree.forEach(record => record.getRecord().remove());
  }
}

const state = new StateApp();