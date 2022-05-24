from django.db import models

# варианты типа груза
CARGO_TYPE = {
    ('docs', 'Документы'),
    ('cargo', 'Груз'),
    ('passenger', 'Пассажир'),
}

# перечень компаний с печатью
STAMP_COMPANY = {
    ('Company_1', 'АБ СПб "Параграфос"'),
    ('Company_2', 'АО "Траст МР"'),
    ('Company_3', 'АО "ТРАФФИК"'),
    ('Company_4', 'ООО "0578 Холдинг"'),
    ('Company_5', 'ООО "АвтоДеллин"'),
    ('Company_6', 'ООО "Альбатрос Лоджистикс"'),
    ('Company_7', 'ООО "АТП-Групп"'),
    ('Company_8', 'ООО "БиАйЭй-Технолоджиз"'),
    ('Company_9', 'ООО "ГетКарго"'),
    ('Company_10', 'ООО "Дейли Экспресс"'),
    ('Company_11', 'ООО "Деловые Линии"'),
    ('Company_12', 'ООО "ДЛ-Видео"'),
    ('Company_13', 'ООО "ДЛ-Контакт"'),
    ('Company_14', 'ООО "ДЛ-Логистические решения"'),
    ('Company_15', 'ООО "ДЛ-Транс"'),
    ('Company_16', 'ООО "ДЛ-Экспедирование"'),
    ('Company_17', 'ООО "ОКН С"'),
    ('Company_18', 'ООО "ОКН"'),
    ('Company_19', 'ООО "Оптима Логистик"'),
    ('Company_20', 'ООО "Параграфос"'),
    ('Company_21', 'ООО "Прокатофф"'),
}

class Order(models.Model):
    """Класс, описывающий новый заказ"""
    order_date = models.DateField(verbose_name="Дата выполнения заказа")
    order_time_start = models.TimeField(verbose_name="Время подачи автомобиля")
    order_time_finish = models.TimeField(verbose_name="Время окончания выполнения заказа")
    contact_person = models.CharField(max_length=128, verbose_name="Контактное лицо")
    contact_phone = models.CharField(max_length=32, verbose_name="Телефон контактного лица")
    is_employee = models.BooleanField(verbose_name="Является сотрудником ГК 'Деловые линиии'")
    address_point_A = models.CharField(max_length=255, verbose_name="Адрес пункта отправления")
    address_point_B = models.CharField(max_length=255, verbose_name="Адрес пункта прибытия")
    pos_xA = models.FloatField(verbose_name="Координата 'Х' пункта отправления")
    pos_yA = models.FloatField(verbose_name="Координата 'Y' пункта отправления")
    pos_xB = models.FloatField(verbose_name="Координата 'Х' пункта прибытия")
    pos_yB = models.FloatField(verbose_name="Координата 'Y' пункта прибытия")
    comments = models.TextField(max_length=1024, verbose_name="Комментарии к заказу", null=True, blank=True)
    cargo_type = models.CharField(max_length=16, choices=CARGO_TYPE, verbose_name="Тип груза", default='docs')
    power_attorney = models.BooleanField(verbose_name="Наличие доверенности", default=False)
    stamp = models.BooleanField(verbose_name="Наличие печати", default=False)
    stamp_company = models.CharField(max_length=64, choices=STAMP_COMPANY, verbose_name="Печать компании",
                                     null=True, blank=True)
    cargo_size = models.CharField(max_length=32, verbose_name="Габариты груза", null=True, blank=True)
    cargo_volume = models.CharField(max_length=8, verbose_name="Объем груза", null=True, blank=True, default=0.0)
    cargo_weight = models.CharField(max_length=8, verbose_name="Вес груза", null=True, blank=True, default=0.0)
    passenger_name = models.CharField(max_length=128, verbose_name="ФИО пассажира", null=True, blank=True)
    passenger_phone = models.CharField(max_length=32, verbose_name="Телефон пассажира", null=True, blank=True)
    order_record_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата оформления заказа")

    # def __str__(self):
    #     return self.order_record_date

    class Meta:
        verbose_name_plural = "Заказы"
        verbose_name = "Заказ"
        ordering = ['-order_record_date', 'contact_person']
        db_table = "orders"


# class Employee(models.Model):
#     name = models.CharField(max_length=128, verbose_name="ФИО")
#     phone = models.CharField(max_length=32, verbose_name="Мобильный телефон")
#     email = models.EmailField(max_length=64, verbose_name="Электронная почта")
#
#     def __str__(self):
#         return self.name
#
#     class Meta:
#         verbose_name_plural = "Сотрудники ГК 'Деловые линии'"
#         verbose_name = "Сотрудник ГК 'Деловые линии'"
#         ordering = ['name']
#         db_table = "employees"
