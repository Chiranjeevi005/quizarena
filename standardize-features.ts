import * as fs from 'fs';
import * as path from 'path';

const FEATURES_DIR = path.join(process.cwd(), 'src', 'features');
const STANDARD_DIRS = [
  'kernel', 'actions', 'controllers', 'repositories', 'services', 'stores',
  'validators', 'hooks', 'events', 'commands', 'types', 'components', 'shared'
];

function standardizeFeatures() {
  const features = fs.readdirSync(FEATURES_DIR).filter(f => 
    fs.statSync(path.join(FEATURES_DIR, f)).isDirectory()
  );

  for (const feature of features) {
    const featurePath = path.join(FEATURES_DIR, feature);
    
    // Create standard directories
    for (const dir of STANDARD_DIRS) {
      const dirPath = path.join(featurePath, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    }

    // Create index.ts if not exists
    const indexPath = path.join(featurePath, 'index.ts');
    if (!fs.existsSync(indexPath)) {
      fs.writeFileSync(indexPath, `// Export public API for ${feature} feature\n`);
    }

    // Create README.md if not exists
    const readmePath = path.join(featurePath, 'README.md');
    if (!fs.existsSync(readmePath)) {
      fs.writeFileSync(readmePath, `# ${feature.charAt(0).toUpperCase() + feature.slice(1)} Domain\n\nThis is the ${feature} domain module.\n`);
    }
    
    console.log(`Standardized feature: ${feature}`);
  }
}

standardizeFeatures();
