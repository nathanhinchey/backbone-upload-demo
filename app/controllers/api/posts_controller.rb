class Api::PostsController < ApplicationController

  # We want the params nested under post.
  # We can achieve this either by submitting
  # them nested from Backbone, or have Rails
  # magically wrap the params for us. I'm
  # choosing to do it using Backbone.

  # http://api.rubyonrails.org/classes/ActionController/ParamsWrapper.html

  wrap_parameters false
  # wrap_parameters :post, include: [:title, :image]

  def index
    @posts = Post.order(id: :desc).all
    render :index
  end

  def create
    @post = Post.create!(post_params)
    render :show
  end

  private

  def post_params
    params.require(:post).permit(:title, :image)
  end

end