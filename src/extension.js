const vscode = require("vscode");
const DiscordRPC = require("discord-rpc");

// Create a new DiscordRPC client
const client = new DiscordRPC.Client({ transport: "ipc" });

// Connect to Discord
client.login({ clientId: "1073913649380462642" }).catch(console.error);

// Function to set the presence
function setPresence() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return client.clearActivity();
  }

  // Get the file name and language
  const fileName = editor.document.fileName;
  const language = editor.document.languageId;

  // Set the presence
  client.setActivity({
    state: fileName,
    details: `Editing ${language} file`,
    startTimestamp: new Date(),
    largeImageKey: language,
    largeImageText: language,
    instance: true,
  });
}

// Update the presence when the active editor changes
vscode.window.onDidChangeActiveTextEditor(setPresence);

// Set the initial presence
client.on("ready", setPresence);
