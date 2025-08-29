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
9f55f09
Aug 28, 2025, 6:53 PM
Failed

Get Help

Details
Build Logs
Deploy Logs
Search build logs

context: ghnh-b36O
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
698ms

internal
load .dockerignore
0ms

internal
load build context
0ms

stage-0
RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix && nix-collect-garbage -d cached
0ms

stage-0
COPY .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix cached
0ms

stage-0
WORKDIR /app/ cached
0ms

stage-0
COPY . /app/.
98ms

stage-0
RUN npm ci
10s
Run `npm audit` for details.

stage-0
COPY . /app/.
271ms

stage-0
RUN npm run build
333ms
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
Aug 28, 2025, 6:53 PM


highline-adventures-angular | Railway