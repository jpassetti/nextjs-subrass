#!/usr/bin/env bash

set +e

status=0

check_dependency_updates() {
  echo "=== Dependency updates (npm outdated) ==="

  # Always show the full npm outdated table for visibility.
  npm outdated

  # Use JSON output to distinguish actionable in-range updates from major-only updates.
  local outdated_json
  outdated_json="$(npm outdated --json 2>/dev/null)"

  local analysis
  analysis="$(printf '%s' "${outdated_json}" | node -e '
let input = "";
process.stdin.on("data", (chunk) => {
  input += chunk;
});
process.stdin.on("end", () => {
  let parsed = {};
  if (input.trim()) {
    try {
      parsed = JSON.parse(input);
    } catch {
      parsed = {};
    }
  }

  const entries = Object.entries(parsed);
  const actionable = entries.filter(([, info]) => info.current !== info.wanted);
  const majorOnly = entries.filter(([, info]) => info.current === info.wanted && info.latest !== info.current);

  console.log(`ACTIONABLE=${actionable.length}`);
  console.log(`MAJOR_ONLY=${majorOnly.length}`);

  if (majorOnly.length > 0) {
    console.log("Major-only updates detected (reported but non-blocking):");
    for (const [name, info] of majorOnly) {
      console.log(` - ${name}: current ${info.current}, latest ${info.latest}`);
    }
  }

  if (actionable.length > 0) {
    console.log("Actionable in-range updates detected:");
    for (const [name, info] of actionable) {
      console.log(` - ${name}: current ${info.current}, wanted ${info.wanted}, latest ${info.latest}`);
    }
  }
});
')"

  printf '%s\n' "${analysis}"

  local actionable_count
  actionable_count="$(printf '%s\n' "${analysis}" | sed -n 's/^ACTIONABLE=\([0-9][0-9]*\)$/\1/p' | head -n 1)"

  if [ -z "${actionable_count}" ]; then
    status=1
    echo "Result: FAIL (could not analyze npm outdated output)"
  elif [ "${actionable_count}" -gt 0 ]; then
    status=1
    echo "Result: FAIL (${actionable_count} actionable dependency update(s))"
  else
    echo "Result: PASS"
  fi

  echo
}

run_check() {
  local name="$1"
  shift

  echo "=== ${name} ==="
  "$@"
  local code=$?

  if [ "$code" -ne 0 ]; then
    status=1
    echo "Result: FAIL (${code})"
  else
    echo "Result: PASS"
  fi

  echo
}

check_dependency_updates
run_check "Security audit (npm audit)" npm audit --audit-level=low
run_check "Lint" npm run lint
run_check "Type check" npm run typecheck

if [ "$status" -ne 0 ]; then
  echo "Health check completed with issues."
  exit 1
fi

echo "Health check passed."
exit 0
