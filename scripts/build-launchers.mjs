/**
 * Launcher and CLI generators for Master Agent.
 */

/**
 * Returns the Windows Batch launcher (master-agent.cmd) content.
 * @returns {string} Windows batch script content.
 */
export function getWindowsLauncherContent() {
  return `@echo off
setlocal
rem Master Agent launcher (Windows). Runs bin\\windows-<arch>\\master-agent.exe next
rem to this file, else a cached or freshly downloaded engine binary.

if not defined MASTER_AGENT_SKILL_DIR set "MASTER_AGENT_SKILL_DIR=%~dp0.."
if not defined MASTER_AGENT_SELF set "MASTER_AGENT_SELF=%~f0"
if not defined IMPECCABLE_SKILL_DIR set "IMPECCABLE_SKILL_DIR=%MASTER_AGENT_SKILL_DIR%"
if not defined IMPECCABLE_SELF set "IMPECCABLE_SELF=%MASTER_AGENT_SELF%"

set "arch=x64"
if /I "%PROCESSOR_ARCHITECTURE%"=="ARM64" set "arch=arm64"

if defined MASTER_AGENT_BIN if exist "%MASTER_AGENT_BIN%" (
  set "run=%MASTER_AGENT_BIN%"
  goto run
)
if defined IMPECCABLE_BIN if exist "%IMPECCABLE_BIN%" (
  set "run=%IMPECCABLE_BIN%"
  goto run
)

set "version="
if exist "%~dp0VERSION" set /p version=<"%~dp0VERSION"

rem Check sibling binary
set "bin=%~dp0bin\\windows-%arch%\\master-agent.exe"
if not exist "%bin%" set "bin=%~dp0bin\\windows-%arch%\\impeccable.exe"
if exist "%bin%" (
  set "run=%bin%"
  goto run
)

rem Check user home unversioned
set "home_bin=%USERPROFILE%\\.master-agent\\bin\\master-agent.exe"
if not exist "%home_bin%" set "home_bin=%USERPROFILE%\\.impeccable\\bin\\impeccable.exe"
if exist "%home_bin%" (
  call :probe "%home_bin%"
  if "%probe_ok%"=="1" (
    set "run=%home_bin%"
    goto run
  )
)

rem Check user home version-pinned
if not defined MASTER_AGENT_HOME set "MASTER_AGENT_HOME=%USERPROFILE%\\.master-agent"
if not defined IMPECCABLE_HOME set "IMPECCABLE_HOME=%USERPROFILE%\\.impeccable"

set "cached=%MASTER_AGENT_HOME%\\bin\\%version%\\master-agent.exe"
if not exist "%cached%" set "cached=%IMPECCABLE_HOME%\\bin\\%version%\\impeccable.exe"
set "asset=impeccable-windows-%arch%.exe"
set "manifest=%~dp0engine-checksums.txt"

if not defined version goto no_cache
if not exist "%cached%" goto no_cache
call :read_expected
for %%f in ("%cached%") do set "size=%%~zf"
set "stamp="
if exist "%cached%.verified" for /f "usebackq tokens=1,2" %%s in ("%cached%.verified") do set "stamp=%%s"& set "stamp_size=%%t"
if not defined stamp goto cache_hash
if not "%stamp_size%"=="%size%" goto cache_hash
if /I "%stamp%"=="%expected%" goto cache_stamp_matches
if /I "%stamp%"=="%expected_x64%" goto cache_stamp_matches
goto cache_hash

:cache_stamp_matches
set "run=%cached%"
goto run

:cache_hash
call :sha256 "%cached%" "%TEMP%\\master-agent-hash-%RANDOM%%RANDOM%.txt"
if not defined actual goto no_cache
if /I "%actual%"=="%expected%" goto cache_verified
if /I "%actual%"=="%expected_x64%" goto cache_verified
goto no_cache

:cache_verified
(>"%cached%.verified" echo %actual% %size%) 2>nul
set "run=%cached%"
goto run

:no_cache
where master-agent >nul 2>nul
if not errorlevel 1 (
  master-agent %*
  exit /b %errorlevel%
)
where impeccable >nul 2>nul
if not errorlevel 1 (
  impeccable %*
  exit /b %errorlevel%
)

:download
rem Fallback download
if defined MASTER_AGENT_LAUNCHER_PROBE exit /b 127
if not defined version goto fail
call :read_expected
if not defined expected if not defined expected_x64 goto no_checksum
where curl.exe >nul 2>nul
if errorlevel 1 goto curl_missing
if not defined MASTER_AGENT_DOWNLOAD_BASE set "MASTER_AGENT_DOWNLOAD_BASE=https://github.com/pbakaus/impeccable/releases/download"
if not exist "%MASTER_AGENT_HOME%\\bin\\%version%\\" mkdir "%MASTER_AGENT_HOME%\\bin\\%version%" >nul 2>nul
set "cached=%MASTER_AGENT_HOME%\\bin\\%version%\\master-agent.exe"
set "part=%cached%.part.%RANDOM%"
set "url=%MASTER_AGENT_DOWNLOAD_BASE%/engine-v%version%/%asset%"
curl.exe -fsSL -o "%part%" "%url%" >nul 2>nul
if errorlevel 1 goto download_failed
call :sha256 "%part%" "%TEMP%\\master-agent-dl-hash.txt"
if /I "%actual%"=="%expected%" goto place
del "%part%" >nul 2>nul
goto download_failed

:place
move /y "%part%" "%cached%" >nul 2>nul
for %%f in ("%cached%") do set "size=%%~zf"
(>"%cached%.verified" echo %actual% %size%) 2>nul
set "run=%cached%"
goto run

:run
"%run%" %*
exit /b %errorlevel%

:probe
set "probe_ok="
set "probe_version="
set "probe_tmp=%TEMP%\\master-agent-probe-%RANDOM%%RANDOM%.txt"
set "MASTER_AGENT_LAUNCHER_PROBE=1"
"%~1" engine-probe >"%probe_tmp%" 2>nul
set "probe_err=%ERRORLEVEL%"
set "MASTER_AGENT_LAUNCHER_PROBE="
if not "%probe_err%"=="0" goto probe_done
findstr /i /c:"engine" "%probe_tmp%" >nul 2>nul
if errorlevel 1 goto probe_done
set "probe_ok=1"
for /f "usebackq tokens=2" %%v in ("%probe_tmp%") do if not defined probe_version set "probe_version=%%v"
:probe_done
del "%probe_tmp%" >nul 2>nul
exit /b 0

:read_expected
call :manifest_digest "%asset%" expected
set "expected_x64="
if "%arch%"=="arm64" call :manifest_digest impeccable-windows-x64.exe expected_x64
exit /b 0

:manifest_digest
set "%~2="
if not exist "%manifest%" exit /b 0
for /f "usebackq tokens=1-3" %%a in ("%manifest%") do if "%%a"=="%version%" if /I "%%b"=="%~1" if not defined %~2 set "%~2=%%c"
exit /b 0

:sha256
set "actual="
certutil -hashfile "%~1" SHA256 >"%~2" 2>nul
if errorlevel 1 goto sha256_done
for /f "usebackq skip=1 delims=" %%h in ("%~2") do if not defined actual set "actual=%%h"
if not defined actual goto sha256_done
set "actual=%actual: =%"
:sha256_done
del "%~2" >nul 2>nul
exit /b 0

:no_checksum
echo master-agent: no checksum for engine %version% in "%manifest%" 1>&2
exit /b 127
:curl_missing
echo master-agent: curl.exe is unavailable 1>&2
exit /b 127
:download_failed
echo master-agent: could not download engine %version% 1>&2
exit /b 127
:fail
echo master-agent: no engine binary found 1>&2
exit /b 127
`;
}

