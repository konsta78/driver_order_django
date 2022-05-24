////////////////////////////////////
// Блок с фрагментами HTML-кода 
////////////////////////////////////

// Блок html-кода: 'Контактное лицо' - 'Не сотрудник ГК'
let notEmployee = '<div id="div_contact">\
                    <table class="contact">\
                        <tr>\
                            <td>Фамилия: </td>\
                            <td><input type="text" name="not_emp_family" id="not_emp_family" required></td>\
                        </tr>\
                        <tr>\
                            <td>Имя: </td>\
                            <td><input type="text" name="not_emp_name" id="not_emp_name" required></td>\
                        </tr>\
                        <tr>\
                            <td>Отчество: </td>\
                            <td><input type="text" name="not_emp_patr" id="not_emp_patr"></td>\
                        </tr>\
                        <tr>\
                            <td>Телефон: </td>\
                            <td style="text-align: left">\
                                <input type="tel" name="not_emp_phone" id="not_emp_phone" required>\
                            </td>\
                        </tr>\
                    </table>\
                  </div>';

// Блок html-кода: 'Контактное лицо' - 'Сотрудник ГК' 
let isEmployee = '<div id="div_contact">\
                    <table class="contact">\
                      <tr>\
                          <td>ФИО: </td>\
                          <td>\
                            <input type="text" name="emp_fio" id="emp_fio" list="emp_fio_hints" required>\
                            <datalist id="emp_fio_hints"></datalist>\
                          </td>\
                      </tr>\
                      <tr>\
                          <td>Телефон: </td>\
                          <td style="text-align: left"><input type="tel" name="emp_phone" id="emp_phone" required></td>\
                      </tr>\
                    </table>\
                  </div>';

// Блок html-кода: 'Характер груза' - 'Документы'
let divDocs = '<input type="checkbox" name="proxy" id="proxy">\
                <label for="proxy"> Доверенность</label><p>\
                <input type="checkbox" onchange="stampCheck()" name="stamp_checkbox" id="stamp_checkbox">\
                <label for="stamp_checkbox"> Печать</label>\
                    <select name="stamp_select" id="stamp_select" disabled="">\
                        <option selected></option>\
                        <option>АБ СПб "Параграфос"</option>\
                        <option>АО "Траст МР"</option>\
                        <option>АО "ТРАФФИК"</option>\
                        <option>ООО "0578 Холдинг"</option>\
                        <option>ООО "АвтоДеллин"</option>\
                        <option>ООО "Альбатрос Лоджистикс"</option>\
                        <option>ООО "АТП-Групп"</option>\
                        <option>ООО "БиАйЭй-Технолоджиз"</option>\
                        <option>ООО "ГетКарго"</option>\
                        <option>ООО "Дейли Экспресс"</option>\
                        <option>ООО "Деловые Линии"</option>\
                        <option>ООО "ДЛ-Видео"</option>\
                        <option>ООО "ДЛ-Контакт"</option>\
                        <option>ООО "ДЛ-Логистические решения"</option>\
                        <option>ООО "ДЛ-Транс"</option>\
                        <option>ООО "ДЛ-Экспедирование"</option>\
                        <option>ООО "ОКН С"</option>\
                        <option>ООО "ОКН"</option>\
                        <option>ООО "Оптима Логистик"</option>\
                        <option>ООО "Параграфос"</option>\
                        <option>ООО "Прокатофф"</option>\
                    </select>';

// Блок html-кода: 'Характер груза' - 'Груз'
let divCargo = '<p>Параметры груза:\
                <div>ДxШxВ:\
                <input type="text" style="width: 35px;" name="cargo_size_d" id="cargo_size_d" value="0">\
                х <input type="text" style="width: 35px;" name="cargo_size_sh" id="cargo_size_sh" value="0">\
                х <input type="text" style="width: 35px;" name="cargo_size_v" id="cargo_size_v" value="0"> м;\
                Объем: <input type="text" style="width: 35px;" name="cargo_volume" id="cargo_volume" value="0"> м3;\
                Вес: <input type="text" style="width: 35px;" name="cargo_weight" id="cargo_weight" value="0"> кг</div>';

// Блок html-кода: 'Характер груза' - 'Пассажир'
let divPassenger = '<table class="contact">\
                        <tr>\
                            <td>ФИО: </td>\
                            <td><input type="text" name="passenger_fio" id="passenger_fio" list="passenger_fio_hints" required>\
                            <datalist id="passenger_fio_hints"></datalist></td>\
                        </tr>\
                        <tr>\
                            <td>Телефон: </td>\
                            <td><input type="tel" name="passenger_phone" id="passenger_phone" required></td>\
                        </tr>\
                    </table>';