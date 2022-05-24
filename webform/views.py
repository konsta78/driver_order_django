from django.shortcuts import render, reverse, redirect
from django.views import View
from .models import Order


class IndexView(View):

    def get(self, request):
        return render(request, 'webform/index.html')

    def post(self, request):
        if request.method == 'POST':
            new_order_data = {}
            new_order_data["order_date"] = request.POST.get('order_date')
            new_order_data["order_time_start"] = request.POST.get('order_time_start')
            new_order_data["order_time_finish"] = request.POST.get('order_time_finish')
            new_order_data["is_employee"] = True if request.POST.get('checkbox_change_contact') == "on" else False
            if new_order_data["is_employee"]:
                new_order_data["contact_person"] = request.POST.get('emp_fio')
                new_order_data["contact_phone"] = request.POST.get('emp_phone')
            else:
                new_order_data["contact_person"] = f"{request.POST.get('not_emp_family')} " \
                                                     f"{request.POST.get('not_emp_name')} " \
                                                     f"{request.POST.get('not_emp_patr')}"
                new_order_data["contact_phone"] = request.POST.get('not_emp_phone')
            new_order_data["address_point_A"] = request.POST.get('address_A')
            new_order_data["address_point_B"] = request.POST.get('address_B')
            new_order_data["pos_xA"] = request.POST.get('pos_xA')
            new_order_data["pos_yA"] = request.POST.get('pos_yA')
            new_order_data["pos_xB"] = request.POST.get('pos_xB')
            new_order_data["pos_yB"] = request.POST.get('pos_yB')
            new_order_data["comments"] = request.POST.get('comments')
            new_order_data["cargo_type"] = request.POST.get('cargo_type')
            if new_order_data["cargo_type"] == "passenger":
                new_order_data["passenger_name"] = request.POST.get('passenger_fio')
                new_order_data["passenger_phone"] = request.POST.get('passenger_phone')
            else:
                new_order_data["power_attorney"] = True if request.POST.get('proxy') == "on" else False
                new_order_data["stamp"] = True if request.POST.get('stamp_checkbox') == "on" else False
                new_order_data["stamp_company"] = request.POST.get('stamp_select')
                if new_order_data["cargo_type"] == "cargo":
                    new_order_data["cargo_size"] = f"{request.POST.get('cargo_size_d')}x" \
                                                     f"{request.POST.get('cargo_size_sh')}x" \
                                                     f"{request.POST.get('cargo_size_v')}"
                    new_order_data["cargo_volume"] = request.POST.get('cargo_volume')
                    new_order_data["cargo_weight"] = request.POST.get('cargo_weight')


            fields = [f.name for f in Order._meta.get_fields()]
            del fields[0], fields[-1] # поменять на 'id' и 'order_record_date'
            for f in fields:
                if f not in new_order_data:
                    new_order_data[f] = None

            new = Order(order_date = new_order_data['order_date'],
                        order_time_start = new_order_data['order_time_start'],
                        order_time_finish = new_order_data['order_time_finish'],
                        contact_person = new_order_data['contact_person'],
                        contact_phone = new_order_data['contact_phone'],
                        is_employee = new_order_data['is_employee'],
                        address_point_A = new_order_data['address_point_A'],
                        address_point_B = new_order_data['address_point_B'],
                        pos_xA = new_order_data['pos_xA'],
                        pos_yA = new_order_data['pos_yA'],
                        pos_xB = new_order_data['pos_xB'],
                        pos_yB = new_order_data['pos_yB'],
                        comments = new_order_data['comments'],
                        cargo_type = new_order_data['cargo_type'],
                        power_attorney = new_order_data['power_attorney'],
                        stamp = new_order_data['stamp'],
                        stamp_company = new_order_data['stamp_company'],
                        cargo_size = new_order_data['cargo_size'],
                        cargo_volume = new_order_data['cargo_volume'],
                        cargo_weight = new_order_data['cargo_weight'],
                        passenger_name = new_order_data['passenger_name'],
                        passenger_phone = new_order_data['passenger_phone'],
                        )

            new.save()

            r = Order.objects.create(defaults=new_order_data)
            print(r.pk)
            return render(request, 'webform/success.html')