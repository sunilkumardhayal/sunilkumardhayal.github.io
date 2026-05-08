const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const outRoot = path.join(root, "assets", "optimized");

const images = [
  ["assets/chichlik/chichlik-project-collage.jpg", "chichlik-project-collage.webp", 760],
  ["assets/cnarmada/cnarmada-project-collage.jpg", "cnarmada-project-collage.webp", 760],
  ["assets/water4change/water4change-project-collage.jpg", "water4change-project-collage.webp", 760],
  ["assets/glof/glof-project-collage.png", "glof-project-collage.webp", 760],
  ["assets/glof/glof-hero-collage.jpg", "glof-hero-collage.webp", 1200],
  ["assets/glof/indus-basin-dem.png", "indus-basin-dem.webp", 900],
  ["assets/glof/ganga-basin-dem.png", "ganga-basin-dem.webp", 900],
  ["assets/glof/brahmaputra-basin-dem.png", "brahmaputra-basin-dem.webp", 900],
  ["assets/glof/indus-susceptibility-map.png", "indus-susceptibility-map.webp", 900],
  ["assets/glof/ganga-susceptibility-map.png", "ganga-susceptibility-map.webp", 900],
  ["assets/glof/brahmaputra-susceptibility-map.png", "brahmaputra-susceptibility-map.webp", 900],
  ["assets/glof/indus-validation-observed-predicted.png", "indus-validation-observed-predicted.webp", 900],
  ["assets/glof/indus-testing-observed-predicted.png", "indus-testing-observed-predicted.webp", 900],
  ["assets/glof/indus-feature-importance.png", "indus-feature-importance.webp", 900],
  ["assets/glof/ganga-feature-importance.png", "ganga-feature-importance.webp", 900],
  ["assets/glof/brahmaputra-feature-importance.png", "brahmaputra-feature-importance.webp", 900],
  ["assets/project-visuals/ground-response-analysis.jpg", "ground-response-analysis.webp", 760],
  ["assets/project-visuals/steel-rc-design.jpg", "steel-rc-design.webp", 760],
  ["assets/project-visuals/nwr-railway-internship.jpg", "nwr-railway-internship.webp", 760],
];

async function run() {
  fs.mkdirSync(outRoot, { recursive: true });

  for (const [input, output, width] of images) {
    const inputPath = path.join(root, input);
    const outputPath = path.join(outRoot, output);

    await sharp(inputPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(outputPath);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

