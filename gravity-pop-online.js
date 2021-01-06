/**
 * CUSTOM FORM POPUP JS
 */
window.addEventListener('load', function(){

	const formPopupBtn = document.querySelector('.gform-popup-btn');
	const  popup = document.querySelector('.gform-popup');

	
	// FORM POPUP BUTTON TO OPEN THE FORM
	
	popup.classList.add('show');
	
		formPopupBtn.addEventListener('click', function(e){
			e.preventDefault();
		popup.classList.add('show');
		});
	
	
	//  APPENDING A CLOSE BUTTON ELEMENT TO THE FORM POPUP
	
	let formCloseBtn = document.createElement('span');
	
	formCloseBtn.classList.add('gform-close-btn');
	formCloseBtn.textContent = 'Close';
	// console.log(formCloseBtn);
	
	popup.appendChild(formCloseBtn);
	
	
	// CLOSE FORM POPUP 
	
	formCloseBtn.addEventListener('click',  function(e){
		popup.classList.remove('show');
	
	});

	// NEXT FORM BUTTON
	let nextBtns = document.querySelectorAll('.gform_next_button');
	// console.log(nextBtn);

	
	// ADJUST FORM BODY MARGIN WHEN THERE IS ERROR
	let errorContainer = document.querySelector('.validation_error');
	let formBody = document.querySelector('body .gform_wrapper .gform_body');
	formBody.style.height = '40vh';
	if(window.offsetWidth > 992){
		formBody.style.marginTop = (errorContainer !== null) ? '0' : '100px';
	}
	
	
	// CREATING STEPS AND PROGRESS BAR AND APPENDING TO POPUP
	
	// get all form pages that are done
	let formPages = document.querySelectorAll('.gform_page');
	let formPageIndex = 1;
	let formPagesLength = formPages.length;
	
	// create step counter
	const stepsCounter = document.createElement('span');
	stepsCounter.classList.add('gform-step-counter');
	popup.appendChild(stepsCounter);

	// CREATING THE STEPS DOTS INDICATOR
	// create form dots indicator wrapper
	let formDotsWrapper = document.createElement('div');
	formDotsWrapper.classList.add('gform-step-dots-wrapper');

	if(formDotsWrapper.offsetHeight  > window.innerHeight){
		formDotsWrapper.style.overflowY = 'scroll';
		formDotsWrapper.style.height = '80vh';
	}
	popup.appendChild(formDotsWrapper);

	// CREATE PROGRESS BAR

	const progressBar = document.createElement('div');
	progressBar.classList.add('gform_custom_progress_bar');
	popup.appendChild(progressBar);

	// create the form dots based on length of the steps and append to formDotsWrapper
	
	formPages.forEach(function(el, index){
		let dot = document.createElement('span');
		dot.classList.add('gform-step-dot');
		dot.setAttribute('data-step-index', index+1);
		formDotsWrapper.appendChild(dot);
	});

	// get all dots and set active state to current dot
	const dots = [...document.querySelectorAll('.gform-step-dot')];
	// add active class to dots
	function addActiveClassToDots(currentPage){
		dots.forEach(function(dot, index){
			dot.classList.remove('active');
			if(dot.dataset.stepIndex == currentPage){
				dot.classList.add('active');
			}
	
		});
	}
	addActiveClassToDots(formPageIndex);

	function processNextStep(currentPage){
		
		console.log(currentPage);
		stepsCounter.textContent = `${currentPage}/${formPagesLength}`;
		progressBar.style.width = `${(currentPage/formPagesLength) * 100}%`;

		// SHOW THAT A FORM HAS BEEN PASSED BY DARKENING THE DOT COLOR
		for(let i = currentPage - 1 ; i >= 0; i--){
			dots[i].classList.add('dirty');
		}
		addActiveClassToDots(currentPage);

	}
	
	// processNextStep(formPageIndex);

	function complexFormscroll(currentPage){
		let scrollEl = currentPage

		if(scrollEl.height() > window.innerHeight* 0.4){
			scrollEl.addClass('scrollable');
		}
	}



	function adaptiveFocusDate(index){
		
		
		let dateInputs = jQuery('.clear-multi')[index];
		// console.log(dateInputs);
		
		if(dateInputs !== undefined){
			dateInputs = [...dateInputs.children];	
			// console.log(dateInputs);
			dateInputs.forEach(function(field, index){
				// select input fields inside of the containers
			
				let input = field.querySelector('input');
				input.addEventListener('keyup', function(){
					let valueCount = 2;
					if(this.parentNode.classList.contains('gfield_date_year')){
						valueCount = 4;
					}
					if(this.value.length == valueCount){
						// swap to next input field and focus on it
						dateInputs[index + 1].querySelector('input').focus();
					}
				})
			})
		}
	}

	adaptiveFocusDate(0);
	processNextStep(1)
	jQuery(document).on('gform_page_loaded', function(event, form_id, current_page){
		// console.log(current_page);
		// console.log(current_page + ' ..... ' + formPageIndex);

		// FOCUS ON DATE FIELDS AFTER EACH IS COMPLETED AND IF THERE IS A DATE FIELD
		adaptiveFocusDate(current_page - 1);
		console.log(current_page);
		processNextStep(current_page);

		formPageIndex = (current_page > formPageIndex) ? current_page : formPageIndex;

		// ADD SCROLLING TO COMPLEX FORM
		complexFormscroll(jQuery('#gform_page_1_' + current_page + ' .gform_page_fields .ginput_complex' ));

		// ADD ANIMATTION TO PAGE
		if(current_page >= formPageIndex){
			
			formPages[current_page - 1 ].classList.add('gform_enter');

			jQuery('#gform_page_1_' + current_page + ' .gform_page_fields').css("margin-top", 200)
			
			move('#gform_page_1_' + current_page + ' .gform_page_fields')
				.add("margin-top", -200)
				.end();
		}else{

			jQuery('#gform_page_1_' + current_page + ' .gform_page_fields').css("margin-top", -200)
		
			move('#gform_page_1_' + current_page + ' .gform_page_fields')
				.add("margin-top", 200)
				.end();
		}

		// CHECK IF FILEUPLOAD IS PRESENT AND TRIGGER NEXT BUTTON ON ENTER CLICK
      
		jQuery("div#gform_page_1_" + current_page).find("input[type='file']").change(function(event){
			jQuery(this).blur();
			jQuery("div#gform_page_1_" + current_page).find(".gform_next_button").focus();
		  });
				

	});
	
	dots.forEach(dot => {
		dot.addEventListener('click', function(){
			if(dot.dataset.stepIndex <= formPageIndex){
				jQuery("#gform_target_page_number_1").val(dot.dataset.stepIndex);  
				jQuery("#gform_1").trigger("submit",[true]); 
			}
		});
	})

	




	
	



	
	

})  ; 
