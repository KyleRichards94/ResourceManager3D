import { exec } from "child_process";

export async function GetNvidiaGpuInfo(): Promise<Record<string, string>> {
    const queryFields = [
        'name',
        'index',
        'driver_version',
        'power.draw',
        'power.limit',
        'temperature.gpu',
        'utilization.gpu',
        'utilization.memory',
        'fan.speed',
        'memory.total',
        'memory.used',
        'memory.free',
        'clocks.gr',
        'clocks.mem',
        'clocks.sm',
        'clocks.video'
    ];

    const command = `nvidia-smi --query-gpu=${queryFields.join(',')} --format=csv,noheader,nounits`;

    return new Promise((resolve, reject) => {
        exec(command, (err, stdout) => {
            if (err) return reject(err);

            const values = stdout.trim().split(',').map(x => x.trim());

            const result: Record<string, string> = {};
            queryFields.forEach((field, i) => {
                result[field] = values[i] ?? 'N/A';
            });

            resolve(result);
        });
    });
}

export async function GetPowerDraw(): Promise<Record<string, string>> {
    const queryFields = [
        'power.draw',
        'power.limit',
    ];

    const command = `nvidia-smi --query-gpu=${queryFields.join(',')} --format=csv,noheader,nounits`;

    return new Promise((resolve, reject) => {
        exec(command, (err, stdout) => {
            if (err) return reject(err);

            const values = stdout.trim().split(',').map(x => x.trim());

            const result: Record<string, string> = {};
            queryFields.forEach((field, i) => {
                result[field] = values[i] ?? 'N/A';
            });

            resolve(result);
        });
    });
}