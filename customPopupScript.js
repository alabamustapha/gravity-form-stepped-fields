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
	formCloseBtn.textContent = 'Close form';
	console.log(formCloseBtn);
	
	popup.appendChild(formCloseBtn);
	
	
	// CLOSE FORM POPUP 
	
	formCloseBtn.addEventListener('click',  function(e){
		popup.classList.remove('show');
	
	});

	
	// ADJUST FORM BODY MARGIN WHEN THERE IS ERROR
	let errorContainer = document.querySelector('.validation_error');
	let formBody = document.querySelector('body .gform_wrapper .gform_body');
	formBody.style.height = '40vh';
	
	formBody.style.marginTop = (errorContainer !== null) ? '0' : '15rem';
	
	
	// CREATING STEPS AND PROGRESS BAR AND APPENDING TO POPUP
	
	// get all form pages that are done
	let formPages = document.querySelectorAll('.gform_page');
	let formPageIndex = 1;
	let formPagesLength = formPages.length;
	
	formPages.forEach(function(el, index){
		if(el.style.display !== 'none'){
			formPageIndex = index + 1;
		}
	})
	
	const stepsCounter = document.createElement('span');
	stepsCounter.classList.add('gform-step-counter');
	
	stepsCounter.textContent = `${formPageIndex}/${formPagesLength}`;
	popup.appendChild(stepsCounter);
	

	// CREATING THE STEPS DOTS INDICATOR

	// create form dots indicator wrapper
	let formDotsWrapper = document.createElement('div');
	formDotsWrapper.classList.add('gform-step-dots-wrapper');
	popup.appendChild(formDotsWrapper);

	// create the form dots based on length of the steps and append to formDotsWrapper
	formPages.forEach(function(el, index){
		let dot = document.createElement('span');
		dot.classList.add('gform-step-dot');
		dot.setAttribute('data-step-index', index+1);
		formDotsWrapper.appendChild(dot);
	});

	// get all dots and set active state to current dot
	const dots = [...document.querySelectorAll('.gform-step-dot')];
	function addActiveClassToDots(){
		dots.forEach(function(dot, index){
			dot.classList.remove('active');
			if(dot.dataset.stepIndex == formPageIndex){
				dot.classList.add('active');
			}
	
		});
	}
	addActiveClassToDots();
	// SHOW THAT A FORM HAS BEEN PASSED BY DARKENING THE DOT COLOR
	for(let i = formPageIndex -1 ; i >= 0; i--){
		dots[i].classList.add('dirty');
	}

	for(let i = formPageIndex -1 ; i >= 0; i--){
		formPages = [...formPages];
	
		// change form on dot click
		dots[i].addEventListener('click', function(e){
			e.preventDefault();
			formPageIndex = i+1;
			addActiveClassToDots();
			formPages.forEach(el => el.style.display = 'none');
			formPages[i].style.display = '';
		});

	}

	// CREATE PROGRESS BAR

	const progressBar = document.createElement('div');
	progressBar.classList.add('gform_custom_progress_bar');
	progressBar.style.width = `${(formPageIndex/formPagesLength) * 100}%`
	popup.appendChild(progressBar);

	// ADD SCROLL TO FORM BODY WHEN HEIGHT EXCEEDS 40VH

	document.addEventListener('mousemove', function(){
		// console.log('bigger as ' + formBody.offsetHeight);
		// console.log(formBody.offsetHeight > window.innerHeight * 0.4);
		
		if(formBody.offsetHeight > window.innerHeight * 0.4){
			formBody.classList.add('contain');
			console.log(true);
		}else{
			formBody.classList.remove('contain');
		}
	});
	

})  ; 