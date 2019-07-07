
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }
    function set_style(node, key, value) {
        node.style.setProperty(key, value);
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            while (render_callbacks.length) {
                const callback = render_callbacks.pop();
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_render);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_render.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            remaining: 0,
            callbacks: []
        };
    }
    function check_outros() {
        if (!outros.remaining) {
            run_all(outros.callbacks);
        }
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.callbacks.push(() => {
                outroing.delete(block);
                if (callback) {
                    block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);

    function bind(component, name, callback) {
        if (component.$$.props.indexOf(name) === -1)
            return;
        component.$$.bound[name] = callback;
        callback(component.$$.ctx[name]);
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_render } = component.$$;
        fragment.m(target, anchor);
        // onMount happens after the initial afterUpdate. Because
        // afterUpdate callbacks happen in reverse order (inner first)
        // we schedule onMount callbacks before afterUpdate callbacks
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_render.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal$$1, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal: not_equal$$1,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_render: [],
            after_render: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal$$1($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_render);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/ConfirmanceDetails.svelte generated by Svelte v3.6.3 */
    const { document: document_1 } = globals;

    const file = "src/ConfirmanceDetails.svelte";

    function add_css() {
    	var style = element("style");
    	style.id = 'svelte-xsdz0f-style';
    	style.textContent = ".level-container.svelte-xsdz0f{padding:15px;font-size:14px !important;clear:both}.level-container.svelte-xsdz0f code.svelte-xsdz0f{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:4px}.media-block.svelte-xsdz0f{padding:15px;float:left}.level-description.svelte-xsdz0f{padding:15px;clear:both}.level-violations.svelte-xsdz0f{padding:10px}.media-block-left.svelte-xsdz0f{float:left}.media-block-right.svelte-xsdz0f{float:right;padding-left:30px}.media-block-right.svelte-xsdz0f ul.svelte-xsdz0f{list-style:initial}.level-violations.svelte-xsdz0f{clear:both}.level-violations.svelte-xsdz0f a.svelte-xsdz0f{color:white !important;text-decoration:underline !important}.violation-node.svelte-xsdz0f{padding:10px;clear:both}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlybWFuY2VEZXRhaWxzLnN2ZWx0ZSIsInNvdXJjZXMiOlsiQ29uZmlybWFuY2VEZXRhaWxzLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICAgIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICAgIGV4cG9ydCBsZXQgbGV2ZWxEYXRhO1xuXG4gICAgbGV0IHRvdGFsTm9kZXMgPSAwO1xuICAgIGxldCB0b3RhbE5vZGVzQ29tcHV0ZWQgPSBmYWxzZTtcbiAgICBsZXQgc2VsZWN0ZWRWaW9sYXRpb25JZHggPSAtMTtcbiAgICBsZXQgaXNWaW9sYXRpb25EZXRhaWxzU2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIGxldCBjb25maXJtYW5jZVJ1bGVzQ291bnQ7XG4gICAgbGV0IHBhZ2VBcHBsaWNhYmxlUnVsZXNDb3VudDtcbiAgICBsZXQgcGFnZUluYXBwbGljYWJsZVJ1bGVzQ291bnQ7XG5cbiAgICAkOiB7XG4gICAgICAgIGxldmVsRGF0YS5zY2FuRGF0YS52aW9sYXRpb25zLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICB2LnNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKCF0b3RhbE5vZGVzQ29tcHV0ZWQpIHtcbiAgICAgICAgICAgICAgICB0b3RhbE5vZGVzICs9IHYubm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHYubm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5vZGUudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5ub3RhdGlvbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbkVsZW0uaW5uZXJIVE1MID0gbm9kZUVsZW0ubm9kZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb25FbGVtLmNsYXNzTmFtZSA9IFwidmlzdWExMXktYW5ub3RhdGVcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYobm9kZUVsZW0ubm9kZU5hbWUgIT09ICdIVE1MJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlRWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZUJlZ2luJywgYW5ub3RhdGlvbkVsZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2hvd0h0bWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXZlbERhdGEudmlvbGF0aW9ucyA9IGxldmVsRGF0YS5zY2FuRGF0YS52aW9sYXRpb25zXG4gICAgICAgIHRvdGFsTm9kZXNDb21wdXRlZCA9IHRydWU7XG4gICAgICAgIGNvbmZpcm1hbmNlUnVsZXNDb3VudCA9IGF4ZS5nZXRSdWxlcyhsZXZlbERhdGEuc2NhblRhZ3MpLmxlbmd0aDtcbiAgICAgICAgcGFnZUluYXBwbGljYWJsZVJ1bGVzQ291bnQgPSBsZXZlbERhdGEuc2NhbkRhdGEuaW5hcHBsaWNhYmxlLmxlbmd0aDtcbiAgICAgICAgcGFnZUFwcGxpY2FibGVSdWxlc0NvdW50ID0gY29uZmlybWFuY2VSdWxlc0NvdW50IC0gcGFnZUluYXBwbGljYWJsZVJ1bGVzQ291bnQ7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVWaW9sYXRpb25EZXRhaWxzKHZpb2xhdGlvbiwgaWR4KXtcbiAgICAgICAgaWYoIWlzVmlvbGF0aW9uRGV0YWlsc1NlbGVjdGVkIHx8IChpZHggIT0gLTEgJiYgaWR4ICE9PSBzZWxlY3RlZFZpb2xhdGlvbklkeCkpe1xuICAgICAgICAgICAgaXNWaW9sYXRpb25EZXRhaWxzU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZWN0ZWRWaW9sYXRpb25JZHggPSBpZHg7XG4gICAgICAgIH0gZWxzZSBpZihpZHggPT0gc2VsZWN0ZWRWaW9sYXRpb25JZHgpe1xuICAgICAgICAgICAgaXNWaW9sYXRpb25EZXRhaWxzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGVjdGVkVmlvbGF0aW9uSWR4ID0gLTE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnb3RvRWxlbWVudCh0YXJnZXQpe1xuICAgICAgICBjb25zdCBhbm5vdGF0ZWRFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52aXN1YTExeS1hbm5vdGF0ZS1iZycpO1xuICAgICAgICBmb3IobGV0IGk9MDsgaTxhbm5vdGF0ZWRFbGVtcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBhbm5vdGF0ZWRFbGVtc1tpXS5jbGFzc05hbWUgPSBhbm5vdGF0ZWRFbGVtc1tpXS5jbGFzc05hbWUucmVwbGFjZSgnIHZpc3VhMTF5LWFubm90YXRlLWJnJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRhcmdldCl7XG4gICAgICAgICAgICBjb25zdCBlbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gICAgICAgICAgICBpZihlbGUpe1xuICAgICAgICAgICAgICAgIGVsZS5jbGFzc05hbWUgPSBlbGUuY2xhc3NOYW1lICsnIHZpc3VhMTF5LWFubm90YXRlLWJnJztcbiAgICAgICAgICAgICAgICBlbGUuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dIdG1sKG5vZGUpe1xuICAgICAgICBub2RlLnNob3dIdG1sID0gIW5vZGUuc2hvd0h0bWw7XG4gICAgICAgIHJldHVybiBub2RlLnNob3dIdG1sO1xuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgLmxldmVsLWNvbnRhaW5lcntcbiAgICAgICAgcGFkZGluZzogMTVweDtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGNsZWFyOiBib3RoO1xuICAgIH1cbiAgICAubGV2ZWwtY29udGFpbmVyIGNvZGUge1xuICAgICAgICBwYWRkaW5nOiAycHggNHB4O1xuICAgICAgICBmb250LXNpemU6IDkwJTtcbiAgICAgICAgY29sb3I6ICNjNzI1NGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmOWYyZjQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICB9XG5cbiAgICAubWVkaWEtYmxvY2t7XG4gICAgICAgIHBhZGRpbmc6IDE1cHg7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgIH1cblxuICAgIC5sZXZlbC1kZXNjcmlwdGlvbntcbiAgICAgICAgcGFkZGluZzogMTVweDtcbiAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgfVxuXG4gICAgLmxldmVsLXZpb2xhdGlvbnN7XG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgIFxuICAgIH1cbiAgICAubWVkaWEtYmxvY2stbGVmdHtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgfVxuICAgIC5tZWRpYS1ibG9jay1yaWdodHtcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XG4gICAgfVxuXG4gICAgLm1lZGlhLWJsb2NrLXJpZ2h0IHVsIHtcbiAgICAgICAgbGlzdC1zdHlsZTogaW5pdGlhbDtcbiAgICB9XG5cbiAgICAubGV2ZWwtdmlvbGF0aW9uc3tcbiAgICAgICAgY2xlYXI6Ym90aDtcbiAgICB9XG4gICAgLmxldmVsLXZpb2xhdGlvbnMgYSB7XG4gICAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC52aW9sYXRpb24tbm9kZSB7XG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgIGNsZWFyOiBib3RoO1xuICAgIH1cblxuPC9zdHlsZT5cbjxkaXYgY2xhc3M9XCJsZXZlbC1jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWVkaWEtYmxvY2tcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWJsb2NrLWxlZnRcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge2xldmVsRGF0YS5oZWFkaW5nfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtsZXZlbERhdGEuc3ViaGVhZGluZ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPXtsZXZlbERhdGEubGlua31cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2xldmVsRGF0YS50aXRsZX0+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgaGVpZ2h0PVwiMzJcIiB3aWR0aD1cIjg4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17bGV2ZWxEYXRhLmxvZ299XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2xldmVsRGF0YS5hbHR9PlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWJsb2NrLXJpZ2h0XCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgPCEtLSA8bGk+VGhlcmUgYXJlIDc4IGd1aWRlbGluZXMgZGVmaW5lZCBmb3IgdGhpcyBjb25maXJtYW5jZSBsZXZlbDwvbGk+IC0tPlxuICAgICAgICAgICAgICAgIDxsaT5UaGlzIHRvb2wgcnVucyB7Y29uZmlybWFuY2VSdWxlc0NvdW50fSBydWxlcyBmb3IgdGhpcyBsZXZlbDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPk9ubHkge3BhZ2VBcHBsaWNhYmxlUnVsZXNDb3VudH0gb3V0IG9mIHRoZSB7Y29uZmlybWFuY2VSdWxlc0NvdW50fSBydWxlcyBhcHBseSB0byB0aGlzIHBhZ2U8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImxldmVsLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz57dG90YWxOb2Rlc308L3N0cm9uZz4gaHRtbCBlbGVtZW50cyB3aXRoIDxzdHJvbmc+e2xldmVsRGF0YS52aW9sYXRpb25zLmxlbmd0aH08L3N0cm9uZz4gdmlvbGF0aW9uc1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyNlYWNoIGxldmVsRGF0YS52aW9sYXRpb25zIGFzIHZpb2xhdGlvbiwgaX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZXZlbC12aW9sYXRpb25zXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtYW5nbGUtcmlnaHRcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e3Zpb2xhdGlvbi5oZWxwfTwvc3Ryb25nPiBcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uOmNsaWNrPXsoKSA9PiB0b2dnbGVWaW9sYXRpb25EZXRhaWxzKHZpb2xhdGlvbiwgaSl9PiBEZXRhaWxzPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgICAgICAgICB7I2lmIGlzVmlvbGF0aW9uRGV0YWlsc1NlbGVjdGVkICYmIHNlbGVjdGVkVmlvbGF0aW9uSWR4ID09PSBpfVxuICAgICAgICAgICAgICAgICAgICB7I2VhY2ggdmlvbGF0aW9uLm5vZGVzIGFzIG5vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlvbGF0aW9uLW5vZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbXBhY3Q6IHtub2RlLmltcGFjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUYXJnZXQ6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb246Y2xpY2s9eygpID0+IGdvdG9FbGVtZW50KG5vZGUudGFyZ2V0KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29kZT57bm9kZS50YXJnZXR9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbjpjbGljaz17KCkgPT4gc2hvd0h0bWwobm9kZSl9PiBTaG93IGh0bWw8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbjpjbGljaz17KCkgPT4gZ290b0VsZW1lbnQobm9kZS50YXJnZXQpfT4gR28gdG8gZWxlbWVudDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25vZGUuc2hvd0h0bWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyNpZiBmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGU+e25vZGUuaHRtbH08L2NvZGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4gRml4IHRoaXM6PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyNlYWNoIG5vZGUuYW55IGFzIGNoZWNrZWROb2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgc3R5bGU9XCJmb250LXNpemU6IDZweDtwYWRkaW5nLWxlZnQ6IDEwcHg7XCIgY2xhc3M9XCJmYXMgZmEtbWludXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjaGVja2VkTm9kZS5tZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPGRpdj4gSW1wYWN0Ojxici8+IHtub2RlLmltcGFjdH0gPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4gVG8gc29sdmUgdGhpczo8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7I2VhY2ggbm9kZS5hbnkgYXMgY2hlY2tlZE5vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPntjaGVja2VkTm9kZS5tZXNzYWdlfTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+IEVsZW1lbnQgVGFyZ2V0Ojxici8+IDxjb2RlPntub2RlLnRhcmdldH08L2NvZGU+IDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+IFZpb2xhdGVkIEVsZW1lbnQgaHRtbDo8YnIvPiA8Y29kZT57bm9kZS5odG1sfTwvY29kZT4gPC9kaXY+ICAgICAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB7L2VhY2h9XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0VJLDhCQUFnQixDQUFDLEFBQ2IsT0FBTyxDQUFFLElBQUksQ0FDYixTQUFTLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FDMUIsS0FBSyxDQUFFLElBQUksQUFDZixDQUFDLEFBQ0QsOEJBQWdCLENBQUMsSUFBSSxjQUFDLENBQUMsQUFDbkIsT0FBTyxDQUFFLEdBQUcsQ0FBQyxHQUFHLENBQ2hCLFNBQVMsQ0FBRSxHQUFHLENBQ2QsS0FBSyxDQUFFLE9BQU8sQ0FDZCxnQkFBZ0IsQ0FBRSxPQUFPLENBQ3pCLGFBQWEsQ0FBRSxHQUFHLEFBQ3RCLENBQUMsQUFFRCwwQkFBWSxDQUFDLEFBQ1QsT0FBTyxDQUFFLElBQUksQ0FDYixLQUFLLENBQUUsSUFBSSxBQUNmLENBQUMsQUFFRCxnQ0FBa0IsQ0FBQyxBQUNmLE9BQU8sQ0FBRSxJQUFJLENBQ2IsS0FBSyxDQUFFLElBQUksQUFDZixDQUFDLEFBRUQsK0JBQWlCLENBQUMsQUFDZCxPQUFPLENBQUUsSUFBSSxBQUVqQixDQUFDLEFBQ0QsK0JBQWlCLENBQUMsQUFDZCxLQUFLLENBQUUsSUFBSSxBQUNmLENBQUMsQUFDRCxnQ0FBa0IsQ0FBQyxBQUNmLEtBQUssQ0FBRSxLQUFLLENBQ1osWUFBWSxDQUFFLElBQUksQUFDdEIsQ0FBQyxBQUVELGdDQUFrQixDQUFDLEVBQUUsY0FBQyxDQUFDLEFBQ25CLFVBQVUsQ0FBRSxPQUFPLEFBQ3ZCLENBQUMsQUFFRCwrQkFBaUIsQ0FBQyxBQUNkLE1BQU0sSUFBSSxBQUNkLENBQUMsQUFDRCwrQkFBaUIsQ0FBQyxDQUFDLGNBQUMsQ0FBQyxBQUNqQixLQUFLLENBQUUsS0FBSyxDQUFDLFVBQVUsQ0FDdkIsZUFBZSxDQUFFLFNBQVMsQ0FBQyxVQUFVLEFBQ3pDLENBQUMsQUFFRCxlQUFlLGNBQUMsQ0FBQyxBQUNiLE9BQU8sQ0FBRSxJQUFJLENBQ2IsS0FBSyxDQUFFLElBQUksQUFDZixDQUFDIn0= */";
    	append(document_1.head, style);
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.checkedNode = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.node = list[i];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.violation = list[i];
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (165:16) {#if isViolationDetailsSelected && selectedViolationIdx === i}
    function create_if_block(ctx) {
    	var each_1_anchor;

    	var each_value_1 = ctx.violation.nodes;

    	var each_blocks = [];

    	for (var i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	return {
    		c: function create() {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},

    		m: function mount(target, anchor) {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert(target, each_1_anchor, anchor);
    		},

    		p: function update(changed, ctx) {
    			if (changed.levelData) {
    				each_value_1 = ctx.violation.nodes;

    				for (var i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value_1.length;
    			}
    		},

    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);

    			if (detaching) {
    				detach(each_1_anchor);
    			}
    		}
    	};
    }

    // (180:28) {#if false}
    function create_if_block_1(ctx) {
    	var div, code, t_value = ctx.node.html, t;

    	return {
    		c: function create() {
    			div = element("div");
    			code = element("code");
    			t = text(t_value);
    			attr(code, "class", "svelte-xsdz0f");
    			add_location(code, file, 181, 35, 6002);
    			add_location(div, file, 180, 32, 5961);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, code);
    			append(code, t);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.levelData) && t_value !== (t_value = ctx.node.html)) {
    				set_data(t, t_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}
    		}
    	};
    }

    // (187:36) {#each node.any as checkedNode}
    function create_each_block_2(ctx) {
    	var li, i, t0, t1_value = ctx.checkedNode.message, t1, t2;

    	return {
    		c: function create() {
    			li = element("li");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			set_style(i, "font-size", "6px");
    			set_style(i, "padding-left", "10px");
    			attr(i, "class", "fas fa-minus");
    			add_location(i, file, 188, 44, 6343);
    			add_location(li, file, 187, 40, 6294);
    		},

    		m: function mount(target, anchor) {
    			insert(target, li, anchor);
    			append(li, i);
    			append(li, t0);
    			append(li, t1);
    			append(li, t2);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.levelData) && t1_value !== (t1_value = ctx.checkedNode.message)) {
    				set_data(t1, t1_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(li);
    			}
    		}
    	};
    }

    // (166:20) {#each violation.nodes as node}
    function create_each_block_1(ctx) {
    	var div3, div0, t0, t1_value = ctx.node.impact, t1, t2, div1, t3, a0, code, t4_value = ctx.node.target, t4, t5, a1, t7, a2, t9, t10_value = ctx.node.showHtml, t10, t11, t12, div2, t13, br, t14, ul, t15, dispose;

    	function click_handler_1() {
    		return ctx.click_handler_1(ctx);
    	}

    	function click_handler_2() {
    		return ctx.click_handler_2(ctx);
    	}

    	function click_handler_3() {
    		return ctx.click_handler_3(ctx);
    	}

    	var if_block = (false) && create_if_block_1(ctx);

    	var each_value_2 = ctx.node.any;

    	var each_blocks = [];

    	for (var i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	return {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = text("Impact: ");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			t3 = text("Target: \n                                ");
    			a0 = element("a");
    			code = element("code");
    			t4 = text(t4_value);
    			t5 = space();
    			a1 = element("a");
    			a1.textContent = "Show html";
    			t7 = space();
    			a2 = element("a");
    			a2.textContent = "Go to element";
    			t9 = space();
    			t10 = text(t10_value);
    			t11 = space();
    			if (if_block) if_block.c();
    			t12 = space();
    			div2 = element("div");
    			t13 = text("Fix this:");
    			br = element("br");
    			t14 = space();
    			ul = element("ul");

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t15 = space();
    			add_location(div0, file, 167, 28, 5202);
    			attr(code, "class", "svelte-xsdz0f");
    			add_location(code, file, 173, 36, 5512);
    			attr(a0, "href", "javascript:void(0)");
    			attr(a0, "class", "svelte-xsdz0f");
    			add_location(a0, file, 172, 32, 5404);
    			attr(a1, "href", "javascript:void(0)");
    			attr(a1, "class", "svelte-xsdz0f");
    			add_location(a1, file, 175, 32, 5608);
    			attr(a2, "href", "javascript:void(0)");
    			attr(a2, "class", "svelte-xsdz0f");
    			add_location(a2, file, 176, 32, 5716);
    			add_location(div1, file, 170, 28, 5325);
    			add_location(br, file, 184, 43, 6143);
    			add_location(ul, file, 185, 32, 6181);
    			add_location(div2, file, 184, 28, 6128);
    			attr(div3, "class", "violation-node svelte-xsdz0f");
    			add_location(div3, file, 166, 24, 5145);

    			dispose = [
    				listen(a0, "click", click_handler_1),
    				listen(a1, "click", click_handler_2),
    				listen(a2, "click", click_handler_3)
    			];
    		},

    		m: function mount(target, anchor) {
    			insert(target, div3, anchor);
    			append(div3, div0);
    			append(div0, t0);
    			append(div0, t1);
    			append(div3, t2);
    			append(div3, div1);
    			append(div1, t3);
    			append(div1, a0);
    			append(a0, code);
    			append(code, t4);
    			append(div1, t5);
    			append(div1, a1);
    			append(div1, t7);
    			append(div1, a2);
    			append(div1, t9);
    			append(div1, t10);
    			append(div3, t11);
    			if (if_block) if_block.m(div3, null);
    			append(div3, t12);
    			append(div3, div2);
    			append(div2, t13);
    			append(div2, br);
    			append(div2, t14);
    			append(div2, ul);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append(div3, t15);
    		},

    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if ((changed.levelData) && t1_value !== (t1_value = ctx.node.impact)) {
    				set_data(t1, t1_value);
    			}

    			if ((changed.levelData) && t4_value !== (t4_value = ctx.node.target)) {
    				set_data(t4, t4_value);
    			}

    			if ((changed.levelData) && t10_value !== (t10_value = ctx.node.showHtml)) {
    				set_data(t10, t10_value);
    			}

    			if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (changed.levelData) {
    				each_value_2 = ctx.node.any;

    				for (var i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value_2.length;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div3);
    			}

    			if (if_block) if_block.d();

    			destroy_each(each_blocks, detaching);

    			run_all(dispose);
    		}
    	};
    }

    // (158:8) {#each levelData.violations as violation, i}
    function create_each_block(ctx) {
    	var div1, div0, i_1, t0, strong, t1_value = ctx.violation.help, t1, t2, a, t4, t5, dispose;

    	function click_handler() {
    		return ctx.click_handler(ctx);
    	}

    	var if_block = (ctx.isViolationDetailsSelected && ctx.selectedViolationIdx === ctx.i) && create_if_block(ctx);

    	return {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			i_1 = element("i");
    			t0 = space();
    			strong = element("strong");
    			t1 = text(t1_value);
    			t2 = space();
    			a = element("a");
    			a.textContent = "Details";
    			t4 = space();
    			if (if_block) if_block.c();
    			t5 = space();
    			attr(i_1, "class", "fas fa-angle-right");
    			add_location(i_1, file, 160, 20, 4760);
    			add_location(strong, file, 161, 20, 4815);
    			attr(a, "href", "javascript:void(0)");
    			attr(a, "class", "svelte-xsdz0f");
    			add_location(a, file, 162, 20, 4870);
    			add_location(div0, file, 159, 16, 4734);
    			attr(div1, "class", "level-violations svelte-xsdz0f");
    			add_location(div1, file, 158, 12, 4687);
    			dispose = listen(a, "click", click_handler);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			append(div0, i_1);
    			append(div0, t0);
    			append(div0, strong);
    			append(strong, t1);
    			append(div0, t2);
    			append(div0, a);
    			append(div1, t4);
    			if (if_block) if_block.m(div1, null);
    			append(div1, t5);
    		},

    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if ((changed.levelData) && t1_value !== (t1_value = ctx.violation.help)) {
    				set_data(t1, t1_value);
    			}

    			if (ctx.isViolationDetailsSelected && ctx.selectedViolationIdx === ctx.i) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div1, t5);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div1);
    			}

    			if (if_block) if_block.d();
    			dispose();
    		}
    	};
    }

    function create_fragment(ctx) {
    	var div8, div5, div3, div0, t0_value = ctx.levelData.heading, t0, t1, div1, t2_value = ctx.levelData.subheading, t2, t3, div2, a, img, img_src_value, img_alt_value, a_href_value, a_title_value, t4, div4, ul, li0, t5, t6, t7, t8, li1, t9, t10, t11, t12, t13, t14, div7, div6, span, i, t15, strong0, t16, t17, strong1, t18_value = ctx.levelData.violations.length, t18, t19, t20;

    	var each_value = ctx.levelData.violations;

    	var each_blocks = [];

    	for (var i_1 = 0; i_1 < each_value.length; i_1 += 1) {
    		each_blocks[i_1] = create_each_block(get_each_context(ctx, each_value, i_1));
    	}

    	return {
    		c: function create() {
    			div8 = element("div");
    			div5 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			a = element("a");
    			img = element("img");
    			t4 = space();
    			div4 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			t5 = text("This tool runs ");
    			t6 = text(ctx.confirmanceRulesCount);
    			t7 = text(" rules for this level");
    			t8 = space();
    			li1 = element("li");
    			t9 = text("Only ");
    			t10 = text(ctx.pageApplicableRulesCount);
    			t11 = text(" out of the ");
    			t12 = text(ctx.confirmanceRulesCount);
    			t13 = text(" rules apply to this page");
    			t14 = space();
    			div7 = element("div");
    			div6 = element("div");
    			span = element("span");
    			i = element("i");
    			t15 = space();
    			strong0 = element("strong");
    			t16 = text(ctx.totalNodes);
    			t17 = text(" html elements with ");
    			strong1 = element("strong");
    			t18 = text(t18_value);
    			t19 = text(" violations");
    			t20 = space();

    			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
    				each_blocks[i_1].c();
    			}
    			add_location(div0, file, 126, 12, 3471);
    			add_location(div1, file, 129, 12, 3544);
    			attr(img, "height", "32");
    			attr(img, "width", "88");
    			attr(img, "src", img_src_value = ctx.levelData.logo);
    			attr(img, "alt", img_alt_value = ctx.levelData.alt);
    			add_location(img, file, 136, 20, 3768);
    			attr(a, "href", a_href_value = ctx.levelData.link);
    			attr(a, "target", "_blank");
    			attr(a, "title", a_title_value = ctx.levelData.title);
    			add_location(a, file, 133, 16, 3642);
    			add_location(div2, file, 132, 12, 3620);
    			attr(div3, "class", "media-block-left svelte-xsdz0f");
    			add_location(div3, file, 125, 8, 3428);
    			add_location(li0, file, 145, 16, 4107);
    			add_location(li1, file, 146, 16, 4192);
    			attr(ul, "class", "svelte-xsdz0f");
    			add_location(ul, file, 143, 12, 3993);
    			attr(div4, "class", "media-block-right svelte-xsdz0f");
    			add_location(div4, file, 142, 8, 3949);
    			attr(div5, "class", "media-block svelte-xsdz0f");
    			add_location(div5, file, 124, 4, 3394);
    			attr(i, "class", "fas fa-exclamation-circle");
    			add_location(i, file, 153, 16, 4422);
    			add_location(strong0, file, 154, 16, 4480);
    			add_location(strong1, file, 154, 65, 4529);
    			add_location(span, file, 152, 12, 4399);
    			add_location(div6, file, 151, 8, 4381);
    			attr(div7, "class", "level-description svelte-xsdz0f");
    			add_location(div7, file, 150, 4, 4341);
    			attr(div8, "class", "level-container svelte-xsdz0f");
    			add_location(div8, file, 123, 0, 3360);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div8, anchor);
    			append(div8, div5);
    			append(div5, div3);
    			append(div3, div0);
    			append(div0, t0);
    			append(div3, t1);
    			append(div3, div1);
    			append(div1, t2);
    			append(div3, t3);
    			append(div3, div2);
    			append(div2, a);
    			append(a, img);
    			append(div5, t4);
    			append(div5, div4);
    			append(div4, ul);
    			append(ul, li0);
    			append(li0, t5);
    			append(li0, t6);
    			append(li0, t7);
    			append(ul, t8);
    			append(ul, li1);
    			append(li1, t9);
    			append(li1, t10);
    			append(li1, t11);
    			append(li1, t12);
    			append(li1, t13);
    			append(div8, t14);
    			append(div8, div7);
    			append(div7, div6);
    			append(div6, span);
    			append(span, i);
    			append(span, t15);
    			append(span, strong0);
    			append(strong0, t16);
    			append(span, t17);
    			append(span, strong1);
    			append(strong1, t18);
    			append(span, t19);
    			append(div7, t20);

    			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
    				each_blocks[i_1].m(div7, null);
    			}
    		},

    		p: function update(changed, ctx) {
    			if ((changed.levelData) && t0_value !== (t0_value = ctx.levelData.heading)) {
    				set_data(t0, t0_value);
    			}

    			if ((changed.levelData) && t2_value !== (t2_value = ctx.levelData.subheading)) {
    				set_data(t2, t2_value);
    			}

    			if ((changed.levelData) && img_src_value !== (img_src_value = ctx.levelData.logo)) {
    				attr(img, "src", img_src_value);
    			}

    			if ((changed.levelData) && img_alt_value !== (img_alt_value = ctx.levelData.alt)) {
    				attr(img, "alt", img_alt_value);
    			}

    			if ((changed.levelData) && a_href_value !== (a_href_value = ctx.levelData.link)) {
    				attr(a, "href", a_href_value);
    			}

    			if ((changed.levelData) && a_title_value !== (a_title_value = ctx.levelData.title)) {
    				attr(a, "title", a_title_value);
    			}

    			if (changed.confirmanceRulesCount) {
    				set_data(t6, ctx.confirmanceRulesCount);
    			}

    			if (changed.pageApplicableRulesCount) {
    				set_data(t10, ctx.pageApplicableRulesCount);
    			}

    			if (changed.confirmanceRulesCount) {
    				set_data(t12, ctx.confirmanceRulesCount);
    			}

    			if (changed.totalNodes) {
    				set_data(t16, ctx.totalNodes);
    			}

    			if ((changed.levelData) && t18_value !== (t18_value = ctx.levelData.violations.length)) {
    				set_data(t18, t18_value);
    			}

    			if (changed.isViolationDetailsSelected || changed.selectedViolationIdx || changed.levelData) {
    				each_value = ctx.levelData.violations;

    				for (var i_1 = 0; i_1 < each_value.length; i_1 += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i_1);

    					if (each_blocks[i_1]) {
    						each_blocks[i_1].p(changed, child_ctx);
    					} else {
    						each_blocks[i_1] = create_each_block(child_ctx);
    						each_blocks[i_1].c();
    						each_blocks[i_1].m(div7, null);
    					}
    				}

    				for (; i_1 < each_blocks.length; i_1 += 1) {
    					each_blocks[i_1].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div8);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    function gotoElement(target){
        const annotatedElems = document.querySelectorAll('.visua11y-annotate-bg');
        for(let i=0; i<annotatedElems.length; i++){
            annotatedElems[i].className = annotatedElems[i].className.replace(' visua11y-annotate-bg', '');
        }
        if(target){
            const ele = document.querySelector(target);
            if(ele){
                ele.className = ele.className +' visua11y-annotate-bg';
                ele.scrollIntoView();
            }
        }
    }

    function showHtml(node){
        node.showHtml = !node.showHtml;
        return node.showHtml;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { levelData } = $$props;

        let totalNodes = 0;
        let totalNodesComputed = false;
        let selectedViolationIdx = -1;
        let isViolationDetailsSelected = false;

        let confirmanceRulesCount;
        let pageApplicableRulesCount;
        let pageInapplicableRulesCount;

        function toggleViolationDetails(violation, idx){
            if(!isViolationDetailsSelected || (idx != -1 && idx !== selectedViolationIdx)){
                $$invalidate('isViolationDetailsSelected', isViolationDetailsSelected = true);
                $$invalidate('selectedViolationIdx', selectedViolationIdx = idx);
            } else if(idx == selectedViolationIdx){
                $$invalidate('isViolationDetailsSelected', isViolationDetailsSelected = false);
                $$invalidate('selectedViolationIdx', selectedViolationIdx = -1);
            }
        }

    	const writable_props = ['levelData'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<ConfirmanceDetails> was created with unknown prop '${key}'`);
    	});

    	function click_handler({ violation, i }) {
    		return toggleViolationDetails(violation, i);
    	}

    	function click_handler_1({ node }) {
    		return gotoElement(node.target);
    	}

    	function click_handler_2({ node }) {
    		return showHtml(node);
    	}

    	function click_handler_3({ node }) {
    		return gotoElement(node.target);
    	}

    	$$self.$set = $$props => {
    		if ('levelData' in $$props) $$invalidate('levelData', levelData = $$props.levelData);
    	};

    	$$self.$$.update = ($$dirty = { levelData: 1, totalNodesComputed: 1, confirmanceRulesCount: 1, pageInapplicableRulesCount: 1 }) => {
    		if ($$dirty.levelData || $$dirty.totalNodesComputed || $$dirty.confirmanceRulesCount || $$dirty.pageInapplicableRulesCount) { {
                    levelData.scanData.violations.forEach(v => {
                        v.show = false;
                        if(!totalNodesComputed) {
                            $$invalidate('totalNodes', totalNodes += v.nodes.length);
                            v.nodes.forEach(node => {
                                const nodeElem = document.querySelector(node.target);
                                const annotationElem = document.createElement('div');
                                annotationElem.innerHTML = nodeElem.nodeName;
                                annotationElem.className = "visua11y-annotate";
                                if(nodeElem.nodeName !== 'HTML'){
                                    nodeElem.insertAdjacentElement('beforeBegin', annotationElem);
                                }
                                node.showHtml = false;
                            });
                        }
                    });
            
                    levelData.violations = levelData.scanData.violations; $$invalidate('levelData', levelData), $$invalidate('totalNodesComputed', totalNodesComputed), $$invalidate('confirmanceRulesCount', confirmanceRulesCount), $$invalidate('pageInapplicableRulesCount', pageInapplicableRulesCount);
                    $$invalidate('totalNodesComputed', totalNodesComputed = true);
                    $$invalidate('confirmanceRulesCount', confirmanceRulesCount = axe.getRules(levelData.scanTags).length);
                    $$invalidate('pageInapplicableRulesCount', pageInapplicableRulesCount = levelData.scanData.inapplicable.length);
                    $$invalidate('pageApplicableRulesCount', pageApplicableRulesCount = confirmanceRulesCount - pageInapplicableRulesCount);
            
                } }
    	};

    	return {
    		levelData,
    		totalNodes,
    		selectedViolationIdx,
    		isViolationDetailsSelected,
    		confirmanceRulesCount,
    		pageApplicableRulesCount,
    		toggleViolationDetails,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	};
    }

    class ConfirmanceDetails extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		if (!document_1.getElementById("svelte-xsdz0f-style")) add_css();
    		init(this, options, instance, create_fragment, safe_not_equal, ["levelData"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.levelData === undefined && !('levelData' in props)) {
    			console.warn("<ConfirmanceDetails> was created without expected prop 'levelData'");
    		}
    	}

    	get levelData() {
    		throw new Error("<ConfirmanceDetails>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set levelData(value) {
    		throw new Error("<ConfirmanceDetails>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.6.3 */
    const { console: console_1, document: document_1$1 } = globals;

    const file$1 = "src/App.svelte";

    function add_css$1() {
    	var style = element("style");
    	style.id = 'svelte-1n92ei9-style';
    	style.textContent = ".visua11y.svelte-1n92ei9{width:auto !important;height:auto !important;max-height:450px;max-width:700px}.visua11y.svelte-1n92ei9{font-family:Arial, Helvetica, sans-serif !important;color:#ffffff !important\n\t}.visua11y-toolbar.svelte-1n92ei9{background-color:#09304b !important;color:#f2f2f2 !important;position:fixed !important;top:auto !important;right:auto !important;bottom:0 !important;left:10px !important;border-top-left-radius:5px !important;border-top-right-radius:5px !important;overflow:scroll !important;z-index:9998 !important;font-family:Arial, Helvetica, sans-serif !important}.visua11y-main-ctr.svelte-1n92ei9{}.visua11y-minimised-ctr.svelte-1n92ei9{font-size:28px}.visua11y-button.svelte-1n92ei9{background:none;border-style:none;color:white !important;font-size:inherit !important\n\n\t}.visua11y-main-ctr-minimise.svelte-1n92ei9{float:right;font-size:14px}.visua11y-level-ctr.svelte-1n92ei9{float:left;padding:20px;max-width:20%;font-size:14px !important}.visua11y-ctr-link.svelte-1n92ei9 a.svelte-1n92ei9{font-weight:bold;color:#ffffff !important;text-decoration:underline !important}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLnN2ZWx0ZSIsInNvdXJjZXMiOlsiQXBwLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c3ZlbHRlOmhlYWQ+XG5cdDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9raXQuZm9udGF3ZXNvbWUuY29tLzdlMTAyNGQ1OTYuanNcIj48L3NjcmlwdD5cblx0PHN0eWxlPlxuXHRcdC52aXN1YTExeS1hbm5vdGF0ZXtcblx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdGZvbnQtc2l6ZTogMTJweDtcblx0XHRcdHBhZGRpbmc6IDJweDtcblx0XHRcdGJhY2tncm91bmQ6IGdyZWVuO1xuXHRcdFx0ei1pbmRleDogODg4ODtcblx0XHR9XG5cblx0XHQudmlzdWExMXktYW5ub3RhdGUtYmd7XG5cdFx0XHRib3JkZXI6IDNweCBkb3R0ZWQgZ3JlZW4gIWltcG9ydGFudDtcblx0XHR9XG5cdDwvc3R5bGU+XG48L3N2ZWx0ZTpoZWFkPlxuPHNjcmlwdD5cblx0aW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSc7XG5cdGltcG9ydCBDb25maXJtYW5jZURldGFpbHMgZnJvbSAnLi9Db25maXJtYW5jZURldGFpbHMuc3ZlbHRlJztcbiBcblx0ZXhwb3J0IGxldCBuYW1lO1xuXHRcblx0bGV0IGNvbmZpcm1hbmNlRGF0YSA9IFtcblx0XHR7XG5cdFx0XHRsZXZlbDogXCJ3Y2FnMmFcIixcblx0XHRcdGhlYWRpbmc6IFwiV0NBRyAyLjBcIixcblx0XHRcdHN1YmhlYWRpbmc6IFwiTGV2ZWwgQVwiLFxuXHRcdFx0bG9nbzogXCJodHRwczovL3d3dy53My5vcmcvV0FJL3djYWcyQVwiLFxuXHRcdFx0bGluazogXCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyQS1Db25mb3JtYW5jZVwiLFxuXHRcdFx0YWx0OiBcIkxldmVsIEEgY29uZm9ybWFuY2UsIFczQyBXQUkgV2ViIENvbnRlbnQgQWNjZXNzaWJpbGl0eSBHdWlkZWxpbmVzIDIuMFwiLFxuXHRcdFx0dGl0bGU6IFwiRXhwbGFuYXRpb24gb2YgV0NBRyAyLjAgTGV2ZWwgQSBDb25mb3JtYW5jZVwiLFxuXHRcdFx0c2NhblRhZ3M6IFsnd2NhZzJhJ10sXG5cdFx0XHRzY2FuRGF0YToge31cblx0XHR9LFxuXHRcdHtcblx0XHRcdGxldmVsOiBcIndjYWcyYWFcIixcblx0XHRcdGhlYWRpbmc6IFwiV0NBRyAyLjBcIixcblx0XHRcdHN1YmhlYWRpbmc6IFwiTGV2ZWwgQUFcIixcblx0XHRcdGxvZ286IFwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS93Y2FnMkFBXCIsXG5cdFx0XHRsaW5rOiBcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzJBQS1Db25mb3JtYW5jZVwiLFxuXHRcdFx0YWx0OiBcIkxldmVsIERvdWJsZS1BIGNvbmZvcm1hbmNlLCBXM0MgV0FJIFdlYiBDb250ZW50IEFjY2Vzc2liaWxpdHkgR3VpZGVsaW5lcyAyLjBcIixcblx0XHRcdHRpdGxlOiBcIkV4cGxhbmF0aW9uIG9mIFdDQUcgMi4wIExldmVsIERvdWJsZS1BIENvbmZvcm1hbmNlXCIsXG5cdFx0XHRzY2FuVGFnczogW1wid2NhZzJhXCIsIFwid2NhZzJhYVwiXSxcblx0XHRcdHNjYW5EYXRhOiB7fVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bGV2ZWw6IFwid2NhZzJhYWFcIixcblx0XHRcdGhlYWRpbmc6IFwiV0NBRyAyLjBcIixcblx0XHRcdHN1YmhlYWRpbmc6IFwiTGV2ZWwgQUFBXCIsXG5cdFx0XHRsb2dvOiBcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvd2NhZzJBQUFcIixcblx0XHRcdGxpbms6IFwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMkFBQS1Db25mb3JtYW5jZVwiLFxuXHRcdFx0YWx0OiBcIkxldmVsIFRyaXBsZS1BIGNvbmZvcm1hbmNlLCBXM0MgV0FJIFdlYiBDb250ZW50IEFjY2Vzc2liaWxpdHkgR3VpZGVsaW5lcyAyLjBcIixcblx0XHRcdHRpdGxlOiBcIkV4cGxhbmF0aW9uIG9mIFdDQUcgMi4wIExldmVsIFRyaXBsZS1BIENvbmZvcm1hbmNlXCIsXG5cdFx0XHRzY2FuVGFnczogW1wid2NhZzJhXCIsIFwid2NhZzJhYVwiLCBcIndjYWcyYWFhXCJdLFxuXHRcdFx0c2NhbkRhdGE6IHt9XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRsZXZlbDogXCJ3Y2FnMjFhXCIsXG5cdFx0XHRoZWFkaW5nOiBcIldDQUcgMi4xXCIsXG5cdFx0XHRzdWJoZWFkaW5nOiBcIkxldmVsIEFcIixcblx0XHRcdGxvZ286IFwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjEvd2NhZzIuMUFBLXZcIixcblx0XHRcdGxpbms6IFwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMi4xQUEtQ29uZm9ybWFuY2VcIixcblx0XHRcdGFsdDogXCJMZXZlbCBEb3VibGUtQSBjb25mb3JtYW5jZSwgVzNDIFdBSSBXZWIgQ29udGVudCBBY2Nlc3NpYmlsaXR5IEd1aWRlbGluZXMgMi4xXCIsXG5cdFx0XHR0aXRsZTogXCJFeHBsYW5hdGlvbiBvZiBXQ0FHIDIuMSBMZXZlbCBEb3VibGUtQSBDb25mb3JtYW5jZVwiLFxuXHRcdFx0c2NhblRhZ3M6IFsnd2NhZzJhJywgJ3djYWcyYWEnLCAnd2NhZzIxYScsICd3Y2FnMjFhYSddLFxuXHRcdFx0c2NhbkRhdGE6IHt9XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRsZXZlbDogXCJzZWN0aW9uNTA4XCIsXG5cdFx0XHRoZWFkaW5nOiBcIlNlY3Rpb24gNTA4XCIsXG5cdFx0XHRzdWJoZWFkaW5nOiBcIlNlY3Rpb24gNTA4XCIsXG5cdFx0XHRsb2dvOiBcImh0dHA6Ly9kaWdpdGFsaW5jbHVzaW9ubmV3c2xvZy5pdHUuaW50L3dwLWNvbnRlbnQvdXBsb2Fkcy9zaXRlcy85LzIwMTUvMTAvU2VjdGlvbi01MDgucG5nXCIsXG5cdFx0XHRsaW5rOiBcImh0dHBzOi8vd3d3LmFjY2Vzcy1ib2FyZC5nb3YvZ3VpZGVsaW5lcy1hbmQtc3RhbmRhcmRzL2NvbW11bmljYXRpb25zLWFuZC1pdC9hYm91dC10aGUtaWN0LXJlZnJlc2gvZmluYWwtcnVsZS90ZXh0LW9mLXRoZS1zdGFuZGFyZHMtYW5kLWd1aWRlbGluZXNcIixcblx0XHRcdGFsdDogXCJMZXZlbCBEb3VibGUtQSBjb25mb3JtYW5jZSwgVzNDIFdBSSBXZWIgQ29udGVudCBBY2Nlc3NpYmlsaXR5IEd1aWRlbGluZXMgMi4xXCIsXG5cdFx0XHR0aXRsZTogXCJFeHBsYW5hdGlvbiBvZiBXQ0FHIDIuMSBMZXZlbCBEb3VibGUtQSBDb25mb3JtYW5jZVwiLFxuXHRcdFx0c2NhblRhZ3M6IFsnc2VjdGlvbjUwOCddLFxuXHRcdFx0c2NhbkRhdGE6IHt9XG5cdFx0fVxuXHRdXG5cblx0bGV0IHNjYW5RdWV1ZSA9IFtdO1xuXHRsZXQgc2NhbkluUHJvZ3Jlc3MgPSBmYWxzZTtcblx0bGV0IGZ1bGxDb250YWluZXIgPSBmYWxzZTtcblx0bGV0IGxldmVsQ29udGFpbmVyID0gZmFsc2U7XG5cdGxldCBzZWxlY3RlZExldmVsSXRlbTtcblx0ZnVuY3Rpb24gdG9nZ2xlQ29udGFpbmVyKCl7XG5cdFx0ZnVsbENvbnRhaW5lciA9ICFmdWxsQ29udGFpbmVyO1xuXHR9XG5cblx0ZnVuY3Rpb24gcnVuU2NhbihpdGVtKXtcblx0XHRpZihzY2FuSW5Qcm9ncmVzcyl7XG5cdFx0XHRzY2FuUXVldWUucHVzaChpdGVtKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzY2FuSW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRpdGVtLnNjYW5EYXRhID0ge307XG5cdFx0XHRheGUucnVuKGRvY3VtZW50LCB7cnVuT25seTogaXRlbS5zY2FuVGFnc30sIChlcnIsIHJlc3VsdHMpID0+IHtcblx0XHRcdFx0aXRlbS5zY2FuRGF0YSA9IHJlc3VsdHM7XG5cdFx0XHRcdHNjYW5JblByb2dyZXNzID0gZmFsc2U7XG5cdFx0XHRcdGlmKHNjYW5RdWV1ZS5sZW5ndGgpe1xuXHRcdFx0XHRcdGNvbnN0IGQgPSBzY2FuUXVldWUucG9wKCk7XG5cdFx0XHRcdFx0cnVuU2NhbihkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gdG9nZ2xlTGV2ZWxEZXRhaWxzKGl0ZW0pe1xuXHRcdGlmKGxldmVsQ29udGFpbmVyKXtcblx0XHRcdGxldmVsQ29udGFpbmVyID0gZmFsc2U7XG5cdFx0XHRzZWxlY3RlZExldmVsSXRlbSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2VsZWN0ZWRMZXZlbEl0ZW0gPSBpdGVtO1xuXHRcdFx0bGV2ZWxDb250YWluZXIgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdG9uTW91bnQoKCkgPT4ge1xuXHRcdGNvbnN0IHNjcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblx0XHRzY3IyLnNyYyA9IFwiL3Zpc3VhMTF5c2l0ZS9heGUubWluLmpzXCI7XG5cdFx0c2NyMi5vbmxvYWQgPSAoKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZygnQVhFIFRvb2xzIGxvYWRlZCcpO1xuXHRcdFx0Y29uZmlybWFuY2VEYXRhLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRcdHJ1blNjYW4oaXRlbSk7XG5cdFx0XHR9KTtcblx0XHR9XG4gXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKS5hcHBlbmRDaGlsZChzY3IyKTtcblx0fSk7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXHQudmlzdWExMXkge1xuXHRcdHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XG5cdFx0aGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG5cdFx0bWF4LWhlaWdodDogNDUwcHg7XG5cdFx0bWF4LXdpZHRoOiA3MDBweDtcblx0fVxuXG5cdC52aXN1YTExeXtcblx0XHRmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xuXHRcdGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnRcblx0fVxuXHRcblx0LnZpc3VhMTF5LXRvb2xiYXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMwOTMwNGIgIWltcG9ydGFudDtcblx0XHRjb2xvcjogI2YyZjJmMiAhaW1wb3J0YW50O1xuXHRcdHBvc2l0aW9uOiBmaXhlZCAhaW1wb3J0YW50O1xuXHRcdHRvcDogYXV0byAhaW1wb3J0YW50O1xuXHRcdHJpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG5cdFx0Ym90dG9tOiAwICFpbXBvcnRhbnQ7XG5cdFx0bGVmdDogMTBweCAhaW1wb3J0YW50O1xuXHRcdGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xuXHRcdGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHggIWltcG9ydGFudDtcblx0XHRvdmVyZmxvdzogc2Nyb2xsICFpbXBvcnRhbnQ7XG5cdFx0ei1pbmRleDogOTk5OCAhaW1wb3J0YW50O1xuXHRcdGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7XG5cdH1cblx0XG5cdC52aXN1YTExeS1tYWluLWN0cnt9XG5cblx0LnZpc3VhMTF5LW1pbmltaXNlZC1jdHJ7XG5cdFx0Zm9udC1zaXplOiAyOHB4O1xuXHR9XG5cblx0LnZpc3VhMTF5LWJ1dHRvbntcblx0XHRiYWNrZ3JvdW5kOiBub25lO1xuXHRcdGJvcmRlci1zdHlsZTogbm9uZTtcblx0XHRjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcblx0XHRmb250LXNpemU6IGluaGVyaXQgIWltcG9ydGFudFxuXG5cdH1cblxuXHQudmlzdWExMXktbWFpbi1jdHItbWluaW1pc2V7XG5cdFx0ZmxvYXQ6IHJpZ2h0O1xuXHRcdGZvbnQtc2l6ZTogMTRweDsgXG5cdH1cblx0LnZpc3VhMTF5LWxldmVsLWN0cntcblx0XHRmbG9hdDogbGVmdDtcblx0XHRwYWRkaW5nOiAyMHB4O1xuXHRcdG1heC13aWR0aDogMjAlO1xuXHRcdGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xuXHR9XG5cdC52aXN1YTExeS1jdHItbGluayBhe1xuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHRcdGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XG5cdFx0dGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgIWltcG9ydGFudDtcblx0fVxuXHRcbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJ2aXN1YTExeSB2aXN1YTExeS10b29sYmFyXCI+XG5cdHsjaWYgIWZ1bGxDb250YWluZXJ9XG5cdFx0PGRpdiBjbGFzcz1cInZpc3VhMTF5LW1pbmltaXNlZC1jdHJcIj5cblx0XHRcdDxidXR0b24gY2xhc3M9XCJ2aXN1YTExeS1idXR0b25cIiBvbjpjbGljaz17dG9nZ2xlQ29udGFpbmVyfT5cblx0XHRcdFx0PHNwYW4+PGkgY2xhc3M9XCJmYXMgZmEtYmlub2N1bGFyc1wiPjwvaT48L3NwYW4+XG5cdFx0XHQ8L2J1dHRvbj5cblx0XHQ8L2Rpdj5cblx0ey9pZn1cblx0eyNpZiBmdWxsQ29udGFpbmVyfVxuXHRcdFx0PGRpdiBjbGFzcz1cInZpc3VhMTF5LW1haW4tY3RyXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ2aXN1YTExeS1tYWluLWN0ci1taW5pbWlzZVwiPlxuXHRcdFx0XHRcdHsjaWYgbGV2ZWxDb250YWluZXJ9XG5cdFx0XHRcdFx0XHQ8c3Ryb25nPiBcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInZpc3VhMTF5LWJ1dHRvblwiIG9uOmNsaWNrPXt0b2dnbGVMZXZlbERldGFpbHN9PlxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPmJhY2s8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9zdHJvbmc+XG5cdFx0XHRcdFx0ey9pZn1cblx0XHRcdFx0XHQ8c3Ryb25nPiBcblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJ2aXN1YTExeS1idXR0b25cIiBvbjpjbGljaz17dG9nZ2xlQ29udGFpbmVyfT5cblx0XHRcdFx0XHRcdFx0PHNwYW4+PGkgY2xhc3M9XCJmYXMgZmEtYmlub2N1bGFyc1wiPjwvaT48L3NwYW4+XG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L3N0cm9uZz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHsjaWYgbGV2ZWxDb250YWluZXJ9XG5cdFx0XHRcdFx0PENvbmZpcm1hbmNlRGV0YWlscyBiaW5kOmxldmVsRGF0YT17c2VsZWN0ZWRMZXZlbEl0ZW19PjwvQ29uZmlybWFuY2VEZXRhaWxzPlxuXHRcdFx0XHR7L2lmfVxuXHRcdFx0XHR7I2lmICFsZXZlbENvbnRhaW5lcn1cblx0XHRcdFx0XHR7I2VhY2ggY29uZmlybWFuY2VEYXRhIGFzIGNvbmZpcm1hbmNlSXRlbX1cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ2aXN1YTExeS1sZXZlbC1jdHJcIj5cblx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHQ8c3Ryb25nPntjb25maXJtYW5jZUl0ZW0uaGVhZGluZ308L3N0cm9uZz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0PHN0cm9uZz57Y29uZmlybWFuY2VJdGVtLnN1YmhlYWRpbmd9PC9zdHJvbmc+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9e2NvbmZpcm1hbmNlSXRlbS5saW5rfVxuXHRcdFx0XHRcdFx0XHRcdFx0dGFyZ2V0PVwiX2JsYW5rXCJcblx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlPXtjb25maXJtYW5jZUl0ZW0udGl0bGV9PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGltZyBoZWlnaHQ9XCIzMlwiIHdpZHRoPVwiODhcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzcmM9e2NvbmZpcm1hbmNlSXRlbS5sb2dvfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhbHQ9e2NvbmZpcm1hbmNlSXRlbS5hbHR9PlxuXHRcdFx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdHsjaWYgY29uZmlybWFuY2VJdGVtLnNjYW5EYXRhICYmIGNvbmZpcm1hbmNlSXRlbS5zY2FuRGF0YS52aW9sYXRpb25zfVxuXHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7Y29uZmlybWFuY2VJdGVtLnNjYW5EYXRhLnZpb2xhdGlvbnMubGVuZ3RofSB2aW9sYXRpb25zXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInZpc3VhMTF5LWN0ci1saW5rXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb246Y2xpY2s9eygpID0+IHRvZ2dsZUxldmVsRGV0YWlscyhjb25maXJtYW5jZUl0ZW0pfT4gRGV0YWlscyA8L2E+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInZpc3VhMTF5LWN0ci1saW5rXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb246Y2xpY2s9eygpID0+IHJ1blNjYW4oY29uZmlybWFuY2VJdGVtKX0+IFJ1biBhZ2FpbiA8L2E+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdHsvaWZ9XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHR7L2VhY2h9XG5cdFx0XHRcdHsvaWZ9XG5cdFx0XHQ8L2Rpdj5cblx0XHR7L2lmfVxuPC9kaXY+XG5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrSUMsU0FBUyxlQUFDLENBQUMsQUFDVixLQUFLLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FDdEIsTUFBTSxDQUFFLElBQUksQ0FBQyxVQUFVLENBQ3ZCLFVBQVUsQ0FBRSxLQUFLLENBQ2pCLFNBQVMsQ0FBRSxLQUFLLEFBQ2pCLENBQUMsQUFFRCx3QkFBUyxDQUFDLEFBQ1QsV0FBVyxDQUFFLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQ3BELEtBQUssQ0FBRSxPQUFPLENBQUM7Q0FDaEIsQ0FBQyxBQUVELGlCQUFpQixlQUFDLENBQUMsQUFDbEIsZ0JBQWdCLENBQUUsT0FBTyxDQUFDLFVBQVUsQ0FDcEMsS0FBSyxDQUFFLE9BQU8sQ0FBQyxVQUFVLENBQ3pCLFFBQVEsQ0FBRSxLQUFLLENBQUMsVUFBVSxDQUMxQixHQUFHLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FDcEIsS0FBSyxDQUFFLElBQUksQ0FBQyxVQUFVLENBQ3RCLE1BQU0sQ0FBRSxDQUFDLENBQUMsVUFBVSxDQUNwQixJQUFJLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FDckIsc0JBQXNCLENBQUUsR0FBRyxDQUFDLFVBQVUsQ0FDdEMsdUJBQXVCLENBQUUsR0FBRyxDQUFDLFVBQVUsQ0FDdkMsUUFBUSxDQUFFLE1BQU0sQ0FBQyxVQUFVLENBQzNCLE9BQU8sQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUN4QixXQUFXLENBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQUFDckQsQ0FBQyxBQUVELGlDQUFrQixFQUFFLEFBRXBCLHNDQUF1QixDQUFDLEFBQ3ZCLFNBQVMsQ0FBRSxJQUFJLEFBQ2hCLENBQUMsQUFFRCwrQkFBZ0IsQ0FBQyxBQUNoQixVQUFVLENBQUUsSUFBSSxDQUNoQixZQUFZLENBQUUsSUFBSSxDQUNsQixLQUFLLENBQUUsS0FBSyxDQUFDLFVBQVUsQ0FDdkIsU0FBUyxDQUFFLE9BQU8sQ0FBQzs7Q0FFcEIsQ0FBQyxBQUVELDBDQUEyQixDQUFDLEFBQzNCLEtBQUssQ0FBRSxLQUFLLENBQ1osU0FBUyxDQUFFLElBQUksQUFDaEIsQ0FBQyxBQUNELGtDQUFtQixDQUFDLEFBQ25CLEtBQUssQ0FBRSxJQUFJLENBQ1gsT0FBTyxDQUFFLElBQUksQ0FDYixTQUFTLENBQUUsR0FBRyxDQUNkLFNBQVMsQ0FBRSxJQUFJLENBQUMsVUFBVSxBQUMzQixDQUFDLEFBQ0QsaUNBQWtCLENBQUMsZ0JBQUMsQ0FBQyxBQUNwQixXQUFXLENBQUUsSUFBSSxDQUNqQixLQUFLLENBQUUsT0FBTyxDQUFDLFVBQVUsQ0FDekIsZUFBZSxDQUFFLFNBQVMsQ0FBQyxVQUFVLEFBQ3RDLENBQUMifQ== */";
    	append(document_1$1.head, style);
    }

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.confirmanceItem = list[i];
    	return child_ctx;
    }

    // (191:1) {#if !fullContainer}
    function create_if_block_5(ctx) {
    	var div, button, span, i, dispose;

    	return {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			span = element("span");
    			i = element("i");
    			attr(i, "class", "fas fa-binoculars");
    			add_location(i, file$1, 193, 10, 4932);
    			add_location(span, file$1, 193, 4, 4926);
    			attr(button, "class", "visua11y-button svelte-1n92ei9");
    			add_location(button, file$1, 192, 3, 4862);
    			attr(div, "class", "visua11y-minimised-ctr svelte-1n92ei9");
    			add_location(div, file$1, 191, 2, 4822);
    			dispose = listen(button, "click", ctx.toggleContainer);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, button);
    			append(button, span);
    			append(span, i);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}

    			dispose();
    		}
    	};
    }

    // (198:1) {#if fullContainer}
    function create_if_block$1(ctx) {
    	var div1, div0, t0, strong, button, span, i, t1, t2, current, dispose;

    	var if_block0 = (ctx.levelContainer) && create_if_block_4(ctx);

    	var if_block1 = (ctx.levelContainer) && create_if_block_3(ctx);

    	var if_block2 = (!ctx.levelContainer) && create_if_block_1$1(ctx);

    	return {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			strong = element("strong");
    			button = element("button");
    			span = element("span");
    			i = element("i");
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			attr(i, "class", "fas fa-binoculars");
    			add_location(i, file$1, 209, 13, 5379);
    			add_location(span, file$1, 209, 7, 5373);
    			attr(button, "class", "visua11y-button svelte-1n92ei9");
    			add_location(button, file$1, 208, 6, 5306);
    			add_location(strong, file$1, 207, 5, 5290);
    			attr(div0, "class", "visua11y-main-ctr-minimise svelte-1n92ei9");
    			add_location(div0, file$1, 199, 4, 5062);
    			attr(div1, "class", "visua11y-main-ctr svelte-1n92ei9");
    			add_location(div1, file$1, 198, 3, 5026);
    			dispose = listen(button, "click", ctx.toggleContainer);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			if (if_block0) if_block0.m(div0, null);
    			append(div0, t0);
    			append(div0, strong);
    			append(strong, button);
    			append(button, span);
    			append(span, i);
    			append(div1, t1);
    			if (if_block1) if_block1.m(div1, null);
    			append(div1, t2);
    			if (if_block2) if_block2.m(div1, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (ctx.levelContainer) {
    				if (!if_block0) {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					if_block0.m(div0, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (ctx.levelContainer) {
    				if (if_block1) {
    					if_block1.p(changed, ctx);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block_3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div1, t2);
    				}
    			} else if (if_block1) {
    				group_outros();
    				transition_out(if_block1, 1, () => {
    					if_block1 = null;
    				});
    				check_outros();
    			}

    			if (!ctx.levelContainer) {
    				if (if_block2) {
    					if_block2.p(changed, ctx);
    				} else {
    					if_block2 = create_if_block_1$1(ctx);
    					if_block2.c();
    					if_block2.m(div1, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div1);
    			}

    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			dispose();
    		}
    	};
    }

    // (201:5) {#if levelContainer}
    function create_if_block_4(ctx) {
    	var strong, button, span, dispose;

    	return {
    		c: function create() {
    			strong = element("strong");
    			button = element("button");
    			span = element("span");
    			span.textContent = "back";
    			add_location(span, file$1, 203, 8, 5223);
    			attr(button, "class", "visua11y-button svelte-1n92ei9");
    			add_location(button, file$1, 202, 7, 5152);
    			add_location(strong, file$1, 201, 6, 5135);
    			dispose = listen(button, "click", ctx.toggleLevelDetails);
    		},

    		m: function mount(target, anchor) {
    			insert(target, strong, anchor);
    			append(strong, button);
    			append(button, span);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(strong);
    			}

    			dispose();
    		}
    	};
    }

    // (214:4) {#if levelContainer}
    function create_if_block_3(ctx) {
    	var updating_levelData, current;

    	function confirmancedetails_levelData_binding(value) {
    		ctx.confirmancedetails_levelData_binding.call(null, value);
    		updating_levelData = true;
    		add_flush_callback(() => updating_levelData = false);
    	}

    	let confirmancedetails_props = {};
    	if (ctx.selectedLevelItem !== void 0) {
    		confirmancedetails_props.levelData = ctx.selectedLevelItem;
    	}
    	var confirmancedetails = new ConfirmanceDetails({
    		props: confirmancedetails_props,
    		$$inline: true
    	});

    	binding_callbacks.push(() => bind(confirmancedetails, 'levelData', confirmancedetails_levelData_binding));

    	return {
    		c: function create() {
    			confirmancedetails.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(confirmancedetails, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var confirmancedetails_changes = {};
    			if (!updating_levelData && changed.selectedLevelItem) {
    				confirmancedetails_changes.levelData = ctx.selectedLevelItem;
    			}
    			confirmancedetails.$set(confirmancedetails_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(confirmancedetails.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(confirmancedetails.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(confirmancedetails, detaching);
    		}
    	};
    }

    // (217:4) {#if !levelContainer}
    function create_if_block_1$1(ctx) {
    	var each_1_anchor;

    	var each_value = ctx.confirmanceData;

    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	return {
    		c: function create() {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},

    		m: function mount(target, anchor) {
    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert(target, each_1_anchor, anchor);
    		},

    		p: function update(changed, ctx) {
    			if (changed.confirmanceData) {
    				each_value = ctx.confirmanceData;

    				for (var i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);

    			if (detaching) {
    				detach(each_1_anchor);
    			}
    		}
    	};
    }

    // (235:7) {#if confirmanceItem.scanData && confirmanceItem.scanData.violations}
    function create_if_block_2(ctx) {
    	var div0, span, i, t0, t1_value = ctx.confirmanceItem.scanData.violations.length, t1, t2, t3, div1, a0, t5, div2, a1, dispose;

    	function click_handler() {
    		return ctx.click_handler(ctx);
    	}

    	function click_handler_1() {
    		return ctx.click_handler_1(ctx);
    	}

    	return {
    		c: function create() {
    			div0 = element("div");
    			span = element("span");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = text(" violations");
    			t3 = space();
    			div1 = element("div");
    			a0 = element("a");
    			a0.textContent = "Details";
    			t5 = space();
    			div2 = element("div");
    			a1 = element("a");
    			a1.textContent = "Run again";
    			attr(i, "class", "fas fa-times-circle");
    			add_location(i, file$1, 237, 10, 6223);
    			add_location(span, file$1, 236, 9, 6206);
    			add_location(div0, file$1, 235, 8, 6191);
    			attr(a0, "href", "javascript:void(0)");
    			attr(a0, "class", "svelte-1n92ei9");
    			add_location(a0, file$1, 242, 9, 6406);
    			attr(div1, "class", "visua11y-ctr-link svelte-1n92ei9");
    			add_location(div1, file$1, 241, 8, 6365);
    			attr(a1, "href", "javascript:void(0)");
    			attr(a1, "class", "svelte-1n92ei9");
    			add_location(a1, file$1, 245, 9, 6566);
    			attr(div2, "class", "visua11y-ctr-link svelte-1n92ei9");
    			add_location(div2, file$1, 244, 8, 6525);

    			dispose = [
    				listen(a0, "click", click_handler),
    				listen(a1, "click", click_handler_1)
    			];
    		},

    		m: function mount(target, anchor) {
    			insert(target, div0, anchor);
    			append(div0, span);
    			append(span, i);
    			append(span, t0);
    			append(span, t1);
    			append(span, t2);
    			insert(target, t3, anchor);
    			insert(target, div1, anchor);
    			append(div1, a0);
    			insert(target, t5, anchor);
    			insert(target, div2, anchor);
    			append(div2, a1);
    		},

    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div0);
    				detach(t3);
    				detach(div1);
    				detach(t5);
    				detach(div2);
    			}

    			run_all(dispose);
    		}
    	};
    }

    // (218:5) {#each confirmanceData as confirmanceItem}
    function create_each_block$1(ctx) {
    	var div3, div0, strong0, t0_value = ctx.confirmanceItem.heading, t0, t1, div1, strong1, t2_value = ctx.confirmanceItem.subheading, t2, t3, div2, a, img, img_src_value, img_alt_value, a_href_value, a_title_value, t4, t5;

    	var if_block = (ctx.confirmanceItem.scanData && ctx.confirmanceItem.scanData.violations) && create_if_block_2(ctx);

    	return {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			strong0 = element("strong");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			strong1 = element("strong");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			a = element("a");
    			img = element("img");
    			t4 = space();
    			if (if_block) if_block.c();
    			t5 = space();
    			add_location(strong0, file$1, 220, 8, 5713);
    			add_location(div0, file$1, 219, 7, 5699);
    			add_location(strong1, file$1, 223, 8, 5791);
    			add_location(div1, file$1, 222, 7, 5777);
    			attr(img, "height", "32");
    			attr(img, "width", "88");
    			attr(img, "src", img_src_value = ctx.confirmanceItem.logo);
    			attr(img, "alt", img_alt_value = ctx.confirmanceItem.alt);
    			add_location(img, file$1, 229, 9, 5977);
    			attr(a, "href", a_href_value = ctx.confirmanceItem.link);
    			attr(a, "target", "_blank");
    			attr(a, "title", a_title_value = ctx.confirmanceItem.title);
    			add_location(a, file$1, 226, 8, 5872);
    			add_location(div2, file$1, 225, 7, 5858);
    			attr(div3, "class", "visua11y-level-ctr svelte-1n92ei9");
    			add_location(div3, file$1, 218, 6, 5659);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div3, anchor);
    			append(div3, div0);
    			append(div0, strong0);
    			append(strong0, t0);
    			append(div3, t1);
    			append(div3, div1);
    			append(div1, strong1);
    			append(strong1, t2);
    			append(div3, t3);
    			append(div3, div2);
    			append(div2, a);
    			append(a, img);
    			append(div3, t4);
    			if (if_block) if_block.m(div3, null);
    			append(div3, t5);
    		},

    		p: function update(changed, ctx) {
    			if (ctx.confirmanceItem.scanData && ctx.confirmanceItem.scanData.violations) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(div3, t5);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div3);
    			}

    			if (if_block) if_block.d();
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	var script, style, t1, div, t2, current;

    	var if_block0 = (!ctx.fullContainer) && create_if_block_5(ctx);

    	var if_block1 = (ctx.fullContainer) && create_if_block$1(ctx);

    	return {
    		c: function create() {
    			script = element("script");
    			style = element("style");
    			style.textContent = ".visua11y-annotate{\n\t\t\tposition: absolute;\n\t\t\tfont-size: 12px;\n\t\t\tpadding: 2px;\n\t\t\tbackground: green;\n\t\t\tz-index: 8888;\n\t\t}\n\n\t\t.visua11y-annotate-bg{\n\t\t\tborder: 3px dotted green !important;\n\t\t}";
    			t1 = space();
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			attr(script, "src", "https://kit.fontawesome.com/7e1024d596.js");
    			add_location(script, file$1, 1, 1, 15);
    			add_location(style, file$1, 2, 1, 82);
    			attr(div, "class", "visua11y visua11y-toolbar svelte-1n92ei9");
    			add_location(div, file$1, 189, 0, 4758);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			append(document_1$1.head, script);
    			append(document_1$1.head, style);
    			insert(target, t1, anchor);
    			insert(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append(div, t2);
    			if (if_block1) if_block1.m(div, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (!ctx.fullContainer) {
    				if (!if_block0) {
    					if_block0 = create_if_block_5(ctx);
    					if_block0.c();
    					if_block0.m(div, t2);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (ctx.fullContainer) {
    				if (if_block1) {
    					if_block1.p(changed, ctx);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				group_outros();
    				transition_out(if_block1, 1, () => {
    					if_block1 = null;
    				});
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			detach(script);
    			detach(style);

    			if (detaching) {
    				detach(t1);
    				detach(div);
    			}

    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	
     
    	let { name } = $$props;
    	
    	let confirmanceData = [
    		{
    			level: "wcag2a",
    			heading: "WCAG 2.0",
    			subheading: "Level A",
    			logo: "https://www.w3.org/WAI/wcag2A",
    			link: "https://www.w3.org/WAI/WCAG2A-Conformance",
    			alt: "Level A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",
    			title: "Explanation of WCAG 2.0 Level A Conformance",
    			scanTags: ['wcag2a'],
    			scanData: {}
    		},
    		{
    			level: "wcag2aa",
    			heading: "WCAG 2.0",
    			subheading: "Level AA",
    			logo: "https://www.w3.org/WAI/wcag2AA",
    			link: "https://www.w3.org/WAI/WCAG2AA-Conformance",
    			alt: "Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",
    			title: "Explanation of WCAG 2.0 Level Double-A Conformance",
    			scanTags: ["wcag2a", "wcag2aa"],
    			scanData: {}
    		},
    		{
    			level: "wcag2aaa",
    			heading: "WCAG 2.0",
    			subheading: "Level AAA",
    			logo: "https://www.w3.org/WAI/wcag2AAA",
    			link: "https://www.w3.org/WAI/WCAG2AAA-Conformance",
    			alt: "Level Triple-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",
    			title: "Explanation of WCAG 2.0 Level Triple-A Conformance",
    			scanTags: ["wcag2a", "wcag2aa", "wcag2aaa"],
    			scanData: {}
    		},
    		{
    			level: "wcag21a",
    			heading: "WCAG 2.1",
    			subheading: "Level A",
    			logo: "https://www.w3.org/WAI/WCAG21/wcag2.1AA-v",
    			link: "https://www.w3.org/WAI/WCAG2.1AA-Conformance",
    			alt: "Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.1",
    			title: "Explanation of WCAG 2.1 Level Double-A Conformance",
    			scanTags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    			scanData: {}
    		},
    		{
    			level: "section508",
    			heading: "Section 508",
    			subheading: "Section 508",
    			logo: "http://digitalinclusionnewslog.itu.int/wp-content/uploads/sites/9/2015/10/Section-508.png",
    			link: "https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines",
    			alt: "Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.1",
    			title: "Explanation of WCAG 2.1 Level Double-A Conformance",
    			scanTags: ['section508'],
    			scanData: {}
    		}
    	];

    	let scanQueue = [];
    	let scanInProgress = false;
    	let fullContainer = false;
    	let levelContainer = false;
    	let selectedLevelItem;
    	function toggleContainer(){
    		$$invalidate('fullContainer', fullContainer = !fullContainer);
    	}

    	function runScan(item){
    		if(scanInProgress){
    			scanQueue.push(item);
    		} else {
    			scanInProgress = true;
    			item.scanData = {};
    			axe.run(document, {runOnly: item.scanTags}, (err, results) => {
    				item.scanData = results;
    				scanInProgress = false;
    				if(scanQueue.length){
    					const d = scanQueue.pop();
    					runScan(d);
    				}
    			});
    		}
    	}

    	function toggleLevelDetails(item){
    		if(levelContainer){
    			$$invalidate('levelContainer', levelContainer = false);
    			$$invalidate('selectedLevelItem', selectedLevelItem = undefined);
    		} else {
    			$$invalidate('selectedLevelItem', selectedLevelItem = item);
    			$$invalidate('levelContainer', levelContainer = true);
    		}
    	}

    	onMount(() => {
    		const scr2 = document.createElement('script');
    		scr2.src = "/visua11ysite/axe.min.js";
    		scr2.onload = () => {
    			console.log('AXE Tools loaded');
    			confirmanceData.forEach(item => {
    				runScan(item);
    			});
    		};
     		document.querySelector('head').appendChild(scr2);
    	});

    	const writable_props = ['name'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function confirmancedetails_levelData_binding(value) {
    		selectedLevelItem = value;
    		$$invalidate('selectedLevelItem', selectedLevelItem);
    	}

    	function click_handler({ confirmanceItem }) {
    		return toggleLevelDetails(confirmanceItem);
    	}

    	function click_handler_1({ confirmanceItem }) {
    		return runScan(confirmanceItem);
    	}

    	$$self.$set = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    	};

    	return {
    		name,
    		confirmanceData,
    		fullContainer,
    		levelContainer,
    		selectedLevelItem,
    		toggleContainer,
    		runScan,
    		toggleLevelDetails,
    		confirmancedetails_levelData_binding,
    		click_handler,
    		click_handler_1
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		if (!document_1$1.getElementById("svelte-1n92ei9-style")) add_css$1();
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, ["name"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.name === undefined && !('name' in props)) {
    			console_1.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const toolbarEle = document.createElement('div');
    toolbarEle.id = "visua11y-bar";
    document.querySelector('body').appendChild(toolbarEle);

    const app = new App({
    	target: document.getElementById('visua11y-bar'),
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
