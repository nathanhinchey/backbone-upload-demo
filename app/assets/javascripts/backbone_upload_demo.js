window.BackboneUploadDemo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.$rootEl = $("body");
    this.posts = new BackboneUploadDemo.Collections.Posts();
    this.router = new BackboneUploadDemo.Routers.Posts();

    this.posts.fetch();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  BackboneUploadDemo.initialize();
});
