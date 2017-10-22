    var idActividad = null;
	var pasosMin = null;
	var pulsoMax =null;
	var pulsoMin = null;


	var recordatoriosAux = [];
	$.ajax({
        url: '/wsbi/get_datos_sesion/',
        headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		dataType : "json",
        success: function (data) {
            idActividad = data.id;
            var urlGetConfig = '/wsbi/config/'+idActividad;
            $.ajax({
                url: urlGetConfig,
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                dataType : "json",
                success: function (data) {
                    pulsoMin = data.pulsoMin;
                    pulsoMax =data.pulsoMax;
                    pasosMin = data.pasosMin;
                    $('#pulsomin-ID').val(data.pulsoMin);
                    $('#pulsomax-ID').val(data.pulsoMax);
                    $('#pasosmin-ID').val(data.pasosMin);
                    recordatoriosAux = data.recordatorios;
                    setTablaRecordatorios(recordatoriosAux);
                },
                error : function(jqXHR, exception) {
                },
            });


        },
        error : function(jqXHR, exception) {
		},


      });


$(function() {
		$('#tablerecordatorios-ID').dataTable({
			"oLanguage": {
			    "sEmptyTable": function(){ return "No posee"; }
			},
			"bPaginate": false,
			"filter" : false,
			"columns" : [ {
				"defaultContent" : ""
			}, {
				"data" : "titulo"
			}, {
				"data" : "fecha"
			}, {
				"data" : "horamin"
			}, {
				"data" : "repeticion"
			}],
			"paging" : false,
			"ordering" : true,
			"info" : false
		});

	});

function setTablaRecordatorios(recordatorios) {
    var newRecordatorios = [];
	for (i = 0; i < recordatorios.length; i++) {
        var horamin =  String("0" + recordatorios[i].hora).slice(-2) +':'+ String("0" + recordatorios[i].min).slice(-2) ;
        var recor = {
            titulo: recordatorios[i].titulo,
            fecha: recordatorios[i].fecha,
            horamin: horamin,
            repeticion: recordatorios[i].repeticion
	    };
	    newRecordatorios.push(recor);
	}

		var table = $('#tablerecordatorios-ID').DataTable();
		table.clear();
		table.on( 'order.dt', function () {
	        table.column(0).nodes().each( function (cell, i) {
	            cell.innerHTML = i+1;
	        });
	    }).draw();
		table.rows.add(newRecordatorios).draw();

	};

function abrirRecordatorio() {
    $("#titulo-ID").val('');
    $("#horamin-ID").val('');
    $("#repetir-ID").val('');
    $("#recordar-ID").val('');
    $("#file-ID").val('');

     $("#side-menu-ID").html('<br> <br>')
    for (i = 0; i < recordatoriosAux.length; i++) {
           var horamin =  String("0" + recordatoriosAux[i].hora).slice(-2) +':'+ String("0" + recordatoriosAux[i].min).slice(-2) ;
          $("#side-menu-ID").append("<li style=\"list-style: none; border-bottom:0px;\"> <p style=\"padding: 10px !important;\"><span>"+ recordatoriosAux[i].titulo+"<br>"+ horamin+"<br>"+"</span></p><span><hr class=\"line-collapsed\"></span></li>");
    }
      $("#recordatorio-ID").modal();
}

function abrirDatosActividad() {
    $("#pulsoMaxID").val(pulsoMax);
    $("#pulsoMinID").val(pulsoMin);
    $("#pasosMinID").val(pasosMin);
    $("#datosActividad-ID").modal();
}


function subirDatosActividad() {
    var form = $( "#datoActividadForm-ID" );

		if (form.valid()){
			$("#configAct-id").val(idActividad);
            document.datoActividadForm.submit();
                $("#datosActividad-ID").modal('hide');
		}

}

/**
    var datos = {
            idConfig: 2,
            pasosProm: 50,
            pulsosMax: 100,
            pulsosMin: 50
	    };
            $.ajax({
               url: '/wsbi/set_datosActividad/',
		type : 'post',
		headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(datos),
                success: function (data) {
                    alert('OK');
                    $("#datosActividad-ID").modal('hide');
                },
                error : function(jqXHR, exception) {
                },
            });

**/

function uploadRecordatorio() {
        var form = $( "#subirArchivoFormID" );

		if (form.valid()){
            $("#configRec-id").val(idActividad);
            document.subirArchivoForm.submit();
            $("#recordatorio-ID").modal('hide');
		}

}


