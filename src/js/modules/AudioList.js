// <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/howler@2.2.3/dist/howler.min.js"></script>

import $ from "jquery";
import { Howl, Howler } from "howler";

const AudioList = {
	_$currentItem: $(),

	_player: null,

	_isPlayerOn: false,

	_play() {
		this._$currentItem.addClass("active");
		this._isPlayerOn = true;
		this._player.play();
	},

	_pause() {
		this._$currentItem.removeClass("active");
		this._isPlayerOn = false;
		this._player.pause();
	},

	_handlePlayButton(e) {
		const $item = $(e.currentTarget).closest(".audio-list__item");
		const src = $item.data("src");

		const isPlayerOn = this._isPlayerOn;

		if (isPlayerOn) {
			this._pause();
		}

		if (this._$currentItem[0] !== $item[0]) {
			this._$currentItem = $item;
			this._player = new Howl({
				src: [src],
			});
			this._player.on("end", () => {
				this._$currentItem.removeClass("active");
				this._isPlayerOn = false;
			});

			this._play();
		} else {
			if (isPlayerOn) return;

			this._play();
		}
	},

	init() {
		if ($(".audio-list").length === 0) return;

		$(document).on(
			"click",
			".audio-list__button",
			this._handlePlayButton.bind(this)
		);
	},
};

$(function () {
	AudioList.init();
});

export default AudioList;
