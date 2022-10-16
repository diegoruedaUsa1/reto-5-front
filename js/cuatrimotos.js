//var Global= "http://localhost:8081/api/";
var Global = "http://129.213.125.75:8081/api/";

function obtenerCuatrimoto(id){

	$("#idCuatrimoto").val(id);

	$.ajax({
	    url : Global + 'Quadbike/' +  id,
	    type : 'GET',
			dataType: 'json',
			contentType:'application/json',
	    success : function(response) {
	   		let cs=response;
				$("#marcaCuatrimoto").val(cs.brand);
				$("#modeloCuatrimoto").val(cs.year);
				$("#descriptionQuadbike").val(cs.description);
				$("#nombreCuatrimoto").val(cs.name);
	    },
	    error : function(xhr, status) {
	      //alert("Ha ocurrido un problema al mostrar los clientes");
	    }
	});
}

function leerCuatrimotos(){
    //FUNCION GET
      $.ajax({
          url : Global + 'Quadbike/all',
          type : 'GET',
          //dataType: 'json',
          //contentType:'application/json',
					header: 'Access-Control-Allow-Origin: *',
          success : function(response) {
                 let cs=response;
                 $("#listaCuatrimotos").empty();
                 for(i=0;i<cs.length;i++){
                     $("#listaCuatrimotos").append(cs[i].id+" <b>"+cs[i].brand+"</b> " + cs[i].year + " " +cs[i].description+" "+ cs[i].name );
                     $("#listaCuatrimotos").append("<button onclick='borrarCuatrimoto("+cs[i].id+")'>Borrar</button>");
										 $("#listaCuatrimotos").append("<button onclick='obtenerCuatrimoto(" +cs[i].id +")'>Actualizar</button><br>");
                 }
          },
          error : function(xhr, status) {
            alert("Ha ocurrido un problema al mostrar las cuatrimotos");
          }
      });
    }


function guardarCuatrimoto() {
    let modelo=$("#modeloCuatrimoto").val();
    let marca=$("#marcaCuatrimoto").val();
    let nombre=$("#nombreCuatrimoto").val();
		let descripcion=$("#descriptionQuadbike").val();

    let data={
			name:nombre,
      brand:marca,
      year:parseInt(modelo),
			description: descripcion
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);


    $.ajax({
        url : Global + 'Quadbike/save',
        type : 'post',
        dataType: 'json',
        data:dataToSend,
        contentType:'application/json',
				header: 'Access-Control-Allow-Origin: *',
        success : function(response) {
            //console.log("La cuatrimoto se ha guardado correctamente");
        },
        error : function(xhr, status) {
            //console.log('Ha ocurrido un problema al guardar la cuatrimoto');
        },
        complete: function(){
            leerCuatrimotos();
        }
    });
}


function editarCuatrimoto(){
		let id=$("#idCuatrimoto").val();
		let modelo=$("#modeloCuatrimoto").val();
		let marca=$("#marcaCuatrimoto").val();
		let nombre=$("#nombreCuatrimoto").val();
		let descripcion=$("#descriptionQuadbike").val();

		let data={
			id: id,
			name:nombre,
			brand:marca,
			year:parseInt(modelo),
			description: descripcion
		};

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : Global + 'Quadbike/update',
        type : 'PUT',
         dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            //console.log("La cuatrimoto se ha actualizado correctamente");
        },
        error : function(xhr, status) {
            //console.log('Ha ocurrido un problema al actualizar la cuatrimoto');
        },
        complete: function(){
            leerCuatrimotos();
        }
    });

}

function borrarCuatrimoto(idCuatrimoto){
    let data={
        id:idCuatrimoto
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url : Global + 'Quadbike/' + data.id,
        type : 'DELETE',
        //dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(response) {
            console.log("La cuatrimoto se ha borrado correctamente");
        },
        error : function(xhr, status) {
           alert('Ha ocurrido un problema al borrar la cuatrimoto');
        },
        complete: function(){
            leerCuatrimotos();
        }
    });

}
