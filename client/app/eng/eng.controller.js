'use strict';

angular.module('elsieyApp')
  .controller('EngCtrl', function ($scope, Restangular, $stateParams, $state) {
    $scope.maxPosts = 2;
    $scope.posts = [];


    // Current post
    $scope.cur_id = $stateParams.id;

    if ($scope.cur_id){
      $scope.isSelected = true;
    } else{
      $scope.isSelected = false;
    }

    $scope.email = function(){
      window.open('mailto:elsieyang93@gmail.com');
    }


    $scope.count = function(){
      Restangular.all('api/things/count').getList().then(function (data) {
        //alert(data[0]);
      });
    }

    $scope.count();

    $scope.getBlog = function (ind) {
      Restangular.all('api/things/' + ind).getList().then(function (data) {
        $scope.posts.push({"ind":ind, "title": data[0].title, "blog":data[0].blog, "time":data[0].createdAt});
      });
    };


    $scope.load = function () {
      for (var i = 1; i <= $scope.maxPosts; i++){
        $scope.getBlog(i);
      }
    };

    $scope.load();



    $scope.selectTab = function(setTab){
      $state.go('eng', {id: setTab});
    };


    $scope.get_title = function(){
      var len = $scope.posts.length;
      for (var i = 0; i < len; i++){
        if ($scope.posts[i].ind == $scope.cur_id){
          return $scope.posts[i].title;
        }
      }
    }

    $scope.get_blog = function(){
      var len = $scope.posts.length;
      for (var i = 0; i < len; i++){
        if ($scope.posts[i].ind == $scope.cur_id){
          return $scope.posts[i].blog;
        }
      }
    }

    $scope.get_time = function(){
      var len = $scope.posts.length;
      for (var i = 0; i < len; i++){
        if ($scope.posts[i].ind == $scope.cur_id){
          return $scope.posts[i].time;
        }
      }
    }

    $scope.goBack = function(){
      $scope.isSelected = true;
      $state.go('eng', {'id': null});
    }
    //$scope.addPost = function(){
    //  $scope.post.createdOn = Date.now();
    //  $scope.post.comments = [];
    //  $scope.post.likes = 0;
    //  $scope.posts.unshift(this.post);
    //  $scope.tab = 0;
    //  $scope.post ={};
    //};
  });
