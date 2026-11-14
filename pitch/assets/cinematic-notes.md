# Filmische Konzeptbilder · 14.11.2026

Diese Motive ersetzen in der aktiven Pitch- und Roadmap-Ansicht die bisherigen weiter entfernten Startansichten. Die Originalbilder bleiben erhalten. Alle Motive sind mittels integrierter Bildgenerierung erzeugte Konzeptvisualisierungen; sie belegen keinen realen Standort, keine verfügbare Baufläche, keine Genehmigung und keine Partnerschaft. Das Menü ist ein illustratives kulinarisches Motiv, keine festgelegte Speisenfolge.

Die Darstellung des Starts kombiniert lokale Rasterbilder in einer nativen HTML/CSS-Komposition. Rakete, Abgas, Rauch, Licht und Kamera folgen dem vorhandenen Scrollfortschritt oder dem elfsekündigen Startknopf. Es ist keine 3D-Engine und kein echtes Video. Bei reduzierter Bewegung bleibt das letzte Bild ruhig sichtbar.

## Auslieferung

Ausschließlich WebP-Kompression (Qualität 86, Methode 6); Bildinhalte wurden nach der Generierung nicht verändert. Alpha der Freisteller bleibt erhalten.

| Asset | Pixel | Modus | Verwendung |
| --- | --- | --- | --- |
| `dining-facing-launch.webp` | 1672 × 941 | RGB | Auftakt, Gästeerlebnis, Roadmap-Abschluss; alle sichtbaren Gäste schauen zum Start |
| `mission-menu.webp` | 1672 × 941 | RGB | Sichtbares Erlebnisfenster Part 05 |
| `launch-pad.webp` | 1672 × 941 | RGB | Finale, leerer Starttisch; Raketenanker (1230,520) |
| `launch-vehicle.webp` | 724 × 2172 | RGBA | Rakete und Triebwerksstrahl getrennt über dieselbe Bildgeometrie maskiert |
| `launch-smoke.webp` | 1774 × 887 | RGBA | Drei Tiefenebenen für Abgaswolken |
| `launch-climax.webp` | 1672 × 941 | RGB | Vollständig integrierter finaler Startblick |
| `../../teil6/launch-coast-near.webp` | 1672 × 941 | RGB | Näherer gemeinsamer Hintergrund; Bauanker unverändert, Startziel (1290,480) |
| `../../teil6/site-aerial.webp` | 1672 × 941 | RGB | Drei schematische Flächen; Auswahl (775,680), Startziel (1385,335) |

Das Bild zeigt einen Ausschnitt der geplanten Tische; die präzisen SVG-Pläne zeigen weiterhin genau zehn Zweiertische und zwanzig Plätze. Zahlen, Termine, Kalkulation und A/B-Varianten bleiben aus den vorhandenen Quelldaten abgeleitet.

## Exakte Prompts

### diningFacing

Transparenz: nein. Referenzen: `pitch/assets/dining-panorama.webp`.

```text
Use case: precise-object-edit. Asset: ultra-photoreal cinematic website panorama, 16:9, 2048x1152 or matching reference ratio. EDIT the supplied dining panorama. Keep the elegant dark glass pavilion, terrace arrangement, side/back camera viewpoint, ten distinct two-person round dining tables, candlelight, reflective dark floor and twilight/copper palette. Change the guests' seating and gaze: every couple sits SIDE BY SIDE on the room-side edge of its table, shoulders and faces directed through the windows toward the rocket launch on the right. The camera sees the backs / rear three-quarter profiles of their heads. No guest faces another guest or looks toward the camera or away from the rocket. All tables have a clear line of sight. Bring the launch complex considerably closer: a massive rocket rising just beyond a narrow landscaped buffer and one narrow water channel, tall detailed tower and white-hot exhaust clearly seen through the right-hand glazing, twice the apparent body size of the reference while still fitting fully in frame. The rocket's reflection lights every table and shoulder. An awe-inspiring high-end architectural/game cinematic with physically convincing materials, human anatomy, natural seated poses, intricate volumetric smoke and real optical light. Keep the left upper third darker with no focal objects for website text. No text, logos, watermarks or UI. This is an illustrative futuristic dining concept.
```

### groundNear

Transparenz: nein. Referenzen: `teil6/launch-coast-close.webp`.

