<?php if ($win): ?>
    <h4> Congratulations! </h4>
    <h2> You win!!! </h2>
    <h4>Now go to ask for your prize!</h4>
<?php else: ?>
    <p>You score: </p>
    <h2> <?php echo $score; ?>/10 ! </h2>
    <p><a href="?p=q">Try again!</a></p>
<?php endif; ?>