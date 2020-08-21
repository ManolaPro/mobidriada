'use strict';
window.addEventListener('DOMContentLoaded', function(){
    var slider = tns({
        container: '.corousel',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: true,
        navPosition: 'bottom',
        navAsThumbnails: true,
        center: true,
    });
    
    //block button
    const nextBtn = document.querySelectorAll('[data-next]'),
          form = document.querySelectorAll('.modal__give'),
          bar = document.querySelectorAll('.modal__bar');
            
        nextBtn.forEach(item => {
            item.classList.add('btnblock');
        }); 
        
        function anblock(i) {
            nextBtn[i].classList.remove('btnblock');
            let b = (i+1) * 30;
            bar[i].style.width = b+"px";
            }
        
        form.forEach((item , i)=>{
            item.addEventListener('change' , function(event) {
                const target = event.target;
                    if(target && target.classList.contains('form-image-que__input')) {
                        anblock(i);
                    }
                    if(target && target.classList.contains('form-range-price__input')) {
                        anblock(i);
                        const inputPrice = document.querySelector('.form-range-price__input'),
                              totalPrice = document.querySelector('.range-price-total');
                              let price = inputPrice.value;
                              totalPrice.innerHTML = price+" 000 руб.";
                              console.log(price);
                    }
                    if(target && target.classList.contains('form-radio__label__input')) {
                        anblock(i);
                    }
                    if(target && target.classList.contains('form-radio__label__box')) {
                        anblock(i);
                    }
            });
        });

    
    
    // 1step tab
    let tabs = document.querySelectorAll('.form-image-que__image'),
        sizeImg = document.querySelectorAll('.modal__size-img'),
        tabsParent = document.querySelector('.form-image-que'),
        sizeABC = document.querySelectorAll('.modal__sizeABC');
        

    function hideSizeImg() {
        sizeImg.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item=> {
            item.classList.remove('form__image_active');
        });
    }

    function showSizeImg(i=0) {
        sizeImg[i].classList.add('show', 'fade');
        sizeImg[i].classList.remove('hide');
        tabs[i].classList.add('form__image_active');
    }

    function hideSizeC(i=0) {
        sizeABC[i+1].classList.add('hide'); 
        sizeABC[i+1].classList.remove('flex', 'fade');  
        sizeABC[i+2].classList.add('hide'); 
        sizeABC[i+2].classList.remove('flex', 'fade');    
            
    }
    
    function showSizeABC() {
        sizeABC.forEach(item=> {
            item.classList.add('flex' , 'fade');
            item.classList.remove('hide');
        });
    }


    hideSizeImg();
    showSizeImg();

	tabsParent.addEventListener('click', function(event) {
        const target = event.target;
		if(target && target.classList.contains('form-image-que__image')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideSizeImg();
                    showSizeImg(i);
                    showSizeABC();
                    hideSizeC(i);
                    }
                   
                });
		}
	});
    //quiz
    const quizContent = document.querySelectorAll('[data-quiz]'),
          prevBtn = document.querySelectorAll('[data-prev]'),
          quizFinish = document.querySelector('[data-finish]'),
          inputHid = document.querySelectorAll('[data-receive]');
          
    function hideQuiz() {
        quizContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    }   
    function showStep(i) {
        
        quizContent[(i+1)].classList.add('show', 'fade');
        quizContent[(i+1)].classList.remove('hide');
        }
    
    function prevStep(i) {
        quizContent[i].classList.remove('hide');
        quizContent[i].classList.add('show', 'fade');
        
    }
        
    nextBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
        
            hideQuiz();
            showStep(i);
        });
    });

    prevBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            hideQuiz();
            prevStep(i);
        });
    });
