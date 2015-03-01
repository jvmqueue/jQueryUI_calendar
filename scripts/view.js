var jvm = jvm || {};
jvm.view = (function(w, d, $){
	
	var dom = {
		appendFrag:function(options){
			var val = options.strVal;
			var $nodeExist = options.$nodeParentOutput;
			var frag = d.createDocumentFragment();
			var nodeText = d.createTextNode(val);
			var nodeNew = d.createElement('p');

			nodeNew.setAttribute('class', options.strClass);
			nodeNew.appendChild(nodeText);
			frag.appendChild(nodeNew);
			options.blnEmptyParent === true ? $nodeExist.empty().append(frag) : $nodeExist.append(frag);
		}
	};

	var listener = {
		getSliderVal:function(e){
			var val = $(this).slider('value');
			// change progress bar to reflect slider position
			$('#' + e.data.sendMessageNodeId).progressbar('value', val);
		},
		onChangeProgressbar:function(e){
			var val = $(this).progressbar('value') + '%';
			var $node = $('#' + e.data.sendMessageNodeId);
			dom.appendFrag({strVal:val, $nodeParentOutput:$node, strClass:'textOutput textAlignMiddle', blnEmptyParent:true});
		},
		onChangeCalendar:function(e){
			var val = this.getAttribute('value');
			var $node = $('#' + e.data.sendMessageNodeId);
			dom.appendFrag({strVal:val, $nodeParentOutput:$node, strClass:'textOutput textAlignMiddle', blnEmptyParent:true});
			this.setAttribute('value', 'Pick Date'); // set button back to intial value	
		},
		onButtonDateClick:function(e){
			var $node = $('#' + e.data.sendMessageNodeId);			
			$node.css('z-index', '33'); // raise calendar so that other UI controls do not show through			
		},
		set:function(options){ // generic listener binding
			options.$node.on(options.event, options.data, options.listener);
		}
	};

	var main = function(){
		var $nodeDayPicker = $('#date').datepicker();
		$('#divSlider').slider({
			orientation:'horizontal',
			min:0,
			max:100,
			value:0
		});
		$('#divProgessbar').progressbar({value:0}).addClass('blueProgress');
		listener.set({$node:$('#divSlider'), event:'slidechange', data:{sendMessageNodeId:('divProgessbar')}, listener:listener.getSliderVal});
		listener.set({$node:$('#divProgessbar'), event:'progressbarchange', data:{sendMessageNodeId:('divProgressCol1')}, listener:listener.onChangeProgressbar});
		listener.set({$node:$('#date'), event:'change', data:{sendMessageNodeId:('calendarCol1')}, listener:listener.onChangeCalendar});
		listener.set({$node:$('#date'), event:'click', data:{sendMessageNodeId:('ui-datepicker-div')}, listener:listener.onButtonDateClick});		
	}; // End main

	var lclInterval = w.setInterval(function(){ // optimization: wait for DOM, don't need jQuery for this
		if(d.getElementsByTagName('div').length > 0){
			w.clearInterval(lclInterval);
			main();
		}
	}, 33);	

	var _gruntTest = function(){
		return 'grunt test succesful';
	};

	return{
		gruntTest:_gruntTest
	};

})(window, document, jQuery);