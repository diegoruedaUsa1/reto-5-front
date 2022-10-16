//var Global= "http://localhost:8081/api/";
var Global = "http://129.213.125.75:8081/api/";

function obtenerReserva(idReservation){
	$("#idReserva").val(idReservation);

  $.ajax({
      url : Global + 'Reservation/' +  idReservation,
      type : 'GET',
      //dataType: 'json',
      //contentType:'application/json',
      success : function(response) {
          let cs=response;
          $("#cuerpoMensaje").val(cs.messageText);
      },
      error : function(xhr, status) {
          //console.log("Ha ocurrido un problema al mostrar los clientes");

      }
  });
}

function leerReservas(){
//FUNCION GET
	$.ajax({
	    url : Global + 'Reservation/all',
	    type : 'GET',
		  //dataType: 'json',
		  //contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
	   		$("#listaReservas").empty();
	   		for(i=0;i<cs.length;i++){
	   			$("#listaReservas").append(cs[i].idReservation+" <b>"+cs[i].startDate+"</b> "+cs[i].devolutionDate+" "+cs[i].status);
	   			$("#listaReservas").append("<button onclick='borrarReserva("+cs[i].idReservation+")'>Borrar</button><br>");
	   		}
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}


function guardarReserva() {
	let startDate=$("#startDate").val();
	let devolutionDate=$("#devolutionDate").val();
	let status=$("#status").val();

	let data={
		startDate:startDate.toISOString(),
		devolutionDate:devolutionDate.toISOString(),
		status:status
	};

	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);


	$.ajax({
		url : Global + 'Reservation/save',
		type : 'post',
		dataType: 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
			//alert("El cliente se ha guardado correctamente");

	    },
	    error : function(xhr, status) {
	        //alert('Ha ocurrido un problema al guardar el cliente');
	    },
	    complete: function(){
	    	leerReservas();
	    }
	});
}


function editarReserva(){
	let startDate=$("#startDate").val();
	let devolutionDate=$("#devolutionDate").val();
	let status=$("#status").val();

	let data={
		startDate:startDate,
		devolutionDate:devolutionDate,
		status:status
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
	    type : 'PUT',
	 		dataType : 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
			//alert("El cliente se ha actualizado correctamente");

	    },
	    error : function(xhr, status) {
	       //alert('Ha ocurrido un problema al actualizar el cliente');
	    },
	    complete: function(){
	    	leerReservas();
	    }
	});

}

function borrarReserva(idReserva){
	let data={
		id:idReserva
	};
	let dataToSend=JSON.stringify(data);
	//console.log(dataToSend);
	$.ajax({
	    url : 'https://g26eca07d994a7f-nf24436mn57msj3u.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client',
	    type : 'DELETE',
	    dataType : 'json',
	    data:dataToSend,
	    contentType:'application/json',
	    success : function(response) {
				//console.log("El cliente se ha borrado correctamente");
	    },
	    error : function(xhr, status) {
	       //alert('Ha ocurrido un priblema al borrar el cliente');
	    },
	    complete: function(){
	    	leerReservas();
	    }
	});

}
