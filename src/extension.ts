import * as vscode from 'vscode';
import { alert } from '@mdit/plugin-alert'

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('markdown-alert');
    const isEnabled = config.get<boolean>('markdown-alert.enabled', true);
    const isDeepEnabled = config.get<boolean>('markdown-alert.deep-enabled', true);

    let disposable = vscode.commands.registerCommand('markdownAlert.insertNote', function () {
        insertAlertBlock("> [!NOTE]\n> ");
      });
      context.subscriptions.push(disposable);

    let insertTipDisposable = vscode.commands.registerCommand('markdownAlert.insertTip', function () {
        insertAlertBlock("> [!TIP]\n> ");
    });
    context.subscriptions.push(insertTipDisposable);

    let insertImportantDisposable = vscode.commands.registerCommand('markdownAlert.insertImportant', function () {
        insertAlertBlock("> [!IMPORTANT]\n> ");
    });
    context.subscriptions.push(insertImportantDisposable);

    let insertWarningDisposable = vscode.commands.registerCommand('markdownAlert.insertWarning', function () {
        insertAlertBlock("> [!WARNING]\n> ");
    });
    context.subscriptions.push(insertWarningDisposable);

    let insertCautionDisposable = vscode.commands.registerCommand('markdownAlert.insertCaution', function () {
        insertAlertBlock("> [!CAUTION]\n> ");
    });
    context.subscriptions.push(insertCautionDisposable);

    return {
        extendMarkdownIt(md: any) {
            if (!isEnabled) {
                return md
            }
            return md.use(alert, { deep: isDeepEnabled });
        }
    }
}

function insertAlertBlock(text: string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active editor found");
      return;
    }
  
    const selection = editor.selection;
    const range = new vscode.Range(selection.start, selection.end);
    editor.edit((editBuilder) => {
      editBuilder.replace(range, text);
    });
  }