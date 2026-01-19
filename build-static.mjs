import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const filesToToggle = [
    'app/news/[slug]/page.tsx',
    'app/land/[slug]/page.tsx',
    'app/serviced-plots/[slug]/page.tsx'
];
const pinnedNewsSlugs = [
    'tdc-ghana-ltd-commences-2026-with-prayer-and-thanksgiving'
];
const apiRoute = 'app/api/contact/route.ts';
const apiRouteDisabled = 'app/api/contact/route.ts.disabled';
const outDir = path.join(process.cwd(), 'out');

// Enhanced validation and diagnostic functions
function validatePreBuild() {
    console.log('🔍 Running pre-build validation...');
    
    const validationResults = {
        success: true,
        warnings: [],
        errors: []
    };

    // Check if required source files exist
    const requiredFiles = [
        'app/page.tsx',
        'app/layout.tsx',
        'app/news/page.tsx',
        'app/news/[slug]/page.tsx',
        'next.config.mjs',
        'package.json'
    ];

    requiredFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            validationResults.errors.push(`Required file missing: ${file}`);
            validationResults.success = false;
        }
    });

    // Check news data sources
    try {
        const newsPagePath = 'app/news/[slug]/page.tsx';
        if (fs.existsSync(newsPagePath)) {
            const content = fs.readFileSync(newsPagePath, 'utf8');
            if (!content.includes('generateStaticParams')) {
                validationResults.warnings.push('generateStaticParams not found in news page - static generation may be incomplete');
            }
        }
    } catch (error) {
        validationResults.warnings.push(`Could not validate news page: ${error.message}`);
    }

    // Check sample news data
    const sampleNewsPath = 'lib/data/sample-news.ts';
    if (!fs.existsSync(sampleNewsPath)) {
        validationResults.warnings.push('Sample news data not found - fallback data may be unavailable');
    }

    // Report validation results
    if (validationResults.errors.length > 0) {
        console.log('❌ Pre-build validation failed:');
        validationResults.errors.forEach(error => console.log(`   • ${error}`));
        return false;
    }

    if (validationResults.warnings.length > 0) {
        console.log('⚠️  Pre-build validation warnings:');
        validationResults.warnings.forEach(warning => console.log(`   • ${warning}`));
    }

    console.log('✅ Pre-build validation completed');
    return true;
}

