BackboneUploadDemo.Models.Post = Backbone.Model.extend({

  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var json = {post: _.clone(this.attributes)};

    if (this._image) {
      json.post.image = this._image;
    }

    return json;
  }

});
