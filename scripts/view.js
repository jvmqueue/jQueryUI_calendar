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
		},
		bindUiComponent:function(options){
			var $node = $(options.selector);
			var strComponentName = options.component;
			switch(strComponentName){
				case 'datepicker':
					$node.datepicker();
					break;
				case 'slider':
					$node.slider( {orientation:'horizontal', min:0, max:100, value:0} );
					break;
				case 'progressbar':
					$node.progressbar({value:0});
					break;
				default:
					/* do nothing */
			}
		}
	}; // End dom

	var listener = {
		getSliderVal:function(e){
			var val = $(this).slider('value');
			// change progress bar to reflect slider position
			$('#' + e.data.sendMessageNodeId).progressbar('value', val); // set UI Progressbar position
			$('.ui-slider-handle', '#divSlider').removeClass('zero between hundred'); // reset
			if(val === 0){
				$('.ui-slider-handle', '#divSlider').addClass('zero');
			}else if( (val > 0)  && (val < 100) ){
				$('.ui-slider-handle', '#divSlider').addClass('between');
			}else if(val === 100){
				$('.ui-slider-handle', '#divSlider').addClass('hundred');
			}
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
			$node.css('zIndex', ''); // remove jQuery UI default value
			$node.addClass('jsZindex'); // raise calendar so that other UI controls do not show through			
		},
		set:function(options){ // generic listener binding
			options.$node.on(options.event, options.data, options.listener);
		}
	};

	var main = function(){		
		dom.bindUiComponent({selector:'#date', component:'datepicker'});
		dom.bindUiComponent({selector:'#divSlider', component:'slider'});
		dom.bindUiComponent({selector:'#divProgessbar', component:'progressbar'});

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