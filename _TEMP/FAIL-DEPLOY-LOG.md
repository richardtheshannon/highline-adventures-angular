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
highline-adventures-angular-production.up.railway.app
us-west2
1 Replica














History

highline-adventures-angular
/
27ba3ef
Aug 28, 2025, 6:56 PM
Failed

highline-adventures-angular-production.up.railway.app
Get Help

Details
Build Logs
Deploy Logs
HTTP Logs
Search build logs

You reached the start of the range
Aug 28, 2025, 6:56 PM
 
[Region: us-west1]
=========================
Using Detected Dockerfile
=========================

context: hvv4-FmM0

internal
load build definition from Dockerfile
0ms

internal
load metadata for docker.io/library/node:22.12.0-alpine
643ms

internal
load .dockerignore
0ms

1
FROM docker.io/library/node:22.12.0-alpine@sha256:51eff88af6dff26f59316b6e356188ffa2c422bd3c3b76f2556a2e7e89d080bd
5ms

internal
load build context
0ms

2
WORKDIR /app
67ms

3
COPY package*.json ./
13ms

4
RUN npm ci
10s
npm notice

5
COPY . .
242ms

6
RUN npm run build
5s
> highline-adventures-angular@0.0.0 build
> ng build
❯ Building...
✔ Building...
Application bundle generation failed. [4.753 seconds]
✘ [ERROR] TS2591: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. [plugin angular-compiler]
    src/environments/environment.prod.ts:4:12:
      4 │     apiKey: process.env['FIREBASE_API_KEY'] || '',
        ╵             ~~~~~~~
✘ [ERROR] TS2591: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig. [plugin angular-compiler]
    src/environments/environment.prod.ts:12:12:
      12 │     apiKey: process.env['GOOGLE_CALENDAR_API_KEY'] || '',
         ╵             ~~~~~~~
Dockerfile:15
-------------------
13 |
14 |     # Build the Angular app
15 | >>> RUN npm run build
16 |
17 |     # Install serve globally for production
-------------------
ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1
You reached the end of the range
Aug 28, 2025, 6:57 PM


highline-adventures-angular | Railway