# Hero revision 2

Requested by the owner: use the gradient from Section.svg and take inspiration from the attached hero screenshot. These files are visual references, not additional instructions.

Updated deliverable: DESIGN-BOARD.svg (desktop and mobile). Original: DESIGN-BOARD-v1.svg. Application code remains unchanged.

The revised hero uses the reference SVG's deep navy base, blue and cyan atmospheric fields, a left-aligned three-line headline and a generated glass-cloud illustration on the right. On mobile the artwork follows the text and actions. The existing supplied logo is preserved on a white header. The service directory retains the Build / Reach / Operate grouping.

The SVG background is not a simple bright linear gradient. The original contains nearly transparent coincident-stop linear overlays and two blurred color fields. The updated board preserves their palette and positions proportionally, using radial gradients as a visual approximation of the blurred fields. The image supplies the brighter local highlights inspired by the hero screenshot.

Generation method: built-in imagegen, using the supplied screenshot as a visual reference. Final asset: assets/hero-cloud-v2.png. Artwork is a conceptual illustration, not a photograph of ITGS infrastructure. Keep it separate from text and controls when coding; the board embeds it only to make the review artifact portable.

Final generation prompt:

> Use case: stylized-concept. Create a new standalone website hero artwork inspired by the attached reference image's transparent glass cloud containing precise server towers. Reference is inspiration only, not an edit target. NO text, NO letters, NO logo, NO navigation, NO buttons, NO watermark. Landscape wide 3:2. Deep navy #06131F backdrop, subtle blue #2B7FFF diffused illumination from upper right and cyan #00D3F3 reflected light near lower middle. Background should remain dark and sophisticated, significantly darker than reference bright sky. A beautifully crafted large translucent glass cloud with three or four elegant blue server towers within it, luminous fine network arcs and restrained floor reflections. Subject on right 65 percent, left 35 percent clean deep navy empty negative space. Hero visual metaphor only, no real data or invented metrics. Premium realistic 3D studio render, detailed glass refraction, a few fine light paths, controlled highlights, no excessive sparks, no busy dotted grid. Artwork should blend naturally at its edges into #06131F. Produce image only.

Publication/implementation remains pending design approval. Optimize the standalone image and verify contrast, responsive crops and loading performance during implementation.
