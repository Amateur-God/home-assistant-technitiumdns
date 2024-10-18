class StatisticsCard extends HTMLElement {
    set hass(hass) {
        const entityId = this.config.entity;
        const state = hass.states[entityId];
        if (!state) {
          return;
        }

        const stats = state.attributes;
        let content = `<table><tr><th>Stat</th><th>Value</th></tr>`;
        Object.keys(stats).forEach(key => {
            content += `<tr><td>${key}</td><td>${stats[key]}</td></tr>`;
        });
        content += `</table>`;

        this.innerHTML = `
          <ha-card header="DNS Statistics">
            <div class="card-content">${content}</div>
          </ha-card>
        `;
    }

    static getConfigElement() {
        return document.createElement('hui-generic-entity-row');
    }

    static getStubConfig() {
        return { entity: "sensor.dns_statistics" };
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error("You need to define an entity");
        }
        this.config = config;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('statistics-card', StatisticsCard);
