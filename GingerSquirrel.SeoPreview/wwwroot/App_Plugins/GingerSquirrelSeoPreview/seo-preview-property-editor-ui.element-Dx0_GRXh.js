import { LitElement as c, html as p, css as d, property as u, customElement as h } from "@umbraco-cms/backoffice/external/lit";
var m = Object.defineProperty, v = Object.getOwnPropertyDescriptor, l = (e, t, i, a) => {
  for (var r = a > 1 ? void 0 : a ? v(t, i) : t, n = e.length - 1, s; n >= 0; n--)
    (s = e[n]) && (r = (a ? s(t, i, r) : s(r)) || r);
  return a && r && m(t, i, r), r;
};
let o = class extends c {
  constructor() {
    super(...arguments), this.value = {
      metaTitle: "",
      metaDescription: ""
    };
  }
  // Ensure value is always properly initialized
  get seoData() {
    return !this.value || typeof this.value != "object" ? {
      metaTitle: "",
      metaDescription: ""
    } : {
      metaTitle: this.value.metaTitle || "",
      metaDescription: this.value.metaDescription || ""
    };
  }
  _updateValue(e) {
    this.value = e, this.requestUpdate(), this._dispatchChangeEvent();
  }
  _dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent("change"));
  }
  _onTitleInput(e) {
    const t = e.target.value, i = this.seoData;
    this._updateValue({ ...i, metaTitle: t });
  }
  _onDescriptionInput(e) {
    const t = e.target.value, i = this.seoData;
    this._updateValue({ ...i, metaDescription: t });
  }
  _truncateText(e, t) {
    return e.length <= t ? e : e.substring(0, t) + "...";
  }
  _getCharacterCount(e, t) {
    return `${e.length}/${t}`;
  }
  _getCharacterCountClass(e, t) {
    const i = e.length;
    return i > t ? "over-limit" : i > t * 0.9 ? "near-limit" : "under-limit";
  }
  render() {
    const e = this.seoData, t = this._truncateText(e.metaTitle, 60), i = this._truncateText(e.metaDescription, 155);
    return p`
            <div class="seo-editor">
                <div class="input-section">
                    <div class="field-group">
                        <label for="meta-title">Meta Title</label>
                        <uui-input
                            id="meta-title"
                            class="title-input"
                            placeholder="Enter your page title..."
                            .value=${e.metaTitle}
                            @input=${this._onTitleInput}
                        ></uui-input>
                        <div class="character-count ${this._getCharacterCountClass(e.metaTitle, 60)}">
                            ${this._getCharacterCount(e.metaTitle, 60)} characters (recommended: 50-60)
                        </div>
                    </div>

                    <div class="field-group">
                        <label for="meta-description">Meta Description</label>
                        <uui-textarea
                            id="meta-description"
                            class="description-input"
                            placeholder="Enter your page description..."
                            .value=${e.metaDescription}
                            @input=${this._onDescriptionInput}
                            rows="3"
                        ></uui-textarea>
                        <div class="character-count ${this._getCharacterCountClass(e.metaDescription, 155)}">
                            ${this._getCharacterCount(e.metaDescription, 155)} characters (recommended: 120-155)
                        </div>
                    </div>
                </div>

                <div class="preview-section">
                    <h3>Google Search Preview</h3>
                    <div class="google-preview">
                        <div class="search-result">
                            <div class="url">https://yoursite.com/page-url</div>
                            <div class="title">
                                ${t || "Your Page Title Will Appear Here"}
                            </div>
                            <div class="description">
                                ${i || "Your meta description will appear here. This is what users will see in Google search results, so make it compelling and informative."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
};
o.styles = [
  d`
            .seo-editor {
                display: flex;
                flex-direction: column;
                gap: 24px;
                max-width: 800px;
            }

            .input-section {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .field-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            label {
                font-weight: 600;
                color: #333;
                font-size: 14px;
            }

            .title-input,
            .description-input {
                width: 100%;
                font-size: 14px;
            }

            .character-count {
                font-size: 12px;
                text-align: right;
                margin-top: 4px;
            }

            .character-count.under-limit {
                color: #52c41a;
            }

            .character-count.near-limit {
                color: #faad14;
            }

            .character-count.over-limit {
                color: #ff4d4f;
                font-weight: 600;
            }

            .preview-section {
                border-top: 1px solid #e0e0e0;
                padding-top: 20px;
            }

            .preview-section h3 {
                margin: 0 0 16px 0;
                font-size: 16px;
                font-weight: 600;
                color: #333;
            }

            .google-preview {
                background: #fff;
                border: 1px solid #dadce0;
                border-radius: 8px;
                padding: 16px;
                font-family: arial, sans-serif;
            }

            .search-result {
                max-width: 600px;
            }

            .url {
                color: #1a0dab;
                font-size: 14px;
                line-height: 1.3;
                margin-bottom: 2px;
            }

            .title {
                color: #1a0dab;
                font-size: 20px;
                line-height: 1.3;
                margin-bottom: 4px;
                cursor: pointer;
                font-weight: normal;
                text-decoration: underline;
                text-decoration-color: transparent;
                transition: text-decoration-color 0.2s;
            }

            .title:hover {
                text-decoration-color: #1a0dab;
            }

            .description {
                color: #4d5156;
                font-size: 14px;
                line-height: 1.4;
                max-width: 600px;
            }

            @media (min-width: 768px) {
                .seo-editor {
                    flex-direction: row;
                    gap: 32px;
                }

                .input-section {
                    flex: 1;
                }

                .preview-section {
                    flex: 1;
                    border-top: none;
                    border-left: 1px solid #e0e0e0;
                    padding-top: 0;
                    padding-left: 32px;
                }
            }
        `
];
l([
  u({ type: Object })
], o.prototype, "value", 2);
o = l([
  h("ginger-squirrel-seo-preview-property-editor-ui")
], o);
export {
  o as default
};
//# sourceMappingURL=seo-preview-property-editor-ui.element-Dx0_GRXh.js.map
