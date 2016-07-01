(function () {

  "use strict"

  window.GOVUK = window.GOVUK || {};

  window.GOVUK.Transactions = {
    trackStartPageTabs : function (e) {
      var pagePath = e.target.href;
      GOVUK.analytics.trackEvent('startpages', 'tab', {label: pagePath, nonInteraction: true});
    }
  };

})();

$(document).ready(function () {

  var $container = $('section.more');

  if ($container.find('.js-tabs').length) {
    $container.tabs({
      scrollOnload: true
    });
  }

  $('form#completed-transaction-form').
    append('<input type="hidden" name="service_feedback[javascript_enabled]" value="true"/>').
    append($('<input type="hidden" name="referrer">').val(document.referrer || "unknown"));

  $('#completed-transaction-form button.button').click(function() {
    $(this).attr('disabled', 'disabled');
    $(this).parents('form').submit();
  });

  $('.transaction .nav-tabs a').click(window.GOVUK.Transactions.trackStartPageTabs);

});
jQuery(function($) {
    var $yt_links = $("figure a[href*='https://www.youtube.com/watch']");

    // Create players for our youtube links
    $.each($yt_links, function(i) {
        var $holder = $('<span />');
        $(this).parent().replaceWith($holder);
        // Find the captions file if it exists
        var $mycaptions = $(this).siblings('.captions');
        // Work out if we have captions or not
        var captionsf = $($mycaptions).length > 0 ? $($mycaptions).attr('href') : null;
        // Ensure that we extract the last part of the youtube link (the video id)
        // and pass it to the player() method
        var link = $(this).attr('href').split("=")[1];
        // make sure we fetch the right SSL level
        var youTubeURL = (document.location.protocol + '//www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=');
        // Initialise the player
        $holder.player({
            id:'yt'+i,
            media:link,
            captions:captionsf,
            url: youTubeURL,
            flashHeight: '350px'
        });
    });
});
(function() {
  "use strict";

  window.GOVUK = window.GOVUK || {};

  function CheckboxFilter(options){
    var allowCollapsible = (typeof ieVersion == "undefined" || ieVersion > 7) ? true : false;

    this.$filter = options.el;
    this.$checkboxResetter = this.$filter.find('.clear-selected');
    this.$checkboxes = this.$filter.find("input[type='checkbox']");

    this.$checkboxResetter.on('click', $.proxy(this.resetCheckboxes, this));

    this.$checkboxes.on('click', $.proxy(this.updateCheckboxes, this));
    this.$checkboxes.on('focus', $.proxy(this.ensureFinderIsOpen, this));

    // setupHeight is called on open, but filters containing checked checkboxes will already be open
    if (this.isOpen() || !allowCollapsible) {
      this.setupHeight();
    }

    if(allowCollapsible){
      // set up open/close listeners
      this.$filter.find('.head').on('click', $.proxy(this.toggleFinder, this));
      this.$filter.on('focus', $.proxy(this.listenForKeys, this));
      this.$filter.on('blur', $.proxy(this.stopListeningForKeys, this));
    }

  }

  CheckboxFilter.prototype.setupHeight = function setupHeight(){
    var checkboxContainer = this.$filter.find('.checkbox-container');
    var checkboxList = checkboxContainer.children('ul');
    var initCheckboxContainerHeight = checkboxContainer.height();
    var height = checkboxList.height();

    if (height < initCheckboxContainerHeight) {
      // Resize if the list is smaller than its container
      checkboxContainer.height(height);

    } else if (checkboxList.height() < initCheckboxContainerHeight + 50) {
      // Resize if the list is only slightly bigger than its container
      checkboxContainer.height(checkboxList.height());
    }
  }

  CheckboxFilter.prototype.isOpen = function isOpen(){
    return !this.$filter.hasClass('closed');
  }

  CheckboxFilter.prototype.open = function open(){
    this.$filter.removeClass('closed');
    this.setupHeight();
  };

  CheckboxFilter.prototype.close = function close(){
    this.$filter.addClass('closed');
  };

  CheckboxFilter.prototype.listenForKeys = function listenForKeys(){
    this.$filter.keypress($.proxy(this.checkForSpecialKeys, this));
  };

  CheckboxFilter.prototype.checkForSpecialKeys = function checkForSpecialKeys(e){
    if(e.keyCode == 13) {

      // keyCode 13 is the return key.
      this.toggleFinder();
    }
  };

  CheckboxFilter.prototype.stopListeningForKeys = function stopListeningForKeys(){
    this.$filter.unbind('keypress');
  };

  CheckboxFilter.prototype.ensureFinderIsOpen = function ensureFinderIsOpen(){
    if (this.$filter.hasClass('closed')) {
      this.open();
    }
  };

  CheckboxFilter.prototype.toggleFinder = function toggleFinder(){
    if (this.$filter.hasClass('closed')) {
      this.open();
    } else {
      this.close();
    }
  };

  CheckboxFilter.prototype.resetCheckboxes = function resetCheckboxes(){
    this.$filter.find("input[type='checkbox']").prop({
      indeterminate: false,
      "checked": false
    }).trigger('change');
    this.$checkboxResetter.addClass('js-hidden');
    return false;
  };

  CheckboxFilter.prototype.updateCheckboxes = function updateCheckboxes(e){
    // Nested checkboxes affect their ancestors and children
    var checked = $(e.target).prop("checked"),
        container = $(e.target).parent(),
        siblings = container.siblings();

    // Set all children of this checkbox to match this checkbox
    container.find('input[type="checkbox"]').prop({
      indeterminate: false,
      checked: checked
    });

    this.checkSiblings(container, checked);
    this.updateCheckboxResetter();

  };

  CheckboxFilter.prototype.checkSiblings = function checkSiblings(listitem, checked){
    var parent = listitem.parent().parent(),
        all = true;

    // Do all the checkboxes on this level agree?
    listitem.siblings().each(function(){
      return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
    });

    if (all) {
      /*
        If all the checkboxes on this level agree set their shared parent to be the same.
        Then push the changes up the checkbox tree.
      */
      parent.children('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
      });
      this.checkSiblings(parent, all);

    } else {
       // if the checkboxes on this level disagree then set the parent to indeterminate
       listitem.parents('li').children('input[type="checkbox"]').prop({
         indeterminate: true,
         checked: false
       });
     }
   }

  CheckboxFilter.prototype.updateCheckboxResetter = function updateCheckboxResetter(){
    var anyCheckedBoxes = this.$checkboxes.is(":checked"),
        checkboxResetterHidden = this.$checkboxResetter.hasClass('js-hidden');

    if (anyCheckedBoxes && checkboxResetterHidden) {
      this.$checkboxResetter.removeClass('js-hidden');
    } else if (!anyCheckedBoxes && !checkboxResetterHidden) {
      this.$checkboxResetter.addClass('js-hidden');
    }
  };

  GOVUK.CheckboxFilter = CheckboxFilter;
}());
if(typeof window.GOVUK === 'undefined'){ window.GOVUK = {}; }
if(typeof window.GOVUK.support === 'undefined'){ window.GOVUK.support = {}; }

