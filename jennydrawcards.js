var serialNumber = 0;
var gridSize = 10;
var cardWidth = 100;
var cardHeight = 171;

var cardName = new Array();
cardName[ 0] = '愚人';
cardName[ 1] = '魔術師';
cardName[ 2] = '女祭司';
cardName[ 3] = '皇后';
cardName[ 4] = '皇帝';
cardName[ 5] = '教宗';
cardName[ 6] = '戀人';
cardName[ 7] = '戰車';
cardName[ 8] = '力量';
cardName[ 9] = '隱士';
cardName[10] = '命運之輪';
cardName[11] = '正義';
cardName[12] = '吊人';
cardName[13] = '死神';
cardName[14] = '節制';
cardName[15] = '惡魔';
cardName[16] = '塔';
cardName[17] = '星星';
cardName[18] = '月亮';
cardName[19] = '太陽';
cardName[20] = '審判';
cardName[21] = '世界';
cardName[22] = '杖一';
cardName[23] = '杖二';
cardName[24] = '杖三';
cardName[25] = '杖四';
cardName[26] = '杖五';
cardName[27] = '杖六';
cardName[28] = '杖七';
cardName[29] = '杖八';
cardName[30] = '杖九';
cardName[31] = '杖十';
cardName[32] = '杖侍';
cardName[33] = '杖騎';
cardName[34] = '杖后';
cardName[35] = '杖王';
cardName[36] = '杯一';
cardName[37] = '杯二';
cardName[38] = '杯三';
cardName[39] = '杯四';
cardName[40] = '杯五';
cardName[41] = '杯六';
cardName[42] = '杯七';
cardName[43] = '杯八';
cardName[44] = '杯九';
cardName[45] = '杯十';
cardName[46] = '杯侍';
cardName[47] = '杯騎';
cardName[48] = '杯后';
cardName[49] = '杯王';
cardName[50] = '劍一';
cardName[51] = '劍二';
cardName[52] = '劍三';
cardName[53] = '劍四';
cardName[54] = '劍五';
cardName[55] = '劍六';
cardName[56] = '劍七';
cardName[57] = '劍八';
cardName[58] = '劍九';
cardName[59] = '劍十';
cardName[60] = '劍侍';
cardName[61] = '劍騎';
cardName[62] = '劍后';
cardName[63] = '劍王';
cardName[64] = '幣一';
cardName[65] = '幣二';
cardName[66] = '幣三';
cardName[67] = '幣四';
cardName[68] = '幣五';
cardName[69] = '幣六';
cardName[70] = '幣七';
cardName[71] = '幣八';
cardName[72] = '幣九';
cardName[73] = '幣十';
cardName[74] = '幣侍';
cardName[75] = '幣騎';
cardName[76] = '幣后';
cardName[77] = '幣王';