function validatePostBuild() {
    console.log('🔍 Running post-build verification...');
    
    const validationResults = {
        success: true,
        warnings: [],
        errors: [],
        missingFiles: [],
        foundFiles: []
    };

    if (!fs.existsSync(outDir)) {
        validationResults.errors.push('Output directory does not exist');
        validationResults.success = false;
        return validationResults;
    }

    // Check for critical HTML files
    const criticalFiles = [
        'index.html',
        'news/index.html',
        'about/index.html',
        'contact/index.html',
        'projects/index.html',
        'gallery/index.html',
        'housing/index.html',
        'land/index.html',
        'serviced-plots/index.html',
        'management/index.html',
        'board-of-directors/index.html',
        'downloads/index.html',
        'privacy/index.html',
        'terms/index.html'
    ];

    criticalFiles.forEach(file => {
        const filePath = path.join(outDir, file);
        if (fs.existsSync(filePath)) {
            validationResults.foundFiles.push(file);
        } else {
            validationResults.missingFiles.push(file);
            validationResults.warnings.push(`Critical file missing: ${file}`);
        }
    });

    // Check for .htaccess files
    const htaccessFiles = ['.htaccess', 'news/.htaccess'];
    htaccessFiles.forEach(file => {
        const filePath = path.join(outDir, file);
        if (fs.existsSync(filePath)) {
            validationResults.foundFiles.push(file);
            console.log(`✅ Found Apache configuration: ${file}`);
        } else {
            validationResults.missingFiles.push(file);
            validationResults.warnings.push(`Apache configuration missing: ${file}`);
        }
    });

    // Check for Next.js static assets
    const nextStaticDir = path.join(outDir, '_next', 'static');
    if (fs.existsSync(nextStaticDir)) {
        const staticFiles = fs.readdirSync(nextStaticDir, { recursive: true });
        if (staticFiles.length > 0) {
            console.log(`✅ Found ${staticFiles.length} Next.js static assets`);
        } else {
            validationResults.warnings.push('No Next.js static assets found');
        }
    } else {
        validationResults.warnings.push('Next.js static assets directory missing');
    }

    // Check for news article HTML files
    const newsDir = path.join(outDir, 'news');
    if (fs.existsSync(newsDir)) {
        const newsFiles = fs.readdirSync(newsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        if (newsFiles.length > 0) {
            console.log(`✅ Found ${newsFiles.length} news article directories`);
            
            // Validate that each news directory has an index.html
            newsFiles.forEach(newsSlug => {
                const indexPath = path.join(newsDir, newsSlug, 'index.html');
                if (fs.existsSync(indexPath)) {
                    validationResults.foundFiles.push(`news/${newsSlug}/index.html`);
                } else {
                    validationResults.missingFiles.push(`news/${newsSlug}/index.html`);
                    validationResults.warnings.push(`News article HTML missing: news/${newsSlug}/index.html`);
                }
            });
        } else {
            validationResults.warnings.push('No news article directories found');
        }
    } else {
        validationResults.errors.push('News directory missing from output');
        validationResults.success = false;
    }

    return validationResults;
}

function generateDiagnosticReport(validationResults) {
    console.log('\n📊 Build Diagnostic Report');
    console.log('=' .repeat(50));
    
    console.log(`\n✅ Files Found (${validationResults.foundFiles.length}):`);
    if (validationResults.foundFiles.length > 0) {
        validationResults.foundFiles.slice(0, 10).forEach(file => {
            console.log(`   • ${file}`);
        });
        if (validationResults.foundFiles.length > 10) {
            console.log(`   ... and ${validationResults.foundFiles.length - 10} more files`);
        }
    } else {
        console.log('   No files found');
    }

    if (validationResults.missingFiles.length > 0) {
        console.log(`\n❌ Missing Files (${validationResults.missingFiles.length}):`);
        validationResults.missingFiles.forEach(file => {
            console.log(`   • ${file}`);
        });
    }

    if (validationResults.warnings.length > 0) {
        console.log(`\n⚠️  Warnings (${validationResults.warnings.length}):`);
        validationResults.warnings.forEach(warning => {
            console.log(`   • ${warning}`);
        });
    }

    if (validationResults.errors.length > 0) {
        console.log(`\n🚨 Errors (${validationResults.errors.length}):`);
        validationResults.errors.forEach(error => {
            console.log(`   • ${error}`);
        });
    }

    console.log('\n' + '=' .repeat(50));
}

function checkDeploymentReadiness(validationResults) {
    console.log('\n🚀 Deployment Readiness Check');
    console.log('=' .repeat(50));

    const readinessChecks = {
        corePages: validationResults.foundFiles.includes('index.html'),
        newsSection: validationResults.foundFiles.includes('news/index.html'),
        apacheConfig: validationResults.foundFiles.includes('.htaccess'),
        staticAssets: fs.existsSync(path.join(outDir, '_next', 'static')),
        noErrors: validationResults.errors.length === 0
    };

    Object.entries(readinessChecks).forEach(([check, passed]) => {
        const status = passed ? '✅' : '❌';
        const checkName = check.replace(/([A-Z])/g, ' $1').toLowerCase();
        console.log(`${status} ${checkName}`);
    });

    const isReady = Object.values(readinessChecks).every(check => check);
    
    if (isReady) {
        console.log('\n🎉 Deployment Ready!');
        console.log('\nDeployment Instructions:');
        console.log('1. Upload all files from the "out" directory to your web server');
        console.log('2. Ensure .htaccess files are uploaded and have proper permissions');
        console.log('3. Test news article URLs to verify routing works correctly');
        console.log('4. Check that assets load properly');
    } else {
        console.log('\n⚠️  Deployment Not Ready - Please address the issues above');
    }

    console.log('=' .repeat(50));
    return isReady;
}

console.log('🔄 Preparing for static export...');

// Run pre-build validation
if (!validatePreBuild()) {
    console.error('❌ Pre-build validation failed! Aborting build.');
    process.exit(1);
}

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

let buildSuccess = false;

try {
    // 3. Run Build
    console.log('🚀 Running build with OUTPUT_EXPORT=true...');
    const existingStaticSlugs = String(process.env.STATIC_NEWS_SLUGS || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    const mergedSlugs = Array.from(new Set([...existingStaticSlugs, ...pinnedNewsSlugs]));
    const staticSlugsEnv = mergedSlugs.join(',');
    execSync('npm run build', { 
        stdio: 'inherit', 
        env: { 
            ...process.env, 
            OUTPUT_EXPORT: 'true',
            STATIC_NEWS_SLUGS: staticSlugsEnv 
        } 
    });
    buildSuccess = true;
    console.log('🎉 Static export build completed successfully!');
} catch (error) {
    console.error('❌ Build failed!');
    console.error(error.message);
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

// 5. Run post-build validation if build was successful
if (buildSuccess) {
    const validationResults = validatePostBuild();
    generateDiagnosticReport(validationResults);
    const deploymentReady = checkDeploymentReadiness(validationResults);
    
    if (!deploymentReady) {
        console.log('\n⚠️  Build completed but deployment readiness checks failed.');
        console.log('Review the diagnostic report above and address any issues.');
        process.exitCode = 1;
    }
} else {
    console.log('\n❌ Skipping post-build validation due to build failure.');
}
