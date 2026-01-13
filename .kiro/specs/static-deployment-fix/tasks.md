# Implementation Plan: Static Deployment Fix

## Overview

This implementation plan addresses the 404 routing issues when deploying Next.js static exports with dynamic routes to cPanel hosting. The solution includes Apache URL rewriting, enhanced static path generation, and comprehensive testing to ensure reliable deployment.

## Tasks

- [x] 1. Create Apache URL rewriting configuration
  - Create .htaccess file in the root directory with URL rewriting rules
  - Create .htaccess file in the news directory for specific news routing
  - Add rules to handle dynamic routes without exposing .html extensions
  - Add rules to preserve asset serving without rewriting
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.1 Write property test for URL rewriting completeness
  - **Property 1: URL Rewriting Completeness**
  - **Validates: Requirements 1.1, 1.2**

- [x] 1.2 Write property test for clean URL preservation
  - **Property 2: Clean URL Preservation**
  - **Validates: Requirements 1.4, 1.5**

- [x] 2. Enhance static path generation in news pages
  - Modify `generateStaticParams` in `app/news/[slug]/page.tsx` to fetch all available articles
  - Add comprehensive error handling for API failures during build
  - Include pagination handling for large datasets
  - Add environment variable support for additional slugs
  - Ensure local sample data is always included
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2.1 Write property test for static generation completeness
  - **Property 3: Static Generation Completeness**
  - **Validates: Requirements 2.1, 2.3, 2.5**

- [x] 2.2 Write property test for build resilience
  - **Property 4: Build Resilience**
  - **Validates: Requirements 2.2**

- [ ] 3. Enhance build process with validation
  - Modify `build-static.mjs` to include pre-build validation
  - Add post-build verification of generated HTML files
  - Add deployment readiness checks
  - Add diagnostic reporting for missing or invalid files
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 3.1 Write property test for build validation completeness
  - **Property 7: Build Validation Completeness**
  - **Validates: Requirements 4.1, 4.4**

- [ ] 4. Improve error handling and fallback mechanisms
  - Enhance error handling in `app/news/[slug]/page.tsx` for missing articles
  - Add graceful handling for malformed slugs
  - Improve API fallback to local sample data
  - Add navigation links in error states
  - Enhance debug information display
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 4.1 Write property test for error handling consistency
  - **Property 5: Error Handling Consistency**
  - **Validates: Requirements 3.1, 3.3, 3.4**

- [ ] 4.2 Write property test for fallback data reliability
  - **Property 6: Fallback Data Reliability**
  - **Validates: Requirements 3.2**

- [ ] 5. Checkpoint - Test static export generation
  - Run `npm run build:static` and verify all expected files are generated
  - Check that .htaccess files are properly created
  - Verify news article HTML files exist for all expected slugs
  - Ensure all tests pass, ask the user if questions arise

- [ ] 6. Add development and production mode consistency
  - Ensure routing works consistently between `npm run dev` and static export
  - Add environment variable handling for different deployment modes
  - Verify debug information is appropriate for each mode
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 6.1 Write property test for mode consistency
  - **Property 8: Mode Consistency**
  - **Validates: Requirements 5.1, 5.2, 5.4**

- [ ] 6.2 Write property test for configuration responsiveness
  - **Property 9: Configuration Responsiveness**
  - **Validates: Requirements 5.3**

- [ ] 7. Create deployment validation script
  - Create a script to validate the static export before deployment
  - Add checks for all critical HTML files
  - Add validation for .htaccess file syntax
  - Add asset path verification
  - Generate deployment instructions
  - _Requirements: 4.2, 4.3, 4.5_

- [ ] 7.1 Write unit tests for deployment validation
  - Test validation script functionality
  - Test deployment instruction generation
  - _Requirements: 4.2, 4.5_

- [ ] 8. Final checkpoint - End-to-end testing
  - Test the complete static export locally with Apache simulation
  - Verify all news article routes work correctly
  - Test error handling for non-existent articles
  - Verify asset loading works properly
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The solution maintains compatibility with existing development workflow