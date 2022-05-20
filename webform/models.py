from django.db import models


CARGO_TYPE = {
    ('docs', 'Документы'),
    ('cargo', 'Груз'),
    ('passenger', 'Пассажир'),
}

STAMP_COMPANY = {
    ('Company_1', 'Компания Раз'),
    ('Company_2', 'Компания Два'),
}

class Order(models.Model):
    order_id = models.IntegerField(primary_key=True)
    order_date = models.DateField(verbose_name="Дата заказа")
    start_time = models.TimeField(verbose_name="Время подачи автомобиля")
    end_time = models.TimeField(verbose_name="Время окончания выполнения заказа")
    contact_person = models.CharField(max_length=128, verbose_name="Контактное лицо")
    contact_phone = models.CharField(max_length=32, verbose_name="Телефон контактного лица")
    is_employee = models.BooleanField(verbose_name="Является сотрудником ГК 'Деловые линиии'")
    address_point_A = models.CharField(max_length=255, verbose_name="Адрес пункта отправления")
    address_point_B = models.CharField(max_length=255, verbose_name="Адрес пункта прибытия")
    pos_x_A = models.FloatField(verbose_name="Координата 'Х' пункта отправления")
    pos_x_B = models.FloatField(verbose_name="Координата 'Х' пункта прибытия")
    pos_y_A = models.FloatField(verbose_name="Координата 'Y' пункта отправления")
    pos_y_B = models.FloatField(verbose_name="Координата 'Y' пункта прибытия")
    comments = models.TextField(max_length=1024, verbose_name="Комментарии к заказу", null=True, blank=True)
    cargo_type = models.CharField(max_length=16, choices=CARGO_TYPE, verbose_name="Тип груза")
    power_attorney = models.BooleanField(verbose_name="Наличие доверенности")
    stamp = models.BooleanField(verbose_name="Наличие печати")
    stamp_company = models.CharField(max_length=64, choices=STAMP_COMPANY, verbose_name="Печать компании",
                                     null=True, blank=True)
    cargo_size = models.CharField(max_length=32, verbose_name="Габариты груза", null=True, blank=True)
    cargo_volume = models.FloatField(verbose_name="Объем груза", null=True, blank=True)
    cargo_weight = models.FloatField(verbose_name="Вес груза", null=True, blank=True)
    passenger_name = models.CharField(max_length=128, verbose_name="ФИО пассажира", null=True, blank=True)
    passenger_phone = models.CharField(max_length=32, verbose_name="Телефон пассажира", null=True, blank=True)
    order_record_date = models.DateField(auto_now_add=True, verbose_name="Дата оформления заказа")

