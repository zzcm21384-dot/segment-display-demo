# Eight-Segment Teaching Workbench

Confirmed direction: light teaching workbench, dark display package, red illuminated segments.

Deliver one self-contained `index.html` that opens from a local file without a server or network. Use native HTML, CSS, JavaScript and an interactive SVG technical illustration. Chinese interface. The eight segments are a-g plus decimal point dp. Initial digit is 5.

Interactions: validate a single ASCII decimal digit 0-9; digit shortcuts; toggle dp; independently toggle a-g/dp and recognize the resulting digit or mark a custom pattern; switch common cathode/anode while preserving the lit pattern; show the electrical code in bit order dp,g,f,e,d,c,b,a with hexadecimal output. Provide a circuit view with one current-limiting resistor per parallel LED branch and the correct common terminal and conventional current direction.

Demonstration: input, decoding, sequential segment driving, final output; play/pause, previous/next step, restart, speed, seek; a second mode cycles digits 0-9. User edits stop playback to avoid competing updates. Respect reduced motion, keyboard navigation, and mobile stacking. Explanatory content concerns electronics, not implementation or application instructions.

Verification: independent expected segment combinations for all ten digits; invalid input; decimal point; both polarities and complementary code; recognition/custom patterns. In a real browser exercise numeric entry, switches, circuit tab, playback, pause, step, seek, speed, reset and cycling. Inspect desktop/mobile screenshots and overflow, and check console errors. No Git repository exists, so no commit or branch operation is required.
