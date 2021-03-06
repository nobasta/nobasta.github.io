var curr_date, curr_month, date, curr_year, urlPost, repo, postUrl, fecha, github;
	
	$(document).ready(function() {
		tinymce.init({
                    selector:'textarea',
                    plugins: ["advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
	            	"searchreplace wordcount visualblocks visualchars code insertdatetime media nonbreaking",
	            	"save table contextmenu directionality emoticons template paste textcolor"],
                    toolbar: "media | image | link",
                    menubar: false,
                    statusbar: true,
                    resize: true,
					media_alt_source: true,
					height: 400
		});
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
		postEntry(new Date().getTime(), contenido);
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

	 repo.read('master','sitemap.html',function(err,data) {
		
		date = new Date();
		curr_date = date.getDate();
		curr_month = date.getMonth() + 1;
		curr_year = date.getFullYear();
		fecha = curr_year + "-" + curr_month + "-" + curr_date;
		repo.write('master', '_posts/' + fecha + '-' +  title + '.markdown', content, 'web');
        });
		setTimeout(function(){window.location = window.location.href="http://nobasta.github.io/"},2000)
	}
	

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];
if(!d.getElementById(id)){js=d.createElement(s);js.id=id;
js.src="https://platform.twitter.com/widgets.js";
fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-49346522-2', 'nobasta.github.io');
ga('send', 'pageview');