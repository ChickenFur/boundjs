(function(){
  var global = this;

  $.fn.render = function(scope){
    bound.render(this, scope);
    return this;
  };

  bound.render = function($node, scope){
    bound.autorun(function(){

      _.each(directiveProcessors, function(processor){
        processor($node, scope);
      });

    });
  };

  var directiveProcessors = {
    contents: function($node, scope) {
      var directive = $node.attr("contents");
      $node.html(bound.proxy(scope).bound('has', directive) ? scope.bound('get', directive) : bound('get', directive));
    },
    attr: function($node, scope) {
      _.each($node[0].attributes, function(attribute){
        if((/^attr/).test(attribute.name)) {
          $node.attr((attribute.name).slice("attr-".length), scope[attribute.value]);
        }
      });
    }
  };

}());
