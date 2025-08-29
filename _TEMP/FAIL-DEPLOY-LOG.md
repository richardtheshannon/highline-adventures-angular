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
5b2886b
Aug 28, 2025, 6:50 PM
Failed

Get Help

Details
Build Logs
Deploy Logs
Search build logs

context: zwtr-AyeL
╔═════ Nixpacks v1.38.0 ═════╗
║ setup      │ nodejs_22     ║
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
127ms

internal
load .dockerignore
1ms

internal
load build context
0ms

stage-0
WORKDIR /app/ cached
0ms

stage-0
COPY .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix
25ms

stage-0
RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix && nix-collect-garbage -d
35s
29 store paths deleted, 247.82 MiB freed

stage-0
COPY . /app/.
69ms

stage-0
RUN npm ci
13s
Run `npm audit` for details.

stage-0
COPY . /app/.
246ms

stage-0
RUN npm run build
410ms
npm warn config production Use `--omit=dev` instead.
> highline-adventures-angular@0.0.0 build
> ng build
Node.js version v22.11.0 detected.
The Angular CLI requires a minimum Node.js version of v20.19 or v22.12.
Please update your Node.js version or visit https://nodejs.org/ for additional instructions.
Dockerfile:27
-------------------
25 |     # build phase
26 |     COPY . /app/.
27 | >>> RUN --mount=type=cache,id=s/d2a08cb5-77bd-428c-b37f-b878db849a54-node_modules/cache,target=/app/node_modules/.cache npm run build
28 |
29 |
-------------------
ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c npm run build" did not complete successfully: exit code: 3
Error: Docker build failed
You reached the end of the range
Aug 28, 2025, 6:51 PM


highline-adventures-angular | Railway