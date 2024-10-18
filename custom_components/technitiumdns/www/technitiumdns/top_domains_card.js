// top-domains-card.js

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class TopDomainsCard extends LitElement {
  @property({ attribute: false }) hass;
  @property() config;

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 4px;
      text-align: left;
      border-bottom: 1px solid var(--divider-color);
    }
  `;

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

  render() {
    const entityId = this.config.entity;
    const stateObj = this.hass.states[entityId];

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="card-content">Entity not available: ${entityId}</div>
        </ha-card>
      `;
    }

    const domains = stateObj.state.split('\n');
    return html`
      <ha-card header="Top Domains">
        <div class="card-content">
          <table>
            <tr><th>Domain</th><th>Hits</th></tr>
            ${domains.map((domain) => {
              const [name, hitsWithParen] = domain.split(' (');
              const hits = hitsWithParen ? hitsWithParen.replace(')', '') : '';
              return html`
                <tr>
                  <td>${name}</td>
                  <td>${hits}</td>
                </tr>
              `;
            })}
          </table>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 2;
  }
}

customElements.define('top-domains-card', TopDomainsCard);
