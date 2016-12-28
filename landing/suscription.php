<?php
    
    if(isset($_POST) && isset($_POST['name']) && isset($_POST['email'])){
        try {
            $mbd = new PDO('mysql:host=localhost;dbname=slambow_landing', 'slambow_db', 'Sl4mb0wdb');
var_dump($mbd->prepare);
            $sentencia = $mbd->prepare("INSERT INTO suscriptions ('name', 'email', 'city', 'date') VALUES (?, ?, ?, NOW())");
            $sentencia->bindParam(1, $_POST['name']);
            $sentencia->bindParam(2, $_POST['email']);
            $sentencia->bindParam(3, $_POST['city']);
            $sentencia->execute();
            var_dump($sentencia->fullQuery);
            $mbd = null;
            die();
        } catch (PDOException $e) {
            print "¡Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    header("Location: /");
    exit;
?>