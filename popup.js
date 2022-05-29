function action() {
  var config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: "http",
        host: "127.0.0.1",
        port: "8080",
      },
      bypassList: ["foobar.com"],
    },
  };
  chrome.proxy.settings.set({ value: config, scope: "regular" }, function () {});
}
