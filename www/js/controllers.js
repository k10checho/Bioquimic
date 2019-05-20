angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
$(document).ready(function(){
  
var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
var idArray = []; //array para guardar los ids de las cartas que tienen click 
var contador = 0;
var fin = 0; 
var fields = document.querySelectorAll(".atras");


var images = [
"https://img.lovepik.com/element/40041/5654.png_860.png",
"https://img.lovepik.com/element/40041/5654.png_860.png",
"https://image.freepik.com/vector-gratis/fruta-manzana_7814-314.jpg",
"https://image.freepik.com/vector-gratis/fruta-manzana_7814-314.jpg",
"https://st2.depositphotos.com/1007566/12458/v/950/depositphotos_124587142-stock-illustration-pear-kawaii-cartoon.jpg",
"https://st2.depositphotos.com/1007566/12458/v/950/depositphotos_124587142-stock-illustration-pear-kawaii-cartoon.jpg",
"https://static7.depositphotos.com/1001911/690/v/450/depositphotos_6902192-stock-illustration-bread-slice-cartoon.jpg",
"https://static7.depositphotos.com/1001911/690/v/450/depositphotos_6902192-stock-illustration-bread-slice-cartoon.jpg",
"http://diysolarpanelsv.com/images/neville-clipart-4.png",
"http://10dibujos.org/wp-content/uploads/2017/08/Rabanos-para-colorear-7-dibujos03.jpg",
"http://10dibujos.org/wp-content/uploads/2017/08/Rabanos-para-colorear-7-dibujos03.jpg",
"https://image.freepik.com/vector-gratis/dibujos-animados-pollo-manteniendo-huevos-cesta_29937-1170.jpg",
"https://image.freepik.com/vector-gratis/dibujos-animados-pollo-manteniendo-huevos-cesta_29937-1170.jpg",
"https://st2.depositphotos.com/1967477/7371/v/950/depositphotos_73711195-stock-illustration-cartoon-a-boxes-of-milk.jpg",
"https://st2.depositphotos.com/1967477/7371/v/950/depositphotos_73711195-stock-illustration-cartoon-a-boxes-of-milk.jpg",
"https://previews.123rf.com/images/kongvector/kongvector1707/kongvector170700096/81520328-estilo-de-dibujos-animados-wink-papa-car%C3%A1cter.jpg",
"https://previews.123rf.com/images/kongvector/kongvector1707/kongvector170700096/81520328-estilo-de-dibujos-animados-wink-papa-car%C3%A1cter.jpg",
"http://diysolarpanelsv.com/images/neville-clipart-4.png"
];
// verificacion de los clicks
function clicked() { 
  if ($(this).find(".inner-wrap").hasClass("flipped")) {
    return;
  }
  $(this).find(".inner-wrap").toggleClass("flipped");
  checkArray.push($(this).find("img").attr("src"));
  idArray.push($(this).attr("id"));
  check();
}

$(".carta").on("click", clicked);
  
//reiniciar el juego
function reiniciar() {
  $(".atras").find("img").remove(); //quitar todas las imagenes actuales
  $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
  checkArray = []; 
  idArray = [];
  contador = 0; 
  fin = 0;
  iniciarJuego();
}
//para verificar el fin del juego
function verificarFin() {
  if (fin === 18) { //si todas las cartas estan volteadas
    alert("Juego finalizado, lo has logrado en " + contador + " intentos");
    reiniciar();
  }
}
//para random de las imagenes 
function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function iniciarJuego() {

  

  var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
 // append de las imagenes a la clase para la parte de atras de las cartas
  for (var i = 0; i < fields.length; i++) {
    var img = document.createElement("img");
    img.src = arr[i];
    fields[i].appendChild(img);
  }


}

function check() {
  //si los fields se  han hecho dos clicks 
  if (checkArray.length === 2) {
    $(".carta").off("click", clicked); 
    setTimeout(function(){
      //si no hay match
      if (checkArray[0] !== checkArray[1]) { 
        //voltear las dos cartas seleccionadas
        $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
        $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
        contador++;
        //vaciar los arrays para la siguiente eleccion
        checkArray = []; 
        idArray = []; 
        //habilitar el click de nuevo
        $(".carta").on("click", clicked);
      } else {

        contador++;
        
        fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
        //vaciar los dos arrays
        checkArray = []; 
        idArray = []; 
        verificarFin(); 
        $(".carta").on("click", clicked); 
      }
      document.querySelector(".counter").innerHTML = contador;
    }, 800);  
  }
}



iniciarJuego();

});});
