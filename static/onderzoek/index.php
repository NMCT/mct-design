<?php

/*
* By adding a static php file for this url, we can redirect to the correct external website, this is something Hugo can't do (at 04/2024)
*/

// Redirect to the correct external website
header('Location: https://ailab.howest.be/', true, 301);
exit;


?>
