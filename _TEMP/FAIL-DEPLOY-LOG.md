just-inspiration


production
Architecture
Observability
Logs
Settings

Share




Activity


highline-adventures-angular
Deployments
Variables
Metrics
Settings
Unexposed service
us-west2
1 Replica











highline-adventures-angular
/
411fc01
Aug 28, 2025, 6:40 PM
Failed

Get Help

Details
Build Logs
Deploy Logs
Search build logs

You reached the start of the range
Aug 28, 2025, 6:40 PM
 
[Region: us-west1]
==============
Using Nixpacks
==============

context: hvv4-FmM0
╔════════ Nixpacks v1.38.0 ═══════╗
║ setup      │ nodejs_18, npm-9_x ║
║─────────────────────────────────║
║ install    │ npm ci             ║
║─────────────────────────────────║
║ build      │ npm run build      ║
║─────────────────────────────────║
║ start      │ npm run start      ║
╚═════════════════════════════════╝

internal
load build definition from Dockerfile
0ms

internal
load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
276ms

internal
load .dockerignore
0ms

internal
load build context
0ms

stage-0
RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix && nix-collect-garbage -d cached
1ms

stage-0
COPY .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix cached
0ms

stage-0
WORKDIR /app/ cached
0ms

stage-0
COPY . /app/.
120ms

stage-0
RUN npm ci
886ms
npm warn config production Use `--omit=dev` instead.
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular-devkit/architect@0.2002.1',
npm warn EBADENGINE   required: {
npm warn EBADENGINE     node: '^20.19.0 || ^22.12.0 || >=24.0.0',
npm warn EBADENGINE     npm: '^6.11.0 || ^7.5.6 || >=8.0.0',
npm warn EBADENGINE     yarn: '>= 1.13.0'
npm warn EBADENGINE   },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular-devkit/core@20.2.1',
npm warn EBADENGINE   required: {
npm warn EBADENGINE     node: '^20.19.0 || ^22.12.0 || >=24.0.0',
npm warn EBADENGINE     npm: '^6.11.0 || ^7.5.6 || >=8.0.0',
npm warn EBADENGINE     yarn: '>= 1.13.0'
npm warn EBADENGINE   },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular-devkit/schematics@20.2.1',
npm warn EBADENGINE   required: {
npm warn EBADENGINE     node: '^20.19.0 || ^22.12.0 || >=24.0.0',
npm warn EBADENGINE     npm: '^6.11.0 || ^7.5.6 || >=8.0.0',
npm warn EBADENGINE     yarn: '>= 1.13.0'
npm warn EBADENGINE   },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/build@20.2.1',
npm warn EBADENGINE   required: {
npm warn EBADENGINE     node: '^20.19.0 || ^22.12.0 || >=24.0.0',
npm warn EBADENGINE     npm: '^6.11.0 || ^7.5.6 || >=8.0.0',
npm warn EBADENGINE     yarn: '>= 1.13.0'
npm warn EBADENGINE   },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/cli@20.2.1',
npm warn EBADENGINE   required: {
npm warn EBADENGINE     node: '^20.19.0 || ^22.12.0 || >=24.0.0',
npm warn EBADENGINE     npm: '^6.11.0 || ^7.5.6 || >=8.0.0',
npm warn EBADENGINE     yarn: '>= 1.13.0'
npm warn EBADENGINE   },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/common@20.2.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || ^22.12.0 || >=24.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/compiler@20.2.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || ^22.12.0 || >=24.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/compiler-cli@20.2.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || ^22.12.0 || >=24.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/core@20.2.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || ^22.12.0 || >=24.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/forms@20.2.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || ^22.12.0 || >=24.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/platform-browser@20.2.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || ^22.12.0 || >=24.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/platform-browser-dynamic@20.2.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || ^22.12.0 || >=24.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/router@20.2.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || ^22.12.0 || >=24.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@angular/service-worker@20.2.2',
npm warn EBADENGINE   required: { node: '^20.19.0 || ^22.12.0 || >=24.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@isaacs/balanced-match@4.0.1',
npm warn EBADENGINE   required: { node: '20 || >=22' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@isaacs/brace-expansion@5.0.0',
npm warn EBADENGINE   required: { node: '20 || >=22' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@listr2/prompt-adapter-inquirer@3.0.1',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.5', npm: '10.8.2' }
npm warn EBADENGINE }
npm error code EBADPLATFORM
npm error notsup Unsupported platform for @rollup/rollup-win32-x64-msvc@4.49.0: wanted {"os":"win32","cpu":"x64"} (current: {"os":"linux","cpu":"x64"})
npm error notsup Valid os:   win32
npm error notsup Actual os:  linux
npm error notsup Valid cpu:  x64
npm error notsup Actual cpu: x64
npm error A complete log of this run can be found in: /root/.npm/_logs/2025-08-29T01_40_12_248Z-debug-0.log
Dockerfile:20
-------------------
18 |     ENV NIXPACKS_PATH=/app/node_modules/.bin:$NIXPACKS_PATH
19 |     COPY . /app/.
20 | >>> RUN --mount=type=cache,id=s/d2a08cb5-77bd-428c-b37f-b878db849a54-/root/npm,target=/root/.npm npm ci
21 |
22 |     # build phase


highline-adventures-angular | Railway