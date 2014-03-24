angular.module('jangular.paginate', [])
	.directive('jPaginate', function(){


		

		var defaults = {

				        containerID: "",
				        first: false,
				        previous: "←",
				        next: "→",
				        last: false,
				        links: "numeric", // blank || title
				        startPage: 1,
				        perPage: 5,
				        midRange: 3,
				        startRange: 1,
				        endRange: 1,
				        keyBrowse: false,
				        scrollBrowse: false,
				        pause: 0,
				        clickStop: false,
				        delay: 50,
				        direction: "forward", // backwards || auto || random ||
				        animation: "", // http://daneden.me/animate/ - any entrance animations
				        fallback: 400,
				        minHeight: true,
				        callback: undefined // function( pages, items ) { }
		};



		return {
			restrict : 'EA',
			scope: true,
			templateUrl: 'partials/pagination.html',
			controller: function ($scope) {

				this.initializePagination = function ( paginationOptions, holder ) {
					
					$scope.options = angular.extend({}, paginationOptions, defaults );					
					
				};


				this.getSafeRange = function(){
					var a = [];
					for(var i = 1; i <= $scope.options.startRange; i++){
						a.push(i);
					}

					for( var j = ($scope.numPages - $scope.options.endRange)+1; j<= $scope.numPages; j++){
						a.push(j);
					}

					return a;
				};

				this.setWatchers = function(){
						var self = this;

						$scope.$watch('[totalRecords, perPage]', function(newValues, oldValues) {
							
							self.totalRecords = newValues[0];
							self.perPage = newValues[1];
							$scope.numPages = Math.ceil(self.totalRecords / self.perPage);
							$scope.numPagesArray = $scope.getNumber($scope.numPages);
							//self.render();
							if( newValues[1] !== oldValues[1] ){
								$scope.linkSelected(1);

							}

							$scope.interval = self.getInterval($scope.next);
							$scope.safeRange = self.getSafeRange();

						}, true);

				};

				this.getInterval = function ( page ) {

				      var neHalf, upperLimit, start, end;

				      neHalf = Math.ceil($scope.options.midRange / 2);
				      upperLimit = $scope.numPages - $scope.options.midRange;
				      start = page > neHalf ? Math.max(Math.min(page - neHalf, upperLimit), 0) : 0;
				      end = page > neHalf ?
				        Math.min(page + neHalf - ($scope.options.midRange % 2 > 0 ? 1 : 0), $scope.numPages) :
				        Math.min($scope.options.midRange, $scope.numPages);
				      return {start: start+1,end: end};
				};

				
			},
			link: function(scope, element, attrs, controller ){
				
				scope.current = 1;
				scope.next = 1;

				

				scope.getNumber = function(n){
					var a = [];
					for( var i = 1; i <= n; i++ ){
						a.push(i);
					}
					return a;
				};


				scope.linkSelected = function(num){
					scope.next = num;
					scope.loadData(num, scope.perPage);
					scope.interval = controller.getInterval(num);
					scope.current = num;
				};

				scope.getPreviousItem = function(){
					scope.linkSelected(scope.current-1);
				};
				scope.getNextItem = function(){
					scope.linkSelected(scope.current+1);
				};

				scope.getMoreItems = function($event){
					if( angular.element($event.target).hasClass('next3') ) {
						scope.linkSelected(scope.current+3);
					}
					else {
						scope.linkSelected(scope.current-3);
					}
				};	

				controller.setWatchers();
				controller.initializePagination( scope.paginationOptions, element );
				
				


				
				

			}

		};
	});

