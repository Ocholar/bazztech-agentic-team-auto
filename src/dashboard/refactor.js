const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('page.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace <Link href={AUDIT_URL} ...>...</Link> with <button ...>...</button>
            content = content.replace(/<Link\s+href=\{AUDIT_URL\}([^>]*)>([\s\S]*?)<\/Link>/g, (match, props, inner) => {
                modified = true;
                // Remove target and rel
                props = props.replace(/target="[^"]*"\s*/g, '');
                props = props.replace(/rel="[^"]*"\s*/g, '');

                // Merge onClick
                if (props.includes('onClick={')) {
                    props = props.replace(/onClick=\{([^}]+)\}/, 'onClick={(e) => { e.preventDefault(); $1; window.dispatchEvent(new Event("openBookingModal")); }}');
                } else {
                    props += ' onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openBookingModal")); }}';
                }
                return `<button${props}>${inner}</button>`;
            });

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

replaceInDir(path.join(__dirname, 'src', 'app'));
