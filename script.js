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

//Mocked data settings
const settingsData = {
  fields: [
    {
      name: 'Название',
      description: true,
      count: 500,
      id: 1001,
      type: {
        name: 'Строка',
        icon: false
      },
      inTable: true,
      required: true,
      deleted: false
    },
    {
      name: 'Цена',
      description: false,
      count: 510,
      id: 1002,
      type: {
        name: 'Число',
        icon: false
      },
      inTable: true,
      required: true,
      deleted: true
    },
    {
      name: 'МОЛ',
      description: false,
      count: 520,
      id: 1003,
      type: {
        name: 'Справочник',
        icon: true
      },
      inTable: true,
      required: true,
      deleted: true
    },
    {
      name: 'Фото',
      description: false,
      count: 530,
      id: 1004,
      type: {
        name: 'Файл',
        icon: false
      },
      inTable: true,
      required: true,
      deleted: true
    },
    {
      name: 'Цвет',
      description: false,
      count: 540,
      id: 1005,
      type: {
        name: 'Строка',
        icon: false
      },
      inTable: true,
      required: true,
      deleted: true
    },
    {
      name: 'Локация',
      description: false,
      count: 550,
      id: 1006,
      type: {
        name: 'Справочник',
        icon: true
      },
      inTable: true,
      required: true,
      deleted: true
    },
    {
      name: 'Количество',
      description: false,
      count: 560,
      id: 1007,
      type: {
        name: 'Число',
        icon: false
      },
      inTable: true,
      required: true,
      deleted: true
    },
    {
      name: 'Описание',
      description: false,
      count: 570,
      id: 1008,
      type: {
        name: 'Текст',
        icon: false
      },
      inTable: true,
      required: true,
      deleted: true
    },
    {
      name: 'Количество',
      description: false,
      count: 580,
      id: 1009,
      type: {
        name: 'Число',
        icon: false
      },
      inTable: true,
      required: true,
      deleted: true
    },
  ]
};

class StateApp {
  constructor() {
    this.route = this._detectQueryParams();
    this.updateView();
  }

  _changeRoute(routeString) {
    this.route = routeString;
    location.replace(location.pathname + '?menu=' + routeString);
  }

  updateView() {
    this._navigationHandler();

    switch (this.route) {
      case 'locations':
        const menu = new LocationMenu(locationData);
        menu.appendLocation();
        this.currentView = menu;
        break;
      case 'settings':
        const settings = new Settings(settingsData);
        settings.showSettings();
        this.currentView = settings;
        break;
      default:
        const noneElement = new NoneExistent();
        noneElement.addNoneExistent();
        this.currentView = noneElement;
        break;
    }
  }

  _detectQueryParams() {
    if (!location.search) return location.replace(location.href + '?menu=things');

    const url = new URL(`${location.href}`);
    const query = url.searchParams.get('menu');

    if(!query) {
      return location.search ? location.replace(location.href + '&menu=things') : location.replace(location.href + '?menu=things');
    }

    return query;
  }

  _navigationHandler() {
    const navItems = document.querySelectorAll('.main__navigation-item');

    navItems.forEach(navItem => {
      if (navItem.dataset.item === this.route) {
        navItem.className = 'main__navigation-item main_item-marked';
      } else {
        navItem.className = 'main__navigation-item';
      }

      navItem.addEventListener('click', this._handleRoute.bind(this));
    });
  }

  _handleRoute(event) {
    event.stopPropagation();

    this._changeRoute(event.target.dataset.item);
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
    this.isShowSubTree = false;
    this.record = this._createRecord();
    this.subTree = this._createSubTree();
    this.thirdBlock = this._createThirdBlock();
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

    record.appendChild(firstBlock);
    record.appendChild(secondBlock);

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
      button.addEventListener('click', this._clickEditBtn.bind(this));

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
      this.record.querySelector('.main__location-record').appendChild(this.thirdBlock);

      return this.subTree.forEach(subRecord => this.record.appendChild(subRecord.getRecord()));
    }

    this.isShowSubTree = false;
    target.src = './assets/svg/plus.svg';
    this.thirdBlock.remove();
    this.subTree.forEach(record => record.getRecord().remove());
  }

  _clickEditBtn() {
    const popupEdit = new PopUpCreate();
    popupEdit.showPopUp();
  }
}

