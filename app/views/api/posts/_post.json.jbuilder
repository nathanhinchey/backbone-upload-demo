json.(post, :id, :title, :created_at, :updated_at)
json.image_url asset_path(post.image.url(:original))