// <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
// <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
// <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.scss";

const SliderVideos = {
	init() {
		$(".slider-videos").each(function () {
			$(this)
				.find(".slider-videos__list")
				.slick({
					dots: true,
					infinite: false,
					slidesToShow: 2,
					slidesToScroll: 2,
					prevArrow: $(this).find(".slider-videos__prev"),
					appendDots: $(this).find(".slider-videos__dots"),
					nextArrow: $(this).find(".slider-videos__next"),
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
							},
						},
					],
				});
		});
	},
};

$(function () {
	SliderVideos.init();
});

export default SliderVideos;
