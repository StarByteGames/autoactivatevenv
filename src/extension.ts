import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export function activate() {
    const config = vscode.workspace.getConfiguration('autoactivatevenv');
    const venvPath = config.get<string>('venvPath', '.venv');
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath || '';
    const absoluteVenvPath = path.isAbsolute(venvPath) ? venvPath : path.join(workspaceFolder, venvPath);
    const isVenvExist = fs.existsSync(absoluteVenvPath);

    vscode.window.onDidOpenTerminal((terminal) => {
        const isWindows = os.platform() === 'win32';

        if (isVenvExist) {
            if (isWindows) {
                sendCommandToTerminal(terminal, `${venvPath}\\Scripts\\activate`);
                sendCommandToTerminal(terminal, 'cls');
            } else {
                sendCommandToTerminal(terminal, `source ${venvPath}/bin/activate`);
                sendCommandToTerminal(terminal, 'clear');
            }
        }
    });
}

function sendCommandToTerminal(terminal: vscode.Terminal, command: string) {
    console.log(`Sending command to terminal: ${command}`);
    terminal.sendText(command);
}
