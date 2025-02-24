import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export function activate() {
    const config = vscode.workspace.getConfiguration('autoactivatevenv');
    const venvPath = config.get<string>('venvPath', '.venv');
    const isWindows = os.platform() === 'win32';
    
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath || '';
    const absoluteVenvPath = path.isAbsolute(venvPath) ? venvPath : path.join(workspaceFolder, venvPath);
    const isVenvExist = fs.existsSync(absoluteVenvPath);
    
    const clearScreen = config.get<boolean>('clearScreen', true);

    const activateVenvInTerminal = (terminal: vscode.Terminal) => {
        if (isVenvExist) {
            if (isWindows) {
                sendCommandToTerminal(terminal, `${venvPath}\\Scripts\\activate`);

                if (clearScreen) {
                    sendCommandToTerminal(terminal, 'cls');
                }
            } else {
                sendCommandToTerminal(terminal, `source ${venvPath}/bin/activate`);

                if (clearScreen) {
                    sendCommandToTerminal(terminal, 'clear');
                }
            }
        }
    };

    vscode.window.terminals.forEach(terminal => {
        activateVenvInTerminal(terminal);
    });

    vscode.window.onDidOpenTerminal((terminal) => {
        activateVenvInTerminal(terminal);
    });
}

function sendCommandToTerminal(terminal: vscode.Terminal, command: string) {
    terminal.sendText(command);
}