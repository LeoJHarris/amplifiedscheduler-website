//made by vipul mirajkar thevipulm.appspot.com
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid white}";
    document.body.appendChild(css);
};

function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementsByClassName(imgID)[0];

    /*create magnifier glass:*/
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img);

    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        //e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /*set the position of the magnifier glass:*/
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /*display what the magnifier glass "sees":*/
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0,
            y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}

$('.js-input').keyup(function() {
    if ($(this).val()) {
        $(this).addClass('not-empty');
    } else {
        $(this).removeClass('not-empty');
    }
});

var $element = $('.each-event, .title');
var $window = $(window);
$window.on('scroll resize', check_for_fade);
$window.trigger('scroll');

function check_for_fade() {
    var window_height = $window.height();

    $.each($element, function(event) {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_offset = $element.offset().top;
        space = window_height - (element_height + element_offset - $(window).scrollTop());
        if (space < 60) {
            $element.addClass("non-focus");
        } else {
            $element.removeClass("non-focus");
        }

    });
};

$(function() {

    var watchScroll = 0;
    var rightComments = $('.r-event .event-body');
    var leftComments = $('.l-event .event-body');
    TweenMax.staggerFrom(rightComments, 1, { x: 100, ease: Bounce.easeOut }, 1);
    TweenMax.staggerFrom(leftComments, 1, { x: -100, ease: Bounce.easeOut }, 1);

    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        (scrollTop > watchScroll) ?
        $('footer').addClass('footer-up'):
            $('footer').removeClass('footer-up');

        watchScroll = scrollTop;
    })
})


var contactForm = document.querySelector('.contact-form');
var contactHead = document.querySelector('.contact-head');
var textboxen = Array.prototype.slice.call(document.querySelectorAll(".contact-form input"));
var requiredComponents = Array.prototype.slice.call(document.querySelectorAll("[required]"));
var contactSubmitButton = document.getElementById('contact-submit-button');
var contactActionUrl = "https://formspree.io";

function initExpandingTextareas() {

    var textareas = document.querySelectorAll('.expanding'),

        resize = function resize(t) {
            t.style.height = 'auto';
            t.style.overflow = 'hidden'; // Ensure scrollbar doesn't interfere with the true height of the text.
            t.style.height = t.scrollHeight + t.offset + 'px';
            t.style.overflow = '';
        },

        attachResize = function attachResize(t) {
            if (t) {
                console.log('t.className', t.className);
                t.offset = !window.opera ? t.offsetHeight - t.clientHeight : t.offsetHeight + parseInt(window.getComputedStyle(t, null).getPropertyValue('border-top-width'));

                resize(t);

                if (t.addEventListener) {
                    t.addEventListener('input', function() { resize(t); });
                    t.addEventListener('mouseup', function() { resize(t); }); // set height after user resize
                }

                t['attachEvent'] && t.attachEvent('onkeyup', function() { resize(t); });
            }
        };

    // IE7 support
    if (!document.querySelectorAll) {
        var

            getElementsByClass = function getElementsByClass(searchClass, node, tag) {
                var classElements = new Array();
                node = node || document;
                tag = tag || '*';
                var els = node.getElementsByTagName(tag);
                var elsLen = els.length;
                var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
                for (i = 0, j = 0; i < elsLen; i++) {
                    if (window.CP.shouldStopExecution(0)) break;
                    if (pattern.test(els[i].className)) {
                        classElements[j] = els[i];
                        j++;
                    }
                }
                window.CP.exitedLoop(0);
                return classElements;
            };

        textareas = getElementsByClass('expanding');
    }

    for (var i = 0; i < textareas.length; i++) {
        if (window.CP.shouldStopExecution(1)) break;
        attachResize(textareas[i]);

        console.log('current textarea: ' + textareas[i]);
        console.log('attachResize(textarea[i]) result: ' + attachResize(textareas[i]));
    }
    window.CP.exitedLoop(1);

}




textboxen.forEach(function(element) {
    element.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();
        }
    });
});

// event delegation instead of being lazy
textboxen.forEach(function(element) {
    element.addEventListener('keyup', function(event) {
        element.setAttribute('size', element.value.length);
    });
    element.setAttribute('size', element.value.length);
});

// textarea expanding
initExpandingTextareas();

//change the default behavior for :required:invalid to only apply after interaction with the element or an attempt to submit the form
//  stash list of required elements in array
requiredComponents.forEach(function(element) {
    element.removeAttribute('required');
});

// onBlur after gaining and losing focus add back the required flag 
requiredComponents.forEach(function(element) {
    element.addEventListener('focus', function() {
        element.setAttribute('required', true);
    });
});

// when submit button click, add required attribute back
contactSubmitButton.addEventListener('click', function() {
    requiredComponents.forEach(function(element) {
        element.setAttribute('required', true);
    });
});

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();


    requiredComponents.forEach(function(element) {
        element.setAttribute('required', true);
    });

    if (contactForm.checkValidity) {
        document.body.classList.add('contact-submitted');
        contactHead.classList.add('contact-submitted');

        var contactContent = {};

        for (var i = 0, _j = contactForm.length; i < _j; i += 1) {
            if (window.CP.shouldStopExecution(2)) break;
            var inputElement = contactForm[i];
            if (inputElement.name) {
                contactContent[inputElement.name] = inputElement.value;
            }
        }
        window.CP.exitedLoop(2);

        setTimeout(function() {
            var request = new XMLHttpRequest();
            request.open('POST', contactActionUrl, true);
            request.setRequestHeader('Accept', 'application/json; charset=utf-8');
            request.setRequestHeader('Content-Type', 'application/json charset=UTF-8');

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var resp = request.responseText;
                } else {
                    // handle error
                }
            };

            request.onerror = function() {
                // handle connection error
            };

            request.send(JSON.stringify(contactContent));

            contactForm.reset();
            //code pen psuedoreset to get back to initial state
            document.body.classList.remove('contact-submitted');
            contactHead.classList.remove('contact-submitted');
            requiredComponents.forEach(function(element) {
                element.removeAttribute('required');
            });

        }, 2000);
    }
    return false;
});






