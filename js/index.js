function changePage() {
    window.location.replace("../home.html");
}

 $("#login-button").click(function(event){
		 event.preventDefault();
	 
	 $('form').fadeOut(500);
	 $('.wrapper').addClass('form-success');
	 setTimeout(changePage, 4000);
	 /* window.location.replace("http://designscrazed.org/css-html-login-form-templates/") */

});