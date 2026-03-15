#!/bin/bash

# Zero downtime deployment script
# This script performs blue-green deployment with health checks

set -e

# Configuration
IMAGE_NAME="${IMAGE_NAME:-optimark-landing}"
REGISTRY="${REGISTRY:-}"
COMPOSE_FILE="docker-compose.yml"
HEALTH_CHECK_URL="http://localhost:3000/api/health"
MAX_RETRIES=30
RETRY_INTERVAL=2

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Log functions
log_info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Health check function
health_check() {
  local url=$1
  local retries=$2
  local attempt=0

  log_info "Performing health check on $url"

  while [ $attempt -lt $retries ]; do
    if curl -f -s -o /dev/null "$url"; then
      log_info "Health check passed!"
      return 0
    fi

    attempt=$((attempt + 1))
    log_warn "Health check attempt $attempt/$retries failed. Retrying..."
    sleep $RETRY_INTERVAL
  done

  log_error "Health check failed after $retries attempts"
  return 1
}

# Build function
build_image() {
  log_info "Building Docker image..."

  if [ -n "$REGISTRY" ]; then
    docker build -t "$REGISTRY/$IMAGE_NAME:latest" .
    docker build -t "$REGISTRY/$IMAGE_NAME:$(date +%s)" .
  else
    docker build -t "$IMAGE_NAME:latest" .
    docker build -t "$IMAGE_NAME:$(date +%s)" .
  fi

  log_info "Build completed successfully"
}

# Zero downtime deploy function
deploy() {
  log_info "Starting zero downtime deployment..."

  # Check if services are running
  if docker compose ps | grep -q "Up"; then
    log_info "Services are currently running"

    # Pull latest image if registry is specified
    if [ -n "$REGISTRY" ]; then
      log_info "Pulling latest image from registry..."
      docker compose pull
    fi

    # Perform rolling update
    log_info "Performing rolling update..."
    docker compose up -d --no-deps --build app

    # Wait for new container to be healthy
    log_info "Waiting for new container to be ready..."
    health_check "$HEALTH_CHECK_URL" "$MAX_RETRIES"

    # Remove old containers
    log_info "Cleaning up old containers..."
    docker compose down --remove-orphans

    log_info "Deployment completed successfully!"
  else
    # First deployment
    log_info "No running services found. Performing initial deployment..."
    docker compose up -d --build

    # Wait for container to be ready
    log_info "Waiting for container to be ready..."
    health_check "$HEALTH_CHECK_URL" "$MAX_RETRIES"

    log_info "Initial deployment completed successfully!"
  fi
}

# Rollback function
rollback() {
  log_warn "Initiating rollback..."

  # Stop current containers
  docker compose down

  # Start previous version (you should have versioned images)
  log_warn "Please restore previous version manually:"
  log_warn "  docker run -d --name optimark-landing <previous-image>"
}

# Show usage
usage() {
  echo "Usage: $0 [command]"
  echo ""
  echo "Commands:"
  echo "  build    - Build the Docker image"
  echo "  deploy   - Deploy with zero downtime"
  echo "  rollback - Rollback to previous version"
  echo "  logs     - Show container logs"
  echo "  status   - Show container status"
  echo ""
  echo "Environment Variables:"
  echo "  IMAGE_NAME   - Docker image name (default: optimark-landing)"
  echo "  REGISTRY     - Docker registry URL"
}

# Main script logic
case "${1:-deploy}" in
  build)
    build_image
    ;;
  deploy)
    build_image
    deploy
    ;;
  rollback)
    rollback
    ;;
  logs)
    docker compose logs -f
    ;;
  status)
    docker compose ps
    ;;
  *)
    usage
    exit 1
    ;;
esac
