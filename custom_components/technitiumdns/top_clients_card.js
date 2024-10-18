class TopClientsCard extends HTMLElement {
    set hass(hass) {
        const entityId = this.config.entity;
        const state = hass.states[entityId];
        if (!state) {
          return;
        }

        const clients = state.state.split('\n');
        let content = `<table><tr><th>IP Address</th><th>Hits</th></tr>`;
        clients.forEach(client => {
            const [ip, hits] = client.split(' (');
            content += `<tr><td>${ip}</td><td>${hits.replace(')', '')}</td></tr>`;
        });
        content += `</table>`;

        this.innerHTML = `
          <ha-card header="Top Clients">
            <div class="card-content">${content}</div>
          </ha-card>
        `;
    }

    static getConfigElement() {
        return document.createElement('hui-generic-entity-row');
    }

    static getStubConfig() {
        return { entity: "sensor.top_clients" };
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

customElements.define('top-clients-card', TopClientsCard);
