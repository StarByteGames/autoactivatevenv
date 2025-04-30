# Changelog

## [1.6.0] - 2025-04-30
### Changed
- Updated Change Log
- More info about Venv creation

## [1.5.1] - 2025-04-22
### Changed
- Updated General info.

## [1.5.0] - 2025-02-24
### Changed
- Updated activation events to trigger when the terminal is opened.
- Enhanced virtual environment setup on terminal open.

## [1.4.2] - 2025-02-24
### No changes documented.

## [1.4.1] - 2025-02-24
### Changed
- added Changelog

## [1.4.0] - 2025-02-24
### Changed
- Activation events were updated to trigger when the terminal is opened.

## [1.3.2] - 2025-02-23
### No changes documented.

## [1.3.1] - 2025-02-20
### Changed
- `venvPath` is now directly retrieved from the configuration in the `activateVenvInTerminal` function.

## [1.3.0] - 2025-02-19
### Changed
- Refactored the `activateVenvInTerminal` function to directly check for the virtual environment's existence and dynamically retrieve the `clearScreen` option.
- Passed the `clearScreen` option to the `activateVenvInTerminal` function.

## [1.2.0] - 2025-02-18
### Added
- Added the `clearScreen` option to the `autoactivatevenv` configuration.

## [1.1.0] - 2025-02-17
### Changed
- Checked if the virtual environment exists before activation in the terminal.

## [1.0.1] - 2025-02-15
### Added
- Added `icon` property to `package.json`.
- Added MIT license and updated `README` and `package.json`.

## [1.0.0] - 2025-02-14
### Added
- Initial commit.
