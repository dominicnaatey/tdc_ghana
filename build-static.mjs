import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const filesToToggle = [
    'app/news/[slug]/page.tsx',
    'app/land/[slug]/page.tsx',
    'app/serviced-plots/[slug]/page.tsx'
];
const apiRoute = 'app/api/contact/route.ts';
const apiRouteDisabled = 'app/api/contact/route.ts.disabled';

console.log('🔄 Preparing for static export...');

// 1. Disable API route
if (fs.existsSync(apiRoute)) {
    fs.renameSync(apiRoute, apiRouteDisabled);
    console.log('✅ Disabled Contact API route (API routes not supported in static export)');
}

// 2. Disable dynamicParams and force-dynamic
filesToToggle.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Toggle dynamicParams
        if (content.includes('export const dynamicParams = true')) {
            content = content.replace('export const dynamicParams = true', 'export const dynamicParams = false');
            modified = true;
        }

        // Comment out force-dynamic (double quotes)
        if (content.includes('export const dynamic = "force-dynamic"')) {
            content = content.replace('export const dynamic = "force-dynamic"', '// export const dynamic = "force-dynamic"');
            modified = true;
        }
        
        // Comment out force-dynamic (single quotes)
        if (content.includes("export const dynamic = 'force-dynamic'")) {
            content = content.replace("export const dynamic = 'force-dynamic'", "// export const dynamic = 'force-dynamic'");
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(file, content);
            console.log(`✅ Updated ${file} for static export`);
        }
    }
});

try {
    // 3. Run Build
    console.log('🚀 Running build with OUTPUT_EXPORT=true...');
    execSync('npm run build', { 
        stdio: 'inherit', 
        env: { ...process.env, OUTPUT_EXPORT: 'true' } 
    });
    console.log('🎉 Static export completed successfully! Check the "out" folder.');
} catch (error) {
    console.error('❌ Build failed!');
    process.exitCode = 1;
} finally {
    // 4. Revert changes
    console.log('🔄 Reverting code changes to restore Dev/Node.js functionality...');
    
    if (fs.existsSync(apiRouteDisabled)) {
        fs.renameSync(apiRouteDisabled, apiRoute);
        console.log('✅ Restored Contact API route');
    }

    filesToToggle.forEach(file => {
        if (fs.existsSync(file)) {
            let content = fs.readFileSync(file, 'utf8');
            let modified = false;

            // Restore dynamicParams
            if (content.includes('export const dynamicParams = false')) {
                content = content.replace('export const dynamicParams = false', 'export const dynamicParams = true');
                modified = true;
            }

            // Uncomment force-dynamic (double quotes)
            if (content.includes('// export const dynamic = "force-dynamic"')) {
                content = content.replace('// export const dynamic = "force-dynamic"', 'export const dynamic = "force-dynamic"');
                modified = true;
            }

            // Uncomment force-dynamic (single quotes)
            if (content.includes("// export const dynamic = 'force-dynamic'")) {
                content = content.replace("// export const dynamic = 'force-dynamic'", "export const dynamic = 'force-dynamic'");
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(file, content);
                console.log(`✅ Restored ${file}`);
            }
        }
    });
}
