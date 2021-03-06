COMPONENT('highlightsyntax', function(self, config) {
	self.readonly();
	self.nocompile && self.nocompile();
	self.setter = function(value) {
		if (value) {
			self.html('<pre><code class="{0}">{1}</code></pre>'.format(config.type, Tangular.helpers.encode(value)));
			hljs.highlightBlock(self.find('code')[0]);
			self.tclass('hidden', false);
		} else
			self.tclass('hidden', true);
	};
}, ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/styles/github.min.css', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/highlight.min.js']);