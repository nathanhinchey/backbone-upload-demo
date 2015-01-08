BackboneUploadDemo.Views.PostsNew = Backbone.View.extend({

  template: JST['posts/new'],

  events: {
    "submit form": "submit",
    "change #input-post-image": "fileInputChange"
  },

  initialize: function(){
    this.model = new BackboneUploadDemo.Models.Post();
    this.model.collection = this.collection;
  },

  render: function(){
    var html = this.template();

    this.$el.html(html);
    return this;
  },

  submit: function(event){
    var that = this;
    var formData = $(event.currentTarget).serializeJSON().post;

    event.preventDefault();

    this.model.save(formData, {
      success: function(){
        that.collection.add(that.model);

        Backbone.history.navigate("", { trigger: true });
      }
    })
  },

  fileInputChange: function(event){
    console.log(event.currentTarget.files[0]);

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
      that.model._image = reader.result;
      console.log(that.model);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
      delete that.model._image;
      console.log(that.model);
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src);
  }


});
