COMPONENT('faviconunread', 'bg:red;fg:white', function(self, config) {

	var tmp = {};

	self.singleton();
	self.readonly();

	self.make = function() {
		var head = $(config.selector || document.head);
		tmp.el = config.selector ? head : head.find('link[rel="icon"]');

		if (!tmp.el.length) {
			head.append('<link rel="icon" href="data:image/gif;base64,R0lGODdhIAAgAIAAAP///wAAACwAAAAAIAAgAAACHoSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gubBQA7" type="image/gif" />');
			tmp.el = head.find('link[rel="icon"]');
		}

		tmp.href = tmp.el.attr('href') || tmp.el.attr('src');
		tmp.type = tmp.el.attr('type');
	};

	self.setter = function(value) {

		if (!value) {
			tmp.el.attr({ type: tmp.type, href: tmp.href });
			return;
		}

		var canvas = document.createElement('canvas');
		var img = new Image();
		img.src = tmp.href;
		img.onload = function() {
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);
			ctx.fillStyle = config.bg;
			var size = img.width / 3.4;
			ctx.arc(img.width - size, img.height - size, size, 0, 2 * Math.PI);
			ctx.fill();
			ctx.textAlign = 'center';
			ctx.fillStyle = config.fg;
			ctx.font = 'bold 12px Arial';
			if (value > 99)
				value = '99';
			else
				value += '';

			ctx.fillText(value, img.width - size, img.height - 5);

			if (config.selector)
				tmp.el.attr('src', canvas.toDataURL());
			else
				tmp.el.attr({ type: 'image/png', href: canvas.toDataURL() });

			canvas = img = null;
		};
	};

});