$(document).ready(function() {
    $('input, select').focus(function() { $(this).addClass('ui-state-hover'); })
        .blur( function() { $(this).removeClass('ui-state-hover'); } );
        

    $('#cardProto').data('card', 0).data('reversed', 0).hide();
    $('#cardPosition').hide();
    
    $('#dialogTurnCardsResult').dialog({
        bgiframe: true,
        autoOpen: false,
        width: 600,
        buttons: {
            Ok: function() { $(this).dialog('close'); }
        }
    });

    $('#dialogRedrawCards').dialog({
        bgiframe: true,
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            Cancel: function() { $(this).dialog('close'); },
            Ok: function() {
                    $(this).dialog('close');
                    $('#shuffle').trigger('click');
                    $('#spreadArea').children('div').each(function(){
                        $(this).has('p') // for turned over cards
                            .children('div:first').height(cardHeight * 0.45);
                        
                        if ($(this).data('cardMeaning')) {
                            $(this).has('p') // for turned over cards
                                .append('<span>' + $(this).data('cardMeaning') + '</span>');
                        } else {
                            $(this).has('p') // for cards not turned over
                                .append('<span></span>');
                        }
                        
                        $(this)
                            .removeClass('ui-state-highlight')
                            .css('backgroundImage', '')
                            .data('card', '')
                            .data('reversed', '')
                            .data('name', '')
                            .children('p').remove();
                    });
                    $('#turnCards').hide();
                    $('#redrawCards').hide();
                }
        }
    });

    $('#dialogResetSpreadArea').dialog({
        bgiframe: true,
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            Cancel: function() { $(this).dialog('close'); },
            Ok: function() {
                    $(this).dialog('close');
                    $('#shuffle').trigger('click');
                    $('#spreadArea').children().remove();
                    $('#spreadArea').data('left', $('#spreadArea').position().left);
                    $('#spreadArea').data('cardSN', 0);
                    $('#spreadArea').data('cardMeaningSet', false);
                    $('#turnCards').hide();
                }
        }
    });

    // Shuffle
    $('#shuffle').click(function() {
        // Clear first
        $("#deck").children().remove();
        $("#dialogResetSpreadArea").dialog('close');

        // Set the range of cards (major, minor, both)
        var u, l;
        if ($('#mode').attr("value") == 1) { l = 0; u = 21; }
        else if ($('#mode').attr("value") == 2) { l = 22; u = 77; }
        else { l = 0; u = 77; }

        // Shuffle
        var cards = new Array();
        for (i = l; i <= u; i = i + 1) {
            var i_temp = i;
            cards[i - l] = i_temp;

            if (i > 0) {
                var swp = Math.floor(Math.random() * (i - l));
                var t = cards[swp];
                cards[swp] = i_temp;
                cards[i - l] = t;
            }
        }

        // Generate cardProtos
        for (i = l; i <= u; i = i + 1) {
            $t = $("#cardProto").clone(true);
            $t.attr("id", $t.attr("id") + serialNumber);
            serialNumber += 1;
            
            $t.data("card", cards[i - l])
                .draggable({ grid: [gridSize, gridSize] })
                .mouseover(function() { $(this).addClass('ui-state-highlight'); })
                .mouseout(function() { $(this).removeClass('ui-state-highlight'); })
                .css( {
                    position: 'absolute',
                    left: $("#deck").position().left + (i - l) * gridSize,
                    top: $("#deck").position().top
                });
            if ($("#canReverse").attr("value") == "true") {
                $t.data("reversed", Math.floor(Math.random() + 0.5));
            } else {
                $t.data("reversed", 0);
            }
            $t.css('z-index', 80 + i);
            $("#deck").append($t);
            $t.show("slow");
        }
    });
    
    // Keep the left property of the last cardPosition
    $("#spreadArea").data("left", $("#spreadArea").position().left);

    // Clear the spreadArea
    $("#spreadArea").data('cardSN', 0);
    $("#spreadArea").data('cardMeaningSet', false);
    $("#resetSpreadArea").click(function() {
        $("#dialogTurnCardsResult").dialog('close');
        $("#dialogRedrawCards").dialog('close');
        $("#dialogResetSpreadArea").text('將自動重新洗牌。你確定要刪除牌陣嗎？').dialog('open');
    }).hide();

    // Create cardPositions
    $('#addCard').click(function() {
        $('#resetSpreadArea').show();

        $('#spreadArea').data('cardSN', $('#spreadArea').data('cardSN') + 1);

        $t = $('#cardPosition').clone(true);
        $t.attr("id", $t.attr("id") + serialNumber);
        $t.html('<span>位置 ' + $("#spreadArea").data('cardSN') + '</span>');
        $t.prepend('<div style="height: ' + cardHeight * 0.45 + 'px;"></div>');
        $t.dblclick(function() {
            $span = $(this).children('span:first');
            prevValue = $span.text();
            var strForm = '<input type="text" style="width: ' + $t.width() * 0.8 + 'px;" /> '
            $span.html(strForm);

            $text = $span.children('input:first');
            $text.attr('value', prevValue)
                .keypress(function(event) {
                if (event.which == '13') { // enter key pressed
                    $container = $(this).parent();
                    $container.text($(this).attr('value'));
                    $container.parent().data('cardMeaning', $(this).attr('value'));
                    $("#spreadArea").data('cardMeaningSet', true);
                }
            }).focus();
        });
        serialNumber += 1;

        $t.draggable({ grid: [gridSize, gridSize] })
            .droppable({
                hoverClass: 'ui-state-active',
                
                // When drawn cards are placed into the cardPosition...
                drop: function(event, ui) {
                    $("#turnCards").show();
                    $("#redrawCards").show();
                    
                    $(this).addClass('ui-state-highlight')
                        .data('card', ui.draggable.data('card'))
                        .data('reversed', ui.draggable.data('reversed'))
                        .data('name', cardName[$(this).data("card")]);

                    if (ui.draggable.data('reversed') == 0) {
                        $(this).data('name', $(this).data('name') + '（正）');
                    } else {
                        $(this).data('name', $(this).data('name') + '（逆）');
                    }
                    ui.draggable.fadeOut('fast');
                },
                accept: '.draggable'
            }).css({
                position: 'absolute',
                left: $("#spreadArea").data("left"),
                top: $("#spreadArea").position().top
            });
        $t.show();
        
        $("#spreadArea").append($t);
        $("#spreadArea").data("left", $t.position().left + cardWidth + gridSize);
    });

    // Turn over the cards
    $("#turnCards").hide();
    $("#turnCards").click(function() {
        var cardStr = '';

        $("#spreadArea").children(".droppable").each(function() {
            // Set string for results
            if ($("#spreadArea").data('cardMeaningSet')) {
                if (cardStr != '') { cardStr += '<br />';}
                if (!$(this).data('cardMeaning')) {
                    $(this).data('cardMeaning', $(this).children('span:first').text());
                }
                cardStr += $(this).data('cardMeaning') + '：' + $(this).data('name');
            } else {
                if (cardStr != '') { cardStr += '　';} 
                cardStr += $(this).data('name');
            }
            $(this).html('<div style="height: ' + (cardHeight + gridSize * 0.5) + 'px;"></div><p>' + $(this).data('name') + '</p>');

            // Set card image
            var url = 'url(cardimg/%cardid%.jpg)';
            if ($(this).data("reversed") == 1) {
                url = 'url(cardimg/%cardid%r.jpg)';
            }
            if ($(this).data("card") < 10) { url = url.replace('%cardid%', '0' + $(this).data("card")); }
            else { url = url.replace('%cardid%', $(this).data("card")); }
            $(this).css('backgroundImage', url);
        });

        // Open result dialog
        $("#dialogTurnCardsResult").html("<p>可將以下結果複製貼上給解牌者：</p><p>" + cardStr + "</p>").dialog('open');
    });

    // Redraw cards
    $("#redrawCards").click(function() {
        $("#dialogTurnCardsResult").dialog('close');
        $("#dialogResetSpreadArea").dialog('close');
        $("#dialogRedrawCards").text('將自動重新洗牌。你確定要重新抽牌嗎？').dialog('open');
    }).hide();
});
