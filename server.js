const PORT = 3000;
var fs = require("fs");
var qs = require("querystring")
var http = require("http");

var gracze = [];    //tablica z loginami graczy

//========================================= ODPOWIEDZI NA ŻADANIA PRZEGLADARKI ================================================
var server = http.createServer(function (req, res) {
    console.log(req.url)
    switch (req.method) {
        case "GET":

            //Plik index         
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }

            //Plik z CSSem
            else if (req.url === "/style") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }

            //Pliki z rozszerzeniem JS
            else if (req.url.indexOf(".js") != -1) {
                fs.readFile(__dirname + "/static/" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "text/javascript" });
                    res.write(data);
                    res.end();
                })
            }

            //Pliki z rozszerzeniem JPG
            else if (req.url.indexOf(".jpg") != -1) {
                fs.readFile(__dirname + "/static/" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "image/jpg" });
                    res.write(data);
                    res.end();
                })
            }

            break;

        case "POST":

            //Załadowanie strony
            if (req.url == "/") {
                servResponse(req, res)
            }

            //Logowanie
            else if (req.url == "/loguj") {
                logujResponse(req, res)
            }

            //Reseet gry
            else if (req.url == "/reset") {
                resetResponse(req, res)
            }

            //Oczekiwanie 1 gracza
            else if (req.url == "/czekanie") {
                waitResponse(req, res)
            }



            break;
    }
})
//=============== koniec =================== ODPOWIEDZI NA ZADANIA PRZEGLADARKI ====================== koniec ============


//========================================= ZAŁADOWANIE STRONY ============================================================
function servResponse(req, res) {

    //Przyjecie danych z ajaxa
    req.on("data", function (data) {
    })

    req.on("end", function (data) {
        console.log("RESPONSE")
    });
};
//========= koniec ========================= ZALADOWANIE STRONY ================== koniec ===============================


//========================================= DODANIE GRACZA ================================================================
function logujResponse(req, res) {

    var allData = "";

    //Przyjecie danych z ajaxa
    req.on("data", function (data) {
        allData += data
    })

    req.on("end", function (data) {

        //Gdy jest miejsce:
        if (gracze.length < 2) {
            var finish = qs.parse(allData)

            //Sprawdzenie czy istnieje już taki gracz
            var jest = gracze.indexOf(finish.name);

            //Jeżeli nie istnieje...
            if (jest < 0) {

                //Gracz 1 
                if (gracze.length == 0) {
                    gracze.push(finish.name)
                    stan = "OK1"
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(stan);
                    console.log("-> Dodano białego")
                }

                // Gracz 2
                else {
                    gracze.push(finish.name)
                    stan = "OK2"
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(stan);
                    console.log("-> Dodano czarnego")
                }
            }

            // Jeżeli istnieje...
            else {
                stan = "EXIST"
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(stan);
                console.log("-> Już jest")
            }

        }

        //Gdy nie ma miejsca:
        else {
            stan = "FULL"
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(stan);
            console.log("-> Pełne. Nie dodano.")
        }

        console.log(gracze)

    });

};
//========= koniec ========================= DODANIE GRACZA ================== koniec ====================================


//========================================== RESET GRY ==============================================================
function resetResponse(req, res) {

    var allData = "";

    //Przyjecie danych z ajaxa
    req.on("data", function (data) {
        allData += data
    })

    req.on("end", function (data) {

        //Istnieją gracze:
        if (gracze.length > 0) {
            gracze = [];
            stan = "REMOVED"
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(stan);
            console.log("-> Zresetowano grę")
        }

        //Brak graczy:
        else {
            stan = "EMPTY"
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(stan);
            console.log("-> Tablica jest pusta")
        }
    });

};
//========= koniec ========================= RESET GRY ================== koniec ====================================


//============================================= CZEKANIE ===================================================================
function waitResponse(req, res) {

    var lolo = ""

    //Przyjecie danych z ajaxa
    req.on("data", function (data) {

    })

    req.on("end", function (data) {
        var sytuacja = qs.parse(lolo)
        let lp = gracze.length;

        //Sprawdzanie czy dołączył 2 gracz
        let gr = gracze[1]
        if (gr == undefined) {
            gr = "Nie ma"
        }

        sytuacja.lp = lp;
        sytuacja.gr = gr;        
        console.log(sytuacja)

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(sytuacja));
        console.log(" Oczekiwanie...")
    });

};
//========= koniec ========================= CZEKANIE ================== koniec ====================================


//Start nasluchiwania serwera
server.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})


