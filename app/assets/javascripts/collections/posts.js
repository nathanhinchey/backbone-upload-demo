BackboneUploadDemo.Collections.Posts = Backbone.Collection.extend({

  model: BackboneUploadDemo.Models.Post,
  url: "api/posts",
  comparator: function(model){
    return -model.id;
  }

});
