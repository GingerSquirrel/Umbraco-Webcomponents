import { LitElement as u, html as v, customElement as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as y } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as f } from "@umbraco-cms/backoffice/notification";
var C = Object.getOwnPropertyDescriptor, h = (e) => {
  throw TypeError(e);
}, E = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? C(t, r) : t, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (i = l(i) || i);
  return i;
}, m = (e, t, r) => t.has(e) || h("Cannot " + r), c = (e, t, r) => (m(e, t, "read from private field"), r ? r.call(e) : t.get(e)), _ = (e, t, r) => t.has(e) ? h("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), T = (e, t, r, n) => (m(e, t, "write to private field"), t.set(e, r), r), a, s;
let p = class extends y(u) {
  constructor() {
    super(), _(this, a), _(this, s, () => {
      var t;
      (t = c(this, a)) == null || t.peek("positive", {
        data: { message: "#h5yr" }
      });
    }), this.consumeContext(f, (t) => {
      T(this, a, t);
    });
  }
  render() {
    return v`
            <uui-box headline="Welcome">
                <p>A TypeScript Lit Dashboard</p>
                <uui-button
                    look="primary"
                    label="Click me"
                    @click=${c(this, s)}
                ></uui-button>
            </uui-box>
        `;
  }
};
a = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakMap();
p = E([
  d("my-typescript-element")
], p);
const O = () => {
  console.log("My First Extension loaded");
}, S = p;
export {
  S as default,
  O as onInit
};
//# sourceMappingURL=my-first-extension.js.map
