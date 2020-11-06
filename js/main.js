/**
 * @author Matteo Fattorini
 * @date 06/11/2020
 * @name Simon's
 */

$(document).ready(function () {
  var $boxes = $(".simon-box");

  var altSequence = [];

  function colorTry(times) {
    roundss = 0;

    var colorme = setInterval(function () {
      $boxes.removeClass("color");
      $($boxes[altSequence[roundss]]).addClass("color");
      roundss++;

      if (roundss == times) {
        clearInterval(colorme);
        setTimeout(function () {
          $boxes.removeClass("color");
        }, 500);
      }
    }, 500);
  }

  //click del pulsante start, nasconde le istruzioni e mostra il campo di gioco
  $("#startGame").click(function () {
    $("#instructions").hide();
    $(".game-container").show();
    for (var i = 0; i < 100; i++) {
      altSequence.push(Math.floor(Math.random() * 8));
    }

    for (var i = 0; i < 100; i++) {
      if ((altSequence[i] === altSequence[i + 1]) || (altSequence[i] === altSequence[i + 1])) {
        if (altSequence[i] === 8) {
          altSequence[i] = 7;
        } else {
          altSequence[i]++;
        }
      }
    }
  });

  level = 1;
  clicked = false;
  // click sul pulsante next round. Va al round successivo
  $("#main-btn").click(function () {
    
    if (game && !clicked) {
      userPicks = [];
      colorTry(level);
      clicked = true;
      console.log(roundss);
    }
  });

  userPicks = [];
  game = true;
  toggle = true;

  //click sui vari box, memorizza la sequenza finche gli array non sono lunghi uguali, poi li confronta
  $(".simon-box").click(function () {
    if (game == false) {
      $("#score-text").html("Refresha per rigiocare!").css("color", "red");
    } else {
      userPicks.push($(this).index());
      if (userPicks.length == level) {
        for (var i = 0; i < userPicks.length; i++) {
          if (userPicks[i] == altSequence[i]) {
            toggle = true;
          } else {
            toggle = false;
          }
        }
        if (toggle) {
          clicked = false;
          ++level;
          $("#round-level").html(level);
        } else {
          $("#main-btn").hide();
          $("#score-text")
            .html(
              "Hai Perso :( " + "<br>" + "Sei arrivato al livello: " + level
            )
            .css("color", "red");
          game = false;
        }
      }
    }
  });
});
