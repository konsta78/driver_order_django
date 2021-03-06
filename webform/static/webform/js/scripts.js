'use strict'

// установка маски для ввода номера телефона
function setMask(name, tmp, plh = "_") {
    $(function () {
        $(name).mask(tmp, {
            placeholder: plh
        });
    });
}

// создание списка <option> с сотрудниками ГК (подсказки при выборе контактного лица)
function addOptionsInDatalist() {
    let employeesDatalist = [];
    for (let emp in employees) {
        employeesDatalist += "<option>" + employees[emp] + "</option>";
    }
    return employeesDatalist;
}

// вставка в datalist (с id = dataListTag) списка c <option>
function insertDataList(dataListTag) {
    let inputWithDataList = document.querySelector(dataListTag);
    if (inputWithDataList) {
        inputWithDataList.insertAdjacentHTML('beforeend', addOptionsInDatalist());
    }
}

// переключение блоков "Сотрудник ГК" / "Не сотрудник ГК"
function toogleContact() {
    let currentContactDiv = document.querySelector('#div_contact'),
        checked = document.querySelector('#checkbox_change_contact').checked,
        newContactDiv = document.createElement('div');        

    if (!checked) {
            newContactDiv.innerHTML = notEmployee;
            setMask("#not_emp_phone", "+7 (999) 999-9999");
        } else {
            newContactDiv.innerHTML = isEmployee;
            setMask("#emp_phone", "+7 (999) 999-9999");
        }

    currentContactDiv.replaceWith(newContactDiv);
    insertDataList('#emp_fio_hints');
}

// варианты html-кода для разных типов груза
const divsDict = {
    'docs': divDocs,
    'cargo': divDocs + divCargo,
    'passenger': divPassenger,
};


// переключение блоков в html-коде в зависимости от типа груза
function chooseRadioCargo() {
    let radio_checked = document.querySelector('[type="radio"]:checked'),
        currentCargoDiv = document.querySelector('#div_type_order'),
        newCargoDiv = document.createElement('div');
    
    newCargoDiv.innerHTML = `<div id="div_type_order">${divsDict[radio_checked.value]}</div>`;
    currentCargoDiv.replaceWith(newCargoDiv);

    if (radio_checked.value == 'cargo') {
        setMask("#cargo_size_d", "v?vvv", "");
        setMask("#cargo_size_sh", "v?vvv", "");
        setMask("#cargo_size_v", "v?vvv", "");
        setMask("#cargo_volume", "v?vvv", "");
        setMask("#cargo_weight", "v?vv", "");
        return
    }
    if (radio_checked.value == 'passenger') {
        insertDataList('#passenger_fio_hints');
        setMask("#passenger_phone", "+7 (999) 999-9999");
    }
}

// установка/снятие блокировки выбора наименования компании в зависимости от наличия/отсутствия печати
function stampCheck() {
    let stamp = document.querySelector('#stamp_checkbox'),
        stampSelect = document.querySelector("#stamp_select");
        
    (stamp.checked) ? stampSelect.removeAttribute("disabled"):
        stampSelect.setAttribute("disabled", "disabled");
}

// Проверка данных из формы перед отправкой нового заказа
// Сохранение типа груза в шаблоне страницы
function checkFormData(event) {

    event.preventDefault();

    if (!markerA || !markerB) {
        alert('Необходимо установить маркеры на карте');
        return;
    }

    let cargo_checked = document.querySelector('[type="radio"]:checked');
    document.querySelector('#cargo_type').setAttribute('value', cargo_checked.value);

    if (cargo_checked.value == 'cargo' && 
        document.querySelector('#stamp_checkbox').checked && 
        document.querySelector('#stamp_select').value == "") {
        alert('При наличии печати необходимо указать наименование органзации');
        return;
    }
   
    this.submit();
}

// назначение объектам формы обработчиков событий
function setAllListeners() {
    document.querySelector('[data-point_A]').addEventListener('click', toogleMarker);
    document.querySelector('[data-point_B]').addEventListener('click', toogleMarker);
    document.querySelector('#delMarkerA').addEventListener('click', deleteMarker);
    document.querySelector('#delMarkerB').addEventListener('click', deleteMarker);
    formSubmit.addEventListener('submit', checkFormData);
   }

// настройка начальных параметров при загрузке формы
toogleContact();
chooseRadioCargo();
setAllListeners();
document.querySelector('#order_date').setAttribute("min", (new Date()).toISOString().split('T')[0]); // блокировка дат до текущей
