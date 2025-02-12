import * as vscode from 'vscode';
import * as os from 'os';

export function activate() {
    const config = vscode.workspace.getConfiguration('autoactivatevenv');
    const venvPath = config.get<string>('venvPath', '.venv');

    vscode.window.onDidOpenTerminal((terminal) => {
        console.log(`New Terminal: ${terminal.name}`);
        
        const isWindows = os.platform() === 'win32';
        
        if (isWindows) {
            sendCommandToTerminal(terminal, `${venvPath}\\Scripts\\activate`);
            sendCommandToTerminal(terminal, 'cls');
        } else {
            sendCommandToTerminal(terminal, `source ${venvPath}/bin/activate`);
            sendCommandToTerminal(terminal, 'clear');
        }
    });
}

function sendCommandToTerminal(terminal: vscode.Terminal, command: string) {
    console.log(`Sending command to terminal: ${command}`);
    terminal.sendText(command);
}