var _createClass = function() {
    function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor); } } return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var rid = null;
var spring = 0.09;
var friction = 0.8;
var divs = Array.from(document.querySelectorAll(".innerdiv"));
var

    Chart = function() {
        function Chart(path, text, target) {
            _classCallCheck(this, Chart);
            this.path = path;
            this.text = text;
            this.text.textContent = target + "%";
            this.R = 10;
            this.start = .01;
            this.divisions = 100;
            this.vel = 0;
            this.stylePath(target);
        }
        _createClass(Chart, [{
            key: "stylePath",
            value: function stylePath(

                target) {
                var d = "M" + this.R + ",0  A" + this.R + "," + this.R + " 0 1,1 " + this.R + ",-.01z";
                this.path.setAttributeNS(null, "d", d);
                this.pathLength = this.path.getTotalLength();
                this.unit = this.pathLength / this.divisions;
                this.strokeLength = this.start * this.unit;
                this.target = target * this.unit;
                this.path.style.strokeDasharray = this.strokeLength + "," + (this.pathLength -
                    this.strokeLength);
            }
        }, {
            key: "updateStrokeLength",
            value: function updateStrokeLength()

            {
                this.dist = this.target - this.strokeLength;
                this.acc = this.dist * spring;
                this.vel += this.acc;
                this.vel *= friction;
                this.strokeLength += this.vel;
                this.path.style.strokeDasharray = this.strokeLength + "," + (this.pathLength -
                    this.strokeLength);
            }
        }]);
        return Chart;
    }();


var charts = [];

charts.push(new Chart(aPath, aText, 19));
charts.push(new Chart(bPath, bText, 62));
charts.push(new Chart(gPath, gText, 32));

function Frame() {
    rid = window.requestAnimationFrame(Frame);
    charts.map(function(c) { return c.updateStrokeLength(); });
}
Frame();

divs.map(function(div) {
    div.addEventListener("input", function() {
        charts.map(function(c) {
            if (isNaN(parseInt(c.text.textContent))) { c.text.textContent = 0 + "%"; }
            if (parseInt(c.text.textContent) > 100) { c.text.textContent = 100 + "%"; }
            if (rid) { window.cancelAnimationFrame(rid); }
            c.target = (parseInt(c.text.textContent) || 0) * c.unit;
            if (!c.text.textContent.match("%")) { c.text.textContent += "%"; }
            Frame();
        });
    });
});




//made by vipul mirajkar thevipulm.appspot.com
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };




    // for animation 

$(document).ready(function(){
  $('.pp-quote').click(function(){
    $('.pp-quote').removeClass("active");
    $(this).addClass("active");
});
});

$(document).ready(function(){
    
       // hide-top

        $('.li-quote-1').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');
            $('.quote-text-1').addClass('show');
            $('.quote-text-1').removeClass('hide-bottom');             
        });

        $('.li-quote-2').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');
            $('.quote-text-2').addClass('show');             
            $('.quote-text-2').removeClass('hide-bottom');
        });

        $('.li-quote-3').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');         
            $('.quote-text-3').addClass('show');             
            $('.quote-text-3').removeClass('hide-bottom');
        });
        $('.li-quote-4').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-4').addClass('show');             
            $('.quote-text-4').removeClass('hide-bottom');
        });
        $('.li-quote-5').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-5').addClass('show');             
            $('.quote-text-5').removeClass('hide-bottom');
        });
        $('.li-quote-6').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-6').addClass('show');             
            $('.quote-text-6').removeClass('hide-bottom');
        });
        $('.li-quote-7').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-7').addClass('show');             
            $('.quote-text-7').removeClass('hide-bottom');
        });
        $('.li-quote-8').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-8').addClass('show');             
            $('.quote-text-8').removeClass('hide-bottom');
        });
           
    
});


$(document).ready(function(){
    
       // hide-top

        $('.li-quote-1').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-1').addClass('look');
            $('.dp-name-1').removeClass('hide-dp-bottom');             
        });

        $('.li-quote-2').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-2').addClass('look');
            $('.dp-name-2').removeClass('hide-dp-bottom');             
        });

        $('.li-quote-3').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-3').addClass('look');
            $('.dp-name-3').removeClass('hide-dp-bottom');             
        });
        $('.li-quote-4').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-4').addClass('look');
            $('.dp-name-4').removeClass('hide-dp-bottom');             
        });
        
        $('.li-quote-5').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-5').addClass('look');
            $('.dp-name-5').removeClass('hide-dp-bottom');             
        });
        
        $('.li-quote-6').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-6').addClass('look');
            $('.dp-name-6').removeClass('hide-dp-bottom');             
        });
        $('.li-quote-7').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-7').addClass('look');
            $('.dp-name-7').removeClass('hide-dp-bottom');             
        });
        $('.li-quote-8').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-8').addClass('look');
            $('.dp-name-8').removeClass('hide-dp-bottom');             
        });
           
    
});