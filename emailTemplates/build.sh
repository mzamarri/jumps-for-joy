#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. Check global install
if command -v juice &>/dev/null; then
  JUICE="juice"
# 2. Check local node_modules
elif [[ -x "$SCRIPT_DIR/../node_modules/.bin/juice" ]]; then
  JUICE="$SCRIPT_DIR/../node_modules/.bin/juice"
else
  echo "juice is not installed globally or in node_modules."
  read -r -p "Install juice locally (npm install --save-dev juice)? [y/N] " ANSWER
  if [[ "$ANSWER" =~ ^[Yy]$ ]]; then
    npm install --save-dev juice --prefix "$SCRIPT_DIR/.."
    JUICE="$SCRIPT_DIR/../node_modules/.bin/juice"
  else
    echo "Aborted. Install juice and try again."
    exit 1
  fi
fi

DIRS=(
  "$SCRIPT_DIR/contact-form"
  "$SCRIPT_DIR/cart-submission"
)

ASSETS_DIR="$SCRIPT_DIR/assets"
mkdir -p "$ASSETS_DIR"

for DIR in "${DIRS[@]}"; do
  DIRNAME="$(basename "$DIR")"
  for INPUT in "$DIR"/*.html; do
    # Skip already-generated output files in assets
    [[ "$INPUT" == *-"$DIRNAME".html ]] && continue

    BASENAME="$(basename "$INPUT" .html)"
    OUTPUT="$ASSETS_DIR/${BASENAME}-${DIRNAME}.html"

    "$JUICE" "$INPUT" "$OUTPUT"
    echo "Built: $OUTPUT"
  done
done

echo "Done."
