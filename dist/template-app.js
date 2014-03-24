angular.module('templates-app', ['partials/pagination.html']);

angular.module("partials/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/pagination.html",
    "<div class = 'holder'>\n" +
    "<a class=\"jp-first\" ng-if ='options.first'>\n" +
    "	{{options.first}}\n" +
    "</a> \n" +
    "\n" +
    "<a ng-class=\"{'jp-previous jp-disabled':(current==1), 'jp-previous' : (current === 1 && next > 1)}\"\n" +
    "	ng-click = \"getPreviousItem()\">\n" +
    "	{{options.previous}}\n" +
    "</a> \n" +
    "\n" +
    "<a  ng-repeat-start=\"num in numPagesArray track by $index\"\n" +
    "	ng-click = \"linkSelected(num)\"\n" +
    "	ng-class = \"{'jp-hidden' : ( (num < interval.start || num > interval.end) && safeRange.indexOf(num) == -1 ), 'jp-current' : (num === current)}\">{{num}}\n" +
    "</a>\n" +
    "\n" +
    "<span ng-repeat-end \n" +
    "\n" +
    "	  ng-if = \"( num === options.startRange || num === numPages - options.endRange)\" \n" +
    "\n" +
    "	  ng-click = \"getMoreItems($event)\" \n" +
    "	  ng-class = \"{'prev3': (num === options.startRange), 'next3': (num === numPages - options.endRange), 'jp-hidden' :((num === options.startRange) && !(interval.start > options.startRange+1 ||\n" +
    "        (options.startRange === 0 && interval.start > 0))) || ( (num === numPages - options.endRange) &&  !(interval.end < numPages - options.endRange)  ) }\">...\n" +
    "    </span>\n" +
    "\n" +
    "<a ng-class=\"{'jp-next jp-disabled' :(next==numPages), 'jp-next' : (next<numPages)}\" ng-click = \"getNextItem()\" >{{options.next}}</a>\n" +
    "<a class=\"jp-last\" ng-if = 'options.last'>{{options.last}}</a> \n" +
    "\n" +
    "<span>\n" +
    "	per page\n" +
    "	<select ng-model = 'perPage'  ng-options = \"op for op in perPageOptions\">\n" +
    "	</select>\n" +
    "</span>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
