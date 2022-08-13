<div class="row">
    <div class="col s12 m12">
        <form id="qna" action="?p=result" method="post">
            <?php for($i = 0; $i < count($qna); $i++) { ?>
            <div class="card">
                <div class="card-image">
                    <img src="images/q-<?php echo $i; ?>.jpg">
                    <span class="card-title pink darken-1">Question <?php echo $i+1; ?></span>
                </div>
                <div class="card-content">
                    <p class="question <?php if (isset($ans[$i]) && intval($ans[$i]) != $qna[$i]['answer']) echo 'red-text'; ?>"><?php echo $qna[$i]['question']; ?></p>
                    <hr>
                    <?php for($j = 0; $j < count($qna[$i]['opts']); $j++) { ?>
                        <p>
                            <?php if (isset($ans[$i]) && intval($ans[$i]) == $j):?>
                            <input class="with-gap" name="q[<?php echo $i; ?>]" type="radio" value="<?php echo $j; ?>" id="a-<?php echo $i; ?>-<?php echo $j; ?>" checked />
                            <?php else:?>
                            <input class="with-gap" name="q[<?php echo $i; ?>]" type="radio" value="<?php echo $j; ?>" id="a-<?php echo $i; ?>-<?php echo $j; ?>" />
                            <?php endif; ?>
                            <label for="a-<?php echo $i; ?>-<?php echo $j; ?>"><?php echo $qna[$i]['opts'][$j] ?></label>
                        </p>
                    <?php } ?>
                </div>
            </div>
            <?php } ?>
            
            <button class="btn-large waves-effect waves-light center-on-small-only" type="submit" name="action" id="submit"> Submit
                <i class="mdi-content-send right"></i>
            </button>
        </form>
    </div>
</div>
<script type="text/javascript">
    $('#qna').submit( function(e){
        var valid = true;
        $('.card .question').removeClass('red-text');
        $('.card').each(function(){
            if (!valid) return;
            if ($(this).find('input:checked').length == 0){
                valid = false;
                $(this).find('.question').addClass('red-text');
                $('html, body').animate({
                    scrollTop: $(this).offset().top
                }, 2000);
                toast('Question '+($(this).index()+1)+' is not answered!', 4000);
            }
        });
        if (!valid) {
            e.preventDefault();
        }
    });
</script>