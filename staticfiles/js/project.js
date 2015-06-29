/* Project specific Javascript goes here. */

$(document).ready(function(){
    $("#id_owner option:contains(---------)").remove();
    owner_initial_text = $("#id_owner option:selected").text();
    owner_initial_val = $("#id_owner option:selected").val();
    if( $("#id_owner").length ){
    	$("#id_co_owners option:contains("+ owner_initial_text +")").detach();
    }
    $("#id_owner").select2();
	$("#id_co_owners").select2({
		tags: true
	});
	$("#id_start_date").datetimepicker();
	$("#id_end_date").datetimepicker();
});

$(document).on('select2:select',function(){
	// Get the text from the selected value in the owner dropdown
	onwer_selected_text = $("#id_owner option:selected").text();
	// Get the value from the option that will be removed from co_owners
	owner_selected_val = $("#id_co_owners option:contains("+ onwer_selected_text +")").val();
	// Append a new option with the previous text in the owner dropdown
	$("#id_co_owners").append("<option value="+ owner_initial_val +">"+ owner_initial_text +"</option>");
	// Remove the selected option in owner dropdown
	$("#id_co_owners option:contains("+ onwer_selected_text +")").detach();
	// owner_initial_text and owner_inital_val get the new value in the dropdown if the dropdown
	// is changed again the cycle continue
	owner_initial_text = onwer_selected_text
	owner_initial_val = owner_selected_val
});

