// ==UserScript==
// @name NBI BOOK DETAILS
// @namespace http://jenkinslaw.org
// @description Extract Chapter Listings from NBI Book Details
// @downloadURL https://github.com/jenkinslaw/nbi-bd/raw/master/lib/nbi_book_details.user.js
// @include http://www.nbi-sems.com/Details.aspx/*
// @grant GM_xmlhttpRequest
// @require http://code.jquery.com/jquery-2.0.3.min.js
// @version 0.0.1
// ==/UserScript==

/**
* @fileoverview This script extracts overview details NBI pages at
*               http://www.nbi-sems/Details.aspx/* and reformats the
*               information and presenting it to the user.
*
* @auther by David Kinzer Released under the GPL license
*         http://www.gnu.org/copyleft/gpl.html
*
* --------------------------------------------------------------------
*
* This is a Greasemonkey user script. To install it, you need Greasemonkey 0.9
* or later: http://greasemonkey.mozdev.org/ Then restart Firefox and revisit
* this script. Under Tools, there will be a new menu item to "Install User
* Script". Accept the default configuration and install.
*
* To uninstall, go to Tools/Manage User Scripts, select "NBI Book Details", and
* click Uninstall.
*
* --------------------------------------------------------------------
*/

// @include_jquery
var nbi_bd = function(){};

(function() {
  "use strict";

  nbi_bd.title_prepend = "_title_prepend_";
  nbi_bd.title_selector = "div.panes div.tabContent:first p";

  nbi_bd.itemized = function(index) {
    var itemizedRegex = /^[0-9 -()+]+\./;
    return itemizedRegex.test($(this).text());
  };

  $(nbi_bd.title_selector).filter(nbi_bd.itemized).prepend(nbi_bd.title_prepend);

  // Select all tagged text.
  nbi_bd.OCLC_content = $(nbi_bd.title_selector).filter(':contains(_title_prepend_)').text();
  console.log(nbi_bd.OCLC_content);

  // Prepend OCLC formated text to table for easy access.
  $("ul.tabs")
  .prepend("<div class='greasemonkey' style='color:green'>" +
    get_OCLC(nbi_bd.OCLC_content) + "</div>");

  // Bring overview tab to focus.
  $('ul.tabs li :first').click();

  /**
  * Returns OCLC formatted string
  *
  * @param {String}
  *          content This is the string we need to validate
  * @return {String} OCLC_cotent This is the OCLC view formatted string
  */
  function get_OCLC(content) {

    var OCLC_string = '';
    var filter = [];

    // Add any filters we need here as a filter[key] = value pairs.
    // Use charcodes or you'll run into troubles.
    filter['_title_prepend_[0-9]+.'] = '_title_prepend_';
    filter[String.fromCharCode(45)] = String.fromCharCode(32);
    filter[String.fromCharCode(173)] = String.fromCharCode(32);
    filter._title_prepend_ = String.fromCharCode(32, 45, 45, 32, 450, 116, 32);
    filter[String.fromCharCode(167)] = String.fromCharCode(32, 115, 101, 99, 46, 32);
    filter[String.fromCharCode(182)] = String.fromCharCode(32, 115, 101, 99, 46, 32);
    filter[String.fromCharCode(32)] = String.fromCharCode(32);
    filter['Chapter [0-9]*:'] = '';


    if (content !== undefined) {

      // Remove any character that is not ASCII.
      for (var character in content) {
        if (content.charCodeAt(character) <= 127) {
          OCLC_string += content[character];
        } else {
          OCLC_string += " ";
        }

      }

      var reg = new RegExp();

      // Filter the string with our filter.
      for (var key in filter) {
        reg = new RegExp(key, "g");
        OCLC_string = OCLC_string.replace(reg, filter[key]);

      }

      // Remove first two dashes from the front of string.
      OCLC_string = OCLC_string.replace('--', '');

      return OCLC_string;

    }
  }

}());
