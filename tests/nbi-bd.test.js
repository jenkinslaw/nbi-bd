/*global title_prepend, phantom, nbi_bd*/

var t = casper.test;
casper.options.clientScripts = [
  'vendor/jquery/jquery.min.js',
  'lib/nbi_book_details.user.js'
]

casper.start();

(function(){
  "use strict";

  casper.start();

  casper.open('tests/includes/test.html')
  .then(function() {

    t.begin("Test page accessible.", 1, function(){
      t.pass("The page is accessible via GET.")

      casper.run(function(){t.done();});
    });

    t.begin("Test title selector.", 1, function(){
      var actual = casper.evaluate(function(){
        return $(nbi_bd.title_selector).length;
      });
      t.assertEqual(actual, 11, "The title selector is working as expected.");

      casper.run(function(){t.done();});
    });

    t.begin("Test title prepend.", 1, function(){
      var title_prepend = casper.evaluate(function() {
        return nbi_bd.title_prepend;
      });
      var actual = casper.evaluate(function(){
        var pattern = nbi_bd.title_prepend
        return $(nbi_bd.title_selector).text().match(pattern).length;
      });

      t.assertEqual(actual, 1, "The title is being prepended with: " + title_prepend);

      casper.run(function(){t.done();});
    });

    t.begin("Test div.panes element exits.", 1, function(){
      t.assertExists('div.panes', "The div.panes element exists.");

      casper.run(function(){t.done();});
    });

    t.begin("Test correct Overview selector.", 1, function(){
      var actual = casper.evaluate(function(){
        return $('ul.tabs li :first').text();
      });
      t.assertEqual(actual, "Overview", "The overview tab selector works as expected.");
      casper.run(function(){t.done();});
    });

    t.begin("Test OCLE content is generated.", 1, function(){
      var content = casper.evaluate(function(){
        return nbi_bd.OCLC_content;
      });
      t.assert(content !== '', "The OCLC content string is not empty.");

      casper.run(function(){t.done();});
    });

    t.begin("Test Grease Monkey element added.", 1, function(){
      t.assertExists('.greasemonkey', "The Grease Monkey element has been added.");

      casper.run(function(){t.done();});
    });

  });

  casper.run(function(){t.done();});
}());
