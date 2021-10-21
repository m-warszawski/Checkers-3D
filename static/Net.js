console.log("wczytano plik Net.js")

class Net {

    constructor() {        
    }

    //LOGUJ - AJAX
    adduser(x) {
        $.ajax({
            url: "/loguj",
            data: {
                name: x
            },
            type: "POST",
            success: function (user_stat) {

                console.log(user_stat)
                ui.napisy(user_stat, x)

                //Reakcja na odpowiedź serwera
                if (user_stat == "OK1" || user_stat == "OK2" || user_stat == "EXIST") {
                    game.kamery(user_stat)
                    game.piony()
                }
                if (user_stat == "OK1") {
                    var ten = setInterval(czekacz, 5000);

                    function czekacz() {
                        $.ajax({
                            url: "/czekanie",
                            data: {
                            },
                            type: "POST",
                            success: function (sytuacja) {

                                var syt = JSON.parse(sytuacja)
                                console.log(syt)
                                if (syt.lp == 2) {
                                    clearInterval(ten);
                                    ui.gotowe(syt.gr)
                                }

                            },
                            error: function (xhr, status, error) {
                                console.log(xhr);
                            },
                        });
                    }
                }
                
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }



    //RESET - AJAX
    removeuser(y) {
        $.ajax({
            url: "/reset",
            data: {
                name: y
            },
            type: "POST",
            success: function (user_stat) {

                console.log(user_stat)
                ui.napisy(user_stat, y)

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}