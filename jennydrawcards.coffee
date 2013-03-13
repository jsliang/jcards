serialNumber = 0
gridSize = 10
cardWidth = 100
cardHeight = 171

cardName = [
    '愚人' # 0
    '魔術師' # 1
    '女祭司' # 2
    '皇后' # 3
    '皇帝' # 4
    '教宗' # 5
    '戀人' # 6
    '戰車' # 7
    '力量' # 8
    '隱士' # 9
    '命運之輪' #10
    '正義' #11
    '吊人' #12
    '死神' #13
    '節制' #14
    '惡魔' #15
    '塔' #16
    '星星' #17
    '月亮' #18
    '太陽' #19
    '審判' #20
    '世界' #21
    '杖一' #22
    '杖二' #23
    '杖三' #24
    '杖四' #25
    '杖五' #26
    '杖六' #27
    '杖七' #28
    '杖八' #29
    '杖九' #30
    '杖十' #31
    '杖侍' #32
    '杖騎' #33
    '杖后' #34
    '杖王' #35
    '杯一' #36
    '杯二' #37
    '杯三' #38
    '杯四' #39
    '杯五' #40
    '杯六' #41
    '杯七' #42
    '杯八' #43
    '杯九' #44
    '杯十' #45
    '杯侍' #46
    '杯騎' #47
    '杯后' #48
    '杯王' #49
    '劍一' #50
    '劍二' #51
    '劍三' #52
    '劍四' #53
    '劍五' #54
    '劍六' #55
    '劍七' #56
    '劍八' #57
    '劍九' #58
    '劍十' #59
    '劍侍' #60
    '劍騎' #61
    '劍后' #62
    '劍王' #63
    '幣一' #64
    '幣二' #65
    '幣三' #66
    '幣四' #67
    '幣五' #68
    '幣六' #69
    '幣七' #70
    '幣八' #71
    '幣九' #72
    '幣十' #73
    '幣侍' #74
    '幣騎' #75
    '幣后' #76
    '幣王' #77
]

# Reference jQuery
$ = jQuery

