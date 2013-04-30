/*
Matthew Lewis
MIU Week 3 Assignment
Term: 1304
*/



$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#add').on('pageinit', function(){

		errorsLink = $("#errorslink")
	 	homeLink   = $("#homeLink")
		
		var myForm = $('#addForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			
			var html = '';
			errorsLink.click();
			 
			 for(var key in validator.submitted){
				 var label = $("label[for^='" + key +"']").not("[generated]");
				 var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				 //this code checks for legends (used for radios and checkboxes) and then checks for labels (used for text field inputs)
				 var fieldName = legend.length ? legend.text() : label.text();
				 html += '<li>' + fieldName + '</li>';
			 };
			 $("#errorspopup ul").html(html);
		 
			},
			
			submitHandler: function() {
				var data = myForm.serializeArray();
				storeData(data);
				alert("Party Member Saved! Reloading the page for you :)");
				autofillData();
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	  $("#reset").click();
};

var getData = function(){

};

var storeData = function(data){
	var id = Math.floor(Math.random()*100065);
	
	
	var character      = {};
	
	character.name        = get("name").value;
	character.gender      = data[1].value;
	character.age         = get("age").value;
	character.nationality = get("nationality").value;
	character.role        = get("class").value;
	character.level       = get("level").value;
	character.bio         = get("bio").value;
	
	console.log(character);
	localStorage.setItem(id, JSON.stringify(character));
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

function get(id) {
		var theElement = document.getElementById(id);
		return theElement;
		}
