(function() {
  var $, cardHeight, cardName, cardWidth, gridSize, serialNumber;

  serialNumber = 0;

  gridSize = 10;

  cardWidth = 100;

  cardHeight = 171;

  cardName = ['愚人', '魔術師', '女祭司', '皇后', '皇帝', '教宗', '戀人', '戰車', '力量', '隱士', '命運之輪', '正義', '吊人', '死神', '節制', '惡魔', '塔', '星星', '月亮', '太陽', '審判', '世界', '杖一', '杖二', '杖三', '杖四', '杖五', '杖六', '杖七', '杖八', '杖九', '杖十', '杖侍', '杖騎', '杖后', '杖王', '杯一', '杯二', '杯三', '杯四', '杯五', '杯六', '杯七', '杯八', '杯九', '杯十', '杯侍', '杯騎', '杯后', '杯王', '劍一', '劍二', '劍三', '劍四', '劍五', '劍六', '劍七', '劍八', '劍九', '劍十', '劍侍', '劍騎', '劍后', '劍王', '幣一', '幣二', '幣三', '幣四', '幣五', '幣六', '幣七', '幣八', '幣九', '幣十', '幣侍', '幣騎', '幣后', '幣王'];

  $ = jQuery;

  $(document).ready(function() {
    var put_card_in_spread;
    $('input, select').focus(function() {
      return $(this).addClass('ui-state-hover');
    }).blur(function() {
      return $(this).removeClass('ui-state-hover');
    });
    $('#cardProto').data('card', 0).data('reversed', 0).hide();
    $('#cardPosition').hide();
    $('#dialogTurnCardsResult').dialog({
      bgiframe: true,
      autoOpen: false,
      width: 600,
      buttons: {
        Ok: function() {
          return $(this).dialog('close');
        }
      }
    });
    $('#dialogRedrawCards').dialog({
      bgiframe: true,
      autoOpen: false,
      resizable: false,
      modal: true,
      buttons: {
        Cancel: function() {
          return $(this).dialog('close');
        },
        Ok: function() {
          $(this).dialog('close');
          $('#shuffle').trigger('click');
          $('#spreadArea').children('div').each(function() {
            $(this).has('p').children('div:first').height(cardHeight * 0.45);
            if ($(this).data('cardMeaning')) {
              $(this).has('p').append('<span>' + $(this).data('cardMeaning') + '</span>');
            } else {
              $(this).has('p').append('<span></span>');
            }
            return $(this).removeClass('ui-state-highlight').css('backgroundImage', '').data('card', '').data('reversed', '').data('name', '').children('p').remove();
          });
          $('#turnCards').hide();
          return $('#redrawCards').hide();
        }
      }
    });
    $('#dialogResetSpreadArea').dialog({
      bgiframe: true,
      autoOpen: false,
      resizable: false,
      modal: true,
      buttons: {
        Cancel: function() {
          return $(this).dialog('close');
        },
        Ok: function() {
          $(this).dialog('close');
          $('#shuffle').trigger('click');
          $('#spreadArea').children().remove().data('left', $('#spreadArea').position().left).data('cardSN', 0).data('cardMeaningSet', false);
          return $('#turnCards').hide();
        }
      }
    });
    put_card_in_spread = function(position, card) {
      var dropped;
      dropped = false;
      $("#spreadArea .droppable").each(function() {
        if ($(this).data('card') != null) {
          if ($(this).data('card') === card.data('card')) {
            return dropped = true;
          }
        }
      });
      if (dropped) {
        return;
      }
      $("#turnCards").show();
      $("#redrawCards").show();
      position.addClass('ui-state-highlight').data('card', card.data('card')).data('reversed', card.data('reversed')).data('name', cardName[position.data("card")]);
      if (card.data('reversed') === 0) {
        position.data('name', position.data('name') + '（正）');
      } else {
        position.data('name', position.data('name') + '（逆）');
      }
      return card.fadeOut('fast');
    };
    $('#shuffle').click(function() {
      var cards, i, i_temp, l, swp, t, tmp_card, u, _i, _j, _results;
      $("#deck").children().remove();
      $("#dialogResetSpreadArea").dialog('close');
      if ($('#mode').attr("value") === "major") {
        l = 0;
        u = 21;
      } else if ($('#mode').attr("value") === "minor") {
        l = 22;
        u = 77;
      } else {
        l = 0;
        u = 77;
      }
      cards = new Array();
      for (i = _i = l; l <= u ? _i < u : _i > u; i = l <= u ? ++_i : --_i) {
        i_temp = i;
        cards[i - l] = i_temp;
        if (i > 0) {
          swp = Math.floor(Math.random() * (i - l));
          t = cards[swp];
          cards[swp] = i_temp;
          cards[i - l] = t;
        }
      }
      _results = [];
      for (i = _j = l; l <= u ? _j < u : _j > u; i = l <= u ? ++_j : --_j) {
        tmp_card = $("#cardProto").clone(true);
        tmp_card.attr("id", tmp_card.attr("id") + serialNumber);
        serialNumber += 1;
        tmp_card.data("card", cards[i - l]).draggable({
          grid: [gridSize, gridSize],
          start: function() {
            return $(this).data("dragged", true);
          },
          stop: function() {
            return $(this).data("dragged", false);
          }
        }).mouseover(function() {
          return $(this).addClass('ui-state-highlight');
        }).mouseout(function() {
          return $(this).removeClass('ui-state-highlight');
        }).mouseup(function() {
          var empty_position;
          if ($(this).data("dragged")) {
            return;
          }
          empty_position = [];
          $("#spreadArea .droppable").each(function() {
            if ($(this).data("card") == null) {
              return empty_position.push($(this));
            }
          });
          return put_card_in_spread(empty_position[0], $(this));
        }).css({
          position: 'absolute',
          left: $("#deck").position().left + (i - l) * gridSize,
          top: $("#deck").position().top
        });
        if ($("#canReverse").attr("value") === "true") {
          tmp_card.data("reversed", Math.floor(Math.random() + 0.5));
        } else {
          tmp_card.data("reversed", 0);
        }
        tmp_card.css('z-index', 80 + i);
        $("#deck").append(tmp_card);
        _results.push(tmp_card.show("slow"));
      }
      return _results;
    });
    $("#spreadArea").data("left", $("#spreadArea").position().left);
    $("#spreadArea").data('cardSN', 0);
    $("#spreadArea").data('cardMeaningSet', false);
    $("#resetSpreadArea").click(function() {
      $("#dialogTurnCardsResult").dialog('close');
      $("#dialogRedrawCards").dialog('close');
      return $("#dialogResetSpreadArea").text('將自動重新洗牌。你確定要刪除牌陣嗎？').dialog('open');
    }).hide();
    $('#addCard').click(function() {
      var new_card;
      $('#resetSpreadArea').show();
      $('#spreadArea').data('cardSN', $('#spreadArea').data('cardSN') + 1);
      new_card = $('#cardPosition').clone(true);
      new_card.attr("id", new_card.attr("id") + serialNumber);
      new_card.html('<span>位置 ' + $("#spreadArea").data('cardSN') + '</span>');
      new_card.prepend('<div style="height: ' + cardHeight * 0.45 + 'px;"></div>');
      new_card.dblclick(function() {
        var prevValue, span, span_text, strForm;
        span = $(this).children('span:first');
        prevValue = span.text();
        strForm = '<input type="text" style="width: ' + new_card.width() * 0.8 + 'px;" /> ';
        span.html(strForm);
        span_text = span.children('input:first');
        return span_text.attr('value', prevValue).keypress(function(event) {
          var $container;
          if (event.which === '13') {
            $container = $(this).parent();
            $container.text($(this).attr('value'));
            $container.parent().data('cardMeaning', $(this).attr('value'));
            return $("#spreadArea").data('cardMeaningSet', true);
          }
        }).focus();
      });
      serialNumber += 1;
      new_card.draggable({
        grid: [gridSize, gridSize]
      }).droppable({
        hoverClass: 'ui-state-active',
        accept: '.draggable',
        drop: function(event, ui) {
          return put_card_in_spread($(this), ui.draggable);
        }
      }).css({
        position: 'absolute',
        left: $("#spreadArea").data("left"),
        top: $("#spreadArea").position().top
      }).show();
      $("#spreadArea").append(new_card);
      return $("#spreadArea").data("left", new_card.position().left + cardWidth + gridSize);
    });
    $("#turnCards").hide();
    $("#turnCards").click(function() {
      var cardStr;
      cardStr = '';
      $("#spreadArea").children(".droppable").each(function() {
        var url;
        if ($("#spreadArea").data('cardMeaningSet')) {
          if (cardStr !== '') {
            cardStr += '<br />';
          }
          if (!$(this).data('cardMeaning')) {
            $(this).data('cardMeaning', $(this).children('span:first').text());
          }
          cardStr += $(this).data('cardMeaning') + '：' + $(this).data('name');
        } else {
          if (cardStr !== '') {
            cardStr += '　';
          }
          cardStr += $(this).data('name');
        }
        $(this).html('<div style="height: ' + (cardHeight + gridSize * 0.5) + 'px;"></div><p>' + $(this).data('name') + '</p>');
        url = 'url(cardimg/%cardid%.jpg)';
        if ($(this).data("reversed") === 1) {
          url = 'url(cardimg/%cardid%r.jpg)';
        }
        if ($(this).data("card") < 10) {
          url = url.replace('%cardid%', '0' + $(this).data("card"));
        } else {
          url = url.replace('%cardid%', $(this).data("card"));
        }
        return $(this).css('backgroundImage', url);
      });
      return $("#dialogTurnCardsResult").html("<p>可將以下結果複製貼上給解牌者：</p><p>" + cardStr + "</p>").dialog('open');
    });
    $("#redrawCards").click(function() {
      $("#dialogTurnCardsResult").dialog('close');
      $("#dialogResetSpreadArea").dialog('close');
      return $("#dialogRedrawCards").text('將自動重新洗牌。你確定要重新抽牌嗎？').dialog('open');
    }).hide();
    return $(window).load(function() {
      var i, _i, _results;
      _results = [];
      for (i = _i = 1; _i <= 5; i = ++_i) {
        _results.push($('#addCard').trigger('click'));
      }
      return _results;
    });
  });

}).call(this);

// Generated by CoffeeScript 1.5.0-pre
