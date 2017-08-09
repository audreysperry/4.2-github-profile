let $ = require('jquery');
let handlebars = require('handlebars');
let token = require('./githubtoken.js').token;



init();


function displayUserInfo(user){
  var $userProfile = $('#user-profile-info');
  var source = $('#user-profile-template').html();
  var template = handlebars.compile(source);

    var $userInfo = $(template(user));
    $userProfile.append($userInfo);
}

function displayMiniPhoto(user){
  var $repoNav = $('#repo-photo');
  var source = $('#repo-photo-template').html();
  var template = handlebars.compile(source);

  var $miniPhoto = $(template(user));
  $repoNav.append($miniPhoto);
}

function displayRepoInfo(repos){
  var $repoList = $('#repo-info');
  var source = $('#repo-template').html();
  var template = handlebars.compile(source);

  console.log(repos);

  repos.forEach(function(repo){
    var $reposInfo = $(template(repo));
    $repoList.append($reposInfo);
  });

}
var options = {
  headers: {
    'Authorization': 'token' + token
  }
};

function init(){

  var options = {};
  fetch('https://api.github.com/users/audreysperry', options).then(function(response){
    return response.json();
  }).then(function(data){
    console.log(data);
    displayUserInfo(data);
    displayMiniPhoto(data);
  });

  fetch('https://api.github.com/users/audreysperry/repos', options).then(function(response){
    return response.json();
  }).then(function(data){
    console.log(data);
    displayRepoInfo(data);
  });

}
