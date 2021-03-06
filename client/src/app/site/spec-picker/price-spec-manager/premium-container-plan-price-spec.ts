import { PriceSpec, PriceSpecInput } from './price-spec';
import { Injector } from '@angular/core';
import { PortalResources } from '../../../shared/models/portal-resources';
import { Links, ServerFarmSku } from '../../../shared/models/constants';

export abstract class PremiumContainerPlanPriceSpec extends PriceSpec {
  tier = ServerFarmSku.premiumContainer;

  featureItems = [
    {
      iconUrl: 'image/ssl.svg',
      title: this._ts.instant(PortalResources.pricing_customDomainsSsl),
      description: this._ts.instant(PortalResources.pricing_customDomainsIpSslDesc),
    },
    {
      iconUrl: 'image/scale-up.svg',
      title: this._ts.instant(PortalResources.pricing_autoScale),
      description: this._ts.instant(PortalResources.pricing_scaleDesc).format(20),
    },
    {
      iconUrl: 'image/slots.svg',
      title: this._ts.instant(PortalResources.pricing_stagingSlots),
      description: this._ts.instant(PortalResources.pricing_slotsDesc).format(20),
    },
    {
      iconUrl: 'image/globe.svg',
      title: this._ts.instant(PortalResources.pricing_trafficManager),
      description: this._ts.instant(PortalResources.pricing_trafficManagerDesc),
    },
  ];

  hardwareItems = [
    {
      iconUrl: 'image/app-service-plan.svg',
      title: this._ts.instant(PortalResources.pricing_includedHardware_azureComputeUnits),
      description: this._ts.instant(PortalResources.pricing_computeDedicatedAcu),
      learnMoreUrl: Links.azureComputeUnitLearnMore,
    },
    {
      iconUrl: 'image/website-power.svg',
      title: this._ts.instant(PortalResources.memory),
      description: this._ts.instant(PortalResources.pricing_dedicatedMemory),
    },
    {
      iconUrl: 'image/storage.svg',
      title: this._ts.instant(PortalResources.storage),
      description: this._ts.instant(PortalResources.pricing_premiumContainerSharedDisk).format('250 GB'),
    },
  ];

  cssClass = 'spec premium-spec';

  constructor(injector: Injector) {
    super(injector);
  }

  runInitialization(input: PriceSpecInput) {
    // NOTE(michinoy): Only allow premium containers for xenon.
    if ((input.specPickerInput.data && input.specPickerInput.data.isXenon) || (input.plan && input.plan.properties.isXenon)) {
      this.state = 'enabled';
    } else {
      this.state = 'hidden';
    }

    return this.checkIfDreamspark(input.subscriptionId);
  }
}

export class PremiumContainerSmallPriceSpec extends PremiumContainerPlanPriceSpec {
  skuCode = 'PC2';
  legacySkuName = 'small_premium_container';
  topLevelFeatures = [
    this._ts.instant(PortalResources.pricing_ACU).format('320'),
    this._ts.instant(PortalResources.pricing_memory).format('8'),
    this._ts.instant(PortalResources.pricing_dv3SeriesComputeEquivalent),
  ];

  meterFriendlyName = 'Premium Container Small App Service Hours';

  specResourceSet = {
    id: this.skuCode,
    firstParty: [
      {
        quantity: 744,
        resourceId: null,
      },
    ],
  };
}

export class PremiumContainerMediumPriceSpec extends PremiumContainerPlanPriceSpec {
  skuCode = 'PC3';
  legacySkuName = 'medium_premium_container';
  topLevelFeatures = [
    this._ts.instant(PortalResources.pricing_ACU).format('640'),
    this._ts.instant(PortalResources.pricing_memory).format('16'),
    this._ts.instant(PortalResources.pricing_dv3SeriesComputeEquivalent),
  ];

  meterFriendlyName = 'Premium Container Medium App Service Hours';

  specResourceSet = {
    id: this.skuCode,
    firstParty: [
      {
        quantity: 744,
        resourceId: null,
      },
    ],
  };
}

export class PremiumContainerLargePriceSpec extends PremiumContainerPlanPriceSpec {
  skuCode = 'PC4';
  legacySkuName = 'large_premium_container';
  topLevelFeatures = [
    this._ts.instant(PortalResources.pricing_ACU).format('1280'),
    this._ts.instant(PortalResources.pricing_memory).format('32'),
    this._ts.instant(PortalResources.pricing_dv3SeriesComputeEquivalent),
  ];

  meterFriendlyName = 'Premium Container Large App Service Hours';

  specResourceSet = {
    id: this.skuCode,
    firstParty: [
      {
        quantity: 744,
        resourceId: null,
      },
    ],
  };
}
