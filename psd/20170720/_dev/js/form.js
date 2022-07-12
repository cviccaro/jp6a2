(function($) {
	window.recaptchaLoaded = function() {
		grecaptcha.render('recaptcha', {
		     'sitekey' : '6Leq-iUTAAAAANcKZRSH44I2UScS4AJJXaDJkY6a'
	    });
	}

	$(document).ready(function() {

		function isEmpty(val) {
			return !val;
		}

		function formSuccess(response) {
			$(".contact_copy").before('<div class="success-message alert alert-success p_marg">Thanks!  Your form has been submitted.</div>');
			$("#contact_form")[0].reset();
			$("html,body").animate({
				scrollTop: $(".contact_copy")[0].offsetTop
			}, 500);
			setTimeout(function() {
				$(".success-message").remove();
			}, 10000);
		}

		$("#contact_form").submit(function(e) {
			e.preventDefault();
			e.stopPropagation();

			var form = {}, errors = {};

			$("#contact_form [name]").each(function() {
				switch(this.tagName) {
					case 'IFRAME':
						break;
					default:
						var required = this.required;
						if (this.name === 'g-recaptcha-response') {
							required = true;
						}

						if (required && isEmpty(this.value)) {
							errors[this.name] = {
								value: this.value,
								required: required
							};
						} else {
							form[this.name] = {
								value: this.value,
								required: required
							};
						}
						break;
				}
			});
			
			if ( Object.keys(errors).length === 0) {
				// submit
				$.post('/form.php', form, function(res) {
					res = JSON.parse(res);
					if (res.success) {
						formSuccess(res);
					}
				});
			} else {
				// errors
				for (var key in errors) {
					switch(key) {
						case 'g-recaptcha-response':
							var el = $("#contact_form .g-recaptcha");

							el.before('<div class="error-message recaptcha">Please fill out the CAPTCHA field</div>')
							setTimeout(function() {
								$(".error-message.recaptcha").remove();
							}, 5000);
							break;
					}
				}
			}
		})
	});
})(jQuery);