/**
 * Returns the POSIX shell launcher (master-agent) content.
 * @returns {string} Bash script content.
 */
export function getPosixLauncherContent() {
  return `#!/bin/sh
# Master Agent launcher. Runs the platform binary shipped next to this script:
#   <this dir>/bin/<os>-<arch>/master-agent (or impeccable)
set -eu

probe_ok() {
  probe_out=$(MASTER_AGENT_LAUNCHER_PROBE=1 "$1" engine-probe 2>/dev/null) || return 1
  case "$probe_out" in
    *engine*) probe_version=\${probe_out#*engine }; return 0 ;;
  esac
  return 1
}

dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
[ -x "$0" ] || chmod +x "$0" 2>/dev/null || :
manifest="$dir/engine-checksums.txt"

: "\${MASTER_AGENT_SKILL_DIR:=\$(CDPATH= cd -- "\$dir/.." && pwd)}"
: "\${MASTER_AGENT_SELF:=\$0}"
: "\${IMPECCABLE_SKILL_DIR:=\$MASTER_AGENT_SKILL_DIR}"
: "\${IMPECCABLE_SELF:=\$MASTER_AGENT_SELF}"
export MASTER_AGENT_SKILL_DIR MASTER_AGENT_SELF IMPECCABLE_SKILL_DIR IMPECCABLE_SELF

if [ -n "\${MASTER_AGENT_BIN:-}" ] && [ -x "\${MASTER_AGENT_BIN}" ]; then
  exec "\${MASTER_AGENT_BIN}" "$@"
fi
if [ -n "\${IMPECCABLE_BIN:-}" ] && [ -x "\${IMPECCABLE_BIN}" ]; then
  exec "\${IMPECCABLE_BIN}" "$@"
fi

case "$(uname -s 2>/dev/null || echo unknown)" in
  Darwin) os=darwin ;;
  Linux) os=linux ;;
  MINGW*|MSYS*|CYGWIN*|Windows_NT) os=windows ;;
  *) os=unknown ;;
esac
case "$(uname -m 2>/dev/null || echo unknown)" in
  arm64|aarch64) arch=arm64 ;;
  x86_64|amd64) arch=x64 ;;
  *) arch=unknown ;;
esac

version=""
[ -f "$dir/VERSION" ] && version=$(tr -d '[:space:]' < "$dir/VERSION")
exe=""
[ "$os" = windows ] && exe=".exe"

bin="$dir/bin/$os-$arch/master-agent$exe"
[ -f "$bin" ] || bin="$dir/bin/$os-$arch/impeccable$exe"
if [ -f "$bin" ] && { [ -x "$bin" ] || chmod +x "$bin" 2>/dev/null; }; then
  exec "$bin" "$@"
fi

home_bin="\${HOME:-/nonexistent}/.master-agent/bin/master-agent$exe"
[ -f "$home_bin" ] || home_bin="\${HOME:-/nonexistent}/.impeccable/bin/impeccable$exe"
if [ -x "$home_bin" ] && probe_ok "$home_bin"; then
  exec "$home_bin" "$@"
fi

cache_root="\${MASTER_AGENT_HOME:-\${HOME:-/nonexistent}/.master-agent}"
cached="$cache_root/bin/$version/master-agent$exe"
if [ ! -f "$cached" ]; then
  cached="\${IMPECCABLE_HOME:-\${HOME:-/nonexistent}/.impeccable}/bin/$version/impeccable$exe"
fi
if [ -n "$version" ] && [ -x "$cached" ]; then
  exec "$cached" "$@"
fi

if command -v master-agent >/dev/null 2>&1 && probe_ok master-agent; then
  exec master-agent "$@"
fi
if command -v impeccable >/dev/null 2>&1 && probe_ok impeccable; then
  exec impeccable "$@"
fi

echo "master-agent: no engine binary found" >&2
exit 127
`;
}
