#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outDir = path.join(projectRoot, 'out');

/**
 * Deployment Validation Script
 * 
 * This script validates the static export before deployment to ensure:
 * - All critical HTML files are present
 * - .htaccess files have valid syntax
 * - Asset paths are correctly resolved
 * - Deployment instructions are generated
 * 
 * Requirements: 4.2, 4.3, 4.5
 */

class DeploymentValidator {
    constructor() {
        this.results = {
            success: true,
            errors: [],
            warnings: [],
            criticalFiles: [],
            missingFiles: [],
            htaccessFiles: [],
            assetPaths: [],
            deploymentReady: false
        };
    }

    /**
     * Main validation entry point
     */
    async validate() {
        console.log('🔍 Starting deployment validation...\n');

        try {
            this.checkOutputDirectory();
            this.validateCriticalHtmlFiles();
            this.validateHtaccessFiles();
            this.validateAssetPaths();
            this.checkDeploymentReadiness();
            this.generateDeploymentInstructions();
            
            this.printResults();
            return this.results.success && this.results.deploymentReady;
        } catch (error) {
            this.results.errors.push(`Validation failed: ${error.message}`);
            this.results.success = false;
            this.printResults();
            return false;
        }
    }

    /**
     * Check if output directory exists
     * Requirement: 4.2
     */
    checkOutputDirectory() {
        if (!fs.existsSync(outDir)) {
            this.results.errors.push('Output directory "out" does not exist. Run "npm run build:static" first.');
            this.results.success = false;
            throw new Error('Output directory missing');
        }
        console.log('✅ Output directory exists');
    }

    /**
     * Validate all critical HTML files are present
     * Requirement: 4.2
     */
    validateCriticalHtmlFiles() {
        console.log('🔍 Validating critical HTML files...');

        const criticalFiles = [
            // Core pages
            'index.html',
            '404.html',
            
            // Main sections
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
            'terms/index.html',
            
            // Auth pages
            'auth/login/index.html',
            
            // Serviced plots sub-pages
            'serviced-plots/plot-options-prices/index.html',
            'serviced-plots/residential-commercial/index.html',
            'serviced-plots/why-choose-tdc/index.html',
            
            // Careers pages
            'careers/job-openings/index.html',
            'careers/consultancy-service/index.html'
        ];

        criticalFiles.forEach(file => {
            const filePath = path.join(outDir, file);
            if (fs.existsSync(filePath)) {
                this.results.criticalFiles.push(file);
                console.log(`  ✅ ${file}`);
            } else {
                this.results.missingFiles.push(file);
                this.results.warnings.push(`Critical file missing: ${file}`);
                console.log(`  ❌ ${file}`);
            }
        });

        // Check for news article HTML files
        this.validateNewsArticles();

        console.log(`\n📊 Critical files: ${this.results.criticalFiles.length} found, ${this.results.missingFiles.length} missing\n`);
    }

    /**
     * Validate news article HTML files
     */
    validateNewsArticles() {
        const newsDir = path.join(outDir, 'news');
        if (!fs.existsSync(newsDir)) {
            this.results.errors.push('News directory missing from output');
            this.results.success = false;
            return;
        }

        const newsArticles = fs.readdirSync(newsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory() && dirent.name !== 'view')
            .map(dirent => dirent.name);

        if (newsArticles.length === 0) {
            this.results.warnings.push('No news article directories found');
            return;
        }

        console.log(`🔍 Validating ${newsArticles.length} news articles...`);
        
        newsArticles.forEach(slug => {
            const articleIndexPath = path.join(newsDir, slug, 'index.html');
            if (fs.existsSync(articleIndexPath)) {
                this.results.criticalFiles.push(`news/${slug}/index.html`);
                console.log(`  ✅ news/${slug}/index.html`);
            } else {
                this.results.missingFiles.push(`news/${slug}/index.html`);
                this.results.warnings.push(`News article HTML missing: news/${slug}/index.html`);
                console.log(`  ❌ news/${slug}/index.html`);
            }
        });
    }

