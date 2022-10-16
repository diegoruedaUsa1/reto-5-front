//var Global= "http://localhost:8081/api/";
var Global = "http://129.213.125.75:8081/api/";
function obtenerMensaje(idMessage){

  $("#idMensaje").val(idMessage);

  $.ajax({
      url : Global + 'Message/' +  idMessage,
      type : 'GET',
      //dataType: 'json',
      //contentType:'application/json',
      success : function(response) {
          let cs=response;
          $("#cuerpoMensaje").val(cs.messageText);
      },
      error : function(xhr, status) {
          console.log("Ha ocurrido un problema al mostrar los clientes");

      }
  });
}

function leerMensajes(){
    //FUNCION GET
      $.ajax({
          url : Global + 'Message/all',
          type : 'GET',
          //dataType: 'json',
          //contentType:'application/json',
          success : function(response) {
                 let cs=response;
                 $("#listaMensajes").empty();
                 for(i=0;i<cs.length;i++){
                     $("#listaMensajes").append(cs[i].idMessage+" <b>"+cs[i].messageText+"</b> ");
                     $("#listaMensajes").append("<button onclick='borrarMensaje("+cs[i].idMessage+")'>Borrar</button>");
                     $("#listaMensajes").append("<button onclick='obtenerMensaje(" +cs[i].idMessage +")'>Actualizar</button><br>");
                 }
          },
          error : function(xhr, status) {
            console.log("Ha ocurrido un problema al mostrar los mensajes");
          }
      });
}


function guardarMensaje() {
    let cuerpoMensaje=$("#cuerpoMensaje").val();

    let data={
        messageText:cuerpoMensaje
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);


    $.ajax({
        url : Global +'Message/save',
        type : 'post',
        dataType: 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //alert("El mensaje se ha enviado correctamente");
        },
        error : function(xhr, status) {
            //alert('Ha ocurrido un problema al enviar el mensaje');
        },
        complete: function(){
            leerMensajes();
        }
    });
}


function editarMensaje(){
    let id=$("#idMensaje").val();
    let cuerpoMensaje=$("#cuerpoMensaje").val();

    let data={
        idMessage: id,
        messageText:cuerpoMensaje
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : Global + 'Message/update',
        type : 'PUT',
         dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //alert("El mensaje se ha enviado correctamente");
        },
        error : function(xhr, status) {
           //alert('Ha ocurrido un problema al actualizar el mensaje');
        },
        complete: function(){
            leerMensajes();
        }
    });

}

function borrarMensaje(idMensaje){
    let id=idMensaje;

    $.ajax({
        url : Global + 'Message/' + id,
        type : 'DELETE',
     //   dataType : 'json',
      //  data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            console.log("El mensaje se ha borrado correctamente");
        },
        error : function(xhr, status) {
           alert('Ha ocurrido un problema al borrar el mensaje');
        },
        complete: function(){
            leerMensajes();
        }
    });

}
