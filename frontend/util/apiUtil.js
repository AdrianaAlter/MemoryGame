import CardActions from '../actions/cardActions.js';
import GameActions from '../actions/gameActions.js';
import SessionActions from '../actions/sessionActions.js';
import UserActions from '../actions/userActions.js';

var ApiUtil = {

  fetchCurrentUser: function(completion) {
    $.ajax({
        type: "GET",
        url: "/api/session",
        dataType: "json",
        success: function(currentUser) {
          SessionActions.currentUserReceived(currentUser);
          UserActions.singleUserReceived(currentUser);
        },
        error: function () {
          console.log('Error fetching current user');
        },
        complete: function () {
          completion && completion();
        }
      });
  },

  loadUserInfo: function(id){
    $.ajax({
        type: "GET",
        url: "/api/users/" + id,
        dataType: "json",
        success: function(user) {
          UserActions.singleUserReceived(user);
          SessionActions.currentUserReceived(user)
        },
        error: function () {
          console.log('Error fetching user info');
        }
      });
  },

  fetchAllUsers: function() {
    $.ajax({
        type: "GET",
        url: "/api/users",
        dataType: "json",
        success: function(users) {
          UserActions.allUsersReceived(users);
        },
        error: function () {
          console.log('Error fetching all users');
        }
      });
  },

  logIn: function(userInfo, callback){
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: userInfo,
      success: function (currentUser) {
        SessionActions.currentUserReceived(currentUser);
        UserActions.singleUserReceived(currentUser);
        callback && callback();
      },
      error: function () {
      }
    });
  },

  signUp: function(userInfo, callback){
    $.ajax({
      type: "POST",
      url: "/api/users",
      dataType: "json",
      data: userInfo,
      success: function(currentUser){
        SessionActions.currentUserReceived(currentUser);
        callback && callback();
      },
      error: function () {
        console.log('Error in ApiUtil sign up');
      }
    });
  },

  logOut: function(){
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function () {
        SessionActions.logOut();
        // GameActions.gameReceived([]);
      },
      error: function(){
        console.log('Error in ApiUtil logout');
      }
    });
  },

  getPictures: function(level){
    $.ajax({
      type: "GET",
      url: "https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json",
      dataType: "json",
      success: function(pictures){
        GameActions.picturesReceived(pictures.levels[level].cards);
      }
    });
  },
  createGame: function(game){
    $.ajax({
      type: "POST",
      url: "/api/games",
      dataType: "json",
      data: { game: game },
      success: function(game){
        GameActions.gameStarted(game);
      },
      error: function(){
        console.log("util createGame problem");
      }
    });
  },
  updateGame: function(id, game){
    $.ajax({
      type: "PATCH",
      url: "/api/games/" + id,
      dataType: "json",
      data: { game: game },
      success: function(game){
        GameActions.gameReceived(game);
      },
      error: function(){
        console.log("util updateGame problem");
      }
    });
  },
  fetchGame: function(gameId){
    $.ajax({
      type: "GET",
      url: "/api/games/" + gameId,
      dataType: "json",
      success: function(game){
        GameActions.gameReceived(game);
      },
      error: function(){
        console.log("util updateGame problem");
      }
    });
  },

  deleteGame: function(id){
    debugger
    $.ajax({
      type: "DELETE",
      url: "/api/games/" + id,
      dataType: "json",
      success: function(){
        window.location.href = "/";
      },
      error: function(){
        console.log('Error in ApiUtil deleteGame');
      }
  });
},

  createCard: function(picture, gameId){
    $.ajax({
      type: "POST",
      url: "/api/games/" + gameId + "/cards",
      dataType: "json",
      data: { picture: picture, gameId: gameId },
      success: function(card){
        // debugger
        CardActions.cardAdded(card);
      },
      error: function(){
        console.log("util createCard problem");
      }
    });
  },

  updateCard: function(gameId, cardId, card){
    $.ajax({
      type: "PATCH",
      url: "/api/games/" + gameId + "/cards/" + cardId,
      data: { card: card },
      dataType: "json",
      success: function(card){
        CardActions.updatedCardReceived(card);
      }
    });
  },

  deleteCard: function(gameId, id){
    $.ajax({
      url: "api/games/" + gameId + "/cards/" + id,
      type: "DELETE",
      success: function(){
        // CardActions.receiveList(list);
      },
      error: function () {
        console.log("Error in ApiUtil deleteCard function");
      }
    });
  },

  updateUser: function(userId, user){
    $.ajax({
      type: "PATCH",
      url: "/api/users/" + userId,
      data: { user: user },
      dataType: "json",
      success: function(user){
        SessionActions.currentUserReceived(user)
        UserActions.singleUserReceived(user);
      }
    });
  }
};

export default ApiUtil;
