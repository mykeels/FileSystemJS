var FileSystem = {
    $fs: null,
    grantedBytes: 5 * 1024 * 2014, //5MB
    errorHandler: function (e) {
        console.error(e);
    },
    request: function (fsSize) {
        var self = this;
        fsSize = fsSize || 5 * 1024 * 2014;
        return new Promise(function (resolve, reject) {
            navigator.webkitPersistentStorage.requestQuota(fsSize, function (grantedBytes) {
                console.log(grantedBytes, "bytes");
                self.grantedBytes = grantedBytes;
                window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function (fs) {
                    self.$fs = fs;
                    resolve(fs);
                }, reject);
            }, reject);
        })
    },
    createFile: function (filePath) {
        var self = this;
        if (self.$fs) {
            var fs = self.$fs;
            return new Promise(function (resolve, reject) {
                fs.root.getFile(filePath, { create: true, exclusize: true }, resolve, reject);
            })
        }
        else throw new Error("$fs should not be null");
    },
    readFile: function (filePath) {
        var self = this;
        if (self.$fs) {
            var fs = self.$fs;
            return new Promise(function (resolve, reject) {
                fs.root.getFile(filePath, {}, resolve, reject);
            })
        }
        else throw new Error("$fs should not be null");
    },
    readFileText: function (filePath) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return self.readFile(filePath).then(function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        resolve(this.result);
                    }
                    reader.onerror = function (e) {
                        reject(e);
                    }
                    reader.readAsText(file);
                });
            });
        });
    },
    writeFile: function (filePath, blob) {
        var self = this;
        if (self.$fs) {
            var fs = self.$fs;
            return new Promise(function (resolve, reject) {
                return self.createFile(filePath).then(function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        fileWriter.onwriteend = function (e) {
                            resolve(fileEntry);
                        }
                        fileWriter.onerror = function (e) {
                            reject(e)
                        }
                        fileWriter.write(blob);
                    }, self.errorHandler)
                });
            });
        }
        else throw new Error("$fs should not be null");
    }
}