class PopUpCreate {
  constructor() {
    this.popup = null;
    this.secondPopUp = null;
  }

  showPopUp() {
    let popupWrapper = document.querySelector('.popup__wrapper');

    if (popupWrapper) {
      this.popup = null;
      return popupWrapper.remove();
    }

    this.popup = this._createPopUp();
    this.secondPopUp = this._createPopUpEdit();
    popupWrapper = document.createElement('div');
    popupWrapper.className = 'popup__wrapper';
    popupWrapper.appendChild(this.popup);
    popupWrapper.appendChild(this.secondPopUp);

    popupWrapper.addEventListener('wheel', (event) => event.preventDefault());
    popupWrapper.addEventListener('click', this._clickAroundForClose.bind(this));

    document.querySelector('.container').before(popupWrapper);
  }

  _createPopUp() {
    const wrapper = document.createElement('div');
    wrapper.className = 'popup';

    let text = document.createElement('h2');
    text.className = 'popup__title';
    text.textContent = 'Создать локацию';

    wrapper.appendChild(text);

    const form = document.createElement('form');
    form.className = 'popup__form-edit';
    form.id = 'popup__form-edit';
    form.action = '#';
    form.name = 'edit';

    let input = document.createElement('input');
    input.className = 'popup__name';
    input.type = 'text';
    input.placeholder = 'Название';
    input.required = true;

    form.appendChild(input);

    input = document.createElement('input');
    input.className = 'popup__barcode';
    input.type = 'number';
    input.placeholder = 'Штрихкод';
    input.required = true;

    form.appendChild(input);

    input = document.createElement('input');
    input.className = 'popup__rfid';
    input.type = 'number';
    input.placeholder = 'RFID';
    input.required = true;

    form.appendChild(input);

    const select = document.createElement('select');
    select.className = 'popup__select';
    select.name = 'select';

    input = document.createElement('option');
    input.className = 'popup__select-item';
    input.value = 'Вложенность';
    input.textContent = 'Вложенность';
    input.selected = true;

    select.appendChild(input);

    input = document.createElement('option');
    input.className = 'popup__select-item';
    input.value = 'Значение 1';
    input.textContent = 'Значение 1';

    select.appendChild(input);

    const customBox = document.createElement('div');
    customBox.className = 'popup__select-custom';

    customBox.appendChild(select);
    form.appendChild(customBox);
    wrapper.appendChild(form);

    let block = document.createElement('div');
    block.className = 'popup__virtual-location';

    text = document.createElement('span');
    text.className = 'popup__label';
    text.textContent = 'Виртуальная локация';

    block.appendChild(text);

    let box = document.createElement('label');
    box.className = 'popup__virtual-box';
    box.htmlFor = 'popup__virtual-radio';

    text = document.createElement('span');
    text.className = 'popup__virtual-slider';

    input = document.createElement('input');
    input.id = 'popup__virtual-radio';
    input.setAttribute('form', 'popup__form-edit');
    input.className = 'popup__virtual-radio';
    input.type = 'checkbox';
    input.checked = true;

    box.appendChild(input);
    box.appendChild(text);

    block.appendChild(box);

    wrapper.appendChild(block);

    block = document.createElement('div');
    block.className = 'popup__loss-location';

    text = document.createElement('span');
    text.className = 'popup__label';
    text.textContent = 'Локация для утерь';

    block.appendChild(text);

    box = document.createElement('label');
    box.className = 'popup__loss-box';
    box.htmlFor = 'popup__location-loss';

    text = document.createElement('span');
    text.className = 'popup__loss-slider';

    input = document.createElement('input');
    input.id = 'popup__location-loss';
    input.setAttribute('from', 'popup__form-edit');
    input.className = 'popup__location-loss';
    input.type = 'checkbox';
    input.checked = true;

    box.appendChild(input);
    box.appendChild(text);

    block.appendChild(box);

    wrapper.appendChild(block);

    block = document.createElement('div');
    block.className = 'popup__btn-wrapper';

    let button = document.createElement('button');
    button.className = 'popup__create';

    const img = document.createElement('img');

    img.className = 'popup__create-icon';
    img.alt = 'Создать';
    img.src = './assets/svg/save.svg';

    button.appendChild(img);

    text = document.createElement('span');
    text.className = 'popup__create-text';
    text.textContent = 'Создать';

    button.appendChild(text);
    block.appendChild(button);

    button = document.createElement('button');
    button.className = 'popup__deny';
    button.addEventListener('click', this._clickDenyHandler.bind(this));

    text = document.createElement('span');
    text.className = 'popup__deny-text';
    text.textContent = 'Отменить';

    button.appendChild(text);
    block.appendChild(button);

    wrapper.appendChild(block);

    return wrapper;
  }

