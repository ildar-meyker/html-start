import "./modules/globals";
import "./modules/Notify";
import "./modules/NavSlider";
import "./modules/AudioList";
import "./modules/SliderVideos";
import "./modules/SliderLogos";

import OfficesMap from "./modules/OfficesMap";

ymaps.ready(() => {
	new OfficesMap({
		el: "offices-map",
		center: [55.7600134479554, 37.6234488098733],
		zoom: 8,
		dataUrl: "data/map-addresses.json",
		iconUrl: "data/map-icon.png",
		iconOffset: [-28, -68],
		iconSize: [56, 68],
	});
});
