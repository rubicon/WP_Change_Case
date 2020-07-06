(function ($) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	jQuery.fn.visible = function () {
		return this.css('visibility', 'visible');
	};

	jQuery.fn.invisible = function () {
		return this.css('visibility', 'hidden');
	};

	jQuery(document).ready(function ($) {

		$(function () {

			multi_string_interface('change_case_uppercase');
			multi_string_interface('change_case_lowercase');

			/**
			 * Add a new change case fieldset.
			 *
			 * @param change_case_type
			 * @param default_value
			 */
			function add_change_case_field(change_case_type, default_value) {
				/**
				 * Setup click event to add the change case from the list.
				 */
				var size = $('#' + change_case_type + 's > div').length;

				$('<div class="change_case_grid">' +
					'<label for="' + change_case_type + 's"><input type="text" id="' + change_case_type + 's_' + size + '" class="change_case ' + change_case_type + '"  size="20" name="' + change_case_type + 's_' + size + '" value="' + default_value + '" placeholder="Input Value" />' +
					'</label> ' +
					'<a href="#" class="remove_' + change_case_type + 's">Remove</a></div>').appendTo($('#' + change_case_type + 's'));
			}

			/**
			 * Creates a change case interface.
			 *
			 * @param change_case_type
			 */
			function multi_string_interface(change_case_type) {
				/** set the remove button ID **/
				let remove_btn_id = '#remove_btn_' + change_case_type + '_1';

				/** Set initial to false. **/
				$(remove_btn_id).invisible();

				/**
				 * Toggle the visibility of the button.
				 * @param change_case_type
				 */
				function toggle_ban_visibility(change_case_type) {
					/**
					 * Setup click event to add the change case from the list.
					 */
					var i = $('#' + change_case_type + 's > div').length;
					if (i > 1) {
						//remove_btn_change_case_type_1
						$(remove_btn_id).visible();
					} else {
						$(remove_btn_id).invisible();
					}
				}

				$('#add_' + change_case_type + 's').live('click', function () {


					/**
					 * Run the remove item click event. Create the new individual change case form.
					 */
					add_change_case_field(change_case_type, "");
					toggle_ban_visibility(change_case_type);
					return false;
				});

				/**
				 * Setup click event to remove the change case item set the list.
				 */
				$('.remove_' + change_case_type + 's').live('click', function () {

					/**
					 * Setup click event to add the change case from the list.
					 */
					var size = $('#' + change_case_type + 's > div').length;

					/** if there is only one Item **/
					if (size > 1) {
						/** Remove the Item **/
						$(this).parent('div').remove();
						size--;
						//remove_btn_change_case_uppercases_1
					}
					toggle_ban_visibility(change_case_type);
					return false;

				});
			}


		});
	});
	$(document).ready(function (e) {
		//$("#change_case_main").attr('disabled','disabled');
		//$("#change_case_main").children().attr("disabled",true)
		//("#change_case_main").children().prop('disabled',true);;
		var jsonData = function () {
			var objData = {security: change_titles_case.ajax_nonce};
			return JSON.stringify(objData);
		};

		$.ajax({
			url: change_titles_case.api_url,
			method: 'POST',
			data: jsonData(),
			crossDomain: true,
			contentType: 'application/json',
			success: function (data) {
				let results = JSON.parse(data);

				function load_csv(change_case, id_base) {
					let exceptions = change_case.split(',');
					var tf_count = 0;
					exceptions.forEach(function (individual_value) {
						if (tf_count !== 0) {
							$('#add_' + id_base).click();
						}
						$('#' + id_base + '_' + tf_count).val(individual_value);
						tf_count = tf_count + 1;
						//change_case_uppercases_1
					});
				}

				load_csv(results.change_case_uppercases, 'change_case_uppercases');
				load_csv(results.change_case_lowercases, 'change_case_lowercases');
				//$("#change_case_main").attr('disabled','enabled');
				//$("#dcacl").children().attr("disabled","enabled");
			},
			error: function (error) {
				console.log(error);
			}
		});

	});
})(jQuery);
