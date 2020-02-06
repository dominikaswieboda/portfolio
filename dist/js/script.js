$(document).ready(function() {

    // Technologies slider
    $('.owl-carousel').owlCarousel({
        loop:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            480:{
                items:2,
            },
            956:{
                items:3,
            },
            1280:{
                items:5,
                loop:false
            }
        }
    });

    //Plugins slideNav
    new SlideNav({
        activeClass: "active",
        toggleButtonSelector: false,
        toggleBoxSelector: false,
        hideAfterSelect: true,
        speed: 100,
        changeHash: false,
        navBoxToggleClass: false
    });

//Fixed menu
    const nav = document.querySelector('.header');
    function fixNav() {
        if (window.scrollY > 0) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    }
    fixNav();
    window.addEventListener('scroll', fixNav);

//Hamburger menu
    const hamburger = document.querySelector('.header__hamburger');

    hamburger.addEventListener('click', function () {
        document.querySelector('.header__nav').classList.toggle('expand');
        this.classList.toggle('active');
    });

//Mousemove parallax
    $(".banner").mousemove(function(e) {
        var xpos=e.clientX;
        var ypos=e.clientY;
        xpos=xpos*2;
        ypos=ypos*2;
        $('.person').css('top',((0+(ypos/50))+"px"));
        $('.person').css('right',(( 0+(xpos/80))+"px"));
    });

//Contact card mousemove
// Set sticker height + hover animation
    var setCardStyle = function(){

        var card = $('.contact__card');
        var cardWidth = card.width();
        var cardHeight = cardWidth/2.5;

        // // Set scale
        var cardContentScale = cardWidth/700;
        card.css('transform','translate3d(0,0,0) matrix3d(1,0,0.00,0.00,0.00,1,0.00,0,0,0,1,0,0,0,0,1) scale('+cardContentScale+')');

        // Set height
        card.height(cardHeight);

        // Generate hover effect
        card
            .mouseover(function(){
                card.mousemove(function(e){
                    // Find mouse X position in card
                    mouseScreenPositionX = e.pageX;
                    cardLeftPosition = card.offset().left;
                    mousePosX = ((mouseScreenPositionX - cardLeftPosition)/cardWidth);
                    // Calculate maxtrix3d X value
                    matrix3dX = ((mousePosX/10000)*1.5)-0.0001;

                    // Find mouse Y position in card
                    mouseScreenPositionY = e.pageY;
                    cardTopPosition = card.offset().top;
                    mousePosY = ((mouseScreenPositionY-cardTopPosition)/cardHeight);
                    // Calculate maxtrix3d Y value
                    matrix3dY = ((mousePosY/10000)*1.65)-0.0001;

                    // Set CSS
                    card.css('transform', 'translate3d(0,-5px,0) matrix3d(1,0,0.00,'+matrix3dX+',0.00,1,0.00,'+matrix3dY+',0,0,1,0,0,0,0,1) scale('+cardContentScale*1.04+')');
                });
            })
            .mouseout(function(){
                // Unset CSS on mouseleave
                card.css('transform','translate3d(0,0,0) matrix3d(1,0,0.00,0.00,0.00,1,0.00,0,0,0,1,0,0,0,0,1) scale('+cardContentScale+')');
            });
    }

    // Filters by category in portfolio
    $('.portfolio__filters__category ul li').click(function(){
        $('.portfolio__filters__category ul li').removeClass('active');
        $(this).addClass('active');

        $('.portfolio__item__back').addClass('hide');
        setTimeout(function() {
            $('.portfolio__item__back').removeClass('hide');
        }, 200);


        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".portfolio__items").isotope({
        itemSelector: ".all",
        percentPosition: true,
        masonry: {
            columnWidth: ".all"
        }
    });
// Execute function
    setCardStyle();
    $(window).on('resize', function(){
        setCardStyle();
    })
});