window.GOVUK.support.history = function() {
  return window.history && window.history.pushState && window.history.replaceState;
}
;
(function() {
  "use strict";

  window.GOVUK = window.GOVUK || {};

  var liveSearch = {
    action: false,
    state: false,
    previousState: false,
    resultCache: {},

    $form: false,
    $resultCount: false,
    $ariaLiveResultCount: false,

    init: function(){
      if(GOVUK.support.history()){
        liveSearch.$form = $('.js-live-search-form');
        liveSearch.$ariaLiveResultCount = $('.js-aria-live-count');
        if(liveSearch.$form){
          liveSearch.$resultsBlock = $('.js-live-search-results-block');

          liveSearch.action = liveSearch.$form.attr('action') + '.json';

          liveSearch.saveState();

          liveSearch.$form.on('change', 'input[type=checkbox]', liveSearch.checkboxChange);
          $(window).on('popstate', liveSearch.popState);
        }
      } else {
        $('.js-live-search-fallback').show();
      }
    },
    popState: function(event){
      if(event.originalEvent.state){
        liveSearch.saveState(state);
        liveSearch.updateResults();
        liveSearch.restoreCheckboxes();
        liveSearch.pageTrack();
      }
    },
    pageTrack: function(){
      GOVUK.analytics.setResultCountDimension(liveSearch.cache().result_count);
      GOVUK.analytics.trackPageview(window.location.pathname + window.location.search);
      $(document).trigger("liveSearch.pageTrack");
    },
    checkboxChange: function(e){
      var pageUpdated;
      if(liveSearch.checkFilterLimit(e) && liveSearch.isNewState()){
        liveSearch.saveState();
        pageUpdated = liveSearch.updateResults();
        pageUpdated.done(function(){
          history.pushState(liveSearch.state, '', window.location.pathname + "?" + $.param(liveSearch.state));
          liveSearch.pageTrack();
        });
      }
    },
    checkFilterLimit: function(e){
      var newState = liveSearch.$form.serializeArray(),
          filterCount = 0,
          i, _i;

      for(i=0,_i=newState.length; i<_i; i++){
        if(newState[i].name.lastIndexOf('filter_', 0) === 0){
          filterCount = filterCount + 1;
        }
      }
      if(filterCount >= 15){
        $(e.target).prop('checked', false);
        alert('You can only apply 15 filters at once. Please remove a filter before adding one');
        return false;
      }
      return true;
    },
    cache: function(data){
      if(typeof data === 'undefined'){
        return liveSearch.resultCache[$.param(liveSearch.state)];
      } else {
        liveSearch.resultCache[$.param(liveSearch.state)] = data;
      }
    },
    isNewState: function(){
      return $.param(liveSearch.state) !== liveSearch.$form.serialize();
    },
    saveState: function(state){
      if(typeof state === 'undefined'){
        state = liveSearch.$form.serializeArray();
      }
      liveSearch.previousState = liveSearch.state;
      liveSearch.state = state;
    },
    updateResults: function(){
      if(typeof liveSearch.cache() === 'undefined'){
        liveSearch.showLoadingIndicator();
        return $.ajax({
          url: liveSearch.action,
          data: liveSearch.state,
        }).done(function(response){
          liveSearch.cache(response);
          liveSearch.hideLoadingIndicator();
          liveSearch.displayResults();
        }).error(function(){
          liveSearch.showErrorIndicator();
        });
      } else {
        liveSearch.displayResults();
        var out = new $.Deferred()
        return out.resolve();
      }
    },
    showLoadingIndicator: function(){
      liveSearch.$resultCount = $('#js-live-search-result-count');
      liveSearch._resultCountText = liveSearch.$resultCount.text();
      liveSearch.$resultCount.text('Loading...');
    },
    hideLoadingIndicator: function(){
      liveSearch.$resultCount.text(liveSearch._resultCountText);
    },
    showErrorIndicator: function(){
      liveSearch.$resultCount.text('Error. Please try modifying your search and trying again');
    },
    displayResults: function(){
      var results = liveSearch.cache();

      if(liveSearch.searchTermValue(liveSearch.previousState) === liveSearch.searchTermValue(liveSearch.state)){
        liveSearch.$resultsBlock.find('.js-live-search-results-list').mustache('search/_results_list', results);
      } else {
        liveSearch.$resultsBlock.mustache('search/_results_block', results);
        liveSearch.$resultsBlock.find('.js-openable-filter').each(function(){
          new GOVUK.CheckboxFilter({el:$(this)});
        })
      }
      liveSearch.updateAriaLiveCount();
    },
    restoreCheckboxes: function(){
      liveSearch.$form.find('input[type=checkbox]').each(function(i, el){
        var $el = $(el)
        $el.prop('checked', liveSearch.isCheckboxSelected($el.attr('name'), $el.attr('value')));
      });
    },
    isCheckboxSelected: function(name, value){
      var i, _i;
      for(i=0,_i=liveSearch.state.length; i<_i; i++){
        if(liveSearch.state[i].name === name && liveSearch.state[i].value === value){
          return true;
        }
      }
      return false;
    },
    searchTermValue: function(state){
      if(!state){
        return false
      }
      var i, _i;
      for(i=0,_i=state.length; i<_i; i++){
        if(state[i].name === 'q'){
          return state[i].value;
        }
      }
      return false;
    },
    updateAriaLiveCount: function(){
      liveSearch.$ariaLiveResultCount.text(liveSearch.$resultsBlock.find('.result-count').text());
    }
  };
  GOVUK.liveSearch = liveSearch;
}());
/*

Copyright (c) 2012, Bradley Wright
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
/*
 * mustache-loader.js - Mustache template loader to go with flask-mustache
 *
 * This depends on jQuery, and Twitter's Hogan.js
 * https://github.com/twitter/hogan.js or
 *
 * Usage:
 *
 *   $('#target').mustache('includes/_user.mustache', {user_name:'Jan'});
 *   var html = $.mustache('includes/_user.mustache', {user_name:'Jan'});
 */

