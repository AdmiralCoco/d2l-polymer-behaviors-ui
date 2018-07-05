import '../../../@polymer/polymer/polymer-legacy.js';
import '../../d2l-focusable-behavior.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
	_template: html`
        <style>
            :host, a {
                display: block;
            }
        </style>
        <div>
            <a id="shadow1" href="javascript:void(0);" tabindex="0">Shadow 1</a>
            <slot></slot>
            <a id="shadow2" class="d2l-focusable" href="javascript:void(0);" tabindex="0">Shadow 2 (d2l-focusable)</a>
        </div>
`,

	is: 'd2l-focusable-component',
	behaviors: [D2L.PolymerBehaviors.FocusableBehavior]
});
