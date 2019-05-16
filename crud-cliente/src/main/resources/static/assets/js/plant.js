function setFocus(inputId) {
	document.getElementById(inputId).focus();
}

$(window).resize(function() {
	$('#table-plant').DataTable().columns.adjust().draw();
});

$('#table-plant').dataTable({
	"scrollY" : "auto",
	"scrollCollapse" : true,
	"scrollX" : false,
	"autoWidth" : true,
	"paging" : false,
	"ordering" : true,
	"order" : [ [ 1, "asc" ] ],
	"columns" : [ {
		"orderable" : false
	}, null, null ],
	"info" : false,
	"searching" : false,
	"columnDefs" : [ {
		"visible" : false,
		"searchable" : false
	}, ],
	"oLanguage" : {
		"sEmptyTable" : false,
		"sZeroRecords" : false
	}
});

/* TABELAS */
$('#table-plant').on('click', 'tbody tr', function(event) {
	$(this).toggleClass('info');
	checkByClassInfo(this);
});

$("#btn-add").click(function() {
	$("#div-create").show();
	blockButtons(true);
	hideMessage();
	$("#btn-create").attr('name', 'cadastrar');
	setFocus("plantId");

});

/**
 * bloqueia ou desbloqueia os botoes de acao (criar, editar, excluir)
 * 
 * @param block
 * @returns
 */
function blockButtons(block) {
	$('#btn-add').prop("disabled", block);
	$('#btn-exclude').prop("disabled", block);
	$('#btn-alter').prop("disabled", block);
}

/**
 * Verifica se a linha contem a class info (linha em azul) e marca o checkbox da
 * linha de acordo com o resultado
 * 
 * @param row :
 *            linha selecionada
 * @returns
 */
function checkByClassInfo(row) {
	if ($(row).hasClass('info')) {
		$(row).find('input[type=checkbox]').prop("checked", true);
	} else {
		$(row).find('input[type=checkbox]').prop("checked", false);
	}
}

$('#btn-alter')
		.click(
				function() {
					hideMessage();
					if ($('#table-plant').DataTable().rows('.info').data().length > 1) {
						$("#message").attr('class', 'alert alert-warning');
						$("#message")
								.html(
										'Por favor, selecione somente uma planta para alterá-la!');
						$("#message").show();

					} else {
						var tableData = $('#table-plant').DataTable().row(
								'.info').data();
						if (tableData != null
								&& tableData != typeof "undefined") {
							blockButtons(true);

							var tableIndex = $('#table-plant').DataTable().row(
									'.info').index();
							var plantId = $("#plantId" + tableIndex).val();

							$("#plantId").val(plantId);
							$("#plantName").val(tableData[2]);
							changeTitleCreate(false);

							$("#plantId").prop("readonly", true);
							$("#btn-create").attr('name', 'alterar');
							$("#div-create").show();

						} else {
							$("#message").attr('class', 'alert alert-warning');
							$("#message")
									.html(
											'Por favor, selecione uma planta para alterá-la!');
							$("#message").show();
						}
						setFocus("plantName");
					}

				});

/**
 * Troca o titulo da div de criacao quando o modulo eh edicao
 * 
 * @param isCreate
 * @returns
 */
function changeTitleCreate(isCreate) {
	if (isCreate) {
		$('#title-create').text('Criar Planta');
	} else {
		$('#title-create').text('Editar Planta - ' + $("#plantId").val());
	}
}

function hideMessage() {
	$("#message").html('');
	$("#message").hide();
	$("#message-2").html('');
	$("#message-2").hide();
}

$("#btn-cancel").click(
		function() {
			hideMessage();
			$("#div-create").hide();
			$('.input-group-addon').removeClass('success');
			$('.input-group-addon').addClass('danger');
			$('.input-group-addon').find('span').attr('class',
					'glyphicon glyphicon-remove');
			blockButtons(false);
			$("#plantId").prop("readonly", false);
			changeTitleCreate(true);
		});

$('#select-all').on(
		'click',
		function() {
			if ($(this).is(":checked")) {
				$('#table-plant tr:visible').find('input[type=checkbox]').prop(
						'checked', true);
				$('#table-plant tr:visible').addClass('info');
				$('#table-plant thead tr').removeClass('info');

			} else {
				$('#table-plant tr:visible').find('input[type=checkbox]').prop(
						'checked', false);
				$('#table-plant tr:visible').removeClass('info');
			}
		});

$('#search-by-code').on(
		'keyup',
		function() {
			if ($('#search-by-code').val()) {
				$("#table-plant tr").hide();
				$('#table-plant thead tr').show();
				$("td")
						.each(
								function() {
									if ($(this).text().toLowerCase().indexOf(
											$('#search-by-code').val()
													.toLowerCase()) > -1
											&& !$(this).hasClass('hidden')) {
										$(this).parent().show();
									}
								});
			} else {
				$('#table-plant tr').show();
			}
		});

$("#btn-create").click(function() {
	loading();
});

function onLoad() {
	$("#loading").attr("hidden", true);
}

// TESTE API-JSON
$("#btn-get-json").on('click', function() {

	var url = "https://viacep.com.br/ws/09791495/json/"
	var retornoWS;
	$.ajax({
        type:"GET",
        dataType: "json",
        data:{name: name},
        url:url,
        success:function(data)
        {
            alert('Get Success');
            //console.log(data);
            var obj = JSON.parse(JSON.stringify(data));
            $("#lbl-consulta").text(obj.cep);
            
            
        }
     });

});