/** @odoo-module **/

import { registry } from "@web/core/registry";
import { patch } from "@web/core/utils/patch";
import { ExpirationPanel } from "@web_enterprise/webclient/home_menu/expiration_panel";
import { HomeMenu } from "@web_enterprise/webclient/home_menu/home_menu";
import { useService } from "@web/core/utils/hooks";
import { Component, xml, useState } from "@odoo/owl";

// Patch for ExpirationPanel
patch(ExpirationPanel.prototype, {
  setup() {
    const subscriptionService = useService("enterprise_subscription");

    this.subscription = useState({
      ...subscriptionService,
      daysLeft: 360,
      unregistered: false,
      isWarningHidden: true,
      warningType: null,
      hideWarning: () => {
        this.subscription.isWarningHidden = true;
      },
    });

    this.state = useState({
      displayRegisterForm: false,
    });
  },

  showRegistrationForm() {
    // Do nothing to prevent the registration form from showing
  },
});

// Patch for mainComponentsRegistry to modify ExpiredSubscriptionBlockUI
const mainComponentsRegistry = registry.category("main_components");

patch(mainComponentsRegistry, {
  add(key, value) {
    if (key === "expired_subscription_block_ui") {
      const OriginalExpiredSubscriptionBlockUI = value.Component;

      class PatchedExpiredSubscriptionBlockUI extends Component {
        setup() {
          const subscriptionService = useService("enterprise_subscription");
          this.subscription = useState({
            ...subscriptionService,
            daysLeft: 360,
            isWarningHidden: true,
            hideWarning: () => {
              this.subscription.isWarningHidden = true;
            },
          });
        }
      }

      PatchedExpiredSubscriptionBlockUI.template = xml`
                <t t-if="false">
                    <!-- This will never render -->
                </t>
            `;

      return super.add(key, { Component: PatchedExpiredSubscriptionBlockUI });
    }
    return super.add(...arguments);
  },
});

// Patch for HomeMenu
patch(HomeMenu.prototype, {
  setup() {
    super.setup();
    const subscriptionService = useService("enterprise_subscription");

    this.subscription = useState({
      ...subscriptionService,
      daysLeft: 360,
      warningType: null,
      isWarningHidden: true,
    });
  },
});
