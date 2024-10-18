class TopBlockedDomainsCard extends HTMLElement {
    set hass(hass) {
        const entityId = this.config.entity;
        const state = hass.states[entityId];
        if (!state) {
          return;
        }

        const blocked_domains = state.state.split('\n');
        let content = `<table><tr><th>Blocked Domain</th><th>Hits</th></tr>`;
        blocked_domains.forEach(domain => {
            const [name, hits] = domain.split(' (');
            content += `<tr><td>${name}</td><td>${hits.replace(')', '')}</td></tr>`;
        });
        content += `</table>`;

        this.innerHTML = `
          <ha-card header="Top Blocked Domains">
            <div class="card-content">${content}</div>
          </ha-card>
        `;
    }

    static getConfigElement() {
        return document.createElement('hui-generic-entity-row');
    }

    static getStubConfig() {
        return { entity: "sensor.top_blocked_domains" };
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

customElements.define('top-blocked-domains-card', TopBlockedDomainsCard);
