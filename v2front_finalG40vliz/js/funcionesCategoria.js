//GET, POST, PUT Y DELETE lizeth castillo

function getCategoria(){
    $.ajax({
        url:"http://129.146.16.176:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCategoria(respuesta);
        }
    });
}

function postCategoria(){
    if ($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{

        let cajas = {
            name:$("#name").val(),
            description:$("#description").val()
        };
        
        $.ajax({
            url:"http://129.146.16.176:8080/api/Category/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la categoria");
                window.location.reload();
            }
        });
    } 
}

function putCategoria(idBotonActualizar){
    if ($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        id:idBotonActualizar,
        name:$("#name").val(),
        description:$("#description").val()
    };
    
    $.ajax({
        url:"http://129.146.16.176:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Actualizaste la categoria");
            window.location.reload();
        }

    });
    }

}

function deleteCategoria(idBotonBorrar){
    Swal.fire({
        title: 'Esta seguro de borrar la categoria?',
        //showCancelButton: true,
        confirmButtonColor: '#01DFA5',
        cancelButtonColor: '#DF013A',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
            let myData={
                id:idBotonBorrar
            };
            $.ajax({
                url:"http://129.146.16.176:8080/api/Category/"+ idBotonBorrar,
                type:"DELETE",
                datatype:"JSON",
                data: JSON.stringify(myData),
                contentType:"application/json",
                success:function(respuesta){
                alert("Eliminaste la categoria");
                    window.location.reload();
                }
            });
          
          
            Swal.fire(
            
            
            
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

}

/////////////////////////////////////////////////////
function pintarCategoria(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='putCategoria("+respuesta[i].id+")'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteCategoria("+respuesta[i].id+")'>Borrar</button> "
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}