    /**
     * Validate .htaccess files and their syntax
     * Requirement: 4.3
     */
    validateHtaccessFiles() {
        console.log('🔍 Validating .htaccess files...');

        const htaccessFiles = [
            '.htaccess',
            'news/.htaccess'
        ];

        htaccessFiles.forEach(file => {
            const filePath = path.join(outDir, file);
            if (fs.existsSync(filePath)) {
                this.results.htaccessFiles.push(file);
                console.log(`  ✅ ${file} exists`);
                
                // Validate syntax
                this.validateHtaccessSyntax(filePath, file);
            } else {
                this.results.missingFiles.push(file);
                this.results.warnings.push(`Apache configuration missing: ${file}`);
                console.log(`  ❌ ${file} missing`);
            }
        });

        console.log(`\n📊 .htaccess files: ${this.results.htaccessFiles.length} found\n`);
    }

    /**
     * Validate .htaccess file syntax
     */
    validateHtaccessSyntax(filePath, fileName) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');
            let hasRewriteEngine = false;
            let hasDirectoryIndex = false;
            let rewriteRuleCount = 0;

            lines.forEach((line, index) => {
                const trimmedLine = line.trim();
                
                // Skip comments and empty lines
                if (trimmedLine.startsWith('#') || trimmedLine === '') return;

                // Check for essential directives
                if (trimmedLine.startsWith('RewriteEngine')) {
                    hasRewriteEngine = true;
                }
                if (trimmedLine.startsWith('DirectoryIndex')) {
                    hasDirectoryIndex = true;
                }
                if (trimmedLine.startsWith('RewriteRule')) {
                    rewriteRuleCount++;
                }

                // Basic syntax validation
                if (trimmedLine.includes('RewriteRule') && !this.isValidRewriteRule(trimmedLine)) {
                    this.results.warnings.push(`${fileName} line ${index + 1}: Potentially invalid RewriteRule syntax`);
                }
            });

            // Check for essential directives
            if (!hasRewriteEngine && fileName === '.htaccess') {
                this.results.warnings.push(`${fileName}: Missing RewriteEngine directive`);
            }
            if (!hasDirectoryIndex) {
                this.results.warnings.push(`${fileName}: Missing DirectoryIndex directive`);
            }

            console.log(`    📝 ${rewriteRuleCount} rewrite rules found`);
            
