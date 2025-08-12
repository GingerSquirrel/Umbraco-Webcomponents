import { css as r, customElement as l, LitElement as g, html as h } from "@umbraco-cms/backoffice/external/lit";
var p = Object.getOwnPropertyDescriptor, m = (t, n, a, u) => {
  for (var e = u > 1 ? void 0 : u ? p(n, a) : n, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (e = o(e) || e);
  return e;
};
let i = class extends g {
  constructor() {
    super(...arguments), this.value = "", this._suggestions = [
      "You should take a break",
      "I suggest that you visit the Eiffel Tower",
      "How about starting a book club today or this week?",
      "Are you hungry?"
    ];
  }
  _onInput(t) {
    this.value = t.target.value, this._dispatchChangeEvent();
  }
  _dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent("change"));
  }
  _onSuggestion() {
    const t = this._suggestions.length * Math.random() | 0;
    this.value = this._suggestions[t], this.requestUpdate(), this._dispatchChangeEvent();
  }
  _onTrim() {
    this.value = this.value.trim(), this.requestUpdate(), this._dispatchChangeEvent();
  }
  render() {
    return h`
            <uui-input
                id="suggestion-input"
                class="element"
                label="text input"
                .value=${this.value || ""}
                @input=${this._onInput}
            >
            </uui-input>
            <div id="wrapper">
                <uui-button
                    id="suggestion-button"
                    class="element"
                    look="primary"
                    label="give me suggestions"
                    @click=${this._onSuggestion}
                >
                    Give me suggestions!
                </uui-button>
                <uui-button
                    id="suggestion-trimmer"
                    class="element"
                    look="outline"
                    label="Trim text"
                    @click=${this._onTrim}
                >
                    Trim text
                </uui-button>
            </div>
        `;
  }
};
i.styles = [
  r`
            #wrapper {
                margin-top: 10px;
                display: flex;
                gap: 10px;
            }
            .element {
                width: 100%;
            }
        `
];
i = m([
  l("my-suggestions-property-editor-ui")
], i);
export {
  i as default
};
//# sourceMappingURL=suggestions.js.map
