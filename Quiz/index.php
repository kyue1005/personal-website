<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>The Love Quiz</title>
        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.3/css/materialize.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <!-- Compiled and minified JavaScript -->
         <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.3/js/materialize.min.js"></script>
    </head>
    <body class='pink lighten-5'>
        <!-- Page Content goes here -->
        <header>
            <nav class="top-nav">
                <div class="container">
                    <div class="nav-wrapper">
                    <h5><a class="page-title" href="?p=home">Love Quiz</a></h5>
                    </div>
                </div>
            </nav>
        </header>
        <main>
            <div class='container'>
                <?php 
                    include('Views/core.php');
                    require('Views/views.php');
                    $open_date = strtotime(THE_DATE);
                    $now = time();
                    $view_data = array();
                    if ($now < $open_date || $now > ($open_date+86400)) {
                         $view = new view('error');
                    } else if (isset($_GET['p']) && !empty($_GET['p'])){
                        switch ($_GET['p']) {
                            case 'q':
                                session_start();
                                $view = new view('question');
                                $view_data['qna'] = $qna;
                                
                                if (isset($_SESSION['ans'])) {
                                    $view_data['ans'] = $_SESSION['ans'];   
                                }
                                break;
                            case 'result':
                                if (isset($_POST)) {
                                    session_start();
                                    $_SESSION['ans'] = $_POST['q'];
                                    
                                    $view = new view('result');
                                    $view_data['win'] = false;
                                    $score = 0;
                                    
                                    for($i = 0; $i < count($qna); $i++) {
                                        if (isset($_POST['q'][$i]) && $qna[$i]['answer'] == intval($_POST['q'][$i])) {
                                            $score = $score + 1;
                                        }
                                    }
                                    $view_data['score'] = $score;
                                    if ($score === count($qna)) {
                                        $view_data['win'] = true;
                                    }
                                } else {
                                    $view = new view('error');
                                }
                                break;
                            default:
                                session_start();
                                $view = new view('home');
                                session_destroy();
                                break;
                        }
                    } else {
                        session_start();
                        $view = new view('home');
                        session_destroy();
                    }
                    echo $view->render($view_data);
                ?>
            </div>
        </main>
        <footer class="page-footer">
          <div class="container">
            <div class="row">
             <p class="grey-text text-lighten-4">To Kathy - my one and only one!</p>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2015 All right reserved
            </div>
          </div>
        </footer>
    </body>
</html>