            if (hasRewriteEngine && hasDirectoryIndex) {
                console.log(`    ✅ ${fileName} syntax appears valid`);
            }

        } catch (error) {
            this.results.warnings.push(`${fileName}: Could not validate syntax - ${error.message}`);
        }
    }

    /**
     * Basic RewriteRule syntax validation
     */
    isValidRewriteRule(line) {
        // Very basic validation - check for minimum required parts
        const parts = line.split(/\s+/);
        return parts.length >= 3 && parts[0] === 'RewriteRule';
    }

    /**
     * Validate asset paths are correctly resolved
     * Requirement: 4.3
     */
    validateAssetPaths() {
        console.log('🔍 Validating asset paths...');

        // Check Next.js static assets
        const nextStaticDir = path.join(outDir, '_next', 'static');
        if (fs.existsSync(nextStaticDir)) {
            const staticFiles = this.getFilesRecursively(nextStaticDir);
            this.results.assetPaths.push(...staticFiles.map(f => path.relative(outDir, f)));
            console.log(`  ✅ Next.js static assets: ${staticFiles.length} files`);
        } else {
            this.results.warnings.push('Next.js static assets directory missing');
            console.log(`  ❌ Next.js static assets missing`);
        }

        // Check public assets
        const publicAssets = [
            'tdc_logo.png',
            'tdc_logo.ico',
            'placeholder.jpg',
            'bg-primary.jpg'
        ];

        publicAssets.forEach(asset => {
            const assetPath = path.join(outDir, asset);
            if (fs.existsSync(assetPath)) {
                this.results.assetPaths.push(asset);
                console.log(`  ✅ ${asset}`);
            } else {
                this.results.warnings.push(`Public asset missing: ${asset}`);
                console.log(`  ❌ ${asset}`);
            }
        });

        // Check for asset directories
        const assetDirs = ['carousel', 'gallery', 'news', 'projects', 'board', 'management'];
        assetDirs.forEach(dir => {
            const dirPath = path.join(outDir, dir);
            if (fs.existsSync(dirPath)) {
                const files = this.getFilesRecursively(dirPath);
                if (files.length > 0) {
                    console.log(`  ✅ ${dir}/: ${files.length} files`);
                }
            }
        });

        console.log(`\n📊 Asset validation completed\n`);
    }

    /**
     * Get all files recursively from a directory
     */
    getFilesRecursively(dir) {
        const files = [];
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                files.push(...this.getFilesRecursively(fullPath));
            } else {
                files.push(fullPath);
            }
        }
        
        return files;
    }

    /**
     * Check overall deployment readiness
     * Requirement: 4.2
     */
    checkDeploymentReadiness() {
        console.log('🚀 Checking deployment readiness...');

        const readinessChecks = {
            corePages: this.results.criticalFiles.includes('index.html'),
            newsSection: this.results.criticalFiles.includes('news/index.html'),
            errorPage: this.results.criticalFiles.includes('404.html'),
            apacheConfig: this.results.htaccessFiles.includes('.htaccess'),
            staticAssets: this.results.assetPaths.length > 0,
            noErrors: this.results.errors.length === 0,
            minimalWarnings: this.results.warnings.length < 5
        };

        Object.entries(readinessChecks).forEach(([check, passed]) => {
            const status = passed ? '✅' : '❌';
            const checkName = check.replace(/([A-Z])/g, ' $1').toLowerCase();
            console.log(`  ${status} ${checkName}`);
        });

        this.results.deploymentReady = Object.values(readinessChecks).every(check => check);

        if (this.results.deploymentReady) {
            console.log('\n🎉 Deployment Ready!\n');
        } else {
            console.log('\n⚠️  Deployment Not Ready - Please address the issues above\n');
        }
    }

    /**
     * Generate deployment instructions
     * Requirement: 4.5
     */
    generateDeploymentInstructions() {
        const instructions = this.createDeploymentInstructions();
        const instructionsPath = path.join(outDir, 'DEPLOYMENT_INSTRUCTIONS.md');
        
        try {
            fs.writeFileSync(instructionsPath, instructions);
            console.log('📋 Deployment instructions generated: out/DEPLOYMENT_INSTRUCTIONS.md\n');
        } catch (error) {
            this.results.warnings.push(`Could not write deployment instructions: ${error.message}`);
        }
    }

    /**
     * Create deployment instructions content
     */
    createDeploymentInstructions() {
        const timestamp = new Date().toISOString();
        
        return `# Deployment Instructions

Generated: ${timestamp}

## Pre-Deployment Checklist

${this.results.deploymentReady ? '✅' : '❌'} **Deployment Ready**: ${this.results.deploymentReady ? 'Yes' : 'No'}

### Critical Files Status
- Core pages: ${this.results.criticalFiles.includes('index.html') ? '✅' : '❌'}
- News section: ${this.results.criticalFiles.includes('news/index.html') ? '✅' : '❌'}
- Error page: ${this.results.criticalFiles.includes('404.html') ? '✅' : '❌'}
- Apache config: ${this.results.htaccessFiles.includes('.htaccess') ? '✅' : '❌'}
- Static assets: ${this.results.assetPaths.length > 0 ? '✅' : '❌'}

### Files Summary
- **Critical files found**: ${this.results.criticalFiles.length}
- **Missing files**: ${this.results.missingFiles.length}
- **Asset paths validated**: ${this.results.assetPaths.length}
- **Errors**: ${this.results.errors.length}
- **Warnings**: ${this.results.warnings.length}

## Deployment Steps

### 1. Upload Files
Upload all files from the \`out\` directory to your web server's public directory (usually \`public_html\` or \`www\`).

**Important files to verify:**
- \`.htaccess\` (root directory)
- \`news/.htaccess\` (if exists)
- All HTML files in the root and subdirectories
- \`_next/static/\` directory with all assets

### 2. Set File Permissions
Ensure proper file permissions on your server:
\`\`\`bash
# Set directory permissions
find . -type d -exec chmod 755 {} \\;

# Set file permissions
find . -type f -exec chmod 644 {} \\;

# Ensure .htaccess files are readable
chmod 644 .htaccess
chmod 644 news/.htaccess
\`\`\`

### 3. Verify Apache Configuration
- Ensure your hosting supports \`.htaccess\` files
- Verify mod_rewrite is enabled
- Check that URL rewriting is working

### 4. Test Deployment
After uploading, test these URLs:

**Core Pages:**
- \`/\` (homepage)
- \`/news/\` (news section)
- \`/about/\` (about page)
- \`/contact/\` (contact page)

**News Articles:**
${this.getNewsArticleUrls().map(url => `- \`${url}\``).join('\n')}

