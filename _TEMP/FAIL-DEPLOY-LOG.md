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














History

highline-adventures-angular
/
f59e902
Aug 28, 2025, 6:42 PM
Failed

Get Help

Details
Build Logs
Deploy Logs
Search build logs

==============
Using Nixpacks
==============

context: zwtr-AyeL
╔═════ Nixpacks v1.38.0 ═════╗
║ setup      │ nodejs_20     ║
║────────────────────────────║
║ install    │ npm ci        ║
║────────────────────────────║
║ build      │ npm run build ║
║────────────────────────────║
║ start      │ npm run start ║
╚════════════════════════════╝

internal
load build definition from Dockerfile
0ms

internal
load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
121ms

internal
load .dockerignore
0ms

internal
load build context
0ms

stage-0
WORKDIR /app/ cached
0ms

stage-0
COPY .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix
12ms

stage-0
RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix && nix-collect-garbage -d
37s
29 store paths deleted, 247.82 MiB freed

stage-0
COPY . /app/.
79ms

stage-0
RUN npm ci
1s
npm error A complete log of this run can be found in: /root/.npm/_logs/2025-08-29T01_42_55_594Z-debug-0.log
Dockerfile:23
-------------------
21 |     ENV NIXPACKS_PATH=/app/node_modules/.bin:$NIXPACKS_PATH
22 |     COPY . /app/.
23 | >>> RUN --mount=type=cache,id=s/d2a08cb5-77bd-428c-b37f-b878db849a54-/root/npm,target=/root/.npm npm ci
24 |
25 |     # build phase
-------------------
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c npm ci" did not complete successfully: exit code: 1
Error: Docker build failed
You reached the end of the range
Aug 28, 2025, 6:42 PM


highline-adventures-angular | Railway