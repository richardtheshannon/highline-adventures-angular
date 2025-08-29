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
dc66897
Aug 28, 2025, 6:44 PM
Failed

Get Help

Details
Build Logs
Deploy Logs
Search build logs

You reached the start of the range
Aug 28, 2025, 6:44 PM
 
[Region: us-west1]
==============
Using Nixpacks
==============

context: 14jz-ezMa
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
434ms

internal
load .dockerignore
0ms

internal
load build context
0ms

stage-0
COPY .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix
682ms

stage-0
RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix && nix-collect-garbage -d
34s
29 store paths deleted, 247.82 MiB freed

stage-0
COPY . /app/.
301ms

stage-0
RUN npm ci
12s
Run `npm audit` for details.

stage-0
COPY . /app/.
247ms

stage-0
RUN npm run build
247ms
npm warn config production Use `--omit=dev` instead.
> highline-adventures-angular@0.0.0 build
> ng build
Node.js version v20.18.1 detected.
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


highline-adventures-angular | Railway