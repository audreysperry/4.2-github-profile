let $ = require('jquery');
let handlebars = require('handlebars');
let token = require('./githubtoken.js').token;
let moment = require('moment');



init();

//display account nav on page
function displayAccountNav(user) {
  let $repoNav = $('.inner-nav');
  console.log($repoNav);
  let source = $('#repo-nav-template').html();
  console.log(source);
  let template = handlebars.compile(source);

  let $repoNavInfo = $(template(user));
  $repoNav.append($repoNavInfo);
}


//display user profile info on left side of page
function displayUserInfo(user){
  let $userProfile = $('#user-profile-info');
  let source = $('#user-profile-template').html();
  let template = handlebars.compile(source);

    let $userInfo = $(template(user));
    $userProfile.append($userInfo);
}

//display small profile picture in navigation bar
function displayMiniPhoto(user){
  let $repoNav = $('#repo-photo');
  let source = $('#repo-photo-template').html();
  let template = handlebars.compile(source);

  let $miniPhoto = $(template(user));
  $repoNav.append($miniPhoto);
}
//display repo info on page
function displayRepoInfo(repos){
  let $repoList = $('#repo-info');
  let source = $('#repo-template').html();
  let template = handlebars.compile(source);

  repos.forEach(function(repo){
    repo.updated_at = moment(repo.updated_at).fromNow();
    let $reposInfo = $(template(repo));

    // $reposInfo.find('.lang-color').addClass(repo.language);
    $repoList.append($reposInfo);
  });

}
//add github token to authorize api requests
const currentToken = token ? 'token ' + token : '';
const options = {
  headers: {
    'Authorization': currentToken,
    'Accept': 'application/vnd.github.mercy-preview+json'

  }

};
//initiate the fetch requests to github
function init(){

  fetch('https://api.github.com/users/audreysperry', options).then(function(response){
    return response.json();
  }).then(function(data){
    displayUserInfo(data);
    displayMiniPhoto(data);
    displayAccountNav(data);
  });

  fetch('https://api.github.com/users/audreysperry/repos', options).then(function(response){
    return response.json();
  }).then(function(data){
    displayRepoInfo(data);
  });

}
