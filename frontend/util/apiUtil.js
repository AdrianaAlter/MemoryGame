import CardActions from '../actions/cardActions.js';
import GameActions from '../actions/gameActions.js';
import PictureActions from '../actions/pictureActions.js';
import SessionActions from '../actions/sessionActions.js';
import UserActions from '../actions/userActions.js';

const ApiUtil = {

  fetchCurrentUser: function(completion){
    $.ajax({
        type: "GET",
        url: "/api/session",
        dataType: "json",
        success: function(currentUser){
          SessionActions.currentUserReceived(currentUser);
          UserActions.singleUserReceived(currentUser);
        },
        complete: function(){
          completion && completion();
        }
      });
  },

  fetchAllUsers: function(){
  $.ajax({
      type: "GET",
      url: "/api/users",
      dataType: "json",
      success: function(users){
        UserActions.allUsersReceived(users);
      }
    });
  },

  logIn: function(userInfo, callback){
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: userInfo,
      success: function(currentUser){
        SessionActions.currentUserReceived(currentUser);
        UserActions.singleUserReceived(currentUser);
        callback && callback();
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
      }
    });
  },

  getPictures: function(level){
    $.ajax({
      type: "GET",
      url: "https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json",
      dataType: "json",
      success: function(pictures){
        PictureActions.picturesReceived(pictures.levels[level].cards);
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
      }
    });
  },

  updateGame: function(id, game){
    $.ajax({
      type: "PATCH",
      url: `/api/games/${id}`,
      dataType: "json",
      data: { game: game },
      success: function(game){
        GameActions.gameReceived(game);
      }
    });
  },

  deleteGame: function(id){
    $.ajax({
      type: "DELETE",
      url: `/api/games/${id}`,
      dataType: "json",
      success: function(){
        window.location.href = "/";
      }
    });
  },

  createCard: function(picture, gameId){
    $.ajax({
      type: "POST",
      url: `/api/games/${gameId}/cards`,
      dataType: "json",
      data: { picture: picture, gameId: gameId },
      success: function(card){
        CardActions.cardAdded(card);
      }
    });
  },

  updateCard: function(gameId, cardId, card){
    $.ajax({
      type: "PATCH",
      url: `/api/games/${gameId}/cards/${cardId}`,
      data: { card: card },
      dataType: "json",
      success: function(card){
        CardActions.updatedCardReceived(card);
      }
    });
  },

  updateUser: function(userId, user){
    $.ajax({
      type: "PATCH",
      url: `/api/users/${userId}`,
      data: { user: user },
      dataType: "json",
      success: function(user){
        SessionActions.currentUserReceived(user);
        UserActions.singleUserReceived(user);
      }
    });
  }

};

export default ApiUtil;
