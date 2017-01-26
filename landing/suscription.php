<?php

	if(isset($_POST) && isset($_POST['name']) && isset($_POST['email'])){
	  $name = Trim(stripslashes($_POST['name']));
	  $email = Trim(stripslashes($_POST['email']));
	  $city = Trim(stripslashes($_POST['city']));

	  $link = mysqli_connect('localhost', 'slambow', 'Sl4mb0w', '') or die(mysql_error());

	  if($link === false){
		  die("ERROR: Error al conectar con la base de datos. " . mysqli_connect_error());
	  }
		
	  mysqli_select_db($link,'slambow_landing') or die(mysql_error());

	  $time = time();
	  $fecha = date("d-m-Y (H:i:s)", $time);

	  $query="INSERT INTO suscriptions" .
		  "(name,email,city,date)" .
		  "VALUES
		  ('$name','$email','$city','$fecha')";

	  if(!mysqli_query($link, $query)){
		  die("ERROR: Error al guardar en la base de datos. " . mysqli_connect_error());
	  }

	}
	else{
	  echo "Se produjo un error al enviar el formulario, reintenta a la brevedad.";
	}

	$link->close();
	header("Location: /");
	
?>