/* @module HomeView */


/* imports */

// keeping the `var`: https://gist.github.com/maniart/4e7d3395ce0e55f2e67d
var fs = require('fs');
var $ = require('jquery')
  , Backbone = require('backbone')
  , _ = require('underscore')
  , videojs = require('videojs')


/* modules */

  , AuthView = require('./AuthView')


/* vars */

  , $window = $(window);

Backbone.$ = window.$;





/* exports */

module.exports = AuthView.extend({
  
  $container: $('.app-container'),
  
  $scrollLink: $('.js-scroll-below-fold'),

  video : null,

  template: _.template(fs.readFileSync(__dirname + '/../templates/home.html').toString()),

  videoTemplate : _.template(fs.readFileSync(__dirname + '/../templates/video.html').toString()),
        
tagName: 'section',
        
  attributes: {
      'class' : 'home-view'
  },

  _getContainerHeight: function _getContainerHeight() {
    return this.$container.height();
  },

  _scrollBelowFold: function scrollBelowFold(ev) {
    ev.preventDefault();
    $('html, body').animate({scrollTop: this._getContainerHeight() });
  },

  _setupVideo: function _setupVideo() {
    var self = this;
    this.$el.find('.movie-container').append(this.videoTemplate({}));
    this.video = videojs('veesee-video', {
      height: '100%',
      width: '100%',
      controls: true
    }, function() {
      $('.js-play-movie').on('click', function() {
        $('.movie-screenshot, .overlay-title').fadeOut(300, function() {
          $('.video-js').fadeIn(300, function() {
            self.video.play();  
          });
        });
        
      });
    }).on('ended', function() {
      $('.video-js').fadeOut(300, function() {
          $('.movie-screenshot, .overlay-title').fadeIn(300);
        });
    });


  },
        
  _render: function _render() {
      this.$el.html(this.template({}));
      this.$container.html('').append(this.$el);
  },

  afterRender: function afterRender() {
    var self = this;
    this._setupVideo();
    $window.on('scroll', function() {
      self.video.pause();
    });
    return AuthView.prototype.afterRender.apply(this, arguments);
  },
        
  beforeRender: function beforeRender(){
    /*
    var setToken = _.bind(function(token) {
        $('body').attr('data-token', token);
    }, this);

    this.render();
    if(!$('body').attr('data-token')) {
        this.model.fetch({
            success: function success(model, response, options) {
                setToken(response.csrfToken);
            }
        });
    }
    */
  },

  events: {
    'click .js-scroll-below-fold':  function(ev) { this._scrollBelowFold(ev); }
  }  

});