$(document).ready ()->
    $('input, select')
        .focus ()->
            $(this).addClass('ui-state-hover')
        .blur ()->
            $(this).removeClass('ui-state-hover')

    $('#cardProto')
        .data('card', 0)
        .data('reversed', 0)
        .hide()

    $('#cardPosition')
        .hide()

    $('#dialogTurnCardsResult').dialog
        bgiframe: true,
        autoOpen: false,
        width: 600,
        buttons:
            Ok: ()->
                $(this).dialog('close')

    $('#dialogRedrawCards').dialog
        bgiframe: true,
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons:
            Cancel: ()->
                $(this).dialog('close')
            Ok: ()->
                $(this).dialog('close')
                $('#shuffle').trigger('click')
                $('#spreadArea')
                    .children('div')
                    .each ()->
                        $(this).has('p') # for turned over cards
                            .children('div:first')
                            .height(cardHeight * 0.45)

                        if $(this).data('cardMeaning')
                            $(this).has('p') # for turned over cards
                                .append('<span>' + $(this)
                                .data('cardMeaning') + '</span>')
                        else
                            $(this).has('p') # for cards not turned over
                                .append('<span></span>')

                        $(this)
                            .removeClass('ui-state-highlight')
                            .css('backgroundImage', '')
                            .data('card', '')
                            .data('reversed', '')
                            .data('name', '')
                            .children('p').remove()

                $('#turnCards').hide()
                $('#redrawCards').hide()

    $('#dialogResetSpreadArea').dialog
        bgiframe: true,
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons:
            Cancel: ()->
                $(this).dialog('close')
            Ok: ()->
                $(this).dialog('close')
                $('#shuffle').trigger('click')
                $('#spreadArea')
                    .children().remove()
                    .data('left', $('#spreadArea').position().left)
                    .data('cardSN', 0)
                    .data('cardMeaningSet', false)
                $('#turnCards').hide()

    # Shuffle
    $('#shuffle').click ()->
        # Clear first
        $("#deck").children().remove()
        $("#dialogResetSpreadArea").dialog('close')

        # Set the range of cards (major, minor, both)
        if $('#mode').attr("value") is 1
            l = 0
            u = 21
        else if $('#mode').attr("value") is 2
            l = 22
            u = 77
        else
            l = 0
            u = 77

        # Shuffle
        cards = new Array()
        for i in [l...u]
            i_temp = i
            cards[i - l] = i_temp

            if i > 0
                swp = Math.floor(Math.random() * (i - l))
                t = cards[swp]
                cards[swp] = i_temp
                cards[i - l] = t

        # Generate cardProtos
        for i in [l...u]
            tmp_card = $("#cardProto").clone(true)
            tmp_card.attr("id", tmp_card.attr("id") + serialNumber)
            serialNumber += 1

            tmp_card.data("card", cards[i - l])
                .draggable({ grid: [gridSize, gridSize] })
                .mouseover ()->
                    $(this).addClass('ui-state-highlight')
                .mouseout ()->
                    $(this).removeClass('ui-state-highlight')
                .css
                    position: 'absolute',
                    left: $("#deck").position().left + (i - l) * gridSize,
                    top: $("#deck").position().top

            if $("#canReverse").attr("value") is "true"
                tmp_card.data("reversed", Math.floor(Math.random() + 0.5))
            else
                tmp_card.data("reversed", 0)

            tmp_card.css('z-index', 80 + i)
            $("#deck").append(tmp_card)
            tmp_card.show("slow")

    # Keep the left property of the last cardPosition
    $("#spreadArea").data("left", $("#spreadArea").position().left)

    # Clear the spreadArea
    $("#spreadArea").data('cardSN', 0)
    $("#spreadArea").data('cardMeaningSet', false)

    $("#resetSpreadArea")
        .click ()->
            $("#dialogTurnCardsResult").dialog('close')
            $("#dialogRedrawCards").dialog('close')
            $("#dialogResetSpreadArea").text('將自動重新洗牌。你確定要刪除牌陣嗎？').dialog('open')
        .hide()

    # Create cardPositions
    $('#addCard').click ()->
        $('#resetSpreadArea').show()

        $('#spreadArea').data('cardSN', $('#spreadArea').data('cardSN') + 1)

        new_card = $('#cardPosition').clone(true)
        new_card.attr("id", new_card.attr("id") + serialNumber)
        new_card.html('<span>位置 ' + $("#spreadArea").data('cardSN') + '</span>')
        new_card.prepend('<div style="height: ' + cardHeight * 0.45 + 'px;"></div>')
        new_card.dblclick ()->
            span = $(this).children('span:first')
            prevValue = span.text()
            strForm = '<input type="text" style="width: ' + new_card.width() * 0.8 + 'px;" /> '
            span.html(strForm)

            span_text = span.children('input:first')
            span_text.attr('value', prevValue)
                .keypress (event)->
                    if event.which is '13' # enter key pressed
                        $container = $(this).parent()
                        $container.text($(this).attr('value'))
                        $container.parent().data('cardMeaning', $(this).attr('value'))
                        $("#spreadArea").data('cardMeaningSet', true)
                .focus()
        serialNumber += 1

        new_card
            .draggable
                grid: [gridSize, gridSize]
            .droppable
                hoverClass: 'ui-state-active',
                accept: '.draggable',

                # When drawn cards are placed into the cardPosition...
                drop: (event, ui)->
                    $("#turnCards").show()
                    $("#redrawCards").show()

                    $(this).addClass('ui-state-highlight')
                        .data('card', ui.draggable.data('card'))
                        .data('reversed', ui.draggable.data('reversed'))
                        .data('name', cardName[$(this).data("card")])

                    if ui.draggable.data('reversed') is 0
                        $(this).data('name', $(this).data('name') + '（正）')
                    else
                        $(this).data('name', $(this).data('name') + '（逆）')

                    ui.draggable.fadeOut('fast')
            .css
                position: 'absolute',
                left: $("#spreadArea").data("left"),
                top: $("#spreadArea").position().top
            .show()

        $("#spreadArea").append(new_card)
        $("#spreadArea").data("left", new_card.position().left + cardWidth + gridSize)

    # Turn over the cards
    $("#turnCards").hide()
    $("#turnCards").click ()->
        cardStr = ''

        $("#spreadArea")
            .children(".droppable")
            .each ()->
                # Set string for results
                if $("#spreadArea").data('cardMeaningSet')
                    if cardStr isnt ''
                        cardStr += '<br />'
                    if not $(this).data('cardMeaning')
                        $(this).data('cardMeaning', $(this).children('span:first').text())
                    cardStr += $(this).data('cardMeaning') + '：' + $(this).data('name')
                else
                    if cardStr isnt ''
                        cardStr += '　'
                    cardStr += $(this).data('name')

                $(this).html('<div style="height: ' + (cardHeight + gridSize * 0.5) + 'px;"></div><p>' + $(this).data('name') + '</p>')

                # Set card image
                url = 'url(cardimg/%cardid%.jpg)'
                if $(this).data("reversed") is 1
                    url = 'url(cardimg/%cardid%r.jpg)'
                if $(this).data("card") < 10
                    url = url.replace('%cardid%', '0' + $(this).data("card"))
                else
                    url = url.replace('%cardid%', $(this).data("card"))

                $(this).css('backgroundImage', url)

        # Open result dialog
        $("#dialogTurnCardsResult")
            .html("<p>可將以下結果複製貼上給解牌者：</p><p>" + cardStr + "</p>")
            .dialog('open')

    # Redraw cards
    $("#redrawCards")
        .click ()->
            $("#dialogTurnCardsResult").dialog('close')
            $("#dialogResetSpreadArea").dialog('close')
            $("#dialogRedrawCards")
                .text('將自動重新洗牌。你確定要重新抽牌嗎？')
                .dialog('open')
        .hide()