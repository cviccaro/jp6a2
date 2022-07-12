(function($) {
    $(document).ready(function() {
        $(".menu").click(function(){
            $(".bignav").fadeToggle( "fast", "linear" );
        });
        $(".bignav_list li a").click(function(){
            $(".bignav").fadeToggle( "fast", "linear" );
        });
        $(".bignav_list li a").click(function(){
            $(".menu").toggleClass('change');
			$(".menu").toggleClass('fixed');
        });
        $(".menu").click(function(){
            $(this).toggleClass('change');
			$(this).toggleClass('fixed');
        });

        var page = $('.centerbanner_int').length ? 'other' : 'home';
        var scrollTarget = page === 'home' ? 705 : 304;

        $(document).scroll(function() {
			if($(window).width() >= 600){
            var scrollTop = $(window).scrollTop();

            if (scrollTop > scrollTarget) {
                $('body').addClass('fixed-header');
            } else {
                $('body').removeClass('fixed-header');
            }
			}
        });
    });
})(jQuery);	