# Design Document

## Overview

This design provides a comprehensive solution for deploying Next.js static exports with dynamic routes to cPanel hosting. The solution combines Apache URL rewriting, enhanced static path generation, and robust fallback handling to ensure seamless routing for news articles and other dynamic content.

## Architecture

The solution operates at three levels:

1. **Build-time Static Generation**: Enhanced `generateStaticParams` to pre-build all possible routes
2. **Server-level URL Rewriting**: Apache .htaccess rules to map clean URLs to static HTML files
3. **Client-side Fallback Handling**: Graceful error handling and navigation for edge cases

```mermaid
graph TD
    A[User Request: /news/article-slug] --> B[Apache Server]
    B --> C{.htaccess Rules}
    C -->|Match| D[Serve /news/article-slug.html]
    C -->|No Match| E[Serve /news/[slug].html]
    E --> F[Next.js Client Router]
    F --> G{Article Exists?}
    G -->|Yes| H[Display Article]
    G -->|No| I[Show 404 Page]
    
    J[Build Process] --> K[generateStaticParams]
    K --> L[Fetch All News Articles]
    L --> M[Generate Static HTML Files]
    M --> N[Deploy to cPanel]
```

## Components and Interfaces

### 1. Apache Configuration Component

**File**: `.htaccess` (root and news directory)

**Purpose**: Handle URL rewriting for dynamic routes

**Key Rules**:
- Rewrite `/news/[slug]` to `/news/[slug].html`
- Preserve asset requests without rewriting
- Handle trailing slashes consistently
- Provide fallback to main dynamic route handler

### 2. Enhanced Static Path Generator

**File**: `app/news/[slug]/page.tsx` (enhanced `generateStaticParams`)

**Purpose**: Generate comprehensive list of all news article paths

**Data Sources**:
- Remote API news articles (with error handling)
- Local sample news data (fallback)
- Environment variable overrides
- Pagination handling for large datasets

### 3. Build Process Enhancement

**File**: `build-static.mjs` (enhanced)

**Purpose**: Orchestrate static export with validation

**Features**:
- Pre-build validation of news data sources
- Post-build verification of generated files
- Deployment readiness checks
- Diagnostic reporting

### 4. Fallback Route Handler

**File**: `app/news/[slug]/page.tsx` (enhanced error handling)

**Purpose**: Handle missing or invalid routes gracefully

**Capabilities**:
- API failure fallback to local data
- Malformed slug sanitization
- User-friendly error pages
- Debug information in development

## Data Models

### News Article Model
```typescript
interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string;
  featured_image?: string;
  featured_image_path?: string;
  author?: string;
  category?: string;
}
```

### Static Path Model
```typescript
interface StaticPath {
  slug: string;
  source: 'api' | 'local' | 'env';
  validated: boolean;
}
```

### Build Configuration Model
```typescript
interface BuildConfig {
  enableStaticExport: boolean;
  newsApiEndpoint: string;
  fallbackToLocal: boolean;
  debugMode: boolean;
  additionalSlugs: string[];
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Converting EARS to Properties

Based on the prework analysis, I'll consolidate related properties to avoid redundancy and focus on the most valuable correctness guarantees:

**Property 1: URL Rewriting Completeness**
*For any* valid news article slug that exists in the system, when accessed via `/news/[slug]`, the Apache server should serve the corresponding HTML file without returning a 404 error.
**Validates: Requirements 1.1, 1.2**

**Property 2: Clean URL Preservation**
*For any* news article request, the Apache server should serve content without exposing .html extensions in the URL while ensuring assets are served without rewriting interference.
**Validates: Requirements 1.4, 1.5**

**Property 3: Static Generation Completeness**
*For any* available news article from all data sources (API, local, environment variables), the static export should generate a corresponding HTML file.
**Validates: Requirements 2.1, 2.3, 2.5**

**Property 4: Build Resilience**
*For any* network failure during API data fetching, the static export should complete successfully using fallback data sources.
**Validates: Requirements 2.2**

**Property 5: Error Handling Consistency**
*For any* non-existent or malformed news article slug, the system should display appropriate error content with navigation back to the main news page.
**Validates: Requirements 3.1, 3.3, 3.4**

**Property 6: Fallback Data Reliability**
*For any* API unavailability scenario, the system should serve content using local sample data without user-visible errors.
**Validates: Requirements 3.2**

**Property 7: Build Validation Completeness**
*For any* static export completion, all expected HTML files should exist and asset paths should be correctly resolved.
**Validates: Requirements 4.1, 4.4**

**Property 8: Mode Consistency**
*For any* user interaction, the system should provide the same experience whether running in development or production mode.
**Validates: Requirements 5.1, 5.2, 5.4**

**Property 9: Configuration Responsiveness**
*For any* environment variable change, the system should adapt its routing strategy accordingly.
**Validates: Requirements 5.3**

## Error Handling

### Build-time Error Handling
- **API Failures**: Graceful degradation to local sample data
- **Network Timeouts**: Configurable timeout with fallback mechanisms
- **Invalid Data**: Data validation with error reporting
- **Missing Dependencies**: Clear error messages with resolution steps

### Runtime Error Handling
- **Missing Articles**: Custom 404 pages with navigation
- **Malformed URLs**: URL sanitization and redirection
- **Asset Loading Failures**: Fallback asset serving
- **JavaScript Errors**: Error boundaries with graceful degradation

### Server-level Error Handling
- **Apache Configuration Errors**: Validation and testing tools
- **File Permission Issues**: Deployment verification scripts
- **URL Rewriting Failures**: Fallback routing rules
- **Cache Issues**: Cache-busting strategies

## Testing Strategy

### Dual Testing Approach
The testing strategy combines unit tests for specific scenarios and property-based tests for comprehensive coverage:

**Unit Tests**:
- Specific .htaccess rule validation
- Individual news article rendering
- Error page display verification
- Asset path resolution checks
- Environment variable handling

**Property-Based Tests**:
- URL rewriting across all possible slugs (minimum 100 iterations)
- Static generation completeness verification
- Error handling consistency across malformed inputs
- Build process resilience under various failure conditions
- Cross-mode behavior consistency

**Property Test Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with: **Feature: static-deployment-fix, Property {number}: {property_text}**
- Use Jest with custom generators for news article data
- Apache server simulation for local testing
- File system validation for build outputs

**Integration Tests**:
- End-to-end deployment simulation
- Apache server behavior verification
- Cross-browser routing validation
- Performance impact assessment

### Testing Tools and Framework
- **Property Testing Library**: Jest with custom property generators
- **Apache Simulation**: Local Apache server for testing
- **File System Validation**: Custom scripts for build verification
- **URL Testing**: Automated link checking and validation
- **Performance Testing**: Lighthouse CI for static site performance