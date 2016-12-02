/**
 * Created by USUARIO on 30/11/2016.
 */
$(document).ready(function () {

    var $datos = $('.libros');
    var $titulo = $('#tituloLibro');
    var $autor = $('#autorLibro');
    var $url = $('#urlLibro');
    var $img = $('#urlImg');
    var $ultimoid


    // nos permite interactuar con el servidor sin refrescar la pagina.
    $.ajax({
        type: 'GET', // el tipo de verbo HTTP utilizado se puede usar method: tambien en jquery 1.9.0 o posterior
        url: "http://localhost/api/libros", // Cadena de texto conteniendo la direccion a donde se mandara el resultado.
        dataType: "json",                // es el tipo de datos que se espera obtener del servidor.
        contentType: 'application/json', // es el tipo de contenido que se le mandara al servidor.
        success: function (data) {  // funcion que se ejecuta si la peticion es exitosa

            $.each(data, function (i, item) {


                //se  crea el HTML con los datos resividos
                $datos.append('<div class="square z-depth-2" id="' + item.id + '" tituloLibro="' + item.titulo_libro + '" autorLibro="' + item.autor + '" urlLibro="' + item.amazon_url + '" imgLibro="' + item.url_img + '"><div class="content">  <img class="rs imgSquare img-thumbnail" src="' + item.url_img + '"/><ul class="libro"> <li class="idlibro" >ID:' + item.id + '</li><li class="tituloSquare">Titulo: ' + item.titulo_libro + '</li><li class="autorSquare">Autor: ' + item.autor + '</li><li class="urlSquare">Enlace: <a href="' + item.amazon_url + '">Comprar</a></li><li></li></ul></div><button type="button" class="btn btn-danger btn-sm" id="borrarLibro">Borrar</button><button type="button" class="btn btn-default btn-sm" id="actLibro">Actualizar</button></div>');

               //el dato del ultimo id para usarlo al insertar.
                $ultimoid = item.id;


            });


        }
    });


    $('#busqueda').on('click', function () {
        // obtenemos los datos del formulario
        var $busqueda = document.getElementById('busquedatxt').value;



        $.ajax(
            {
                type: 'GET',
                url: "http://localhost/api/libros?search="+$busqueda, // Cadena de texto conteniendo la direccion a donde se mandara el resultado.
                dataType: "json",                // es el tipo de datos que se espera obtener del servidor.
                contentType: 'application/json', // es el tipo de contenido que se le mandara al servidor.
                success: function (data) {  // funcion que se ejecuta si la peticion es exitosa
                     $('.square').remove();
                    $.each(data, function (i, item) {


                        //se  crea el HTML con los datos resividos

                        $datos.append('<div class="square z-depth-2" id="' + item.id + '" tituloLibro="' + item.titulo_libro + '" autorLibro="' + item.autor + '" urlLibro="' + item.amazon_url + '" imgLibro="' + item.url_img + '"><div class="content">  <img class="rs imgSquare img-thumbnail" src="' + item.url_img + '"/><ul class="libro"> <li class="idlibro" >ID:' + item.id + '</li><li class="tituloSquare">Titulo: ' + item.titulo_libro + '</li><li class="autorSquare">Autor: ' + item.autor + '</li><li class="urlSquare">Enlace: <a href="' + item.amazon_url + '">Comprar</a></li><li></li></ul></div><button type="button" class="btn btn-danger btn-sm" id="borrarLibro">Borrar</button><button type="button" class="btn btn-default btn-sm" id="actLibro">Actualizar</button></div>');

                        //el dato del ultimo id para usarlo al insertar.
                        $ultimoid = item.id;


                    });


                }}
        );


    });



    $('#enviarlibro').on('click', function () {
        // obtenemos los datos del formulario
        var $titulo_libro = document.getElementById('tituloLibro').value;
        var $autor = document.getElementById('autorLibro').value;
        var $amazon_url = document.getElementById('urlLibro').value;
        var $url_img = document.getElementById('urlImg').value;


        $.ajax(
            {
                type: 'POST',
                url: "http://localhost/api/libros",
                contentType: 'aplication/json',


                success: function (data) {

                    $ultimoid++;
                    $datos.append('<div class="square z-depth-2"  id="' + $ultimoid + '" tituloLibro="' + $titulo_libro + '" autorLibro="' + $autor + '" urlLibro="' + $amazon_url + '" imgLibro="' + $url_img + '" ><div class="content"> <div class="table table-responsive"> <div class="table-cell"><img class="rs  imgSquare img-responsive" src="' + $url_img + '"/><ul class="libro">  <li id="idlibro" >ID:' + $ultimoid + '</li> <li class="tituloSquare">Titulo: ' + $titulo_libro + '</li><li class="autorSquare">Autor: ' + $autor + '</li><li class="urlSquare">Enlace: <a href="' + $amazon_url + '">Comprar</a></li></ul></div></div></div><button type="button" class="btn btn-danger btn-sm" id="borrarLibro">Borrar</button><button type="button" class="btn btn-default btn-sm" id="actLibro">Actualizar</button></div>');


                    console.log(data);


                },
                data: JSON.stringify({ //se convierten los datos a JSON
                    titulo_libro: document.getElementById('tituloLibro').value,
                    autor: document.getElementById('autorLibro').value,
                    amazon_url: document.getElementById('urlLibro').value,
                    url_img: document.getElementById('urlImg').value
                })
            }
        );


    });


    $('#enviarlibroact').on('click', function () {

        var $id = $('#idLibroact').val();
        var $titulo_libro = $('#tituloLibroact').val();
        var $autor2 = $('#autorLibroact').val();
        var $amazon_url = $('#urlLibroact').val();
        var $url_img = $('#urlImgact').val();



        $.ajax(
            {
                type: 'PUT',
                url: "http://localhost/api/libros/" + $id,
                contentType: 'aplication/json',


                success: function (data) {

                    $('#' + $id + ' .tituloSquare').text('Titulo: ' + $titulo_libro);
                    $('#' + $id + ' .autorSquare').text('Autor: ' + $autor2);
                    $('#' + $id + ' .urlSquare a').attr("href", $amazon_url);
                    console.log(data);

                },
                data: JSON.stringify({
                    id: $id,
                    titulo_libro: $titulo_libro,
                    autor: $autor2,
                    amazon_url: $amazon_url,
                    url_img: $url_img
                })
            }
        );


    });

});

$(document).on("click", "#actLibro", function () {


    $('[href="#tab2default"]').tab('show');
    document.getElementById('idLibroact').value = $(this).parent().attr('id');
    document.getElementById('tituloLibroact').value = $(this).parent().attr('tituloLibro');
    document.getElementById('autorLibroact').value = $(this).parent().attr('autorLibro');
    document.getElementById('urlLibroact').value = $(this).parent().attr('urlLibro');
    document.getElementById('urlImgact').value = $(this).parent().attr('imgLibro');


    $('#tituloLibroact').focus();

});

$(document).on("click", "#borrarLibro", function () {


    $idlibro = $(this).parent().attr('id');
    console.log($idlibro);

    var r = confirm("Se borrara el libro.");
    if (r == true) {

        $.ajax(
            {
                type: 'DELETE',
                url: "http://localhost/api/libros/" + $idlibro,


                success: function (data) {


                    $('#' + $idlibro + '').fadeOut().remove();
                    console.log(data);


                },
                error: function (data) {

                }
            });
    }


});