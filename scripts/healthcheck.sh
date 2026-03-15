#!/bin/bash

# Health check script for the application
# This can be used by load balancers or monitoring systems

HEALTH_URL="${HEALTH_URL:-http://localhost:3000/api/health}"
TIMEOUT="${TIMEOUT:-10}"

# Perform health check
if curl -f -s -m "$TIMEOUT" -o /dev/null "$HEALTH_URL"; then
  echo "OK: Application is healthy"
  exit 0
else
  echo "FAIL: Application health check failed"
  exit 1
fi
