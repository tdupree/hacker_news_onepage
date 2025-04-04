# Hacker News OnePage

**Version:** 0.9.1 Beta  
**Author:** Tim Dupree  
Website: [http://www.tdupree.com](http://www.tdupree.com)  
Email: tim [AT] tdupree [DOT] com  

**License:**  
Hacker News OnePage is released under the Open Source MIT License.  
(c) 2009 Tim Dupree  

**Original Creation Date:** July 24, 2008  
**Ported from Greasemonkey to Chrome:** June 1, 2009  
**Version 0.9.1 Date:** March 13, 2013  

**Version 0.9.2 Date:** April 4, 2025
**Version 0.9.2 Notes:** Removal of Artical inlining (which never worked) and very quick and dirty use of Copilot to remove jQuery dependacy. No Actual refactor of 2013 code.

## Summary

Provides users with the ability to browse Hacker News articles and comments without leaving the page.  

This is similar to the Greasemonkey version, with the following changes:  
- `unsafeWindow` has been replaced with `contentWindow`.  
- The table-based article header is retained instead of replacing it with the CSS-styled div-based article header.  

The div version handles resizing better, but there was an issue appending it to the DOM, so that line was commented out.