**Error Handling:**
- \`/non-existent-page\` (should show 404)
- \`/news/non-existent-article\` (should handle gracefully)

### 5. Performance Check
- Verify all images load correctly
- Check that CSS and JavaScript assets load
- Test page load speeds
- Ensure HTTPS redirects work (if configured)

## Troubleshooting

### Common Issues

**404 Errors on News Articles:**
- Verify \`.htaccess\` files are uploaded and readable
- Check that mod_rewrite is enabled on your server
- Ensure news article directories contain \`index.html\` files

**Missing Assets:**
- Verify \`_next/static/\` directory is uploaded completely
- Check file permissions on asset directories
- Ensure image directories (carousel, gallery, etc.) are uploaded

**HTTPS Issues:**
- Verify SSL certificate is properly configured
- Check HSTS headers are being sent
- Test HTTP to HTTPS redirects

### Support
If you encounter issues:
1. Check server error logs
2. Verify file permissions and ownership
3. Test .htaccess syntax with Apache configuration tester
4. Contact your hosting provider for mod_rewrite support

---

**Validation Summary:**
- Errors: ${this.results.errors.length}
- Warnings: ${this.results.warnings.length}
- Deployment Ready: ${this.results.deploymentReady ? 'Yes' : 'No'}

${this.results.errors.length > 0 ? `\n**Errors to Fix:**\n${this.results.errors.map(e => `- ${e}`).join('\n')}` : ''}

${this.results.warnings.length > 0 ? `\n**Warnings:**\n${this.results.warnings.map(w => `- ${w}`).join('\n')}` : ''}
`;
    }

    /**
     * Get list of news article URLs for testing
     */
    getNewsArticleUrls() {
        const newsDir = path.join(outDir, 'news');
        if (!fs.existsSync(newsDir)) return [];

        return fs.readdirSync(newsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory() && dirent.name !== 'view')
            .map(dirent => `/news/${dirent.name}/`)
            .slice(0, 5); // Limit to first 5 for brevity
    }

    /**
     * Print validation results
     */
    printResults() {
        console.log('=' .repeat(60));
        console.log('📊 DEPLOYMENT VALIDATION RESULTS');
        console.log('=' .repeat(60));

        if (this.results.success && this.results.deploymentReady) {
            console.log('🎉 SUCCESS: Static export is ready for deployment!');
        } else if (this.results.success && !this.results.deploymentReady) {
            console.log('⚠️  WARNING: Static export has issues but may still work');
        } else {
            console.log('❌ FAILURE: Static export has critical issues');
        }

        console.log(`\n📈 Summary:`);
        console.log(`   Critical files: ${this.results.criticalFiles.length} found`);
        console.log(`   Missing files: ${this.results.missingFiles.length}`);
        console.log(`   .htaccess files: ${this.results.htaccessFiles.length}`);
        console.log(`   Asset paths: ${this.results.assetPaths.length}`);
        console.log(`   Errors: ${this.results.errors.length}`);
        console.log(`   Warnings: ${this.results.warnings.length}`);

        if (this.results.errors.length > 0) {
            console.log(`\n🚨 Errors:`);
            this.results.errors.forEach(error => console.log(`   • ${error}`));
        }

        if (this.results.warnings.length > 0) {
            console.log(`\n⚠️  Warnings:`);
            this.results.warnings.forEach(warning => console.log(`   • ${warning}`));
        }

        console.log('\n' + '=' .repeat(60));
    }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
    const validator = new DeploymentValidator();
    const success = await validator.validate();
    process.exit(success ? 0 : 1);
}

export { DeploymentValidator };