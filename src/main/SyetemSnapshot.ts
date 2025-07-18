import si from 'systeminformation';


export async function getSystemInformation(): Promise<SystemSnapshot> {
  const [os, cpu, mem, fs, net, gpu, battery] = await Promise.all([
    si.osInfo(),
    si.cpu(),
    si.mem(),
    si.fsSize(),
    si.networkStats(),
    si.graphics(),
    si.battery(),
  ]);
  return { os, cpu, mem, fs, net, gpu, battery };
}