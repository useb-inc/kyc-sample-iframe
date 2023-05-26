import childProcess from "child_process";
import os from "os";

const spawn = childProcess.spawn;
const platform = os.platform();

const cmd = /^win/.test(platform)
  ? `${process.cwd()}\\setup.bat`
  : `${process.cwd()}/setup.sh`

spawn(cmd, [], { stdio: "inherit" }).on("exit", code => process.exit(code))
