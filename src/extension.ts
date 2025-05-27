import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { log } from 'console';

export function activate() {
    const config = vscode.workspace.getConfiguration('autoactivatevenv');
    const venvPath = config.get<string>('venvPath', '.venv');
    const isWindows = os.platform() === 'win32';

    const activateVenvInTerminal = (terminal: vscode.Terminal, clearScreen: boolean) => {
        if (fs.existsSync(path.isAbsolute(venvPath) ? venvPath : path.join(vscode.workspace.workspaceFolders?.[0].uri.fsPath || '', venvPath))) {
            if (isWindows) {
                sendCommandToTerminal(terminal, `${venvPath}\\Scripts\\activate`);
                if (clearScreen) { sendCommandToTerminal(terminal, 'cls'); }
            } else {
                sendCommandToTerminal(terminal, `source ${venvPath}/bin/activate`);
                if (clearScreen) { sendCommandToTerminal(terminal, 'clear'); }
            }
        }
    };

    vscode.window.terminals.forEach(terminal => {
        activateVenvInTerminal(terminal, false);
    });

    if (fs.existsSync(path.join(vscode.workspace.workspaceFolders?.[0].uri.fsPath || '', 'requirements.txt')) &&
        !fs.existsSync(path.isAbsolute(venvPath) ? venvPath : path.join(vscode.workspace.workspaceFolders?.[0].uri.fsPath || '', venvPath))) {

        vscode.window.showInformationMessage('requirements.txt found! Would you like to install it?', 'Yes', 'No')
            .then(selection => {
                if (selection === 'Yes') {
                    installVenv(isWindows);
                }
            });
    }

    vscode.window.onDidOpenTerminal((terminal) => {
        const config = vscode.workspace.getConfiguration('autoactivatevenv');
        activateVenvInTerminal(terminal, config.get<boolean>('clearScreen', true));
    });
}

function installVenv(isWindows: boolean) {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: 'venv setup',
        cancellable: false
    }, async (progress) => {
        const steps = [
            { message: "Creating Terminal", command: null },
            { message: "Creating virtual environment", command: isWindows ? 'python -m venv .venv' : 'python3 -m venv .venv' },
            { message: "Activating virtual environment", command: isWindows ? '.venv\\Scripts\\activate' : '.venv/bin/activate' },
            { message: "Upgrading pip", command: 'python -m pip install --upgrade pip' },
            { message: "Installing requirements", command: 'pip install -r requirements.txt' },
            { message: "Done", command: null }
        ];

        const totalSteps = steps.length;
        const increment = 100 / totalSteps;

        const terminal = vscode.window.createTerminal('Requirements Installer');

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            progress.report({ message: step.message, increment });

            if (step.command) {
                await sendCommandToTerminal(terminal, step.command);
            }
        }
    });
}

async function sendCommandToTerminal(terminal: vscode.Terminal, command: string): Promise<void> {
    return new Promise((resolve, reject) => {
        terminal.sendText(command);

        const disposable = vscode.window.onDidEndTerminalShellExecution(
            (event) => {
                if (event.exitCode === 0) {
                    disposable.dispose();
                    resolve();
                }
            }
        );
    });
}

// vsce package
// vsce publish patch
// vsce publish minor
// vsce publish major
