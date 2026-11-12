# Hendge Hospital — premium medical redesign

## Experience
- Replace the template home screen with a polished, responsive Hendge Hospital website in the requested futuristic medical direction.
- Use the exact navy, medical blue, neon teal, ice white, pure white, and secondary text palette supplied by the user; create all reusable styles as semantic design tokens.
- Add an immersive eye-care opening with an authentic medical eye image, subtle animated scan rings/beam/markers, then a dental-care feature with a realistic dental image and restrained scan effect. Keep the scanner decorative, accessible, and reduced-motion aware; no faux diagnosis or gaming HUD.
- Carry the same navigation and footer across home, About, Eye Care, Dental Care, Gallery, and Contact pages. Make service links, telephone, directions, and appointment actions work.

## Verified content
- Preserve the hospital's source identity and confirmed information: opened in 2020; eye and dental care; in-house eye operation theatre; services listed on the current site; 4.9/5 from 541+ Google reviews; Saturday–Thursday? Correct source hours are Monday–Saturday, 10am–8pm; phone +91 90674 42244; Nanded, Maharashtra 431602.
- Use actual hospital gallery imagery and genuine review excerpts when available. Do not invent named clinicians, qualifications, a street address beyond what the source confirms, or additional facilities/claims. Omit a doctor roster because none is published on the supplied source.
- Contact an appointment enquiry through a prefilled WhatsApp message to the verified number, plus call and map directions.

## Technical approach
- Keep the app on TanStack Start and its file-based routes; do not introduce React Router.
- Use Motion for light, viewport-triggered transitions and decorative scanner movement. Use optimized authentic image assets instead of a heavy 3D runtime; the original brief permits layered imagery and Motion where that is the better-performing option.
- Give every content route its own unique title, description, Open Graph, and Twitter card metadata. Keep route components focused and share the visual shell/navigation.
- Run the existing routing tests and verify the rendered home and key interactions at desktop and mobile sizes.