  _createPopUpEdit() {
    const wrapper = document.createElement('div');
    wrapper.className = 'popup__edit';

    const title = document.createElement('h2');
    title.className = 'popup__title';
    title.textContent = 'Изменить локацию %название%';

    wrapper.appendChild(title);

    const form = document.createElement('form');
    form.className = 'popup__form-edit';
    form.id = 'popup__form-location';
    form.action = '#';

    let box = document.createElement('div');
    box.className = 'popup__name-box';

    let label = document.createElement('label');
    label.className = 'popup__label-edit';
    label.htmlFor = 'popup__name-edit';
    label.textContent = 'Название';

    box.appendChild(label);

    let input = document.createElement('input');
    input.className = 'popup__name-edit';
    input.id = 'popup__name-edit';
    input.type = 'text';
    input.placeholder = 'Название';

    box.appendChild(input);
    form.appendChild(box);

    box = document.createElement('div');
    box.className = 'popup__barcode-box';

    label = document.createElement('label');
    label.className = 'popup__label-edit';
    label.htmlFor = 'popup__barcode-edit';
    label.textContent = 'Штрихкод';

    box.appendChild(label);

    input = document.createElement('input');
    input.className = 'popup__barcode-edit';
    input.id = 'popup__barcode-edit';
    input.type = 'number';
    input.placeholder = 'Штрихкод';

    box.appendChild(input);
    form.appendChild(box);

    box = document.createElement('div');
    box.className = 'popup__rfid-box';

    label = document.createElement('label');
    label.className = 'popup__label-edit';
    label.htmlFor = 'popup__rfid-edit';
    label.textContent = 'RFID';

    box.appendChild(label);

    input = document.createElement('input');
    input.className = 'popup__rfid-edit';
    input.id = 'popup__rfid-edit';
    input.type = 'number';
    input.placeholder = 'RFID';

    box.appendChild(input);
    form.appendChild(box);

    box = document.createElement('div');
    box.className = 'popup__nesting-box';

    label = document.createElement('label');
    label.className = 'popup__label-edit';
    label.htmlFor = 'popup__nesting-edit';
    label.textContent = 'Вложенность';

    box.appendChild(label);

    const select = document.createElement('select');
    select.className = 'popup__nesting-edit';
    select.id = 'popup__nesting-edit';

    input = document.createElement('option');
    input.className = 'popup__select-item';
    input.textContent = 'Локация1';
    input.value = 'Локация1';
    input.selected = true;

    select.appendChild(input);

    input = document.createElement('option');
    input.className = 'popup__select-item';
    input.textContent = 'Локация2';
    input.value = 'Локация2';

    select.appendChild(input);

    input = document.createElement('option');
    input.className = 'popup__select-item';
    input.textContent = 'Локация3';
    input.value = 'Локация3';

    select.appendChild(input);

    const customSelect = document.createElement('div');
    customSelect.className = 'popup__select-custom';

    customSelect.appendChild(select);
    box.appendChild(customSelect);
    form.appendChild(box);
    wrapper.appendChild(form);

    let block = document.createElement('div');
    block.className = 'popup__virtual-edit';

    let text = document.createElement('span');
    text.className = 'popup__label';
    text.textContent = 'Виртуальная локация';

    block.appendChild(text);

    box = document.createElement('label');
    box.className = 'popup__edit-box';
    box.htmlFor = 'popup__edit-radio';

    text = document.createElement('span');
    text.className = 'popup__edit-slider';

    input = document.createElement('input');
    input.id = 'popup__edit-radio';
    input.setAttribute('form', 'popup__form-location');
    input.className = 'popup__edit-radio';
    input.type = 'checkbox';
    input.checked = true;

    box.appendChild(input);
    box.appendChild(text);

    block.appendChild(box);

    wrapper.appendChild(block);

    block = document.createElement('div');
    block.className = 'popup__loss-edit';

    text = document.createElement('span');
    text.className = 'popup__label';
    text.textContent = 'Локация для утерь';

    block.appendChild(text);

    box = document.createElement('label');
    box.className = 'popup__box-edit';
    box.htmlFor = 'popup__edit-loss';

    text = document.createElement('span');
    text.className = 'popup__losses-slider';

    input = document.createElement('input');
    input.id = 'popup__edit-loss';
    input.setAttribute('from', 'popup__form-location');
    input.className = 'popup__edit-loss';
    input.type = 'checkbox';
    input.checked = true;

    box.appendChild(input);
    box.appendChild(text);

    block.appendChild(box);
    wrapper.appendChild(block);

    const btnBox = document.createElement('div');
    btnBox.className = 'popup__btn-box';

    let button = document.createElement('button');
    button.className = 'popup__delete';

    let img = document.createElement('img');
    img.className = 'popup__delete-icon';
    img.alt = 'Удалить';
    img.src = './assets/svg/delete.svg';

    button.appendChild(img);

    text = document.createElement('span');
    text.className = 'popup__delete-text';
    text.textContent = 'Удалить';

    button.appendChild(text);
    btnBox.appendChild(button);

    button = document.createElement('button');
    button.className = 'popup__deny-edit';
    button.addEventListener('click', this._clickDenyHandler.bind(this));

    text = document.createElement('span');
    text.className = 'popup__deny-text';
    text.textContent = 'Отменить';

    button.appendChild(text);

    btnBox.appendChild(button);

    wrapper.appendChild(btnBox);

    button = document.createElement('button');
    button.className = 'popup__save';

    img = document.createElement('img');
    img.className = 'popup__save-icon';
    img.alt = 'Сохранить';
    img.src = './assets/svg/save.svg';

    button.appendChild(img);

    text = document.createElement('span');
    text.className = 'popup__save-text';
    text.textContent = 'Сохранить';

    button.appendChild(text);

    wrapper.appendChild(button);

    return wrapper;
  }

