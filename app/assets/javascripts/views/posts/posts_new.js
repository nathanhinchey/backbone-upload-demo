BackboneUploadDemo.Views.PostsNew = Backbone.View.extend({

  template: JST['posts/new'],

  events: {
    "submit form": "submit"
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
  }


});
