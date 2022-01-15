import $ from "jquery";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const NavSlider = {
	init() {
		$(".nav-slider").each(function () {
			new Swiper($(this).find(".swiper")[0], {
				mousewheel: {
					forceToAxis: true,
				},
				slidesPerView: "auto",
				navigation: {
					prevEl: $(this).find(".nav-slider__prev")[0],
					nextEl: $(this).find(".nav-slider__next")[0],
				},
			});
		});
	},
};

$(function () {
	NavSlider.init();
});

export default NavSNavSliderwiper;