  _createVirtualCheckBox(formID) {
    const block = document.createElement('div');
    block.className = 'popup__virtual-location';

    let text = document.createElement('span');
    text.className = 'popup__label';
    text.textContent = 'Виртуальная локация';

    block.appendChild(text);

    let box = document.createElement('label');
    box.className = 'popup__virtual-box';
    box.htmlFor = 'popup__virtual-radio';

    text = document.createElement('span');
    text.className = 'popup__virtual-slider';

    const input = document.createElement('input');
    input.id = 'popup__virtual-radio';
    input.setAttribute('form', formID);
    input.className = 'popup__virtual-radio';
    input.type = 'checkbox';
    input.checked = true;

    box.appendChild(input);
    box.appendChild(text);

    block.appendChild(box);

    return block;
  }

  _createLossCheckBox(formID) {
    const block = document.createElement('div');
    block.className = 'popup__loss-location';

    let text = document.createElement('span');
    text.className = 'popup__label';
    text.textContent = 'Локация для утерь';

    block.appendChild(text);

    const box = document.createElement('label');
    box.className = 'popup__loss-box';
    box.htmlFor = 'popup__location-loss';

    text = document.createElement('span');
    text.className = 'popup__loss-slider';

    const input = document.createElement('input');
    input.id = 'popup__location-loss';
    input.setAttribute('from', formID);
    input.className = 'popup__location-loss';
    input.type = 'checkbox';
    input.checked = true;

    box.appendChild(input);
    box.appendChild(text);

    block.appendChild(box);

    return block;
  }

  _clickDenyHandler(event) {
    event.stopPropagation();
    this.showPopUp();
  }

  _clickAroundForClose({ target }) {
    if(target.className === 'popup__wrapper') this.showPopUp();
  }

}

class Settings {
  constructor(tableSettings) {
    this.tableSettings = tableSettings;
    this.settings = this._createSettings();
  }

  showSettings() {
    const container = document.querySelector('.main__block');

    if (container.children.length !== 0) {
      container.children[0].remove();
    }

    container.appendChild(this.settings);

    const footerSettings = new FooterButton();

    footerSettings.showFooterButtons();
  }

  _createSettings() {
    const wrapper = document.createElement('div');
    wrapper.className = 'main__block-settings';

    const title = document.createElement('h2');
    title.className = 'main__route';
    title.textContent = 'Настройки / Локации';

    wrapper.appendChild(title);

    const btnBlock = this._createButtonBlock();

    wrapper.appendChild(btnBlock);

    const tableClass = new SettingsTable(this.tableSettings);

    wrapper.appendChild(tableClass.getTable());
    return wrapper;
  }

