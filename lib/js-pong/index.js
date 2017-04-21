    function log(texto,nueva){
    var capa=document.getElementById("log");
    if (nueva)
        capa.innerHTML+="<br/>"+texto;
    else
      capa.innerHTML=texto;
}    

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };
  })();

  window.onload=function(){
    var pong = new Pong();
}