<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "readdata";
$password = "krtsTL&AKr4cST";
$dbname = "theholders";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, title FROM content_data WHERE id BETWEEN 1 AND 2538";
$result = $conn->query($sql);

$sql2 = "SELECT id, title FROM content_data WHERE id > 2538";
$result2 = $conn->query($sql2);
?>


<!DOCTYPE html>

<html [data-theme="dark" ]="">
<head>
<title>The Holders Series</title>
<link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" rel="stylesheet"/>
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<link href="holders.css" rel="stylesheet" type="text/css"/>
<link href="/images/logo.ico" rel="icon" type="image/x-icon"/>
<link href="images/apple-touch-icon.jpg" rel="apple-touch-icon" sizes="150x150"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body style="padding-top: 70px;">
<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" style="padding: 0;">
<div class="container-fluid p-0">
<img onclick="loadContent('random')" src="images/logo.jpg" style="height: 70px;"/>
<a class="navbar-brand" href="index.php" id="navbar-title">The Holders Series</a>
<button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button">
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="navbar-nav me-auto mb-2 mb-lg-0">
<li class="nav-item dropdown">
<a aria-expanded="false" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="navbarDropdown" role="button">
              Series List
            </a>
<ul aria-labelledby="navbarDropdown" class="dropdown-menu">
<?php
              while ($row = $result->fetch_assoc()) {
                echo '<li><a class="dropdown-item" href="javascript:void(0);" onclick="loadContent(\'' . $row["id"] . '\');">' . $row["title"] . '</a></li>';
              }
              ?>
            </ul>
<li class="nav-item dropdown">
<a aria-expanded="false" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="navbarDropdown2" role="button">
        Legion's Objects
    </a>
<ul aria-labelledby="navbarDropdown2" class="dropdown-menu">
<?php
        while ($row2 = $result2->fetch_assoc()) {
            echo '<li><a class="dropdown-item" href="javascript:void(0);" onclick="loadContent(\'' . $row2["id"] . '\');">' . $row2["title"] . '</a></li>';
        }
        ?>
    </ul>
</li>
</li>
<form class="d-flex">
  <div class="input-group">
    <input aria-label="Search" class="form-control me-2" id="search-box" placeholder="Find an Object" type="search"/>
    <div class="input-group-append">
      <span class="input-group-text"><i class="fas fa-search"></i></span>
    </div>
  </div>
</form>
</ul>
</div>
</div>
</nav>
<main id="main-content">
<!-- Main content -->
<p>
      In any city, in any country, there's a mental institution or halfway house you can try any of these in. There were 2538 of these Objects, but 2000 were lost.
      <br/><br/>
      The remaining 538 must never come together. Ever.
      <br/><br/>
      These stories have been gathered from various sources, many of which are questionable at best, but they all follow a similar thread; they tell the tale of a number of Objects, which, when brought together, will bring about horrendous consequences, details of which <a onclick="loadContent('1')" style="color:blue"> drive most people mad.</a>
<br/>
<br/>The veracity of the stories is always in question; this is how it is intended to be. Nobody really knows if these Objects are real, or if there are indeed a set number of Objects that exist in the world that <a onclick="loadContent('490')" style="color:blue">yearn for a reunion with their kin.</a> Speculation runs rampant; part of what makes the Holders stories so enticing is the possibility any person could go into a special institution, ask to visit a Holder, and be forced to undergo a test of power to earn an Object.
      <br/>
<br/>Some of the Holders have posted <a onclick="loadContent('173')" style="color:blue">their own</a><a onclick="loadContent('376')" style="color:blue"> stories</a> adding to the mystery of an already eerie and unnerving series. This site is merely an archive; the Holders themselves have leaped around the fields of realm and lore since time immemorial, and the Objects are restless for their Reunion.
      <br/>
<br/>The Objects, while powerful and fearsome, lack the ability to freely gather together of their own volition, and so have called forth a need in certain individuals. These people become Seekers</p>, their stories as twisted and damned as the Objects themselves. These Seekers have oft set out for three main reasons: to Seek for Power, to Seek for Reunion, or to Seek for Separation. Their goals are known to mutate and change them into villains and monsters but we can only hope that one with a just heart prevails over these foes.
      <br/>
<br/>There may very well be a reason that you have come across this site, dear reader. Perhaps the Objects are <a onclick="loadContent('1')" style="color:blue">calling.</a>
<br/>
<br/><a class="animate-color" onclick="loadContent('1')" style="animation: animate-color 3s infinite; text-decoration: none;">Will you answer?</a>

</main>
<footer>
<br/>
<!-- Footer content -->
<b>Original Site: <a href="https://web.archive.org/web/20200629152446/http://theholders.org/?Special:Main">theholders.org</a> and all authors of the stories involved including the original 4chan post</b>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script crossorigin="anonymous" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="main.js"></script>

</footer>
</body>
</html> 