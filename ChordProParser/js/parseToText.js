/*
 * Copyright (c) 2011 Jonathan Perkin <jonathan@perkin.org.uk>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

/*
 * Project page:  http://github.com/jperkin/chordpro.js/
 * Personal page: http://www.perkin.org.uk/
 */

/*
 * Shamelessly based on mustache.js as I have no JS skills and likely Jan has
 * lots I can steal^Wre-use.  One day I might actually understand all this :)
 */
(function ($) {
  
  var ChordProToTxt = function() {
    var Renderer = function() {};
  
    Renderer.prototype = {
      chordRegex: /\[([^\]]*)\]/,
      inwordRegex: /[a-z]$/,
      container: '',
  
      /* Parse a ChordPro template */
      parse: function(form) {
        this.container.empty();
        
        // Print song info.
        this.container.append($('<span class="line">').html(form.find('.title').val() + "&nbsp;<br/>"));
        this.container.append($('<span class="line">').html('Key: ' + form.find('.key').val() + "&nbsp;<br/>"));
        this.container.append($('<span class="line">').html('Performer: ' + form.find('.performer').val() + "&nbsp;<br/>"));
        this.container.append($('<span class="line">').html('Composer: ' + form.find('.composer').val() + "&nbsp;<br/>"));
        this.container.append($('<span class="line">').html('Lyricist: ' + form.find('.lyricist').val() + "&nbsp;<br/>"));
        this.container.append($('<span class="line">').html("&nbsp;<br/>"));
        
        var template = form.find('.content').val();
        // get spaceWidth
        var spaceLine = $('<span class="line">').html("&nbsp;<br/>");
        this.container.append(spaceLine);
        var spaceWidth = spaceLine[0].getBoundingClientRect().width;
        spaceLine.remove();
 
        template.split("\n").forEach(function(line, linenum) {
          /* Comment, ignore */
          if (line.match(/^#/)) {
            return;
          }
          /* Chord line */
          if (line.match(this.chordRegex)) {
            var chords = $('<span class="line">');
            var lyrics = $('<span class="line">');
            this.container.append(chords, lyrics);

            var token = line.trim().split(this.chordRegex);
            token.forEach(function(word, pos) {
              // Remove word leading space and replace space with &nbsp;
              var $word = $('<span>').html(word.replace(/^\s+/, '').replace(/\s/g, '&nbsp;'));
              /* Lyrics */
              if ((pos % 2) === 0 && word !== '') {
                // Pre-padding lyrics, if chords go first
                if (pos !== 0 && (word == ' ' || word.charAt(0) == ' ')) {
                  while ((chords[0].getBoundingClientRect().width - lyrics[0].getBoundingClientRect().width) > spaceWidth / 2) {
                    lyrics.append($('<span>').html("&nbsp;"));
                  }
                }
                // Add word to line.
                lyrics.append($word);
                
                var wordlen = $word.width();
                if (word !== "" && pos < token.length - 1) {
                  chords.append($('<span>').html("&nbsp;"));
                  // Decide add dash or space.
                  var dash = (word.match(this.inwordRegex) !== null);
                  // Add padding to follow chordspace.
                  while (lyrics.width() <= chords.width()) {
                    word = (dash) ? "-" : "&nbsp;";
                    lyrics.append($('<span>').html(word));
                  }
                }
                // Pad chord to same length as lyrics.
                while ((lyrics[0].getBoundingClientRect().width - chords[0].getBoundingClientRect().width) > spaceWidth / 2) {
                  chords.append($('<span>').html("&nbsp;"));
                }
              }
              /* Chords */
              else {
                chord = word.replace(/[[]]/, "");
                chords.append($('<span>').html(chord));
                while ((lyrics[0].getBoundingClientRect().width - chords[0].getBoundingClientRect().width) > spaceWidth / 2) {
                  chords.append($('<span>').html("&nbsp;"));
                }
              }
            }, this);
            
            chords.after($("<br/>"));
            lyrics.after($("<br/>"));
            return;
          }
          /* Commands, ignored for now */
          if (line.match(/^{.*}/)) {
            return;
          }
          /* Anything else */
          this.container.append($('<span class="line">').html(line + "&nbsp;<br/>"));
        }, this);
      },
    };
  
    return({
      to_txt: function(form, container) {
        var renderer = new Renderer();
        renderer.container = container;
        renderer.parse(form);
      }
    });
  }();
  
  $(document).ready(function() {
    $('.btn-parse').on('click', function(e) {
      e.preventDefault();
      ChordProToTxt.to_txt($('.chordpro-form'), $('.output-content'));
    });
  });

})(jQuery);