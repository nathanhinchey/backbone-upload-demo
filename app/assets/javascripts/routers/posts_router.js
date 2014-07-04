BackboneUploadDemo.Routers.Posts = Backbone.Router.extend({

  routes: {
    "": "postIndex",
    "new": "postNew"
  },

  postIndex: function(){
    var postIndexView = new BackboneUploadDemo.Views.PostsIndex({
      collection: BackboneUploadDemo.posts
    });
    this._swapView(postIndexView);
  },

  postNew: function(){
    var postNewView = new BackboneUploadDemo.Views.PostsNew({
      collection: BackboneUploadDemo.posts
    });
    this._swapView(postNewView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    BackboneUploadDemo.$rootEl.html(view.render().$el);
  }

});
