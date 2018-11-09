(function() {

    // Get all images and texts, get the `canvas` element, and save slider length
    var sliderCanvas = document.querySelector('.pieces-slider__canvas');
    var imagesEl = [].slice.call(document.querySelectorAll('.pieces-slider__image'));
    var textEl = [].slice.call(document.querySelectorAll('.pieces-slider__text'));
    var textEl2 = [].slice.call(document.querySelectorAll(".pieces-slider__text__two"));
    
    var slidesLength = imagesEl.length;

    // Define indexes related variables and functions
    var currentIndex = 0, currentImageIndex, currentTextIndex, currentNumberIndex;
    // Update current indexes for image, text and number
    function updateIndexes() {
        currentImageIndex = currentIndex * 3;
        currentTextIndex = currentImageIndex + 1;
        currentNumberIndex = currentImageIndex + 2;
    }
    updateIndexes();
    var textIndexes = [];
    var numberIndexes = [];

    // Some other useful variables
    var windowWidth = window.innerWidth;
    var piecesSlider;

    // Options for images
    var imageOptions = {
        angle: 45,
        extraSpacing: {extraX: 1000, extraY: 2000},
        piecesWidth: function() { return Pieces.random(400, 500); },
        ty: function() { return Pieces.random(-400, 400); }
    };

    // Options for texts
    var textOptions = {
        color: 'white',
        backgroundColor: '#db3236',
        fontSize: function() { return windowWidth > 720 ? 50 : 30; },
        padding: '15 20 10 20',
        angle: -45,
        piecesSpacing: 2,
        extraSpacing: {extraX: 0, extraY: 300},
        piecesWidth: function() { return Pieces.random(50, 200); },
        ty: function() { return Pieces.random(-200, 200); },
        translate: function() {
            if (windowWidth > 1120) return {translateX: 200, translateY: 200};
            if (windowWidth > 720) return {translateX: 0, translateY: 200};
            return {translateX: 0, translateY: 100};
        }
    };

    // Options for numbers
    var numberOptions = {
        color: 'white',
        backgroundColor: '#db3236',
        fontSize: function() { return windowWidth > 720 ? 60 : 20; },
        padding: '15 20 10 20',
        angle: 45,
        piecesSpacing: 2,
        extraSpacing: {extraX: 0, extraY: 300},
        piecesWidth: function () { return Pieces.random(50, 200); },
        ty: function() { return Pieces.random(-200, 200); },
        translate: function() {
            if (windowWidth > 1120) return {translateX: -240, translateY: -180};
            if (windowWidth > 720) return {translateX: -240, translateY: -180};
            return {translateX: -140, translateY: -100};
        }
    };

    // Build the array of items to draw using Pieces
    var items = [];
    var imagesReady = 0;
    for (var i = 0; i < slidesLength; i++) {
        // Wait for all images to load before initializing the slider and event listeners
        var slideImage = new Image();
        slideImage.onload = function() {
            if (++imagesReady == slidesLength) {
                initSlider();
                initEvents();
            }
        };
        // Push all elements for each slide with the corresponding options
        items.push({type: 'image', value: imagesEl[i], options: imageOptions});
    
        if(i===0) {
            items.push({ type: 'text', value: textEl[i].innerText, options: {
                color: 'white',
                backgroundColor: '#db3236',
                fontSize: function () { return windowWidth > 720 ? 50 : 30; },
                margin: '15 20 10 20',
                angle: -45,
                piecesSpacing: 2,
                extraSpacing: { extraX: 0, extraY: 300 },
                piecesWidth: function () { return Pieces.random(50, 200); },
                ty: function () { return Pieces.random(-200, 200); },
                translate: function () {
                    if (windowWidth > 1120) return { translateX: 200, translateY: 200 };
                    if (windowWidth > 720) return { translateX: 0, translateY: 200 };
                    return { translateX: 0, translateY: 100 };
                }
            } });
        } else {
            items.push({ type: 'text', value: textEl[i].innerText, options: textOptions });
        }

        if(i === 1 || i===2 || i ===3) {
            
        
            items.push({ type: 'text', value: textEl2[1].innerText, options: {
                color: 'white',
                backgroundColor: '#db3236',
                fontSize: function () { return windowWidth > 720 ? 60 : 20; },
                margin: '15 20 10 20',
                angle: 45,
                piecesSpacing: 2,
                extraSpacing: { extraX: 0, extraY: 300 },
                piecesWidth: function () { return Pieces.random(50, 200); },
                ty: function () { return Pieces.random(-200, 200); },
                translate: function () {
                    if (windowWidth > 1120) return { translateX: -240, translateY: -180 };
                    if (windowWidth > 720) return { translateX: -240, translateY: -180 };
                    return { translateX: -140, translateY: -100 };
                }
            } });
        } else {
            console.log(numberOptions);
            items.push({ type: 'text', value: textEl2[i].innerText, options: numberOptions });
        }
    
        // Save indexes
        textIndexes.push(i * 3 + 1);
        numberIndexes.push(i * 3 + 2);
        // Set image src
        slideImage.src = imagesEl[i].src;
    }

    // Initialize a Pieces instance with all items we want to draw
    function initSlider() {
        // Stop any current animation if the slider was initialized before
        if (piecesSlider) {
            piecesSlider.stop();
        }

        

        // Save the new Pieces instance
        piecesSlider = new Pieces({
            canvas: sliderCanvas,
            items: items,
            x: 'centerAll',
            y: 'centerAll',
            piecesSpacing: 1,
            fontFamily: ["'Helvetica Neue', sans-serif"],
            animation: {
                duration: function() { return Pieces.random(1000, 2000); },
                easing: 'easeOutQuint'
            },
            // debug: true
        });

        // Animate all numbers to rotate clockwise indefinitely
        // piecesSlider.animateItems({
        //     items: numberIndexes,
        //     duration: 20000,
        //     angle: 360,
        //     loop: true
        // });

        // Show current items: image, text and number
        showItems();
    }

    // Init Event Listeners
    function initEvents() {
        // Select prev or next slide using buttons
        document.querySelector('.pieces-slider__button--prev').addEventListener('click', prevItem);
        document.querySelector('.pieces-slider__button--next').addEventListener('click', nextItem);
        
        setInterval(nextItem, 2500);
        
        $("canvas").mousemove(function(e) {
            const ctx = sliderCanvas.getContext("2d");
            const mousePos = {
                x: e.clientX - sliderCanvas.offsetTop,
                y: e.clientY - sliderCanvas.offsetLeft
            };
            const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
            
            if (pixel[0] !== 0 || pixel[1] !== 0 || pixel[2] !== 0) {
                $("canvas").css("cursor", "pointer");
            } else {
                $("canvas").css("cursor", "auto");
            }
            
        });
        document.querySelector(".pieces-slider__canvas").addEventListener('click', (e) => {
            //currentIndex = currentIndex < slidesLength - 1 ? currentIndex + 1 : 0;
            const ctx = sliderCanvas.getContext("2d");
            const mousePos = {
                x: e.clientX - sliderCanvas.offsetTop,
                y: e.clientY - sliderCanvas.offsetLeft
            };

            const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;

            // create rgb color for that pixel
            const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
            
            if (pixel[0] !== 0 || pixel[1] !== 0 || pixel[2] !== 0) {
                
                //alert(currentIndex);
                const typeFormCode = '<a class="typeform-share button" href="https://udghosh18.typeform.com/to/Pv17QW" data-mode="drawer_left" data-auto-open=true data-submit-close-delay="5" target="_blank"> </a> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script>';

                switch (currentIndex) {
                    case 0:

                        break;

                    case 1:
                    
                        break;

                    case 2:
                        $("canvas").append(typeFormCode);
                        break;

                    case 3:

                        break;
                        
                    case 4:
                        window.location.href = window.location.href + 'ca';
                        break;    

                    default:
                        break;
                }
                
            }

            


        } );
        // Select prev or next slide using arrow keys
        document.addEventListener('keydown', function (e) {
            if (e.keyCode == 37) { // left
                prevItem();
            } else if (e.keyCode == 39) { // right
                nextItem();
            }
        });

        // Handle `resize` event
        window.addEventListener('resize', resizeStart);
    }

    // Show current items: image, text and number
    function showItems() {
        // Show image pieces
        piecesSlider.showPieces({items: currentImageIndex, ignore: ['tx'], singly: true, update: (anim) => {
            // Stop the pieces animation at 60%, and run a new indefinitely animation of `ty` for each piece
            if (anim.progress > 60) {
                var piece = anim.animatables[0].target;
                var ty = piece.ty;
                anime.remove(piece);
                anime({
                    targets: piece,
                    ty: piece.h_ty < 300
                        ? [{value: ty + 10, duration: 1000}, {value: ty - 10, duration: 2000}, {value: ty, duration: 1000}]
                        : [{value: ty - 10, duration: 1000}, {value: ty + 10, duration: 2000}, {value: ty, duration: 1000}],
                    duration: 2000,
                    easing: 'linear',
                    loop: true
                });
            }
        }});
        // Show pieces for text and number, using alternate `ty` values
        piecesSlider.showPieces({items: currentTextIndex});
        piecesSlider.showPieces({items: currentNumberIndex, ty: function(p, i) { return p.s_ty - [-3, 3][i % 2]; }});
    }

    // Hide current items: image, text and number
    function hideItems() {
        piecesSlider.hidePieces({items: [currentImageIndex, currentTextIndex, currentNumberIndex]});
    }

    // Select the prev item: hide current items, update indexes, and show the new current item
    function prevItem() {
        hideItems();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slidesLength - 1;
        updateIndexes();
        showItems();
    }

    // Select the next item: hide current items, update indexes, and show the new current item
    function nextItem() {
        hideItems();
        currentIndex = currentIndex < slidesLength - 1 ? currentIndex + 1 : 0;
        updateIndexes();
        showItems();
    }

    // Handle `resize` event
    
    var initial = true, hideTimer, resizeTimer;

    // User starts resizing, so wait 300 ms before reinitialize the slider
    function resizeStart() {
        if (initial) {
            initial = false;
            if (hideTimer) clearTimeout(hideTimer);
            sliderCanvas.classList.add('pieces-slider__canvas--hidden');
        }
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeEnd, 500);
    }

    // User ends resizing, then reinitialize the slider
    function resizeEnd() {
        initial = true;
        windowWidth = window.innerWidth;
        initSlider();
        hideTimer = setTimeout(() => {
            sliderCanvas.classList.remove('pieces-slider__canvas--hidden');
        }, 500);
    }
})();
