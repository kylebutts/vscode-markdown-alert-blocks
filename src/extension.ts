import * as vscode from 'vscode';
const { alert } = require("@mdit/plugin-alert");

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('markdown-alert');
    const isEnabled = config.get<boolean>('markdown-alert.enabled', true);
    const isDeepEnabled = config.get<boolean>('markdown-alert.deep-enabled', true);


    return {
        extendMarkdownIt(md: any) {
            if (!isEnabled) {
                return md
            }
            return md.use(alert, { deep: isDeepEnabled });
        }
    }
}
