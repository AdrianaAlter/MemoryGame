const Store = require('flux/utils').Store;
import Dispatcher from '../dispatcher/dispatcher.js';
import PictureConstants from '../constants/pictureConstants.js';

const PictureStore = new Store(Dispatcher);

let _pictures = [];

PictureStore.all = function(){
  return _pictures;
};

PictureStore.resetPictures = function(pictures){
  _pictures = _.shuffle(pictures);
};

PictureStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case PictureConstants.PICTURES_RECEIVED:
      PictureStore.resetPictures(payload.pictures);
      PictureStore.__emitChange();
      break;
  }
};

export default PictureStore;
