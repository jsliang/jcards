from jcards.models import CardPosition, Spread, User
from django.contrib import admin

class CardPositionAdmin(admin.ModelAdmin):
    list_display = (
        'meaning',
        'spread_name',
        'sn',
        'left',
        'top'
        )

    fieldsets = [
            (None,          {'fields': ['spread','meaning','sn']}),
            ('Coordinate',  {'fields': ['left', 'top']})
        ]

class CardPositionInline(admin.TabularInline):
    model = CardPosition
    extra = 5
    fieldsets = CardPositionAdmin.fieldsets

class SpreadAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'creator_fb_id',
        'usage_count',
        'created_time',
        'updated_time'
        )
    inlines = [CardPositionInline]

class UserAdmin(admin.ModelAdmin):
    list_display = ['fb_id']

admin.site.register(CardPosition, CardPositionAdmin)
admin.site.register(Spread, SpreadAdmin)
admin.site.register(User, UserAdmin)
