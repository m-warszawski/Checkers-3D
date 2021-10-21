console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
        this.clicks()
    }

    //OBSŁUGA BUTTONÓW
    clicks() {

        //loguj
        $("#logowanko").click(function () {
            console.log("===LOGUJ===")
            var x = $("#input").val()    
            net.adduser(x)
        })

        //reset
        $("#resetowanko").click(function () {
            console.log("===RESET===")
            var y = $("#input").val()         
            net.removeuser(y)
        })
    }

    //TEKST NA PASKU
    napisy(user_stat, x) {

        //Pierwszy gracz
        if (user_stat == "OK1") {
            $("#duzy").html("USER_ADDED")
            $("#maly").html("Witaj <span>" + x + "</span>, grasz białymi")
            $("#center").css("display", "none");  
            $("#loader").css("display", "block");
        }

        //Drugi gracz
        else if (user_stat == "OK2") {
            $("#duzy").html("USER_ADDED")
            $("#maly").html("Witaj <span>" + x + "</span>, grasz czarnymi")
            $("#panel").css("display", "none");
            game.piony()
        }

        //Gracz istnieje
        else if (user_stat == "EXIST") {
            $("#duzy").html("USER_EXIST")
            $("#maly").html("Jest już user <span>" + x + "</span>, wybierz inny login")
        }

        //Dwóch graczy
        else if (user_stat == "FULL") {
            $("#duzy").html("TOO_MANY_USERS")
            $("#maly").html("Witaj <span>" + x + "</span>, już jest dwóch graczy")
        }

        //Wyczyszczenie gry
        else if (user_stat == "REMOVED") {
            $("#duzy").html("USERS_CLEARED")
            $("#maly").html("")
        }

        //Brak graczy
        else if (user_stat == "EMPTY") {
            $("#duzy").html("GAME_EMPTY")
            $("#maly").html("")
        }

    }

    //KOMUNIKAT O 2 GRACZU
    gotowe(on) {
        $("#loader").css("display", "none");
        $("#panel").css("display", "none");
        $("#info").html("Dołączył gracz <span>" + on + "</span>, gra czarnymi")      
        game.ruchy()
    }

}