/*jslint
 browser: true,
 white: true,
 vars: true
*/

/*globals jQuery */

// authored as a jQuery plugin
(function($) {
    "use strict";

    // this is a cached lookup table of templates
    var cache = {};

    // only load partials once
    var partialsLoaded = false;

    var load = function(templateName) {
        // this function takes names like: "includes/_user.mustache"
        // and loads them from somewhere else.

        // they can be cached as functions, or as strings.
        // Strings are template content.
        if (typeof cache[templateName] === 'undefined') {
            if (document.getElementById(templateName)) {
                // stupid hack to turn HTML-encoded templates into strings, see:
                // http://stackoverflow.com/a/2419664/61435
                cache[templateName] = $('<div />').html(
                    $(document.getElementById(templateName)).html().trim()).text();
            }
            else if (window.templates && templates[templateName]){
                cache[templateName] = templates[templateName];
            }
        }

        return cache[templateName];
    };

    var loadPartials = function() {
        var templateName;

        if (partialsLoaded === false){
            if(typeof window.templates === "undefined"){
                $('script[type="text/mustache"]').each(function(i, el){
                    templateName = $(el).attr('id');
                    // stupid hack to turn HTML-encoded templates into strings, see:
                    // http://stackoverflow.com/a/2419664/61435
                    cache[templateName] = $('<div />').html($(el).html().trim()).text();
                });
            }
            else if (window.templates) {
                for(templateName in templates){
                    cache[templateName] = templates[templateName];
                }
            }
        }
    };


    var render = function(templateName, context) {
        // first we need to try and load the template and partials
        loadPartials();
        var template = load(templateName);

        if (typeof template === 'undefined') {
            $.error('Unknown template ' + templateName);
        }
        // pre-compiled hogan templates are objects
        else if (typeof template === 'object') {
            // template has been pre-compiled, just render and return it
            return template.render(context, cache);
        }

        // template hasn't been pre-compiled yet
        // so we need to do other things
        if (window.Hogan) {
            return window.Hogan.compile(template).render(context, cache);
        }

        // we don't have Hogan so we need to bail
        $.error('Must have Hogan.js to load string templates');
    };

    $.fn.mustache = function(templateName, context) {
        // replaces the content of the passed in element with the content
        // rendered by Mustache

        return this.html(render(templateName, context));
    };

    $.mustache = function(templateName, context) {
        // returns the compiled HTML

        return render(templateName, context);
    };
}(jQuery));
/* Modified to remove `typeof exports` check on final line.
 * Sometimes the `exports` global variable is present through a quirk of dynamically
 * generated heading IDs which the browser makes accessible through the window namespace.
 * eg <h2 id="exports">Exports</h2> becomes `window.exports` and typeof exports is no
 * longer undefined. */

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