```text
Use case: precise-object-edit. Asset: photoreal cinematic website master landscape 16:9, 1672x941 reference coordinates. EDIT the supplied landscape. KEEP EXACTLY the foreground vacant buildable peninsula, the large tree at left, the soil patch shape, rock shoreline and foreground perspective: the entire lower left 65% from y=590 downward must retain the same geometry and registration for architecture overlays. Do not add a building or people. Dramatically bring the launch facility closer by replacing the distant opposite-shore launch complex and intervening marshes with a much nearer, towering launch facility immediately beyond a single narrow water channel. The huge stainless-steel rocket and launch tower now dominate the RIGHT third with detailed pipes and infrastructure, white-hot engine exhaust and volumetric billowing smoke. Rocket center x around77% of frame, tip y8%, body base y35%, launch-pad base y62%. The firelight spills onto the peninsula grass and water. It should feel like an immersive premium realistic game scene: remarkably close, detailed and monumental, not a tiny launch viewed across miles of wetlands. Preserve the evening dark blue sky and warm copper lighting. Use a broad clear dark sky at upper left for overlay text. Maintain 16:9 canvas and the exact original foreground camera angle. No labels, icons, logos, text or watermarks.
```

### menuVisual

Transparenz: nein. Referenzen: keine.

```text
Use case: photorealistic-natural. Asset: widescreen 16:9 photographic still for a luxury RocketLight Dinner website, 1536x864 or larger. Very high-end cinematic close-up of a single elegant white porcelain tasting plate on a dark round table beside a panoramic window. A beautifully composed contemporary fine-dining course: a small golden roasted vegetable centerpiece, translucent sauce, delicate herbs, a few sculptural crisp elements, restrained and exquisite. A chef's hand delicately places a final garnish at the left edge. Warm candlelight and a champagne glass softly out of focus. In the far soft background through the window, a warm rocket exhaust glow against a deep blue evening sky. Plate and food tack-sharp with realistic surface textures; shallow depth of field, copper reflections, sophisticated color grading. This is a conceptual visual for a seven-course experience, not a specific factual menu. No text, no labels, no logos, no UI or borders.
```

### aerialSite

Transparenz: nein. Referenzen: `teil6/launch-coast-close.webp`.

```text
Use case: compositing / photorealistic-natural. Asset: a NEW aerial establishing-view companion image for a cinematic website, wide16:9. Referenceimage gives the same fictional coastal peninsula, vegetation, evening colors and rocket facility. Show this scene from a high drone, looking almost straight down with a slight oblique angle. A coastal spaceport at blue hour. Three EMPTY clearly buildable cleared-soil/grassy plots lie in the LOWER part of the image, separated by native coastal vegetation and modest access roads. All three are near the spaceport perimeter; the chosen middle plot is a small flat peninsula bordered by a narrow water channel. Composition coordinates on a1672x941 canvas: plot01 centered(340,650), plot02 centered(680,715) and plot03 centered(1050,650); keep these three ground patches clearly distinct and unobstructed. Each plot is about180–230pixels wide,70–110pixels tall in the aerial perspective. The launchcomplex and giant stainlesssteelrocket on the pad sit in the UPPER RIGHT around(1300,300), with steel gantries, piping, concrete pads and a modest warmengineglow. Reduce openwater area: these are nearby landparcels around one launchcomplex, NOT distant sites across miles ofwater. Deepdarkbluegreen terrain and coppergold practicallights; physicallyplausiblehighendgamecinematic/photorealdrone detail. The upperLEFT region is quiet darkcoastalterrain forwebsitecopy. No people, no buildings on the three plots, no outlines/labels/markers/grids/text/logos/watermarks: these will be accurateSVG overlays later. Keepaerialviewallthreeplotsandrocketvisible.
```

### launchPad

Transparenz: nein. Referenzen: keine.

```text
Use case: stylized-concept, but visually ULTRA PHOTOREAL. Asset: full-bleed cinematic launch-pad environment plate for a high-end realtime-game-style website finale, 16:9 landscape 2048x1152. Florida coastal spaceport at deep blue hour just after sunset, dramatic very low camera looking slightly upward. An enormous highly detailed steel launch gantry and concrete launch mount dominate the RIGHTthird; the exact empty launch mount / engine seating point is centered at72%width,70%height. The gantry rises behind and just left of this point fromy70%to20%. CRITICAL: NO ROCKET anywhere, NO EXHAUST FLAME; the rocketwillbecompositedlater. A few subtle wisps of white cryogenic vapor only, intact pipes, catwalks, cables, wet concrete, reflective shallow water in the extreme bottom foreground, physicallyaccurate metal and industrial detail. Strong senseofscale and proximity. Bigdarkcloudedsky spans the LEFT45%ascleannegativespace for overlay copy. Rich midnightblue and restrained copper practicallights, cinematic highdynamicrange, realisticlensperspective, detailed atmosphericvolume, premium raytraced cinematic render indistinguishablefrom film. No labels, text, logos, UI, large rounded graphical shapes or watermarks.
```

