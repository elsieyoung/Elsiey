'use strict';

angular.module('elsieyApp')
  .controller('EngCtrl', function ($scope, Restangular, $stateParams, $state) {
    var creditsyear = new Date();
    $scope.creditsyr = creditsyear.getFullYear();
    $scope.maxPosts = 1;
    $scope.maxGallery = 10;
    $scope.posts = [];
    $scope.comments = [];
    $scope.gallery = [];
    $scope.captions = [
      '2014 @ LA',
      '2014 @ Route101',
      '2015 @ HK',
      '2015 @ Nara',
      '2014 @ BJ',
      '2013 @ Toronto',
      '2015 @ BJ',
      '2014 @ Toronto',
      '2016 @ Amoy',
      '2016 @ Gulangyu'
    ];

    for (var i = 0; i < $scope.maxGallery; i++) {
      $scope.gallery.push(i);
    }

    $scope.hover = function(pic) {
      $("#caption" + pic).css("visibility","visible");
      $("#caption" + pic).css("opacity","1");
      $("#caption" + pic).html("<p style='color: white; margin-top: 45%;'>" + $scope.captions[pic] + "</p>");
    };

    $scope.leave = function(pic) {
      $("#caption" + pic).css("visibility","invisible");
      $("#caption" + pic).css("opacity","0");
    };

    $scope.comment = {
      author: "",
      body:""
    };


    $scope.selectBlog = function (){
      $scope.isBlog = true;
      $state.go('eng', {'section': 'blog', 'id': null});
    }

    $scope.selectGallery = function (){
      $scope.isBlog = false;
      $state.go('eng', {'section': 'gallery', 'id': null});
    }

    $scope.getComments = function (ind) {
      Restangular.all('api/things/comment/' + ind).getList().then(function (data) {
        //alert(data);
        var length = data.length;
        for (var i = 0; i < length; i++){
          $scope.comments.push({"ind":ind, "name": data[i].name, "comment":data[i].comment, "time":data[i].createdAt});
        }
      });
    };

    // Current post
    $scope.cur_id = $stateParams.id;
    $scope.cur_sec = $stateParams.section;

    if ($scope.cur_sec == 'gallery') {
      $scope.isBlog = false;
    } else if ($scope.cur_sec == 'blog') {
      $scope.isBlog = true;
      $(".content").css("padding", "20px 100px 60px 100px");
      if ($scope.cur_id){
        $scope.isSelected = true;
        $scope.getComments($scope.cur_id);
      } else{
        $scope.isSelected = false;
      }
    }



    $scope.email = function(){
      window.open('mailto:elsieyang93@gmail.com');
    }


    $scope.count = function(){
      Restangular.all('api/things/count').getList().then(function (data) {
        //alert(data[0]);
      });
    }

    //$scope.count();

    $scope.loadBlog = function (ind) {
      Restangular.all('api/things/' + ind).getList().then(function (data) {
        $scope.posts.push({"ind":ind, "title": data[0].title, "abs":$scope.makeAbs(data[0].blog), "blog":data[0].blog, "time":data[0].createdAt});
      });
    };

    $scope.makeAbs = function (blog) {
      if (blog.length > 77) {
        return blog.substring(3, 73).concat("...");
      } else {
        return blog;
      }
    }

    $scope.load = function () {
      for (var i = 1; i <= $scope.maxPosts; i++){
        $scope.loadBlog(i);
      }
    };

    $scope.load();



    $scope.selectTab = function(setTab){
      $state.go('eng', {section: 'blog', id: setTab});
    };

    $scope.submitComment = function () {
      if (!$scope.comment.author || !$scope.comment.body) {
        alert ("Please fill in both your name and the comment!");
      }
      else {
        Restangular.all('/api/things/').post(
          {name: $scope.comment.author, comment: $scope.comment.body, id: parseInt($scope.cur_id)}).then(
          (function (data) {
            window.location.reload();

          }), function (err) {
            alert("Comment error!");
          });
      }

    }

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
      $state.go('eng', {'section' : 'blog', 'id': null});
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