/*     quizFinish.addEventListener('click', () => {
        const inputChecked = document.querySelectorAll('input:checked');
        inputChecked.forEach((item ,i) => {
            inputHid[i].value = item.value;
            console.dir(inputHid[i]);
            console.log('1');
        } );
    } ); */

    //modal open
    const modalTrigger = document.querySelectorAll('[data-modal="start"]'),
          modal = document.querySelectorAll('.modal'),
          overlay = document.querySelector('.overlay'),
          modalCloseBtn = document.querySelectorAll('[data-close]');
    
          modalTrigger.forEach(btn => {
            btn.addEventListener('click', function() {
                modal[0].classList.add('show','fade');
                modal[0].classList.remove('hide');
                overlay.classList.add('show','fade');
                overlay.classList.remove('hide');
                document.body.style.overflow = 'hidden';
            });
        });
    
        function closeModal(i) {
            modal[i].classList.add('hide');
            modal[i].classList.remove('show');
            overlay.classList.add('hide');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
        
        modalCloseBtn.forEach((btn ,i) => {
            btn.addEventListener('click', ()=> {
                closeModal(i);
            });
        });

        
        quizContent.forEach((cont ,i) => {
            cont.addEventListener('click', (e) => {
                if (e.target === quizContent) {
                    closeModal(i);
                }
            });
        });
    
        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.classList.contains('show')) { 
                closeModal();
            }
        });
    

    //slider    
    /* let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.work__slide'),
          prev = document.querySelector('.work__slider-prev'),
          next = document.querySelector('.work__slider-next'),
          slidesWrapper = document.querySelector('.work__slider-wrapper'),
          width = window.getComputedStyle(slidesWrapper).width,
          slidesField = document.querySelector('.work__slider-inner');
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden'; 
    
    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

    });
    */
    
   const easingOutQuint = (x, t, b, c, d) =>
   c * ((t = t / d - 1) * t * t * t * t + 1) + b;
 
 function smoothScrollPolyfill (node, key, target) {
   const startTime = Date.now();
   const offset = node[key];
   const gap = target - offset;
   const duration = 1000;
   let interrupt = false;
 
   const step = () => {
     const elapsed = Date.now() - startTime;
     const percentage = elapsed / duration;
 
     if (interrupt) {
       return;
     }
 
     if (percentage > 1) {
       cleanup();
       return;
     }
 
     node[key] = easingOutQuint(0, elapsed, offset, gap, duration);
     requestAnimationFrame(step);
   };
 
   const cancel = () => {
     interrupt = true;
     cleanup();
   };
 
   const cleanup = () => {
     node.removeEventListener('wheel', cancel);
     node.removeEventListener('touchstart', cancel);
   };
 
   node.addEventListener('wheel', cancel, { passive: true });
   node.addEventListener('touchstart', cancel, { passive: true });
 
   step();
 
   return cancel;
 }
 
 function testSupportsSmoothScroll () {
   let supports = false;
   try {
     let div = document.createElement('div');
     div.scrollTo({
       top: 0,
       get behavior () {
         supports = true;
         return 'smooth';
       }
     });
   } catch (err) {} // Edge throws an error
   return supports;
 }
 
 const hasNativeSmoothScroll = testSupportsSmoothScroll();
 
 function smoothScroll (node, topOrLeft, horizontal) {
   if (hasNativeSmoothScroll) {
     return node.scrollTo({
       [horizontal ? 'left' : 'top']: topOrLeft,
       behavior: 'smooth'
     });
   } else {
     return smoothScrollPolyfill(node, horizontal ? 'scrollLeft' : 'scrollTop', topOrLeft);
   }
 }
 
 function debounce(func, ms) {
     let timeout;
     return () => {
         clearTimeout(timeout);
         timeout = setTimeout(() => {
             timeout = null;
       func();
         }, ms);
     };
 }
    const indicators = document.querySelectorAll('.work__indicator-button'),
          scroller = document.querySelector('.work__slider-inner');

    function setAriaLabels() {
    indicators.forEach((indicator, i) => {
        indicator.setAttribute('aria-label', `Scroll to item #${i + 1}`);
    });
    }

    function setAriaPressed(index) {
    indicators.forEach((indicator, i) => {
        indicator.setAttribute('aria-pressed', !!(i === index));
    });
    }

    indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        setAriaPressed(i);
        const scrollLeft = Math.floor(scroller.scrollWidth * (i / 20));
        smoothScroll(scroller, scrollLeft, true);
    });
    });

    scroller.addEventListener('scroll', debounce(() => {
    let index = Math.round((scroller.scrollLeft / scroller.scrollWidth) * 20);
    setAriaPressed(index);
    }, 200));

    setAriaLabels();


        // Forms
        const forms = document.querySelectorAll('form');
              
        
        const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        forms.forEach((item, i) => {
            // item.input.value = inputHid[i].value;
            
            postData(item);
        });
    
        function postData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const inputChecked = document.querySelectorAll('input:checked');
                const inputNum = document.querySelectorAll('[data-num]');
                inputChecked.forEach((item ,i) => {
                inputHid[i].value = item.value;
                
                });
                inputNum.forEach((item , i) => {
                    inputHid[i+5].value = item.value;
                });
    
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.textContent = message.loading;
                form.appendChild(statusMessage);
            
                const request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                const formData = new FormData(form);
    
                const object = {};
                formData.forEach(function(value, key){
                    object[key] = value;
                });
                const json = JSON.stringify(object);
    
                request.send(json);
    
                request.addEventListener('load', () => {
                    if (request.status === 200) {
                        console.log(request.response);
                        statusMessage.textContent = message.success;
                        form.reset();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 2000);
                    } else {
                        statusMessage.textContent = message.failure;
                    }
                });
            });
        }
    });

 

   