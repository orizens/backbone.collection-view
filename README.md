backbone.collection-view
========================

A collection view support on top of [backbone.beamer](https://github.com/orizens/Backbone.Beamer) extension manager

## dependency
backbone.beamer
a backbone collection

## usage:
a view can be instansiated with a collection:
``` javascript
var musicAlbum = new MusicAlbumView({
    collection: tracksCollectionInstance
  });
```
a view can hold a reference to a collection prototype - and the extension will create a new instance of it:
``` javascript
var MusicAlbum = Backbone.View.extend({
  view: {
    type: MyNiceItemView,
    collection: TracksCollection
  }
});
var nevermindAlbum = new MusicAlbum();
nevermindAlbum.collection.set( tracksArray );
```
if there's no reference to any collection, a new regular backbone collection will be created.

this extension listens to any of these collection events: 'reset destroy add remove sort', and render the collection.

this is a full example of usage:
``` javascript
var MusicStore = Backbone.View.extend({
  view: {
  		type: MusicTrackView,
			
			// optional - a reference to a collection object to create an instance from
			collection: MusicAlbumCollection,

			// custom events of the collection views that this view listens to
			// the config follows Backbone.View events configuration
			events: {
				'MusicTrackView-custom-event': 'onMediaPlayed'
			}

		},

	initialize: function() {

	},

	onMediaPlayed: function() {

	}
});
var myMusicStore = new MusicStore();
myMusicStore.collection.fetch();

// later on an instance of MyNiceItemView-custom-event may raise an event:
MusicTrackViewInstance.trigger('MusicTrackView-custom-event', {
	data: someData
});
```