if(typeof window.Hogan === 'undefined'){
  window.Hogan = {};
}

(function (Hogan, useArrayBuffer) {
  Hogan.Template = function (renderFunc, text, compiler, options) {
    this.r = renderFunc || this.r;
    this.c = compiler;
    this.options = options;
    this.text = text || '';
    this.buf = (useArrayBuffer) ? [] : '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // tries to find a partial in the curent scope and render it
    rp: function(name, context, partials, indent) {
      var partial = partials[name];

      if (!partial) {
        return '';
      }

      if (this.c && typeof partial == 'string') {
        partial = this.c.compile(partial, this.options);
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ls(val, ctx, partials, inverted, start, end, tags);
      }

      pass = (val === '') || !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        return ctx[ctx.length - 1];
      }

      for (var i = 1; i < names.length; i++) {
        if (val && typeof val == 'object' && names[i] in val) {
          cx = val;
          val = val[names[i]];
        } else {
          val = '';
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.lv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        if (v && typeof v == 'object' && key in v) {
          val = v[key];
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.lv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ho: function(val, cx, partials, text, tags) {
      var compiler = this.c;
      var options = this.options;
      options.delimiters = tags;
      var text = val.call(cx, text);
      text = (text == null) ? String(text) : text.toString();
      this.b(compiler.compile(text, options).render(cx, partials));
      return false;
    },

    // template result buffering
    b: (useArrayBuffer) ? function(s) { this.buf.push(s); } :
                          function(s) { this.buf += s; },
    fl: (useArrayBuffer) ? function() { var r = this.buf.join(''); this.buf = []; return r; } :
                           function() { var r = this.buf; this.buf = ''; return r; },

    // lambda replace section
    ls: function(val, ctx, partials, inverted, start, end, tags) {
      var cx = ctx[ctx.length - 1],
          t = null;

      if (!inverted && this.c && val.length > 0) {
        return this.ho(val, cx, partials, this.text.substring(start, end), tags);
      }

      t = val.call(cx);

      if (typeof t == 'function') {
        if (inverted) {
          return true;
        } else if (this.c) {
          return this.ho(t, cx, partials, this.text.substring(start, end), tags);
        }
      }

      return t;
    },

    // lambda replace variable
    lv: function(val, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = val.call(cx);

      if (typeof result == 'function') {
        result = coerceToString(result.call(cx));
        if (this.c && ~result.indexOf("{\u007B")) {
          return this.c.compile(result, this.options).render(cx, partials);
        }
      }

      return coerceToString(result);
    }

  };

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos =/\'/g,
      rQuot = /\"/g,
      hChars =/[&<>\"\']/;


  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp,'&amp;')
        .replace(rLt,'&lt;')
        .replace(rGt,'&gt;')
        .replace(rApos,'&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(Hogan);
window.templates = {};
window.templates['search/_result'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<li>");_.b("\n" + i);_.b("  <h3><a href=\"");_.b(_.v(_.f("link",c,p,0)));_.b("\" ");if(_.s(_.f("external",c,p,1),c,p,0,43,57,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("rel=\"external\"");});c.pop();}_.b(">");_.b(_.t(_.f("title_with_highlighting",c,p,0)));_.b("</a></h3>");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("debug_score",c,p,1),c,p,0,129,337,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <p class=\"debug-link\">");_.b("\n" + i);_.b("      ");_.b(_.v(_.f("link",c,p,0)));_.b("\n" + i);_.b("    </p>");_.b("\n" + i);_.b("    <p class=\"debug-info\">");_.b("\n" + i);_.b("      <span>Score: ");_.b(_.v(_.f("es_score",c,p,0)));_.b("</span>");_.b("\n" + i);_.b("      <span>Format: ");if(_.s(_.f("government",c,p,1),c,p,0,282,292,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("government");});c.pop();}_.b(" ");_.b(_.v(_.f("format",c,p,0)));_.b("</span>");_.b("\n" + i);_.b("    </p>");_.b("\n");});c.pop();}_.b("\n" + i);if(_.s(_.f("external",c,p,1),c,p,0,370,504,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <p class=\"meta\">");_.b("\n" + i);_.b("      <span class=\"visuallyhidden\">Part of </span>");_.b("\n" + i);_.b("      <span class=\"url\">");_.b(_.v(_.f("display_link",c,p,0)));_.b("</span>");_.b("\n" + i);_.b("    </p>");_.b("\n");});c.pop();}_.b("\n" + i);if(_.s(_.f("metadata_any?",c,p,1),c,p,0,539,647,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <ul class=\"attributes\">");_.b("\n" + i);if(_.s(_.f("metadata",c,p,1),c,p,0,587,621,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li> ");_.b(_.t(_.d(".",c,p,0)));_.b(" </li>");_.b("\n");});c.pop();}_.b("    </ul>");_.b("\n");});c.pop();}_.b("\n" + i);if(_.s(_.f("historic?",c,p,1),c,p,0,683,823,"{{ }}")){_.rs(c,p,function(c,p,_){if(_.s(_.f("government_name",c,p,1),c,p,0,708,800,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <p class=\"historic\">");_.b("\n" + i);_.b("      First published during the ");_.b(_.v(_.f("government_name",c,p,0)));_.b("\n" + i);_.b("    </p>");_.b("\n");});c.pop();}});c.pop();}_.b("\n" + i);_.b("  <p>");_.b(_.t(_.f("description_with_highlighting",c,p,0)));_.b("</p>");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("sections_present?",c,p,1),c,p,0,909,1047,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <ul class=\"sections\">");_.b("\n" + i);if(_.s(_.f("sections",c,p,1),c,p,0,955,1021,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li><a href=\"");_.b(_.v(_.f("link",c,p,0)));_.b("#");_.b(_.v(_.f("hash",c,p,0)));_.b("\">");_.b(_.v(_.f("title",c,p,0)));_.b("</a></li>");_.b("\n");});c.pop();}_.b("    </ul>");_.b("\n");});c.pop();}_.b("\n" + i);if(_.s(_.f("examples_present?",c,p,1),c,p,0,1095,1489,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <ul class=\"examples\">");_.b("\n" + i);if(_.s(_.f("examples",c,p,1),c,p,0,1141,1260,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li>");_.b("\n" + i);_.b("          <h4><a href=\"");_.b(_.v(_.f("link",c,p,0)));_.b("\">");_.b(_.v(_.f("title",c,p,0)));_.b("</a></h4>");_.b("\n" + i);_.b("          <p>");_.b(_.v(_.f("description",c,p,0)));_.b("</p>");_.b("\n" + i);_.b("        </li>");_.b("\n");});c.pop();}_.b("\n" + i);if(_.s(_.f("suggested_filter_present?",c,p,1),c,p,0,1311,1446,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <li>");_.b("\n" + i);_.b("          <h4 class=\"see-all\"><a href=\"");_.b(_.v(_.f("suggested_filter_link",c,p,0)));_.b("\">");_.b(_.v(_.f("suggested_filter_title",c,p,0)));_.b("</a><h4>");_.b("\n" + i);_.b("        </li>");_.b("\n");});c.pop();}_.b("    </ul>");_.b("\n");});c.pop();}_.b("\n" + i);if(!_.s(_.f("examples_present?",c,p,1),c,p,1,0,0,"")){if(_.s(_.f("suggested_filter_present?",c,p,1),c,p,0,1572,1674,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("      <h4 class=\"see-all\"><a href=\"");_.b(_.v(_.f("suggested_filter_link",c,p,0)));_.b("\">");_.b(_.v(_.f("suggested_filter_title",c,p,0)));_.b("</a><h4>");_.b("\n");});c.pop();}};_.b("\n" + i);_.b("</li>");_.b("\n");return _.fl();;});
window.templates['search/_results_block'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");if(_.s(_.d("filter_fields.any?",c,p,1),c,p,0,23,1188,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("  <div class=\"filter-form\">");_.b("\n" + i);_.b("    <div class=\"inner-block\">");_.b("\n" + i);_.b("      <p class=\"info\">Filter by:</p>");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("filter_fields",c,p,1),c,p,0,144,1016,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("        <div class=\"filter checkbox-filter js-openable-filter ");if(!_.s(_.d("options.any?",c,p,1),c,p,1,0,0,"")){_.b("closed");};_.b("\" tabindex=\"0\">");_.b("\n" + i);_.b("          <div class=\"head\">");_.b("\n" + i);_.b("            <span class=\"legend\">");_.b(_.v(_.f("field_title",c,p,0)));_.b("</span>");_.b("\n" + i);_.b("            <div class=\"controls\">");_.b("\n" + i);_.b("              <a class=\"clear-selected ");if(!_.s(_.d("options.any?",c,p,1),c,p,1,0,0,"")){_.b(" js-hidden");};_.b("\">Remove filters</a>");_.b("\n" + i);_.b("              <div class=\"toggle\"></div>");_.b("\n" + i);_.b("            </div>");_.b("\n" + i);_.b("          </div>");_.b("\n" + i);_.b("          <div class=\"checkbox-container\" id=\"");_.b(_.v(_.f("field",c,p,0)));_.b("-filter\">");_.b("\n" + i);_.b("            <ul>");_.b("\n" + i);if(_.s(_.d("options.options",c,p,1),c,p,0,680,939,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("                <li>");_.b("\n" + i);_.b("                  <input type=\"checkbox\" name=\"filter_");_.b(_.v(_.f("field",c,p,0)));_.b("[]\" value=\"");_.b(_.v(_.f("slug",c,p,0)));_.b("\" id=\"");_.b(_.v(_.f("slug",c,p,0)));_.b("\" ");if(_.s(_.f("checked",c,p,1),c,p,0,812,819,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("checked");});c.pop();}_.b(">");_.b("\n" + i);_.b("                  <label for='");_.b(_.v(_.f("slug",c,p,0)));_.b("'>");_.b(_.v(_.f("title",c,p,0)));_.b(" (");_.b(_.v(_.f("count",c,p,0)));_.b(")</label>");_.b("\n" + i);_.b("                </li>");_.b("\n");});c.pop();}_.b("            </ul>");_.b("\n" + i);_.b("          </div>");_.b("\n" + i);_.b("        </div>");_.b("\n");});c.pop();}_.b("\n" + i);_.b("      <div class=\"submit js-live-search-fallback\">");_.b("\n" + i);_.b("        <input type=\"submit\" class=\"button\" value=\"Submit filters\">");_.b("\n" + i);_.b("      </div>");_.b("\n" + i);_.b("    </div>");_.b("\n" + i);_.b("  </div>");_.b("\n");});c.pop();}_.b("\n" + i);_.b("<div class=\"results-block\">");_.b("\n" + i);_.b("  <div class=\"inner-block js-live-search-results-list\">");_.b("\n" + i);_.b(_.rp("search/_results_list",c,p,"    "));_.b("  </div>");_.b("\n" + i);_.b("</div>");_.b("\n");return _.fl();;});
window.templates['search/_results_list'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"result-count ");if(_.s(_.f("is_scoped?",c,p,1),c,p,0,40,61,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(" scoped-result-count ");});c.pop();}_.b("\" id=\"js-live-search-result-count\" aria-hidden='true'>");_.b("\n" + i);if(_.s(_.f("is_scoped?",c,p,1),c,p,0,148,390,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("    <strong>");_.b(_.v(_.f("result_count_string",c,p,0)));_.b(" found in</strong><br>");_.b("\n" + i);_.b("    ");_.b(_.v(_.f("scope_title",c,p,0)));_.b("<br>");_.b("\n" + i);if(_.s(_.f("unscoped_results_any?",c,p,1),c,p,0,263,361,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("      <a href='/search?q=");_.b(_.v(_.f("query",c,p,0)));_.b("'>Display ");_.b(_.v(_.f("unscoped_result_count",c,p,0)));_.b(" from all of GOV.UK</a>");_.b("\n");});c.pop();}});c.pop();}if(!_.s(_.f("is_scoped?",c,p,1),c,p,1,0,0,"")){_.b("    ");_.b(_.v(_.f("result_count_string",c,p,0)));_.b(" found");_.b("\n");};_.b("</div>");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("results_any?",c,p,1),c,p,0,503,1437,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("  <ol class=\"results-list");if(_.s(_.f("debug_score",c,p,1),c,p,0,545,551,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(" debug");});c.pop();}_.b("\" id=\"js-live-search-results\" start=\"");_.b(_.v(_.f("first_result_number",c,p,0)));_.b("\">");_.b("\n" + i);if(_.s(_.f("results",c,p,1),c,p,0,646,832,"{{ }}")){_.rs(c,p,function(c,p,_){if(_.s(_.f("is_multiple_results",c,p,1),c,p,0,677,713,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.rp("search/_sublist",c,p,"        "));});c.pop();}if(!_.s(_.f("is_multiple_results",c,p,1),c,p,1,0,0,"")){_.b(_.rp("search/_result",c,p,"        "));};});c.pop();}_.b("  </ol>");_.b("\n" + i);_.b("\n" + i);_.b("  <ul class=\"previous-next-navigation\">");_.b("\n" + i);if(_.s(_.f("has_previous_page?",c,p,1),c,p,0,921,1149,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("      <li class=\"previous\">");_.b("\n" + i);_.b("        <a href=\"");_.b(_.v(_.f("previous_page_link",c,p,0)));_.b("\">");_.b("\n" + i);_.b("          Previous <span class=\"visuallyhidden\">page</span>");_.b("\n" + i);_.b("          <span class=\"page-numbers\">");_.b(_.v(_.f("previous_page_label",c,p,0)));_.b("</span>");_.b("\n" + i);_.b("        </a>");_.b("\n" + i);_.b("      </li>");_.b("\n");});c.pop();}_.b("\n" + i);if(_.s(_.f("has_next_page?",c,p,1),c,p,0,1197,1409,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("      <li class=\"next\">");_.b("\n" + i);_.b("        <a href=\"");_.b(_.v(_.f("next_page_link",c,p,0)));_.b("\">");_.b("\n" + i);_.b("          Next <span class=\"visuallyhidden\">page</span>");_.b("\n" + i);_.b("          <span class=\"page-numbers\">");_.b(_.v(_.f("next_page_label",c,p,0)));_.b("</span>");_.b("\n" + i);_.b("        </a>");_.b("\n" + i);_.b("      </li>");_.b("\n");});c.pop();}_.b("  </ul>");_.b("\n");});c.pop();}if(!_.s(_.f("results_any?",c,p,1),c,p,1,0,0,"")){_.b("  <div class=\"zero-results\">");_.b("\n" + i);_.b("    <h2>Please try:</h2>");_.b("\n" + i);_.b("    <ul>");_.b("\n" + i);_.b("      <li>searching again using different words</li>");_.b("\n" + i);_.b("      <li>removing your filters</li>");_.b("\n" + i);_.b("    </ul>");_.b("\n" + i);_.b("    <h2>Older content</h2>");_.b("\n" + i);_.b("    <p>");_.b("\n" + i);_.b("      Not all government content published before 2010 is on GOV.UK.");_.b("\n" + i);_.b("      To find older content try searching <a href=\"http://webarchive.nationalarchives.gov.uk/adv_search/?query=");_.b(_.v(_.f("query",c,p,0)));_.b("\">The National Archives</a>.");_.b("\n" + i);_.b("    </p>");_.b("\n" + i);_.b("  </div>");_.b("\n");};return _.fl();;});
window.templates['search/_sublist'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<li class='descoped-results'>");_.b("\n" + i);_.b("  <div class='descope-message'>");_.b("\n" + i);_.b("    <a href='/search?q=");_.b(_.v(_.f("query",c,p,0)));_.b("'>Display ");_.b(_.v(_.f("unscoped_result_count",c,p,0)));_.b(" from all of GOV.UK</a>");_.b("\n" + i);_.b("  </div>");_.b("\n" + i);_.b("  <ol>");_.b("\n" + i);if(_.s(_.f("results",c,p,1),c,p,0,185,216,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.rp("search/_result",c,p,"      "));});c.pop();}_.b("  </ol>");_.b("\n" + i);_.b("</li>");_.b("\n" + i);_.b("\n");return _.fl();;});
(function() {
  "use strict";

  window.GOVUK = window.GOVUK || {};

  var $ = window.jQuery;

  var search = {
    init: function () {
      var $searchResults = $('#results .results-list');

      search.enableLiveSearchCheckbox($searchResults);
      search.trackSearchClicks($searchResults);
      search.trackSearchResultsAndSuggestions($searchResults);
      search.trackSearchResultsAndSuggestionsOnPageTrack($searchResults);
    },
    buildSearchResultsData: function ($searchResults) {
      var searchResultData = {'urls': []},
          searchURLs = search.extractSearchURLs($searchResults),
          searchSuggestion = search.extractSearchSuggestion();

      if (searchURLs.length) {
        searchResultData['urls'] = searchURLs.toArray();
      }

      if (searchSuggestion !== null) {
        searchResultData['suggestion'] = searchSuggestion;
      }

      return searchResultData;
    },
    enableLiveSearchCheckbox: function ($searchResults) {
      if($('.js-openable-filter input[type=checkbox]').length) {
        $('.js-openable-filter').each(function(){
          new GOVUK.CheckboxFilter({el:$(this)});
        });
      }
      GOVUK.liveSearch.init();
    },
    extractSearchSuggestion: function () {
      var $suggestion = $('.spelling-suggestion a');

      if ($suggestion.length) {
        return $suggestion.text();
      } else {
        return null;
      }
    },
    extractSearchURLs: function ($searchResults) {
      if ($searchResults.length <= 0) {
        return [];
      }

      function extractSearchURL(index, element) {
        var foundURL = $(element).find('h3 a');

        if (foundURL.parents('.descoped-results').length) {
          return $.makeArray(foundURL.map(function(index, item) {
            return {
              href: $(item).attr('href'),
              descoped: true
            };
          }));
        } else {
          return {
            href: foundURL.attr('href')
          };
        }
      }

      return $searchResults.children().map(extractSearchURL);
    },
    trackSearchClicks: function ($searchResults) {
      if($searchResults.length === 0 || !GOVUK.cookie){
        return;
      }

      $searchResults.on('click', 'a', function(e){
        var $link = $(e.target),
            sublink = '',
            position, href, startAt;

        var getStartAtValue = function() {
          var queryString = window.location.search,
              startAtRegex = /(&|\?)start=([0-9]+)(&|$)/,
              startAt = 0,
              matches;

          matches = queryString.match(startAtRegex);

          if (matches !== null) {
            startAt = parseInt(matches[2], 10);
          }

          return startAt;
        };

        if ($link.closest('ul').hasClass('sections')) {
          href = $link.attr('href');

          if (href.indexOf('#') > -1) {
            sublink = '&sublink='+href.split('#')[1];
          }

          $link = $link.closest('ul');
        }

        startAt = getStartAtValue();
        position = $link.closest('li').index() + startAt + 1; // +1 so it isn't zero offset
        GOVUK.analytics.callOnNextPage('setSearchPositionDimension', 'position=' + position + sublink);
      });
    },
    trackSearchResultsAndSuggestions: function ($searchResults) {
      var searchResultData = search.buildSearchResultsData($searchResults);

      if (GOVUK.analytics !== undefined &&
          GOVUK.analytics.trackEvent !== undefined &&
          (searchResultData.urls.length || searchResultData.suggestion)) {
        GOVUK.analytics.trackEvent('searchResults', 'resultsShown', {
          label: JSON.stringify(searchResultData),
          nonInteraction: true,
          page: window.location.pathname + window.location.search
        });
      }
    },
    trackSearchResultsAndSuggestionsOnPageTrack: function ($searchResults) {
      if ($searchResults.length) {
        $(document).on('liveSearch.pageTrack', function () {
          var $searchResults = $('#results .results-list');
          search.trackSearchResultsAndSuggestions($searchResults);
        });
      }
    }
  };

  GOVUK.search = search;
  GOVUK.search.init();
}).call(this);
window.GOVUK.Modules = window.GOVUK.Modules || {};

(function(Modules) {
  "use strict";

  Modules.TrackClick = function () {
    this.start = function (element) {
      element.on('click', trackClick);

      var options = {},
          category = element.data('track-category'),
          action = element.data('track-action'),
          label = element.data('track-label');

      if (label) {
        options.label = label;
      }

      function trackClick() {
        if (GOVUK.analytics && GOVUK.analytics.trackEvent) {
          GOVUK.analytics.trackEvent(category, action, options);
        }
      }
    };
  };
})(window.GOVUK.Modules);
window.GOVUK.Modules = window.GOVUK.Modules || {};

(function(Modules) {
  "use strict";

  Modules.TrackSubmit = function () {
    this.start = function (element) {
      element.on('submit', 'form', trackSubmit);

      var category = element.data('track-category'),
          action = element.data('track-action');

      function trackSubmit() {
        if (GOVUK.analytics && GOVUK.analytics.trackEvent) {
          GOVUK.analytics.trackEvent(category, action);
        }
      }
    };
  };
})(window.GOVUK.Modules);
// Frontend manifest
// Note: The ordering of these JavaScript includes matters.









