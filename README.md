# d2l-polymer-behaviors
[![Build status][ci-image]][ci-url]

Shared [Polymer](https://www.polymer-project.org/1.0/)-based behaviors and modules for implementing and consuming web components.

## Installation

`d2l-polymer-behaviors` can be installed from npm:
```shell
npm install Brightspace/d2l-polymer-behaviors-ui
```

## Usage

Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import the component or scripts as needed.

```html
<head>
	<script src="../@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
	<script type="module" src="../d2l-polymer-behaviors/d2l-dom-focus.js"></script>
</head>
```

#### Methods

**D2L.Dom**

```javascript
import { Dom } from '../d2l-polymer-behaviors/d2l-dom.js';
// returns null or the closest ancestor that fulfills the specified predicate fxn
Dom.findComposedAncestor(node, predicate);

// gets the composed children (including shadow children & distributed children)
Dom.getComposedChildren(element);

// gets the composed parent (including shadow host & insertion points)
Dom.getComposedParent(node);

// returns true/false whether the specified ancestorNode is an ancestor of node
Dom.isComposedAncestor(ancestorNode, node);
```

**D2L.Dom.Focus**

```javascript
import { Focus } from '../d2l-polymer-behaviors/d2l-dom-focus.js';
// get the composed active element (i.e. the actual element that has focus)
Focus.getComposedActiveElement();

// get first focusable child or descendant
Focus.getFirstFocusableDescendant(element);

// get last focusable child or descendant
Focus.getLastFocusableDescendant(element);

// get the next focusable child, sibling, etc.
Focus.getNextFocusable(element);

// get the previous focusable child, sibling, etc.
Focus.getPreviousFocusable(element);

// get the nearest focusable ancestor
Focus.getPreviousFocusableAncestor(element);

// check is focusable (tabindex or white-listed elements)
Focus.isFocusable(element);
```

**D2L.Dom.Visibility**

```javascript
import { Visibility } from '../d2l-polymer-behaviors/d2l-dom-visibility.js';
// checks DOM visibility (includes inline & computed style of element and ancestors)
// ... does not check opacity, elements hidden due to overflow or scrolled out of view
Visibility.isVisible(element);
```

**D2L.Gestures.Swipe**

```javascript
import { Swipe } from '../d2l-polymer-behaviors/d2l-gestures-swipe.js';
// sets up event listeners for swipe gesture
Swipe.register(element);

// listen for custom swipe event
element.addEventListener('d2l-swipe', function (e) {
	console.log(
		e.detail.distance,             // .x/.y
		e.detail.direction.angle,      // deg
		e.detail.direction.horizontal, // left/right
		e.detail.direction.vertical,   // up/down
		e.detail.duration              // ms
	);
}.bind(this));

// unregister event listeners for swipe gesture
Swipe.unregister(element);
```

**D2L.Id**

```javascript
import { Id } from '../d2l-polymer-behaviors/d2l-id.js';
// gets a unique indexed id (for lifetime of page)
Id.getUniqueId();
```

#### Behaviors

**D2L.PolymerBehaviors.FocusableArrowKeysBehavior**

The `FocusableArrowKeysBehavior` can be used for managing focus with the arrow keys.

* right/down - focuses next element, or first if currently at the end
* left/up - focuses previous element, or last if currently at beginning
* home - focuses first
* end - focuses last

```javascript
import { FocusableArrowKeysBehavior } from '../d2l-polymer-behaviors/d2l-focusable-arrowkeys-behavior.js';
// include the behavior
behaviors: [
  FocusableArrowKeysBehavior
],

attached: function() {
  Polymer.RenderStatus.afterNextRender(this, function() {

    // indicate the direction (default is leftright)
    this.arrowKeyFocusablesDirection = 'updown';

    // required container element of focusables (used to listen for key events)
    this.arrowKeyFocusablesContainer = container;

    // required provider method that can return list of focusables - possible async
    this.arrowKeyFocusablesProvider = function() {

      // simple case
      return Promise.resolve(focusables);

      // other cases (ex. check visibility when querying focusables)
      return new Promise(function(resolve) {
        fastdom.measure(function() {
          // ...
          resolve(focusables);
        });
      });

    };

    // optional callback before focus is applied
    this.arrowKeyFocusablesOnBeforeFocus = function(elem) {
        return new Promise(function(resolve) {
            // do some stuff
            resolve();
        });
    };

  });
}
```

**D2L.PolymerBehaviors.VisibleOnAncestorBehavior**

The `VisibleOnAncestorBehavior` can be used to show an element when a specified ancestor is being hovered, or a child of the ancestor has the focus.  Likewise, the element will be hidden if the specified ancestor is not being hovered and none of its children have the focus.  To define a component with this behavior, simply include the styles and behavior as shown in the example below.

```html
<dom-module id="d2l-example">
  <template>
    <style include="d2l-visible-on-ancestor-styles"></style>
  </template>
  <script>
  Polymer({
    is: 'd2l-example',
    behaviors: [
      D2L.PolymerBehaviors.VisibleOnAncestorBehavior
    ]
  });
  </script>
</dom-module>
```

The consumer of `d2l-example` adds the `d2l-visible-on-ancestor-target` class to the desired ancestor that will be the target for mouse and focus events.  If the user hovers the target, or focuses any element contained within, `d2l-example` will be displayed.

```html
<div class="d2l-visible-on-ancestor-target">
  ...
  <d2l-example visible-on-ancestor></d2l-example>
  ...
</div>
```

### Usage in Production

In production, it's recommended to use a build tool like [Vulcanize](https://github.com/Polymer/vulcanize) to combine all your web components into a single import file. [More from the Polymer Docs: Optimize for Production](https://www.polymer-project.org/1.0/tools/optimize-for-production.html)...

## Coding styles

See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on VUI naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.

[ci-url]: https://travis-ci.org/Brightspace/d2l-polymer-behaviors-ui
[ci-image]: https://travis-ci.org/Brightspace/d2l-polymer-behaviors-ui.svg?branch=master
