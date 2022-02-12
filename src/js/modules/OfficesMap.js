import $ from "jquery";

class ContactsMap {
	constructor(options) {
		this.map = null;
		this.placemarks = [];
		this.loadedList = [];
		this.options = Object.assign({}, options);

		this.drawMap();

		$.getJSON(this.options.dataUrl)
			.done((data) => {
				this.loadedList = data;
				this.drawMarkers();
			})
			.fail(() => {
				console.error("Map addresses loading is failed.");
			});
	}

	drawMap() {
		this.map = new ymaps.Map(this.options.el, {
			controls: [],
			center: this.options.center,
			zoom: this.options.zoom || 10,
		});
	}

	drawMarkers() {
		this.loadedList.forEach((item) => {
			const placemark = new ymaps.Placemark(
				item.position,
				{
					balloonContentBody: item.content,
					hintContent: item.title,
				},
				{
					iconLayout: "default#image",
					iconImageHref: this.options.iconUrl,
					iconImageOffset: this.options.iconOffset,
					iconImageSize: this.options.iconSize,
				}
			);

			this.map.geoObjects.add(placemark);
			this.placemarks[item.id] = placemark;
		});
	}
}

export default ContactsMap;
