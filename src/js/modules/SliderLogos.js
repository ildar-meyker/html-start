// <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
// <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
// <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.scss";

const SliderLogos = {
	init() {
		$(".slider-logos__root").each(function () {
			$(this)
				.find(".slider-logos__list")
				.slick({
					dots: true,
					infinite: false,
					slidesToShow: 4,
					slidesToScroll: 4,
					prevArrow: $(this).find(".slider-logos__prev"),
					appendDots: $(this).find(".slider-logos__dots"),
					nextArrow: $(this).find(".slider-logos__next"),
					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
							},
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
							},
						},

						{
							breakpoint: 600,
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
	SliderLogos.init();
});

export default SliderLogos;