  _createButtonBlock() {
    const btnNames = [
      {
        name: 'Имущество',
        className: 'main__btn-things'
      },
      {
        name: 'Инвентаризация',
        className: 'main__btn-inventory'
      },
      {
        name: 'Сотрудники',
        className: 'main__btn-workers'
      },
      {
        name: 'Локации',
        className: 'main__btn-locations'
      },
      {
        name: 'Уведомления',
        className: 'main__btn-notifications'
      },
      {
        name: 'Справочники',
        className: 'main__btn-handbooks'
      },
      {
        name: 'Пользователь',
        className: 'main__btn-user'
      },
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'main__settings-buttons';

    btnNames.forEach(btn => {
      const button = document.createElement('button');
      button.className = btn.className;

      const text = document.createElement('span');
      text.className = 'main__buttons-text';
      text.textContent = btn.name;

      button.appendChild(text);
      wrapper.appendChild(button);
    })

    return wrapper;
  }
}

class SettingsTable {
  constructor(data) {
    this.data = data;
    this.colClasses = [
      'main__col-names',
      'main__col-description',
      'main__col-sort',
      'main__id',
      'main__type',
      'main__col-intable',
      'main__col-required',
      'main__col-deleted'
    ];
    this.table = this._createTable();
  }

  getTable() {
    return this.table;
  }

  _createTable() {
    const wrapper = document.createElement('div');
    wrapper.className = 'main__settings';

    const title = document.createElement('h2');
    title.className = 'main__settings-title';
    title.textContent = 'Настройка полей таблицы';

    wrapper.appendChild(title);

    const tableContainer = document.createElement('div');
    tableContainer.className = 'main__table-content';

    const headers = this._createTableHeader();

    headers.forEach(header => tableContainer.appendChild(header));

    this.data.fields.forEach(item => {
      const recordSetting = new SettingRecord(item, this.colClasses);
      const recordsElems = recordSetting.getRecords();

      recordsElems.forEach(elem => tableContainer.appendChild(elem));
    });

    wrapper.appendChild(tableContainer);

    const button = document.createElement('button');
    button.className = 'main__table-add';

    const img = document.createElement('img');
    img.className = 'main__table-add-icon';
    img.alt = '';
    img.src = './assets/svg/add.svg';

    button.appendChild(img);

    const text = document.createElement('span');
    text.className = 'main__table-add-text';
    text.textContent = 'Добавить поле';

    button.appendChild(text);

    wrapper.appendChild(button);

    return wrapper;
  }

  _createTableHeader() {
    const titles = [
      '',
      'Описание',
      'Сортировка',
      'ID',
      'Тип поля',
      'Выводить в таблицу',
      'Обязательно',
      'Удалить'
    ];

    return titles.map((title, index) => {
      const elem = document.createElement('div');
      elem.className = this.colClasses[index];

      if (title) {
        const text = document.createElement('span');
        text.className = 'main__table-header';
        text.textContent = title;
        elem.appendChild(text);
      }

      return elem;
    })
  }

}

class SettingRecord {
  constructor(record, classNames) {
    this.classNames = classNames;
    this.record = this._createRecord(record);
  }

  getRecords() {
    return this.record;
  }

  _createRecord(record) {
    // {
    //   name: 'Название',
    //   description: true,
    //   count: 500,
    //   id: 1001,
    //   type: {
    //     name: 'Строка',
    //     icon: false
    //   },
    //   inTable: true,
    //   required: true,
    //   deleted: false
    // }

    const recordArr = [];

    recordArr.push(this._createNameCol(record.name));
    recordArr.push(this._createDescriptionCol(record.description));
    recordArr.push(this._createSortCol(record.count));
    recordArr.push(this._createIDCol(record.id));
    recordArr.push(this._createTypeCol(record.type));
    recordArr.push(this._createInTableCol(record.inTable));
    recordArr.push(this._createRequiredCol(record.required));
    recordArr.push(this._createDeletedCol(record.deleted));

    return recordArr;
  }

