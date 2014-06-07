var curr_date, curr_month, date, curr_year, urlPost, repo, postUrl, fecha, github;
	
	$(document).ready(function() {
		tinymce.init({
                    selector:'textarea',
                    plugins: "image, link, media, print",
                    toolbar: "styleselect | undo redo | media | image | removeformat | bold italic underline |  aligncenter alignjustify  | bullist numlist outdent indent | link | print | fontselect fontsizeselect",
                    menubar: false,
                    statusbar: true,
                    resize: true,
					height: 400
       
		});
		$('.modal-content').draggable();
		$("#launchMod").click(function(){
			$('#myModal').modal(options);
		});
		//	$(".b64, .b64p p").each(unescapeThis);
		$(".entrada.b64p span p").text(function(index,text){
			return text.substr(0, 456);
		});
	
		function unescapeThis(){var e = unescape($(this).text()); $(this).text(e);}
		function decodeThis() { var e = B64.decode($(this).text()); $(this).text(e) }
	
	});
	
	function qA(str){ 
		for (var i=0;i<str.length;i++){ 
		if (str.charAt(i)=="á") str = str.replace(/á/,"a"); 
		if (str.charAt(i)=="é") str = str.replace(/é/,"e"); 
		if (str.charAt(i)=="í") str = str.replace(/í/,"i"); 
		if (str.charAt(i)=="ó") str = str.replace(/ó/,"o"); 
		if (str.charAt(i)=="ú") str = str.replace(/ú/,"u"); 
		} 
		return str; 
	} 

	
	function formulario(){
	    var x = document.forms["formulario"]["contenido"].value;
		var y = qA(document.forms["formulario"]["titulo"].value);
		contenido = 
		'---\n\n'+
		'layout: post\n\n'+
		'title: ' + y + '\n\n' +
		'categories: BastaMexico\n\n'+
		'---\n\n'	+	x;
		titlep = new Date().getTime();
		postEntry(titlep , contenido);
		$('button.close').click();	
		return false;
	}
	
	function postEntry (title , content) {	
		github = new Github({
			username: "another-",
			password: "pass1990",
			auth: "basic"
		});

    	repo = github.getRepo('nobasta', 'nobasta.github.io');
	
	        /*Gist = github.getGist(11103174);    	
		Gist.read(function(err, gist)*/

	 repo.read('master','sitemap.html',function(err,data) {
		
		date = new Date();
		curr_date = date.getDate();
		curr_month = date.getMonth() + 1;
		curr_year = date.getFullYear();
		fecha = curr_year + "-" + curr_month + "-" + curr_date;
		/*postUrl = curr_year + "/" + curr_month + "/" + curr_date + '/' + title + '.html';
		urlPost = '\nhttp://www.enmexicoserinocentenobasta.tk/bastamexico/' + postUrl;
		var sitemap =  data + urlPost;
		var delta = {
			"files" : {
				"sitemap" : {
				  "content" : sitemap
				}
			}
		}*/
		//repo.write('master','sitemap.html',sitemap,'web')
		/*Gist.update(delta, function(err,gist) {
		});*/
		repo.write('master', '_posts/' + fecha + '-' +  title + '.markdown', content, 'web');
        });
		
	}
	

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];
if(!d.getElementById(id)){js=d.createElement(s);js.id=id;
js.src="https://platform.twitter.com/widgets.js";
fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-49346522-2', 'enmexicoserinocentenobasta.tk');
ga('send', 'pageview');


 window.fbAsyncInit = function() {
  FB.init({
    appId      : '1423176551273301',
    status     : true, 
    cookie     : true, 
    xfbml      : true  
  });
   
   FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
		   FB.api('/1423176551273301', function(response) {
				$("#votos").animate({ opacity:"1" },'fast');
				$("#votos").html("<b style=\"color:black\">" + response.monthly_active_users + "</b> Votos");
			});
		}
	});
  };
  
  
    (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/es_LA/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));
  

  
  function testAPI() {
	FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
   Action();
  } else if (response.status === 'not_authorized') {
   FB.login(function(){
	if (response.authResponse) {
		Action();
	}
   },{scope:"email"});
  } else {
    FB.login(function(){
	if (response.authResponse) {
		Action();
	}
   },{scope:"email"});
  }
 });
  }
    function Action(){
	FB.api('/me', function(response) {
		  $("#voto").html("<h1>&#9733</h1>" +
			"<h3>¡Gracias X tu Voto " + response.name + "!</h3>");
		});
	$("#smallModal").modal();
  }
