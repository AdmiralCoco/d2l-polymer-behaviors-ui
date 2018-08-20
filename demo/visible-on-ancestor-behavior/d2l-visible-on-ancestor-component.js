import '../../../@polymer/polymer/polymer-legacy.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { FocusableBehavior } from '../../d2l-focusable-behavior.js';
import { VisibleOnAncestorBehavior } from '../../d2l-visible-on-ancestor-behavior.js';

Polymer({
	_template: html`
		<style include="d2l-visible-on-ancestor-styles">
			:host {
				display: inline-block;
			}
		</style>
		<button class="d2l-focusable"><slot></slot></button>
	`,
	is: 'd2l-visible-on-ancestor-component',
	behaviors: [
		FocusableBehavior,
		VisibleOnAncestorBehavior
	]
});
