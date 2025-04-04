/*
 *	Name:		Hacker News OnePage
 *	Version:	0.9.1 Beta
 *  Author:		Tim Dupree
 *				http://www.tdupree.com
 *				email: tim [AT] tdupree [DOT] com
 *
 *	License:	Hacker News OnePage is released under the Open Source MIT License
 *				(c) 2009 Tim Dupree
 *
 *	Original Creation Date:		July 24, 2008
 *  Ported from Greasemonkey to Chrome:   June 1, 2009
 *  Version 0.9.1 Date: March 13, 2013
 * 
 *  Version 0.9.2 Date: April 4, 2025
 *  Version 0.9.2 Notes: Removal of Artical inlining (which never worked) and very quick and dirty use of Copilot to remove jQuery dependacy. No Actual refactor of 2013 code.
 *
 *	Summary:	Provides users with the ability to browse Hacker News articles and comments without leaving the page.
 */

	// Change these iFrame defaults if you wish to tweak the height
	// and width of the article and comments viewports
	var iFrameHeight = "93%";
	var iFrameWidth = "100%";

	// default bg Highlight Color displayed for any visited articles/comments
	var highlight = "#FFE4CF";

	// Let the Fun Begin
	function letsVanillaJS() {
		// The following html is left uncondensed so that others may better follow/modify it
		var accordian = '<div id="accordian">' +
					'<h3 id="commentsToggle" class="toggler">Comments</h3><div class="element" id="commentsWrapper"><iframe id="iComments" src="" /></div>' +
				'</div>';

		// avoid modifying the comments and login pages when adding
		// the new UI by not modifying pages with forms
		var hasForm = document.querySelectorAll("body form");
		if (hasForm.length <= 1) {
			var firstCenter = document.querySelector("center");
			if (firstCenter) {
				var wrapper = document.createElement("div");
				wrapper.id = "wrapper";
				var newsColumn = document.createElement("div");
				newsColumn.id = "news_column";
				wrapper.appendChild(newsColumn);
				firstCenter.parentNode.insertBefore(wrapper, firstCenter);
				newsColumn.appendChild(firstCenter);
				firstCenter.outerHTML = firstCenter.innerHTML;
			}

			var firstTable = document.querySelector("table");
			if (firstTable) {
				firstTable.setAttribute("width", "100%");
			}

			var newsColumnElement = document.getElementById("news_column");
			if (newsColumnElement) {
				newsColumnElement.insertAdjacentHTML("afterend", accordian);
			}
		}

		// build object arrays containing the article title links and comments links
		var articleComments = document.querySelectorAll(".subtext a:last-child");
		  

		// add click function to comments links to open them in the comments pane
		articleComments.forEach(function (link) {
			link.addEventListener("click", function (event) {
				event.preventDefault();
				link.style.background = highlight;
				var commentsUrl = link.getAttribute("href");
				var iComments = document.getElementById("iComments");
				if (iComments) {
					iComments.setAttribute("src", commentsUrl);
				}
				var commentsToggle = document.getElementById("commentsToggle");
				if (commentsToggle) {
					var nextElement = commentsToggle.nextElementSibling;
					if (nextElement) {
						nextElement.style.display = "block";
					}
				}
				window.scrollTo(0, 0);
			});
		});

		// add height and width properties to iFrames
		var iFrames = document.querySelectorAll("iframe");
		iFrames.forEach(function (iFrame) {
			iFrame.style.width = iFrameWidth;
			iFrame.style.height = iFrameHeight;
		});

		// add the css
		var css = `
			html, body {
				height: 99.5%;
				padding: 2px;
				margin: 0px;
			}
			#header {
				font-size: 12px;
			}
			#logo {
				float: left;
			}
			#menu_wrapper {
				float: left;
				padding-left: 5px;
			}
			#menu_head {
				clear: both;
				font-size: 14px;
			}
			#login {
				float: right;
				text-align: right;
				padding-right: 5px;
			}
			#news_column {
				float: left;
				width: 35%;
				padding-bottom: 5px;
				height: 98%;
				overflow-x: hidden;
				overflow-y: scroll;
			}
			#accordian {
				float: left;
				width: 64%;
				padding-left: 5px;
			}
			h3.toggler {
				cursor: pointer;
				font-family: Arial, Helvetica, sans-serif;
				font-size: 12px;
				background: #FF6600;
				color: #000000;
				margin: 0px 0px 1px 0px;
				padding: 1px 0px 1px 3px;
			}
			h3.toggler:hover {
				background: #FF9000;
			}
			#iComments, #iArticle {
				width: 100%;
				height: 93%;
				border: none;
			}
			a img {
				border: none;
			}
			a:visited {
				background-color: #FFE4CF;
			}
		`;
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		styleElement.innerHTML = css;
		document.head.appendChild(styleElement);
	}

	letsVanillaJS();
