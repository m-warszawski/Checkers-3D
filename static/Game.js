console.log("wczytano plik Game.js")

class Game {

    constructor() {

        //Pola w szachownicy
        this.szachownica = [

            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],

        ];

        //Szerokości okna przeglądarki
        var sok = window.innerWidth;
        var wok = window.innerHeight

        this.scene = new THREE.Scene();

        //Dodanie kamery
        this.camera = new THREE.PerspectiveCamera(
            45,    // kąt patrzenia kamery 
            sok / wok,    // proporcje widoku
            0.1,    // min renderowana odległość
            10000    // max renderowana odległość od kamery
        );

        this.camera.position.set(400, 350, 400);
        this.camera.lookAt(this.scene.position);


        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes)

        //dodanie "podstawki" pod planszę
        this.geometry = new THREE.BoxGeometry(500, 5, 500);
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('mats/czarne.jpg'),
            wireframe: false,
            transparent: false,
            opacity: 0.0
        });

        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
        this.cube.position.set(0, -8, 0);


        //=========== Wygenerowanie pól planszy
        var ix = (-175);
        var iz = (-175);

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {

                this.geometry1 = new THREE.BoxGeometry(50, 5, 50);

                var pole = this.szachownica[i][j];
                console.log(pole)

                //Jasne pola
                if (pole == 1) {
                    this.material1 = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: new THREE.TextureLoader().load('mats/jasne.jpg'),
                        wireframe: false,
                        transparent: false,
                        opacity: 0.0
                    });
                }

                //Ciemne pola
                else {
                    this.material1 = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: new THREE.TextureLoader().load('mats/ciemne.jpg'),
                        wireframe: false,
                        transparent: false,
                        opacity: 0.0
                    });
                }

                this.cube1 = new THREE.Mesh(this.geometry1, this.material1);
                this.scene.add(this.cube1);

                //---Ustawienie pozycji pól
                this.cube1.position.x = ix;
                this.cube1.position.z = iz;
                this.cube1.position.y = -5;

                if (ix >= 150) {
                    ix = (-175);
                    iz = iz + 50;
                }
                else {
                    ix = ix + 50;
                }
                //---

            }
        }
        //========================

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);

        this.renderer.setSize(sok, wok);
        $("#root").append(this.renderer.domElement);
        this.render() // wywołanie metody render   

    }

    //RENDER
    render() {
        requestAnimationFrame(this.render.bind(this)); // funkcja bind(this) przekazuje obiekt this do metody render
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }

    //PIONKI
    piony() {

        //ustawieni pionków
        this.ustawienie = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0]
        ];

        //==========  Wygenerowanie pionków na planszy
        this.geometry3 = new THREE.CylinderBufferGeometry(20, 20, 10, 20);

        var lx = (-175);        //Pozycja początkowa x
        var lz = (-175);        //Pozycja początkowa z
        var ly = 0;

        for (var k = 0; k < 8; k++) {
            for (var l = 0; l < 8; l++) {

                var kolo = this.ustawienie[k][l];
                console.log("KOŁO" + kolo)

                if (kolo == 1) {
                    this.material3 = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: new THREE.TextureLoader().load('mats/biale.jpg'),
                        wireframe: false,
                        transparent: false,
                        opacity: 0.0
                    });
                    this.cube3 = new THREE.Mesh(this.geometry3, this.material3);
                    this.cube3.position.x = lx;
                    this.cube3.position.z = lz;
                    this.cube3.position.y = ly;
                }
                else if (kolo == 2) {
                    this.material3 = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: new THREE.TextureLoader().load('mats/czarne.jpg'),
                        wireframe: false,
                        transparent: false,
                        opacity: 0.0
                    });
                    this.cube3 = new THREE.Mesh(this.geometry3, this.material3);
                    this.cube3.position.x = lx;
                    this.cube3.position.z = lz;
                    this.cube3.position.y = ly;
                }

                //Ustawienie pozycji pionków
                if (lx >= 150) {
                    lx = (-175);
                    lz = lz + 50;
                }
                else {
                    lx = lx + 50;
                }


                if (kolo > 0) {
                    this.scene.add(this.cube3);
                }
            }
        }
       //===============================
    }

    //KAMERA PO ZALOGOWANIU
    kamery(us) {
        console.log(us)

        //BIAŁE
        if (us == "OK1") {
            this.camera.position.set(0, 200, -400);
            this.camera.lookAt(this.scene.position);
        }

        //CZARNE
        else if (us == "OK2") {
            this.camera.position.set(0, 200, 400);
            this.camera.lookAt(this.scene.position); 
            this.ruchy();
        }
        //WIDZ
        // else {
        //     this.camera.position.set(400, 200, 0);
        //     this.camera.lookAt(this.scene.position); s

        // }       
    }

    //!!!!!!!!!!!!!!!!  RAYCASTER !!!!!!!!!!!!!!!!!!!!!!
    ruchy() {
        this.raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D
      
        $(document).mousedown(function (event) {
            this.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            this.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;

            console.log(this.mouseVector)
            this.raycaster.setFromCamera(this.mouseVector, this.camera);

            var intersects = this.raycaster.intersectObjects(this.scene.children);

            console.log(intersects.length)
        })
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}