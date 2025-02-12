# AutoActivateVenv Extension for VSCode

The **AutoActivateVenv** extension for Visual Studio Code automatically activates a virtual environment whenever a new terminal is opened. This helps you avoid manually activating the environment every time, streamlining your development workflow.

## Features

- Automatically activates the virtual environment upon opening a new terminal.
- Supports both Windows and Unix-based systems (Linux, macOS).
- Configurable option to set the virtual environment path (default: `.venv`).

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions panel (on the left in the Activity Bar).
3. Search for `AutoActivateVenv` and install the extension.

## Configuration

The extension uses a configuration option to specify the virtual environment path. By default, it looks for a virtual environment in the `.venv` folder.

To change the path, go to your **User Settings** in Visual Studio Code and add the following:

```json
"autoactivatevenv.venvPath": "your/path/to/.venv"
```

## Usage

1. Ensure you have a virtual environment created in your desired directory.
2. Open a new terminal in VSCode.
3. The virtual environment will be automatically activated, and the terminal will be cleared based on the operating system (Windows: `cls`, Unix: `clear`).

### Support for Different Operating Systems

- **Windows**: The extension uses the command `Scripts\\activate` to activate the virtual environment.
- **Linux/macOS**: The extension uses the command `source bin/activate` to activate the virtual environment.

## Developer

This extension was developed by [Your Name]. If you have suggestions or bug reports, please open an issue or submit a pull request on the [GitHub Repository Link].