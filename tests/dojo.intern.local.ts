import intern from './dojo.intern';
intern.tunnel = 'NullTunnel';
intern.tunnelOptions = {
    hostname: 'localhost',
    port: 4444
};

intern.environments = [{
    browserName: 'firefox'
}, {
    browserName: 'chrome'
}];

export = intern;
