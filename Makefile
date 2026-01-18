COMPOSE_DEV = docker compose -f docker-compose.dev.yml

.PHONY: dev stop down logs rebuild shell db-shell ps clean

## --- Start Dev Mode (Live Reload) ---
up:
	$(COMPOSE_DEV) up -d

setup:
	$(COMPOSE_DEV) build --no-cache
	$(COMPOSE_DEV) up -d

restart:
	$(COMPOSE_DEV) stop
	$(COMPOSE_DEV) up -d

## --- Stop running containers without removing ---
stop:
	$(COMPOSE_DEV) stop

## --- Stop & remove containers, but keep volumes ---
down:
	$(COMPOSE_DEV) down

## --- View logs (live) ---
logs:
	$(COMPOSE_DEV) logs -f $(word 2,$(MAKECMDGOALS))

## --- Rebuild container (no cache) + rerun ---
rebuild:
	$(COMPOSE_DEV) build --no-cache
	$(COMPOSE_DEV) up

## --- Enter app container shell ---
shell:
	$(COMPOSE_DEV) exec $(word 2,$(MAKECMDGOALS)) bash

%:
	@:

## --- Enter Postgres shell ---
db-shell:
	$(COMPOSE_DEV) exec postgres sh

## --- Show running containers ---
ps:
	$(COMPOSE_DEV) ps

## --- Completely reset environment including volumes (danger) ---
clean:
	$(COMPOSE_DEV) down --volumes --remove-orphans
