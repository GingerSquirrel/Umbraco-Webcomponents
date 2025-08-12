import { LitElement, html, css, customElement } from '@umbraco-cms/backoffice/external/lit';

@customElement('my-suggestions-property-editor-ui')
export default class MySuggestionsPropertyEditorUIElement extends LitElement {
    public value = '';

    private _suggestions = [
        'You should take a break',
        'I suggest that you visit the Eiffel Tower',
        'How about starting a book club today or this week?',
        'Are you hungry?',
    ];

    private _onInput(e: InputEvent) {
        this.value = (e.target as HTMLInputElement).value;
        this._dispatchChangeEvent();
    }

    private _dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change'));
    }

    private _onSuggestion() {
        const randomIndex = (this._suggestions.length * Math.random()) | 0;
        this.value = this._suggestions[randomIndex];
        this.requestUpdate();
        this._dispatchChangeEvent();
    }

    private _onTrim() {
        this.value = this.value.trim();
        this.requestUpdate();
        this._dispatchChangeEvent();
    }

    override render() {
        return html`
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

    static override readonly styles = [
        css`
            #wrapper {
                margin-top: 10px;
                display: flex;
                gap: 10px;
            }
            .element {
                width: 100%;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        'my-suggestions-property-editor-ui': MySuggestionsPropertyEditorUIElement;
    }
}
