// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@7.4.1/swiper-bundle.min.css">
// <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/swiper@7.4.1/swiper-bundle.min.js"></script>

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

export default NavSlider;
