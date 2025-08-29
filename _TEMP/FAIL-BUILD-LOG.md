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
7aea154
Aug 28, 2025, 7:36 PM
Active

highline-adventures-angular-production.up.railway.app

Details
Build Logs
Deploy Logs
HTTP Logs
Search build logs

You reached the start of the range
Aug 28, 2025, 7:36 PM
 
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
271ms

internal
load .dockerignore
0ms

[ 1/10] FROM docker.io/library/node:22.12.0-alpine@sha256:51eff88af6dff26f59316b6e356188ffa2c422bd3c3b76f2556a2e7e89d080bd
6ms

internal
load build context
0ms

[ 4/10] RUN npm ci cached
0ms

[ 3/10] COPY package*.json ./ cached
0ms

[ 2/10] WORKDIR /app cached
0ms

[ 5/10] COPY . .
150ms

[ 6/10] RUN sed -i "s/${FIREBASE_API_KEY}/98j34f9493uh4938h4/g" src/environments/environment.prod.ts
83ms

[ 7/10] RUN sed -i "s/${GOOGLE_CALENDAR_API_KEY}/AIzaSyD30vJavMZl5S6HJrs18-slnpiKsawz1gw/g" src/environments/environment.prod.ts
96ms

[ 8/10] RUN npm run build
6s
Output location: /app/dist/highline-adventures-angular

[ 9/10] RUN npm install -g http-server
1s
run `npm fund` for details

1
RUN npm prune --production
2s
npm warn config production Use `--omit=dev` instead.

up to date, audited 256 packages in 3s

48 packages are looking for funding
  run `npm fund` for details

3 low severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

auth
sharing credentials for production-us-west2.railway-registry.com
1ms
Build time: 30.95 seconds
You reached the end of the range
Aug 28, 2025, 7:37 PM


highline-adventures-angular | Railway