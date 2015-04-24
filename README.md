NBI Book Details [![Build Status](https://travis-ci.org/jenkinslaw/nbi-bd.png?branch=master)](https://travis-ci.org/jenkinslaw/nbi-bd)
=================

Function:
---------
NBI BOOK DETAILS is a GreaseMonkey user script that extracts the Chapter Listings
from articles at: `http://www.nbi-sems.com/Details.aspx*`, then re-formats
the information and presents it back to the user as an appended div above the 
`details` table.


Installation:
-------------
This is a Greasemonkey user script. To install it, you need Greasemonkey 0.9 or
later: Restart Firefox and open the [nbi_book_details.user.js][1] file.

Firefox  will automatically detect the user script. Accept the default
configuration and install.

To uninstall, go to Tools/Manage User Scripts, select "NBI BOOK DETAILS", and
click *Uninstall*.

Chrome installation requires that you build the project by running `make chrome`
from the root of the project. Use the generated file (`target/nbi_book_details.chrome.user.js`)
as a Chrome extension script.

This step is needed because Chrome does not currently load any required libraries
specified in the GreaseMonkey script configuration.


Modification:
-------------
In order to modify or add new functionality to the script, you will need to edit the
*nbi_book_details.user.js* script file.

This script uses both JQuery and GreaseMonkey scripts.

For a detail explanation on JQuery API usage go to http://api.jquery.com
For a detail description of GreaseMonkey go to the [Grease Monkey][2] main page.


User input:
----
There is no user input for this script.
Once it is installed the script automatically runs when the user goes to a page the 
script is supposed to work in.

   [1]: https://github.com/jenkinslaw/nbi-bd/raw/master/lib/nbi_book_details.user.js
   [2]: http://wiki.greasespot.net/Main_Page
   [3]: http://api.jquery.com/category/selectors
   [4]: http://jdstiles.com/java/cct.html 
