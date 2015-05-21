# Backbone Image Uploading Demo

This demo shows how to upload images using Backbone. It also looks at how Backbone and Rails communicate over the wire.

## Links

- [Paperclip](https://github.com/thoughtbot/paperclip#paperclip)
- [Figaro](https://github.com/laserlemon/figaro#why-does-figaro-exist)
- [AWS](http://aws.amazon.com/)
- [ParamsWrapper](http://api.rubyonrails.org/classes/ActionController/ParamsWrapper.html)
- [Backbone toJSON](http://backbonejs.org/docs/backbone.html#section-41)
- [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [readAsDataUrl](https://developer.mozilla.org/en-US/docs/Web/API/FileReader.readAsDataURL)

## Params Wrapper

First we look at how Backbone serializes a model and submits the data over the wire. See how it is a shallow object. In Rails we are used to having our params namespaced under a model's name.

By default Rails will try to do namespace incoming JSON magically using its ParamsWrapper helper. Beware that this tries to infer the model associated to the controller, and then proceeds to look at the database columns for that model. If you add any custom methods or fields to your model, this will not be sufficient and params will be mysteriously missing.

A better solution is to turn this magic behavior off, and properly namespace the JSON before submitting it to Rails. You would do this in Backbone.

Read the Rails docs on [ParamsWrapper](http://api.rubyonrails.org/classes/ActionController/ParamsWrapper.html). Turn it off by putting `wrap_parameters false` in your controller.

Read the Backbone Model docs on [toJSON](http://backbonejs.org/#Model-toJSON), also look at the [annotated source](http://backbonejs.org/docs/backbone.html#section-41) of toJSON. Then see [this easy fix](http://stackoverflow.com/a/6272371) on SO on how to namespace your model correctly.

## Image Uploading

On change of the file input element we instantiate a new [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) object. We ask this reader using the [readAsDataUrl](https://developer.mozilla.org/en-US/docs/Web/API/FileReader.readAsDataURL) method to load the file as a base64 encoded string using the data property. This method passes us a nice string with the data in the callback we supply. From there we can add this data string to the model attributes. Now when the time comes to save the model, this data string get sent nicely along with the other model attributes.

Providing you are using Paperclip, if the name of the model attribute with the file string data matches up with your Rails model attached file setup, it will save just like a regular html form image upload.

After saving your model to Rails, you might want to delete the Backbone model image attribute with the file string data from your Backbone model, as it no longer serves a purpose.

One nice benefit of reading the file as a base64 encoded string using the data: property, is that you can directly set this string as a `src` value to your image tag. This allows you to preview your image for upload immediately.

`<img src="data:image/jpeg;base64,/9j/4QBcRXhpZ..." >`

## Image Missing & Jbuilder

Use a Jbuilder template when generating JSON from Rails. When providing JSON that represents an image url to your attached image (for instance on S3), make sure always to wrap the URL in the asset_path helper as such:

`json.image_url asset_path(post.image.url(:original))`

This way if your Paperclip default_url for a missing image kicks in, it will correctly find it in your Rails Asset Pipeline setup. It may seem to work without in your development environment, but big chances are that this will bite you in production.

`has_attached_file :image, default_url: "missing.png"`


## AWS Paperclip Config

```ruby
# config/application.rb

config.paperclip_defaults = {
  :storage => :s3,
  :bucket => ENV["s3_bucket"],
  :s3_credentials => {
    :access_key_id => ENV["s3_access_key_id"],
    :secret_access_key => ENV["s3_secret_access_key"]
  }
}
```

Store your API keys securely with Figaro.

```ruby
# config/application.yml
development:
  s3_bucket: "XXXX-BUCKET-NAME-DEV"

production:
  s3_bucket: "XXXX-BUCKET-NAME-PRO"

s3_access_key_id: "XXXX"
s3_secret_access_key: "XXXX"
```

Make sure to use separate buckets for development and production. You may want to use the following security policy for your Amazon AWS IAM user.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1420751757000",
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "arn:aws:s3:::XXXX-BUCKET-NAME-DEV",
        "arn:aws:s3:::XXXX-BUCKET-NAME-DEV/*",
        "arn:aws:s3:::XXXX-BUCKET-NAME-PRO",
        "arn:aws:s3:::XXXX-BUCKET-NAME-PRO/*"
      ]
    }
  ]
}
```
