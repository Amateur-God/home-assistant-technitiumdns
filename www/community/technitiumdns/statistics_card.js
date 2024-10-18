// statistics-card.js

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class StatisticsCard extends LitElement {
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

    const stats = stateObj.attributes;
    return html`
      <ha-card header="DNS Statistics">
        <div class="card-content">
          <table>
            <tr><th>Statistic</th><th>Value</th></tr>
            ${Object.keys(stats).map(
              (key) => html`
                <tr>
                  <td>${key}</td>
                  <td>${stats[key]}</td>
                </tr>
              `
            )}
          </table>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 2;
  }
}

customElements.define('statistics-card', StatisticsCard);
