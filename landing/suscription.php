<?php

        if(isset($_POST) && isset($_POST['name']) && isset($_POST['email'])){
          $name = Trim(stripslashes($_POST['name']));
          $email = Trim(stripslashes($_POST['email']));
          $city = Trim(stripslashes($_POST['city']));
          try{
            $mbd = new PDO('mysql:host=localhost;dbname=slambow_landing', 'root', 'Sl4mb0w');

            $time = time();
            $fecha = date("Y-m-d", $time);

					$sentencia = $mbd->prepare("INSERT INTO SUSCRIPTIONS (name, email, city, date) VALUES (:name, :email, :city, :date)");
					$sentencia->bindParam(':name', $name);
					$sentencia->bindParam(':email', $email);
					$sentencia->bindParam(':city', $city);
					$sentencia->bindParam(':date', $fecha);
					$sentencia->execute();
					$mbd = null;
          } catch (PDOException $e) {
                print "¡Error!: " . $e->getMessage() . "<br/>";
                die();
          }

        }
        else{
          echo "Se produjo un error al enviar el formulario, reintenta a la brevedad.";
        }
				
        header("Location: /");

?>