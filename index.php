 <!--add all pages here, add new project pages to this page -->
<?php
	include ('header.php');
	include ('menu.php');
	switch ( @$_GET ['page']){
			/*case 'index': include ('home.php'); break; */
		case 'Home': include ('home.php');
			break;
		case 'CV': include ('CV.php');
			break;
		case 'Pubs': include ('pubs.php');
			break;
		default:
			include ('home.php');
			break;
	}
	include ('footer.php');
?>