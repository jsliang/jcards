# -*- coding: utf-8 -*-
import re
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from jcards.models import CardPosition, Spread, User

title = "jCards 塔羅抽牌程式 v0.6.0"
STATIC_URL = 'http://jcards.twbbs.org/templates/'

FACEBOOK_APP_ID = '233445773338059'
FACEBOOK_APP_SCOPE = 'user_about_me'

def index(request):
    return render_to_response('jcards/index.html', {
            'title': title,
            'STATIC_URL': STATIC_URL,
            'FACEBOOK_APP_ID': FACEBOOK_APP_ID,
            'FACEBOOK_APP_SCOPE': FACEBOOK_APP_SCOPE
        })
def jennydrawcards(request):
    return render_to_response('jcards/jennydrawcards.js', {
            'title': title,
            'STATIC_URL': STATIC_URL,
            'FACEBOOK_APP_ID': FACEBOOK_APP_ID,
            'FACEBOOK_APP_SCOPE': FACEBOOK_APP_SCOPE
        })
def save_spread(request):
    request.encoding = "utf-8"

    response = HttpResponse()
    response.encoding = "utf-8"

    creator_fb_id = int(request.GET['creator_fb_id'])  # if not specified in client, creator_fb_id would be 0
    try:
        user = User.objects.get(fb_id = creator_fb_id)
    except:
        user = User(fb_id = creator_fb_id)
        user.save()

    response.write("<p>%s</p>" % request.GET['spread_name'])
    response.write("<p>%s</p>" % request.GET['card_positions'])

    try:
        spread = Spread(
            creator = user,
            name = request.GET['spread_name']
        )
        spread.save()

        regex = re.compile("(?P<meaning>.*)\((?P<left>.*),(?P<top>.*)\)")
        card_positions = request.GET['card_positions'].split(':')
        pos_sn = 0
        for card_position in card_positions:
            r = regex.search(card_position)
            if r:
                pos_sn += 1
                matches = r.groupdict()
                cp = CardPosition(
                        left =      matches['left'],
                        meaning =   matches['meaning'],
                        sn =        pos_sn,
                        spread =    spread,
                        top =       matches['top']
                    )
                cp.save()
            else:
                pass
    except:
        pass

    return response
