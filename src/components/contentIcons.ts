import { Boxes, BriefcaseBusiness, ChartNoAxesCombined, Check, CloudOff, Code2, Database, FileText, Filter, Headset, Layers3, ListChecks, Mail, MapPin, MessagesSquare, MonitorSmartphone, PackageSearch, PanelsTopLeft, PlugZap, Presentation, Radio, Route, Search, SearchCheck, Shapes, ShoppingBag, Smartphone, Store, Truck, UsersRound, type LucideIcon } from 'lucide-react';

const featureIcons: { match: RegExp; icon: LucideIcon }[] = [
  { match: /performance marketing|funnel optimization/, icon: ChartNoAxesCombined },
  { match: /content|collateral/, icon: FileText },
  { match: /social media|linkedin/, icon: MessagesSquare },
  { match: /email/, icon: Mail },
  { match: /technical seo/, icon: SearchCheck },
  { match: /local.*global/, icon: MapPin },
  { match: /competitor|research/, icon: Search },
  { match: /lead gen|b2b/, icon: UsersRound },
  { match: /crm|data entry/, icon: Database },
  { match: /custom web|shopify development/, icon: Code2 },
  { match: /e-commerce solutions/, icon: ShoppingBag },
  { match: /headless cms|interface design/, icon: PanelsTopLeft },
  { match: /api integrations/, icon: PlugZap },
  { match: /ios.*android/, icon: Smartphone },
  { match: /cross-platform|design systems/, icon: Layers3 },
  { match: /real-time/, icon: Radio },
  { match: /offline/, icon: CloudOff },
  { match: /experience mapping/, icon: Route },
  { match: /brand identity/, icon: Shapes },
  { match: /presentation/, icon: Presentation },
  { match: /executive support/, icon: BriefcaseBusiness },
  { match: /customer support/, icon: Headset },
  { match: /project management/, icon: ListChecks },
  { match: /amazon.*ebay/, icon: Store },
  { match: /product sourcing/, icon: PackageSearch },
  { match: /dropshipping/, icon: Truck },
  { match: /wholesale/, icon: Boxes },
  { match: /marketing|seo|search/, icon: ChartNoAxesCombined },
  { match: /mobile/, icon: MonitorSmartphone },
  { match: /funnel/, icon: Filter },
];

export function iconForFeature(feature: string): LucideIcon {
  return featureIcons.find(({ match }) => match.test(feature.toLowerCase()))?.icon ?? Check;
}
