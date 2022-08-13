(function($) {
  
  var ChordProToImg = function() {
    var self = this;
    var Renderer = function() {};

    Renderer.prototype = {
      chordRegex: /\[([^\]]*)\]/,
      inwordRegex: /[a-z]$/,
      settings: {
        topPadding: 50,
        leftPadding: 25,
        margin: 5,
        fontFamily: 'Courier New',
      },
      parsed: false,
      // Initialize renderer
      init: function(form, canvas) {
        var _this = this;
        // Setup input and output elements.
        _this.input = form;
        _this.canvas = canvas;
        _this.setupCanvas();
        
        $(window).on('resize', _this.resizeCanvas.bind(_this));
      },
      // Setup canvas size.
      setupCanvas: function() {
        var _this = this;
        var canvas = _this.canvas[0];
        var canvasW = _this.canvas.parent().width();
        var canvasH = _this.canvas.closest('.container').height();
  
        canvas.width = canvasW;
        canvas.height = canvasH;
        
        canvas.style.fontSize = (canvasW / 400) + 'em';
      },
      // Listener when resize canvas.
      resizeCanvas: function() {
        this.setupCanvas();
        if (this.parsed) {
          this.parse();
        }
      },
      parse: function() {
        var _this = this;
        var info = _this.input;
        var template = info.find('.content').val();
        var canvas = _this.canvas[0];
        var ctx = canvas.getContext("2d");
        // Create ghost canvas
        var ghostCanvas = document.createElement("canvas");
        var gctx = ghostCanvas.getContext("2d");
        var txt = "";
        
        var fontSize = Math.min(parseFloat(canvas.style.fontSize) * 14, 20);
        var position = { x: 0, y: 0}
        // Setup ghostCanvas
        ghostCanvas.width = 9999;
        ghostCanvas.height = 9999;
      
        //Print song Info
        position.x = _this.settings.leftPadding;
        position.y = _this.settings.topPadding;
        gctx.font = fontSize + "px " + _this.settings.fontFamily;
        txt = info.find('.title').val();
        gctx.fillText(txt, position.x, position.y);
        
        position.y += fontSize + _this.settings.margin;
        fontSize = Math.min(parseFloat(canvas.style.fontSize) * 11, 13);
        gctx.font = fontSize + "px " + _this.settings.fontFamily;
        txt = "Key: " + info.find('.key').val();
        gctx.fillText(txt, position.x, position.y);
        
        position.y += fontSize + _this.settings.margin;
        txt = "Performer: " + info.find('.performer').val();
        gctx.fillText(txt, position.x, position.y);
        
        position.y += fontSize + _this.settings.margin;
        txt = "Composer: " + info.find('.composer').val();
        gctx.fillText(txt, position.x, position.y);
        
        position.y += fontSize + _this.settings.margin;
        txt = "Lyricist: " + info.find('.lyricist').val();
        gctx.fillText(txt, position.x, position.y);
        // Add margin.
        position.y += fontSize + _this.settings.margin*5;
        // Print song content.
        var spaceWidth = gctx.measureText(" ").width;
        template.split("\n").forEach(function(line, linenum) {
          /* Comment, ignore */
          if (line.match(/^#/)) {
            return;
          }
          /* Commands, ignored for now */
          else if (line.match(/^{.*}/)) {
            return;
          }
          /* Chord line */
          else if (line.match(_this.chordRegex)) {
            // Track line position.
            var chordPosX = lyricsPosX = position.x;
            var chordPosY = position.y;
            var lyricsPosY = chordPosY + fontSize + _this.settings.margin;
            // Split line.
            var token = line.trim().split(_this.chordRegex);
            token.forEach(function(word, pos) {
              /* Lyrics */
              if ((pos % 2) == 0) {
                // If Chord before lyrics, set lyrics right after the chord.
                if (pos != 0 && (word == ' ' || word.charAt(0) == ' ')) {
                  // exclude space from padding space from chord and lyrics.
                  lyricsPosX = chordPosX - spaceWidth * 2;
                }
                gctx.fillText(word, lyricsPosX, lyricsPosY);
                lyricsPosX += gctx.measureText(word).width;
  
                if (word != "" && pos < token.length - 1) {
                  // Decide add dash or space.
                  var dash = (word.match(_this.inwordRegex) != null);
                  // Add padding to follow chordspace.
                  while (lyricsPosX <= chordPosX) {
                    word = (dash) ? "-" : " ";
                    gctx.fillText(word, lyricsPosX, lyricsPosY);
                    lyricsPosX += gctx.measureText(word).width;
                  }
                }
              }
              /* Chords */
              else { 
                gctx.fillText(word, lyricsPosX, chordPosY);
                // Apply padding so two chords never directly adjacent.
                chordPosX = lyricsPosX + gctx.measureText(word).width + spaceWidth;
              }
            }, this);
            
            // Add space between sentences.
            position.y = lyricsPosY + fontSize + _this.settings.margin*2; 
            return;
          }
          /* Direct print the line */
          else {
            gctx.fillText(line, position.x, position.y);
            position.y += fontSize + _this.settings.margin;
          }
        });
        
        canvas.height = position.y;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvas.getContext('2d').drawImage(ghostCanvas, 0, 0);
        
        _this.parsed = true;
      }
    }
    
    return({
      to_img: function (form, canvas) {
        self.renderer = new Renderer();
        self.renderer.init(form, canvas);
        self.renderer.parse();
      },
      dl_img: function (el) {
        console.log(self.renderer);
        if (self.renderer !== "undefined") {
          if (self.renderer.parsed) {
            el.href = self.renderer.canvas[0].toDataURL();
            el.download = self.renderer.input.find('.title').val() + '.jpg';
          }
          else {
            alert('Please parse a chordpro template first!');
          }
        }
      }
    });
  }();
  
  $(document).ready(function () {
    $('.btn-parse').on('click', function(e) {
      e.preventDefault();
      ChordProToImg.to_img($('.chordpro-form'), $('canvas.mainCanvas'));
    });
    $('.btn-dl').on('click', function(e) {
      this.href = $('canvas.mainCanvas')[0].toDataURL();
      this.download = $('.chordpro-form').find('.title').val() + '.jpg';
    });
  });
  
})(jQuery);