var contactForm = document.querySelector('.contact-form');
var contactHead = document.querySelector('.contact-head');
var textboxen = Array.prototype.slice.call(document.querySelectorAll(".contact-form input"));
var requiredComponents = Array.prototype.slice.call(document.querySelectorAll("[required]"));
var contactSubmitButton = document.getElementById('contact-submit-button');
var contactActionUrl = "https://formspree.io";

// PreLoader
jQuery.noConflict();
(function($) {
    $(window).on('load', function() { // makes sure the whole site is loaded
        $('#status').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(200).fadeOut('slow'); // will fade out the white DIV that covers the website.
    });
})(jQuery);

// Scroll to Top
jQuery.noConflict();
(function($) {
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200); // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200); // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function() { // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
    });
})(jQuery);

// jQuery for page scrolling feature - requires jQuery Easing plugin
jQuery.noConflict();
(function($) {
    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });
})(jQuery);


// Regular expression from W3C HTML5.2 input specification:
// https://www.w3.org/TR/html/sec-forms.html#email-state-typeemail
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

new Vue({
    // root node
    el: "#app",
    // the instance state
    data: function() {
        return {
            name: "",
            email: {
                value: "",
                valid: true
            },
            discuss: '',
            seeking: ["Xamarin", "Java/Kotlin", "C#", "MVC", ".NET CORE", "React", "Node.js"],
            selection: []
            ,
            message: {
                text: "",
                maxlength: 255
            },
            submitted: false
        };
    },
    methods: {
        // submit form handler
        submit: function() {
            this.submitted = true;
        },
        // validate by type and value
        validate: function(type, value) {
            if (type === "email") {
                this.email.valid = this.isEmail(value) ? true : false;
            }
        },
        // check for valid email adress
        isEmail: function(value) {
            return emailRegExp.test(value);
        },
        // check or uncheck all
        checkAll: function(event) {
            this.selection = event.target.checked ? this.seeking : [];
        }
    },

    watch: {
        // watching nested property
        "email.value": function(value) {
            this.validate("email", value);
        }
    }
});

// typer for hello
window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 10px solid white }";
    document.body.appendChild(css);
};

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 1) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
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

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 200;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

// number count for stats
jQuery.noConflict();
(function($) {
    $('.counter').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({
            countNum: $this.text()
        }).animate({
                countNum: countTo
            },

            {
                duration: 3000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                    //alert('finished');
                }
            });
    });
})(jQuery);

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

    if (!document.querySelectorAll) {
        var getElementsByClass = function getElementsByClass(searchClass, node, tag) {
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

textboxen.forEach(function(element) {
    element.addEventListener('keyup', function(event) {
        element.setAttribute('size', element.value.length);
    });
    element.setAttribute('size', element.value.length);
});

// textarea expanding
initExpandingTextareas();

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; };
}();

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


jQuery(document).ready(function($) {
    var scrolling = false;
    var contentSections = $('.cd-section'),
        verticalNavigation = $('.cd-vertical-nav'),
        navigationItems = verticalNavigation.find('a'),
        navTrigger = $('.cd-nav-trigger'),
        scrollArrow = $('.cd-scroll-down');

    $(window).on('scroll', checkScroll);

    //smooth scroll to the selected section
    verticalNavigation.on('click', 'a', function(event) {
        event.preventDefault();
        smoothScroll($(this.hash));
        verticalNavigation.removeClass('open');
    });

    //smooth scroll to the second section
    scrollArrow.on('click', function(event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    // open navigation if user clicks the .cd-nav-trigger - small devices only
    navTrigger.on('click', function(event) {
        event.preventDefault();
        verticalNavigation.toggleClass('open');
    });

    function checkScroll() {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame) ? setTimeout(updateSections, 300): window.requestAnimationFrame(updateSections);
        }
    }

    function updateSections() {
        var halfWindowHeight = $(window).height() / 2,
            scrollTop = $(window).scrollTop();
        contentSections.each(function() {
            var section = $(this),
                sectionId = section.attr('id'),
                navigationItem = navigationItems.filter('[href^="#' + sectionId + '"]');
            ((section.offset().top - halfWindowHeight < scrollTop) && (section.offset().top + section.height() - halfWindowHeight > scrollTop)) ?
            navigationItem.addClass('active'): navigationItem.removeClass('active');
        });
        scrolling = false;
    }


    function smoothScroll(target) {
        $('body,html').animate({ 'scrollTop': target.offset().top },
            300
        );
    }
});


function secHeight() {
    var vpHeight = $(window).height();
    $('section').css('min-height', vpHeight);
}

function mClose() {
    if ($('#menu').hasClass('on')) {
        $('#menu').addClass('off').removeClass('on');
    }
}

function animatescroll(id) {
    $('body, html').animate({
        scrollTop: $(id).offset().top
    }, 500);
}