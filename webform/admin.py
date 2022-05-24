from django.contrib import admin
from .models import Order

class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_record_date', 'contact_person', 'order_date',
                    'order_time_start', 'address_point_A', 'address_point_B')
    list_display_links = ('order_record_date', 'contact_person')
    search_fields = ('order_record_date', 'contact_person', 'cargo_type')


admin.site.register(Order, OrderAdmin)
# admin.site.register(Employee)


