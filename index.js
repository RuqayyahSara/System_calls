const { execFile } = require("child_process");
const { performance, PerformanceObserver } = require("perf_hooks")
const os = require("os")
const readlineSync = require("readline-sync")

let metrics = {}
const backup = async () => {
    try {
        console.clear()
        console.log("------------------------------------------------------------")
        console.log("\t CREATE BACKUPS")
        console.log("------------------------------------------------------------")


        let folderName = readlineSync.question("Enter Absolute Path of the Folder that you want to backup: ")
        let osType = os.type();
        osType = osType.toLowerCase();

        if (osType !== "linux") return

        let output = await bashCompiler(folderName)
        let msg;
        if (output.statuscode || output.statuscode == null) msg = "\nError. Enter Correct Path";
        else msg = "\nBackup Successfully created";
        output.msg = msg;
        console.log(output.msg);
    }
    catch (err) {
        console.log(err)
    }
}

// backup()

const wrapped = performance.timerify(backup);
const obs = new PerformanceObserver((list) => {
    metrics.time = (list.getEntries()[0].duration / 1000).toFixed(6);
    console.log(metrics)
    obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });
wrapped()
metrics.memory = `${Math.floor(process.memoryUsage().heapUsed / 1024)}`;

function bashCompiler(folder) {
    return new Promise((resolve, reject) => {
        let output = {};
        const child = execFile("zip", ['-r', '-q', 'backup', folder], { maxBuffer: 1024 * 90, timeout: 6000 }, (err, stdout, stderr) => {
            if (stdout) {
                output.stdout = stdout;
                // console.log(stdout);
            }
            if (err) {
                if (stderr) {
                    output.stderr = stderr;
                    return;
                }
                output.err = err;
            }
        });
        child.on("close", (statuscode) => {
            output.statuscode = statuscode
            resolve(output);
        });
    })
}
