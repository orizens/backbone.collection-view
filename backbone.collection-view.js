/*
	usage:
	======
	var layout = Backbone.View.extend({
		view: {
			type: MyNiceItemView,
			target: '.a-selector-under-this-el'
		},
		
		initialize: function() {
			
		}
	});
	
	@version 0.2
*/
(function(){

	// check for Backbone
	// check for Underscore
	var _ = this._;
	var Backbone = this.Backbone;

	// if Underscore or Backbone have not been loaded
	// exit to prevent js errors
	if (!_ || !Backbone || !JSON) {
		return;
	}

	
	// defintion of Extension
	function CollectionView(view) {
		this.cv_views = [];
		if (view.collection) {
			return;
		}
		// initialize collection if given
		if (view.view && view.view.collection) {
			this.collection = new view.view.collection();
		} else {
			this.collection = new Backbone.Collection();
		}

		this.$target = view.view.target ? view.$(view.view.target) : this.$el;
		// bind to events of views if given
		
		// view.listenTo(this.collection, 'reset update', this.render);
	}

	CollectionView.prototype = {
		render: function() {
			// this.trigger('before:render');
			this.resetViews();
			this.$target.append( this.collection.map(this.renderItem, this) );
			this.trigger('view-after:render');
		},

		renderItem: function(model) {
			var index = this.cv_views.length,
				view = this.view.type;
			this.cv_views.push(new view({ model: model }));
			if (this.view.events) {
				_.each(this.view.events, function(method, _event){
					this.listenTo(this.cv_views[index], _event, this[method]);
				}, this);
			}
			return this.cv_views[index].render().el;
		},

		resetViews: function() {
			_.invoke(this.cv_views, 'remove');
			this.cv_views.length = 0;
		},

		_hide: function() {
			this.$el.removeClass(this.transition.css);
		},

		_show: function () {
			this.$el.addClass(this.transition.css);
		}
	};

	var init = function() {
		Backbone.trigger('extend:View', {
			key: 'view',
			extension: CollectionView,
			initialize: function () {
				this.listenTo(this.collection, 'add', function(model){
					this.$target.append(this.renderItem(model));
				});
				this.listenTo(this.collection, 'remove', function(model){
					this.render();
				});
				this.listenTo(this.collection, 'reset change destroy sort', function(){
					this.render();
				});
			}
		});
	};

	init();

	// if using AMD and xManager is loaded after the extension
	Backbone.on('xManager:ready', init);
}());
