class TopDomainsCard extends HTMLElement {
    set hass(hass) {
        const entityId = this.config.entity;
        const state = hass.states[entityId];
        if (!state) {
          return;
        }

        const domains = state.state.split('\n');
        let content = `<table><tr><th>Domain</th><th>Hits</th></tr>`;
        domains.forEach(domain => {
            const [name, hits] = domain.split(' (');
            content += `<tr><td>${name}</td><td>${hits.replace(')', '')}</td></tr>`;
        });
        content += `</table>`;

        this.innerHTML = `
          <ha-card header="Top Domains">
            <div class="card-content">${content}</div>
          </ha-card>
        `;
    }

    static getConfigElement() {
        return document.createElement('hui-generic-entity-row');
    }

    static getStubConfig() {
        return { entity: "sensor.top_domains" };
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

customElements.define('top-domains-card', TopDomainsCard);