  _createNameCol(name) {
    const wrapper = document.createElement('div');
    wrapper.className = this.classNames[0];

    let img = document.createElement('img');
    img.className = 'main__name-dots';
    img.alt = '';
    img.src = './assets/svg/dots.svg';

    wrapper.appendChild(img);

    const text = document.createElement('span');
    text.className = 'main__name-text';
    text.textContent = name;

    wrapper.appendChild(text);

    img = document.createElement('img');
    img.className = 'main__name-pencil';
    img.alt = '';
    img.src = './assets/svg/pencil.svg';

    wrapper.appendChild(img);

    return wrapper;
  }

  _createDescriptionCol(desription) {
    const wrapper = document.createElement('div');
    wrapper.className = this.classNames[1];

    if (desription) {
      const img = document.createElement('img');
      img.className = 'main__description-table';
      img.alt = '';
      img.src = './assets/svg/help.svg';

      wrapper.appendChild(img);
    }

    return wrapper;
  }

  _createSortCol(number) {
    const wrapper = document.createElement('div');
    wrapper.className = this.classNames[2];

    const text = document.createElement('span');
    text.className = 'main__sort-text';
    text.textContent = number;

    wrapper.appendChild(text);

    return wrapper;
  }

  _createIDCol(id) {
    const wrapper = document.createElement('div');
    wrapper.className = this.classNames[3];

    const text = document.createElement('span');
    text.className = 'main__id-text';
    text.textContent = id;

    wrapper.appendChild(text);

    return wrapper;
  }

  _createTypeCol(type) {
    const wrapper = document.createElement('div');
    wrapper.className = this.classNames[4];

    const text = document.createElement('span');
    text.className = 'main__type-text';
    text.textContent = type.name;

    wrapper.appendChild(text);

    if (type.icon) {
      const img = document.createElement('img');
      img.className = 'main__type-icon';
      img.alt = '';
      img.src = './assets/svg/file.svg';

      wrapper.appendChild(img);
    }

    return wrapper;
  }

  _createInTableCol(inTable) {
    const wrapper = document.createElement('div');
    wrapper.className = this.classNames[5];

    if(inTable) {

      const box = document.createElement('div');
      box.className = 'main__intable-box';

      const input = document.createElement('input');
      input.className = 'main__intable-checkbox';
      input.type = 'checkbox';
      input.checked = true;

      box.appendChild(input);
      wrapper.appendChild(box);
    }

    return wrapper;
  }

  _createRequiredCol(required) {
    const wrapper = document.createElement('div');
    wrapper.className = this.classNames[6];

    if(required) {
      const box = document.createElement('div');
      box.className = 'main__required-box';

      const input = document.createElement('input');
      input.className = 'main__required-checkbox';
      input.type = 'checkbox';
      input.checked = true;

      box.appendChild(input);
      wrapper.appendChild(box);
    }

    return wrapper;
  }

  _createDeletedCol(isDeleted) {
    const wrapper = document.createElement('div');
    wrapper.className = this.classNames[7];

    if(isDeleted) {
      const box = document.createElement('div');
      box.className = 'main__deleted-box';

      const input = document.createElement('input');
      input.className = 'main__deleted-checkbox';
      input.type = 'checkbox';
      input.checked = true;

      box.appendChild(input);
      wrapper.appendChild(box);
    }

    return wrapper;
  }
}

class FooterButton {
  constructor() {
    this.buttons = this._createButtons();
  }

  showFooterButtons() {
    const footer = document.querySelector('.footer');
    footer.querySelector('.footer__information').remove();
    footer.querySelector('.footer__documentation').before(this.buttons);
  }

  _createButtons() {
    const wrapper = document.createElement('div');
    wrapper.className = 'footer__settings-block';

    let button = document.createElement('button');
    button.className = 'footer__btn-save';

    const img = document.createElement('img');
    img.className = 'footer__save-img';
    img.alt = '';
    img.src = './assets/svg/save.svg';

    button.appendChild(img);

    let text = document.createElement('span');
    text.className = 'footer__save-text';
    text.textContent = 'Сохранить';

    button.appendChild(text);

    wrapper.appendChild(button);

    button = document.createElement('button');
    button.className = 'footer__deny';

    text = document.createElement('span');
    text.className = 'footer__deny-text';
    text.textContent = 'Отменить';

    button.appendChild(text);
    wrapper.appendChild(button);

    return wrapper;
  }
}

const state = new StateApp();