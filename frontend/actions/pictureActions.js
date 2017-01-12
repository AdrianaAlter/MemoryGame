import Dispatcher from '../dispatcher/dispatcher.js';
import PictureConstants from '../constants/pictureConstants.js';

const PictureActions = {
  picturesReceived: function(pictures){
    Dispatcher.dispatch({
      actionType: PictureConstants.PICTURES_RECEIVED,
      pictures: pictures
    });
  }
};

export default PictureActions;
