# AutoActivateVenv

AutoActivateVenv is a Visual Studio Code extension that automatically activates Python virtual environments (venv) when a workspace or folder is opened. It can save time by ensuring that your virtual environment is always activated in the terminal when you start working in a project.

## Features
- Automatically detects and activates virtual environments in the workspace.
- Supports both Windows and UNIX-based systems.
- Option to clear the terminal screen after activating the environment.
- Customizable virtual environment path for each project.

## Installation

1. Open Visual Studio Code.
2. Navigate to the Extensions view (Ctrl+Shift+X).
3. Search for `AutoActivateVenv`.
4. Click `Install`.

Alternatively, you can install it via the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=starcrusher2025.autoactivatevenv).

## Usage

Once installed, the extension will automatically activate any virtual environments found in your workspace when you open the workspace or folder in VS Code.

### Configuration

You can customize the behavior of the extension by adding the following settings in your workspace settings or `settings.json` file.

- **autoactivatevenv.venvPath**: Specify the path to your Python virtual environment folder. Default is `.venv`. For example, set this to `"env"` or any other path to match your setup.
  
  ```json
  "autoactivatevenv.venvPath": ".venv"
  ```

- **autoactivatevenv.clearScreen**: Determines whether the terminal screen should be cleared after activating the virtual environment. Default is `true`.

  ```json
  "autoactivatevenv.clearScreen": true
  ```

### Supported Platforms
- **Windows**: The extension supports activating virtual environments with `Scripts\\activate`.
- **UNIX-based systems (Linux/macOS)**: The extension supports activating virtual environments with `source <venvPath>/bin/activate`.

## Commands

No additional commands are required from the user. The extension activates the virtual environment automatically when a workspace or folder is opened that contains a virtual environment.

## License

This extension is licensed under the MIT License.
