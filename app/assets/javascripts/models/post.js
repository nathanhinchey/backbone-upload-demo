BackboneUploadDemo.Models.Post = Backbone.Model.extend({

  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var attributes = _.clone(this.attributes);
    return {post: attributes};
  }

});