### launchVehicle

Transparenz: ja. Referenzen: keine.

```text
Use case: background-extraction / photoreal cinematic VFX asset. Asset: a single straight vertical launch vehicle with engine plume, isolated on REAL TRANSPARENT background, portrait1:3 canvas e.g1024x3072. HighlydetailedstainlesssteelStarship-like futuristic rocket with streamlinedpointednose, subtleblackthermaltilesononeflank,fourrealisticcontrolflaps, brushedmetalpaneling, realmachineryandhighendpathtracedlighting. NOlogoortext. Fullrocketcenteredatx50%;bodyextendsfromy3%to42%;actualbodywidthapproximately14%ofcanvas,flapswidth26%. Belowenginepointaty42%,aferociousrealwhite-hotengineplumeextendsdownwardtoy98%, narrowbrightcoreinside turbulent yellow-orange flame, visible supersonic structure, naturallysofttransparentfireedges. Plume broadensgraduallytowardbottomtoabout65%width, but is NOT a triangularflatgradient: it hasphotorealfluidturbulenceandstratifiedlight. Twilightbluefilllightonleftandwarmfirebounceonmetal. Cameraisnearlevelwithbodyfromfrontthreequarter, looking slightly upward, centralaxisstraightvertical. Preserve fullnoseandfullplumeinsidecanvas;thereisgeneroustransparentmarginbesidebody. No ground, no launch tower, no backgroundsky, no smokecloud atbase, no bakedcheckerboard, no labels. This is an exact compositing sprite, not a flat illustration.
```

### launchSmoke

Transparenz: ja. Referenzen: keine.

```text
Use case: background-extraction. Asset: isolated photoreal volumetric rocket launch exhaust cloud for VFX compositing, realTRANSPARENTbackground, wide2:1 landscape e.g2048x1024. A huge turbulent ground-hugging rolling cloudbank, several nested cauliflower billows with realistic complex small-scale wisps. Warm amberandorange illuminationfromwithinLOWER CENTER, darkblue-gray cooler shadedupperandouteredges, brightcreamcorewithphysicalscattering. All cloud edges dissolve naturally into true transparent alpha, including at left/right/top/bottom; leave15%transparentpaddingaroundcloudsilhouette. Low dense centralmassspreadsoutwardhorizontally, asymmetrical organic billows. Extremelyrealistic high-endfluid-simulationrender, dramaticvolumetricdepth, noflatgradientblobs. No rocket, sky, ground, buildings, text, icons, black rectangleorcheckerboard. Single reusablecloudassetwithnaturalsilhouette.
```

### launchClimax

Transparenz: nein. Referenzen: `generated_images/exec-7f59e9a3-4044-42e3-b6a9-01fcf662eead.png`, `generated_images/exec-7082f9d1-5081-468a-b09f-609419e5fd46.png`.

```text
Create the spectacular final shot of a high-end photoreal cinematic website sequence. Use reference 1 for the real industrial launchpad, blue-hour coastal atmosphere, wet concrete, intricate launch tower and warm industrial lights. Use reference 2 for the exact polished stainless-steel rocket with the dark thermal tile flank and four fins. This is a NEW widescreen 16:9 fully integrated, physically coherent ultra-realistic image, not a cutout or collage. The camera is low and close, looking upward at the rocket lifting off at the right side of frame, rocket centerline x=72%, nose at y=9%, body ending at y=50%. The whole rocket must fit in the frame. The enormous exhaust is dazzling white-hot at the engines, yellow orange farther down, with real turbulent flame texture and shock structures, blowing into immense dense volumetric smoke clouds that fill the lower 40% and expand right and left. Strong warm reflected firelight on the steel body, pipes, gantry and wet surface; cooler blue rim light from stormy evening sky. Tower is behind and slightly left of rocket, spatially coherent with reference 1. Fine detailed steel welds, complex mechanical engine bells, grit, vapor, atmospheric light scattering. A few tiny sparks naturally within exhaust, realistic photography with exceptional premium AAA game path-traced detail, restrained film grain. Keep the LEFT THIRD mainly dark navy storm sky with subtle low smoke, calm negative space for website copy, no text in the image. Dramatic monumental scale, emotionally powerful, sophisticated cinematic color grading, no cartoon or diagram aesthetic, no logos, no UI, no borders. Must feel like a real rocket launch captured through a cinema camera.
```
