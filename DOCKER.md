# Docker Deployment Guide

Zero downtime deployment setup for Optimark Landing Page.

## Features

- **Multi-stage build** - Optimized for minimal image size (~50MB)
- **Zero downtime** - Rolling deployment with health checks
- **Layer caching** - Fast rebuilds using Docker cache
- **Health checks** - Automatic monitoring and recovery
- **Resource limits** - CPU and memory constraints
- **Non-root user** - Security best practices
- **Signal handling** - Proper shutdown with dumb-init

## Quick Start

```bash
# Build and deploy (zero downtime)
./scripts/deploy.sh deploy

# Or using Docker Compose directly
docker compose up -d --build

# View logs
docker compose logs -f

# Check status
docker compose ps
```

## Build Optimization Techniques Used

### 1. Multi-Stage Build
- **Stage 1 (deps)**: Install dependencies once, cached separately
- **Stage 2 (builder)**: Build application in isolated environment
- **Stage 3 (runner)**: Minimal runtime image with only necessary files

### 2. Dependency Caching
Docker layers are cached in this order (most to least frequent changes):
1. Package manager lock files (yarn.lock, package-lock.json)
2. Dependencies installation (cached if lock files unchanged)
3. Application source code
4. Build output

### 3. .dockerignore
Excludes unnecessary files from build context:
- `node_modules` - Dependencies installed in container
- `.next` - Build artifacts
- `.git` - Version control
- Dev tools and config files

This reduces build context size significantly.

### 4. Alpine Linux
Uses `node:20-alpine` base image (~120MB vs ~1GB for full Node.js image)

### 5. Standalone Output
Next.js standalone mode bundles everything needed, no runtime dependencies required.

### 6. Docker BuildKit (Recommended)
Enable BuildKit for faster builds:

```bash
export DOCKER_BUILDKIT=1
docker build -t optimark-landing .
```

## Deployment Commands

```bash
# Deploy with zero downtime
./scripts/deploy.sh deploy

# Build image only
./scripts/deploy.sh build

# Rollback to previous version
./scripts/deploy.sh rollback

# View logs
./scripts/deploy.sh logs

# Check status
./scripts/deploy.sh status
```

## Environment Variables

Create `.env.production`:

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.optimark.com
# Add your other environment variables
```

## Zero Downtime Deployment Strategy

The deployment uses rolling update:

1. **Build** - Create new image with latest code
2. **Pull** - Download new image (if using registry)
3. **Update** - Start new container alongside old one
4. **Health Check** - Wait for new container to be healthy
5. **Switchover** - Traffic automatically routes to new container
6. **Cleanup** - Remove old container

### Health Check

The health check endpoint is available at `/api/health` and returns:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "0.1.0"
}
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push
        run: |
          ./scripts/deploy.sh deploy
```

### GitLab CI Example

```yaml
deploy:
  stage: deploy
  script:
    - ./scripts/deploy.sh deploy
  only:
    - main
```

## Performance Tuning

### Docker Compose Resources

Adjust in `docker-compose.yml`:

```yaml
deploy:
  resources:
    limits:
      cpus: '2'        # Increase for better performance
      memory: 1G       # Increase for large traffic
    reservations:
      cpus: '0.5'
      memory: 256M
```

### Node.js Optimization

Already included in Dockerfile:
- `NODE_ENV=production` - Enables optimizations
- `NEXT_TELEMETRY_DISABLED=1` - Reduces overhead
- Standalone output - No runtime dependency resolution

### Build Speed

```bash
# Enable BuildKit for parallel builds
export DOCKER_BUILDKIT=1

# Use BuildKit cache mount for faster installs
docker build --build-arg BUILDKIT_INLINE_CACHE=1 -t optimark-landing .
```

## Monitoring

### View Container Metrics

```bash
# Container stats
docker stats optimark-landing

# Resource usage
docker inspect optimark-landing | grep -A 10 "NetworkSettings"

# Health status
docker inspect --format='{{json .State.Health}}' optimark-landing | jq
```

### Log Management

Logs are automatically rotated:
- Max file size: 10MB
- Max files: 3 (total 30MB)

View logs:
```bash
# Follow logs
docker compose logs -f app

# Last 100 lines
docker compose logs --tail=100 app

# Since specific time
docker compose logs --since 1h app
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker compose logs app

# Check health status
docker inspect --format='{{json .State.Health}}' optimark-landing | jq

# Restart container
docker compose restart app
```

### Health check failing

```bash
# Manual health check
curl http://localhost:3000/api/health

# Check if port is accessible
docker exec optimark-landing netstat -tlnp
```

### Build issues

```bash
# Clean build (no cache)
docker compose build --no-cache

# Force rebuild
docker compose up -d --build --force-recreate
```

## Registry Configuration

### Using Docker Hub

```bash
export REGISTRY=docker.io/yourusername
export IMAGE_NAME=optimark-landing

./scripts/deploy.sh deploy
```

### Using Private Registry

```bash
export REGISTRY=registry.yourdomain.com
export IMAGE_NAME=optimark-landing

# Login first
docker login registry.yourdomain.com

# Deploy
./scripts/deploy.sh deploy
```

## Security Best Practices

1. **Non-root user** - Container runs as `nextjs` user (uid 1001)
2. **Minimal base image** - Alpine Linux reduces attack surface
3. **Read-only filesystem** - Consider adding `read_only: true` in compose
4. **Secrets management** - Use Docker secrets or external secret managers
5. **Regular updates** - Keep base image updated

## Scaling

### Horizontal Scaling with Nginx

```nginx
upstream backend {
    least_conn;
    server app1:3000;
    server app2:3000;
    server app3:3000;
}

server {
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
    }
}
```

Then run multiple instances:

```bash
docker compose up -d --scale app=3
```

## Image Size Comparison

| Stage | Size |
|-------|------|
| Full Node.js | ~1GB |
| Alpine | ~120MB |
| Final Image | ~50MB |

## Next.js Config Update

Add to `next.config.js`:

```javascript
module.exports = {
  output: 'standalone', // Required for Docker deployment
  // ... other config
}
```

## Support

For issues or questions:
- Check logs: `docker compose logs -f`
- Check health: `curl http://localhost:3000/api/health`
- Review Docker documentation: https://docs.docker.com
