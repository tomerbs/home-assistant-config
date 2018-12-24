class CustomFanCard extends Polymer.Element {

    static get template() {
        return Polymer.html`
            <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
            <style>
                :host {
                    line-height: 1.5;
                }
                .speed {
                    min-width: 30px;
                    max-width: 30px;
                    margin-left: 0px;
                    margin-right: 0px;
                }
                ha-entity-toggle {
                    margin-left: 16px;
                }
            </style>
            <hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
                <div class='horizontal justified layout' on-click="stopPropagation">
                    <paper-button
                        class='speed'
                        toggles name="low"
                        on-tap='setSpeed'
                        disabled='[[_isLowSpeed]]'>L</paper-button>
                    <paper-button
                        class='speed'
                        toggles name="medium"
                        on-tap='setSpeed'
                        disabled='[[_isMedSpeed]]'>M</paper-button>
                    <paper-button
                        class='speed'
                        toggles name="high"
                        on-tap='setSpeed'
                        disabled='[[_isHghSpeed]]'>H</paper-button>
                    <ha-entity-toggle hass="[[hass]]" state-obj="[[_stateObj]]"></ha-entity-toggle>
                </div>
            </hui-generic-entity-row>
        `;
    }

    static get properties() {
        return {
            hass: {
                type: Object,
                observer: 'hassChanged'
            },
            _config: Object,
            _stateObj: Object,
            _isLowSpeed: Boolean,
            _isMedSpeed: Boolean,
            _isHghSpeed: Boolean
        }
    }

    setConfig(config) {
        this._config = config;
    }

    hassChanged(hass) {

        const config = this._config;
        const stateObj = hass.states[config.entity];

        let speed;
        if (stateObj && stateObj.attributes) {
            speed = stateObj.attributes.speed || 'off';
        }

        this.setProperties({
            _stateObj: stateObj,
            _isLowSpeed: speed === 'low',
            _isMedSpeed: speed === 'medium',
            _isHghSpeed: speed == 'high'
        });
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    setSpeed(e) {
        const speed = e.currentTarget.getAttribute('name');
        this.hass.callService('fan', 'set_speed', {
            entity_id: this._config.entity, speed: speed
        });
    }

}

customElements.define('custom-fan-card', CustomFanCard);