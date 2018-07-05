import '../../../@polymer/polymer/polymer-legacy.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
	_template: html`
        <style>
            :host {
                display: block;
            }
        </style>
        <div>
            <div>
                <a id="shadow1" href="javascript:void(0);" tabindex="0">Shadow 1</a>
            </div>
            <slot></slot>
            <div>
                <a id="shadow2" class="d2l-focusable" href="javascript:void(0);" tabindex="0">Shadow 2</a>
            </div>
        </div>
`,

	is: 'd2l-dom-focus-component',
	getShadow1: function() { return this.$.shadow1; },
	getShadow2: function() { return this.$.shadow2; }
});
