import { cwd as nodePath } from "node:process";
import { sep } from "node:path";
let name;

async function sendLogin(req, res) {
  await res.sendFile(`${nodePath()}${sep}html${sep}login.html`);
}

async function initSession(req, res) {
  name = req.body?.name;
  if (name) {
    req.session.name = name;
    await res.sendFile(`${nodePath()}${sep}html${sep}index.html`);
  } else {
    req.redirect(301, "/");
  }
}

export { sendLogin, initSession, name };
