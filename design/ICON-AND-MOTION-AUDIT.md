# Icon and motion audit

The site already depended on Lucide. This pass uses that family throughout and keeps each content icon hidden from screen readers when the adjacent text conveys the same meaning.

| Area | Decision | Reason |
| --- | --- | --- |
| Home service groups | Blocks, growth chart, settings in 56px tinted containers | Distinguish building a product, reaching customers, and operating it. Individual service links keep their directional arrows. |
| Home How we work | Search, target, rocket, gauge in connected cards | Clarifies Discover, Define, Deliver, and Improve. The flow becomes vertical on mobile. |
| Home dark benefits | Checklist, team, message in 42px dark containers | Distinguishes scope, accountable people, and communication. |
| Services index | Retain each existing Lucide service icon in one consistent container | The nine cards already had relevant icons; the presentation was inconsistent. |
| Service details | Semantic feature icons and process-stage icons | Makes long feature lists and service-specific delivery steps easier to scan. Unmatched features use a check mark to communicate inclusion. |
| About approach | Search, checklist, rocket, gauge | Makes the four stated actions recognizable at a glance. |
| Reviews framework | Search, delivered package, verified badge | Distinguishes challenge, deliverable, and confirmed result. |
| Blog article metadata | Calendar and clock | Clarifies publication date and reading time. |
| Hero, navigation, booking, careers, team, testimonials, blog cards, footer | No additional content icons | Their actions already have directional icons or the content does not gain clarity from one. Empty states and image-led cards stay restrained. |

The home benefits section is the animated navy surface. It uses transform-based movement for a slow blue gradient wash and a soft glow, with a static low-contrast grid. Card hover is limited to a four-pixel lift, border change, and small icon movement. Entrance motion is limited to 18px and 550ms. Reduced-motion preferences disable continuous CSS animation and remove reveal translation.

Verification: TypeScript lint and Vite production build passed. Browser checks covered desktop, 768px tablet, and 390px mobile layouts, including the home process, navy section, services index, and a service detail. No horizontal overflow appeared at the mobile and tablet widths checked.
