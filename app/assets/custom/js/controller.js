/**
 * Created by konstantin on 29.03.16.
 */

(function(){

    function HeadCtrl ($scope, $timeout){
        this.title = 'Hello';
        $scope.msg = [];

        var source = Rx.Observable.create(function(observer){
            $timeout(function(){
                console.log('timeout hit');
                observer.onNext(23);
                observer.onCompleted();
            }, 1000);
            console.log('started')

        });

        var sub = source.subscribe(
            function(x){
                $scope.msg.push(x);
                console.log('Next: ' + x);
            },
            function(err){
                $scope.msg.push(err)
                console.err('Error: ' + err);
            },
            function(){
                $scope.msg.push('Complete')
                console.info('Complete');
            });

        $timeout(function(){
            sub.dispose()
        }, 500)

    }

    HeadCtrl.$inject = ['$scope', '$timeout'];

    angular.module('App')
        .controller('HeadCtrl', HeadCtrl)
}());