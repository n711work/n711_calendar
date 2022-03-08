$(function () {
    $("#wrapper").css("display", "none");
    $('#cal').fullCalendar({
        header: {
            left: 'prevYear nextYear today',
            center: 'prev title next',
            right: 'month agendaWeek agendaDay'
        },
        axisFormat: 'H(:mm)',
        timeFormat: 'H(:mm)',
        buttonText: {
            today: '今日',
            month: '月',
            week: '週',
            day: '日'
        },
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
        // 週タブのallDaySlot非表示
        allDaySlot: false,
        nowIndicator: true,
        editable: true,
        dayClick: function (date) {
            var view = $('#cal').fullCalendar('getView').name;
            open(date, view);
        },
        eventClick: function (item, event, view) {
          console.log(item);
            console.log(item.start._i);
            openEdit(item, view);
        },
        eventRender: function (eventObj, el) {
            var dt = new Date(eventObj.start);
            dt.setHours(dt.getHours() - 9);
            var st = ('0' + dt.getHours()).slice(-2) + ":" + ('0' + dt.getMinutes()).slice(-2);
            dt = new Date(eventObj.end);
            dt.setHours(dt.getHours() - 9);
            var ed = ('0' + dt.getHours()).slice(-2) + ":" + ('0' + dt.getMinutes()).slice(-2);
            $(el).html(`${eventObj.title}<br>${st} - ${ed}<br>${eventObj.description}`);
        },
        events: [
            {
              id:1,
                title: "会議",
                start: "2020-03-01T06:00:00",
                end: "2020-03-01T08:00:00",
                description: "説明です。"
            }
        ]
    });
});
// 登録、削除フラグ
var flag = 0;
var item2;
// スケジュールデータ保持
var _title, _start, _end, _description, _date;
function open(date, view) {
  // 新規作成:0, 更新:1
  flag = 0;
    var dt = new Date(date);
    if (view != "month") {
        dt.setHours(dt.getHours());
        $("#startTime").val(
            ('0' + dt.getHours()).slice(-2)
            + ":" +
            ('0' + dt.getMinutes()).slice(-2));
        dt.setHours(dt.getHours() + 2);
        $("#endTime").val(
            ('0' + dt.getHours()).slice(-2)
            + ":" +
            ('0' + dt.getMinutes()).slice(-2));
    } else {
        $("#startTime").val("--:--");
        $("#endTime").val("--:--");
    }
    $("#time").html(
        ('0' + (dt.getYear() + 1900)).slice(-4) +
        "-" +
        ('0' + (dt.getMonth() + 1)).slice(-2) +
        "-" +
        ('0' + dt.getDate()).slice(-2));
        $("#title").val("");
        $("#description").val("");
    // モーダル表示
    $("#wrapper").css("display", "");
    // タイトルにフォーカスを当てる
    document.getElementById('title').focus();
}

function openEdit(item, view) {
     item2 = item;
    // 新規作成:0, 更新:1
    flag = 1;
    var dt = new Date(item.start._i);
    if (view != "month") {
        dt.setHours(dt.getHours());
        $("#startTime").val(
            ('0' + dt.getHours()).slice(-2)
            + ":" +
            ('0' + dt.getMinutes()).slice(-2));
        dt = new Date(item.end._i);
        $("#endTime").val(
            ('0' + dt.getHours()).slice(-2)
            + ":" +
            ('0' + dt.getMinutes()).slice(-2));
    } else {
        $("#startTime").val("--:--");
        $("#endTime").val("--:--");
    }
    $("#time").html(
        ('0' + (dt.getYear() + 1900)).slice(-4) +
        "-" +
        ('0' + (dt.getMonth() + 1)).slice(-2) +
        "-" +
        ('0' + dt.getDate()).slice(-2));
    $("#title").val(item.title);
    $("#description").val(item.description);
    _title = $("#title").val();
    _description = $("#description").val();
    _start = $("#startTime").val();
    _end = $("#endTime").val();
    _date = $("#time").val();
    // モーダル表示
    $("#wrapper").css("display", "");
    // タイトルにフォーカスを当てる
    document.getElementById('title').focus();
}

function close() {
    $("#wrapper").css("display", "none");
}

function addCalendarEvent() {
    var title = document.getElementById("title").value;
    var start = document.getElementById("startTime");
    var end = document.getElementById("endTime");
    var description = document.getElementById("description").value;

    if (start.value == "") {
        start.value = "00:00";
    }
    if (end.value == "") {
        end.value = "23:59";
    }
    var date = document.getElementById("time").innerHTML;
    if(flag == 1) {
      // イベント削除
      $("#cal").fullCalendar('removeEvents',item2._id);
    }else{
        // イベント登録
 $('#cal').fullCalendar('addEventSource', [{
                    title: title,
                    start: date + " " + start.value + ":00",
                    end: date + " " + end.value + ":00",
                    description: description
        }]);
    }
}
