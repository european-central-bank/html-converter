(function () {

	function handleFileSelect(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var files = evt.dataTransfer.files;
		file = files[0];

		// prepare filereader
		var reader = new FileReader();
		reader.onload = function (loadEvent) {
			
			var arrayBuffer = loadEvent.target.result;

			// prepare converter
			mammoth.convertToHtml({
				arrayBuffer: arrayBuffer
			}, {
					transformDocument: function (element) {
						return element;
					},
					styleMap: [
						'p.Date => div.postDate',
						'p.Title => h1.mainTitle',
						'p.Subtitle => h2.subtitle',
						'p.Heading1 => h2:fresh',
						'p.Heading2 => h3:fresh',
						'p.Heading3 => h4:fresh',
						'p.ListBullet => ul > li:fresh',
						'p.ListNumber => ol > li:fresh'
					]
				}).then(function (html) {

					// Parsing is finished, html.value contains the html contents, where we can do some postprocessing
					$('#drop_zone').html('<article>' + html.value + '</article>');

					// attach first occurence of date, right after the main title
					$('#drop_zone').find('h1.mainTitle').after($('#drop_zone').find('div.postDate').eq(0));

					//Tables
					$('#drop_zone').find('table').addClass('cutomTableClass');

					//Add footer
					$('#drop_zone').removeClass('dropBoxBg');

					
					// you can then ajax-pass the contents of the processed element to backend, webservice, etc.

				});
		};

		// execute filereader 
		reader.readAsArrayBuffer(file);
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy';
	}

	var dropZone = document.getElementById('drop_zone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);

})();