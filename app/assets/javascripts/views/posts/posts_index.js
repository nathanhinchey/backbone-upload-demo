BackboneUploadDemo.Views.PostsIndex = Backbone.View.extend({

  template: JST['posts/index'],

  initialize: function(options){
    this.listenTo(this.collection, "all", this.render);
  },

  render: function(){
    var html = this.template({
      posts: this.collection
    });

    this.$el.html(html);
    return this;
  }

});
