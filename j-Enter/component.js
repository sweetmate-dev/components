COMPONENT('enter', 'validate:1;trigger:button[name="submit"];timeout:1500', function(self, config) {
	self.readonly();
	self.make = function() {
		self.event('keydown', 'input', function(e) {
			if (e.which === 13 && (!config.validate || CAN(self.path))) {
				if (config.exec) {
					if (!BLOCKED(self.ID, config.timeout))
						EXEC(self.makepath(config.exec), self);
				} else {
					var btn = self.find(config.trigger);
					if (!btn.prop('disabled')) {
						if (!BLOCKED(self.ID, config.timeout))
							btn.trigger('click');
					}
				}
			}
		});
	};
});