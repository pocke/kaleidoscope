function set2fig(num) {
    // 数値が1桁だったら2桁の文字列にして返す
    var ret;
    if( num < 10 ) { ret = "0" + num; }
    else { ret = num; }
    return ret;
}
function isNumOrZero(num) {
    // 数値でなかったら0にして返す
    if( isNaN(num) ) { return 0; }
    return num;
}
function showCountdown() {
    // 現在日時を数値(1970-01-01 00:00:00からのミリ秒)に変換
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();

    var targetDate = new Date( 2015, 10, 29, 12, 00, 00);
    var dnumTarget = targetDate.getTime();

    // 表示を準備
    var dlYear = targetDate.getFullYear();
    var dlMonth = targetDate.getMonth() + 1;
    var dlDate = targetDate.getDate();
    var dlHour = targetDate.getHours();
    var dlMin = targetDate.getMinutes();
    var dlSec = targetDate.getSeconds();
    var msg1 = "期限の<span>" + dlYear + "/" + dlMonth + "/" + dlDate + " " + set2fig(dlHour) + ":" + set2fig(dlMin) + ":" + set2fig(dlSec);

    // 引き算して日数(ミリ秒)の差を計算
    var diff2Dates = dnumTarget - dnumNow;
    if( dnumTarget < dnumNow ) {
        // 期限が過ぎた場合は -1 を掛けて正の値に変換
        diff2Dates *= -1;
    }

    // 差のミリ秒を、日数・時間・分・秒に分割
    var dDays = diff2Dates / ( 1000 * 60 * 60 * 24 );   // 日数
    diff2Dates = diff2Dates % ( 1000 * 60 * 60 * 24 );
    var dHour = diff2Dates / ( 1000 * 60 * 60 );   // 時間
    diff2Dates = diff2Dates % ( 1000 * 60 * 60 );
    var dMin = diff2Dates / ( 1000 * 60 );   // 分
    diff2Dates = diff2Dates % ( 1000 * 60 );
    var dSec = diff2Dates / 1000;   // 秒

    if(Math.floor(dHour)<10){
        time_hour = "0"+Math.floor(dHour);
    }
    else {
        time_hour = Math.floor(dHour);
    }
    if(Math.floor(dMin)<10){
        time_min = "0" + Math.floor(dMin);
    } else {
        time_min = Math.floor(dMin);
    }
    if(Math.floor(dSec)<10){
        time_sec = "0" + Math.floor(dSec);
    } else {
        time_sec = Math.floor(dSec);
    }
    var msg2 = Math.floor(dDays) + ":" + time_hour + ":" + time_min + ":" + time_sec;

    // 表示文字列の作成



    var msg;
    if( dnumTarget > dnumNow ) {
        // まだ期限が来ていない場合
        msg =  msg2 ;

    }
    else {
        // 期限が過ぎた場合
        msg = "既に" + msg2 + "前に過ぎました。";
    }

    // 作成した文字列を表示
    document.getElementById("RealtimeCountdownArea").innerHTML = msg;
}
// 1秒ごとに実行
setInterval('showCountdown()',1000);
