import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export function activate() {
    const config = vscode.workspace.getConfiguration('autoactivatevenv');
    const venvPath = config.get<string>('venvPath', '.venv');
    const isWindows = os.platform() === 'win32';

    const activateVenvInTerminal = (terminal: vscode.Terminal, clearScreen: boolean) => {
        if (fs.existsSync(path.isAbsolute(venvPath) ? venvPath : path.join(vscode.workspace.workspaceFolders?.[0].uri.fsPath || '', venvPath))) {
            if (isWindows) {
                sendCommandToTerminal(terminal, `${venvPath}\\Scripts\\activate`);
                if (clearScreen) {sendCommandToTerminal(terminal, 'cls');}
            } else {
                sendCommandToTerminal(terminal, `source ${venvPath}/bin/activate`);
                if (clearScreen) {sendCommandToTerminal(terminal, 'clear');}
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
    const terminal = vscode.window.createTerminal('Requirements Installer');

    vscode.window.showInformationMessage('creating virtual environment and installing requirements...');
    sendCommandToTerminal(terminal, isWindows ? 'python -m venv .venv' : 'python3 -m venv .venv');
    sendCommandToTerminal(terminal, isWindows ? '.venv\\Scripts\\activate' : '.venv/bin/activate');
    sendCommandToTerminal(terminal, 'python -m pip install --upgrade pip');
    sendCommandToTerminal(terminal, 'pip install -r requirements.txt');

    sendCommandToTerminal(terminal, 'exit');
}

function sendCommandToTerminal(terminal: vscode.Terminal, command: string) {
        terminal.sendText(command);
}

// vsce package
// vsce publish patch
// vsce publish minor
// vsce publish major