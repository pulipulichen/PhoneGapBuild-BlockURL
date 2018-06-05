intent_handler = function (intent) {
    alert("ok?");
    downloadFile();
    /*
    try {
        downloadFile();
    }
    catch (e) {
        alert(e);
    }
    */
    //window.open("http://pc.pulipuli.info/phonegap-build-projects/PhoneGapBuild-BlockURL/test/app-debug.apk", "_system");
    //navigator.app.exitApp();
    return;
    
    //alert("換了 可以嗎？");
    //alert(JSON.stringify(intent));
    if (typeof (intent.action) === "string"
            && intent.action === "android.intent.action.MAIN") {
        // 沒有要檢索的東西，回家吧。
        //alert("空空");
        navigator.app.exitApp();
    }

    var _search_items = [];

    var _has_string = function (_item) {
        return (typeof (_item) === "string"
                && _item.trim() !== "");
    };

    if (typeof (intent.extras) === "object") {
        var _extras = intent.extras;

        var _key_list = [
            "android.intent.extra.SUBJECT",
            "android.intent.extra.TEXT",
            "android.intent.extra.PROCESS_TEXT",
        ];

        for (var _i = 0; _i < _key_list.length; _i++) {
            if (_has_string(_extras[_key_list[_i]])) {
                _search_items.push(_extras[_key_list[_i]].trim());
            }
        }
        /*
         if (_has_string(_extras["android.intent.extra.SUBJECT"])) {
         _search_items.push(_extras["android.intent.extra.SUBJECT"].trim());
         }
         if (_has_string(_extras["android.intent.extra.TEXT"])) {
         _search_items.push(_extras["android.intent.extra.TEXT"].trim());
         }
         if (_has_string(_extras["android.intent.extra.PROCESS_TEXT"])) {
         _search_items.push(_extras["android.intent.extra.PROCESS_TEXT"].trim());
         }
         */
    }

    var _test_url = _search_items.join(" ");
    _test_url = _test_url.split("\n").join(" ");
    var _url_list = [];

    var _http_list = _test_url.split("http://");
    for (var _i = 1; _i < _http_list.length; _i++) {
        var item = _http_list[_i];
        var pos = item.indexOf(" ");
        if (pos === -1) {
            pos = item.indexOf("\n");
        }
        if (pos === -1) {
            pos = item.length;
        }
        _url_list.push("http://" + item.substring(0, pos));
    }

    var _https_list = _test_url.split("https://");
    for (var _i = 1; _i < _https_list.length; _i++) {
        var item = _https_list[_i];
        var pos = item.indexOf(" ");
        if (pos === -1) {
            pos = item.indexOf("\n");
        }
        if (pos === -1) {
            pos = item.length;
        }
        _url_list.push("https://" + item.substring(0, pos));
    }

    //alert(JSON.stringify(_url_list));
    if (_url_list.length > 0) {
        for (var i = 0; i < _url_list.length; i++) {
            //setTimeout(function () {
            window.open(_url_list[i], "_system");
            //}, 0);
        }
        navigator.app.exitApp();
        return;

    }

    if (_search_items.length > 0) {
        if (_search_items.length === 1
                && (_search_items[0].startsWith("http://") || _search_items[0].startsWith("https://"))) {
            //alert(encodeURIComponent(_search_items[0]));
            window.open(_search_items[0], "_system");
            navigator.app.exitApp();
        } else {
            //var _url = "https://www.google.com/search?q=" + encodeURIComponent(_search_items.join(" "));
            //var _url = "android-app://com.google.android.googlequicksearchbox/" + encodeURIComponent(_search_items.join(" "));

            //window.open(_url, "_system");

            var _search_text = _search_items.join(" ");

            var _config = {
                //action: "android.app.SearchManager.INTENT_ACTION_GLOBAL_SEARCH",
                action: "com.ngc.fora.action.LOOKUP",
                //data: _search_text,
                //uri: _search_text,
                //url: _search_text,
                //pacakge: "com.google.android.googlequicksearchbox",
                extras: {
                    //"android.intent.extra.SUBJECT": _search_text,
                    "android.intent.extra.TEXT": _search_text,
                    //"ACTION_MSG": 1,
                    //"ACTION_MSG": 1,
                    //"query": _search_text,
                    //"SearchManager": {
                    //    "QUERY": _search_text,
                    //}
                }
            };

            try {
                window.plugins.webintent.startActivity(_config,
                        function () {
                            navigator.app.exitApp();
                        },
                        function () {
                            alert('Failed:' + JSON.stringify(_search_items.join(" "), null, 2));
                            navigator.app.exitApp();
                        }
                );
            } catch (e) {
                alert(e);
            }
        }
    }
    //alert([JSON.stringify(_search_items)
    //    , _search_items.length === 1
    //    , _search_items[0].startsWith("http://") 
    //    , _search_items[0].startsWith("https://")]);

    //navigator.app.exitApp();
};

function downloadFile(){
    var _filename = "a.apk";
    var _content = "test";
    
    var fail = function (e) {
        alert(JSON.stringify(e));
    };
    //alert(111);
    
    window.requestFileSystem(window.TEMPORARY, 0, function (fs) {
            //alert('file system open: ' + fs.name);
            //alert('file system open: ' + cordova.file.cacheDirectory);
            //alert(333);
            fs.root.getFile(_filename, {create: true, exclusive: false}, function (fileEntry) {
                var sPath = fileEntry.fullPath.replace(_filename,"");
                //alert(sPath);
                
                try {
                    
                    /*
                    var fileTransfer = new FileTransfer();
                    fileEntry.remove();
                    fileTransfer.download(
                        "http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf",
                        sPath + "theFile.pdf",
                        function(theFile) {
                            alert("download complete: " + theFile.toURI());
                            showLink(theFile.toURI());
                        },
                        function(error) {
                            alert("download error source " + error.source);
                            alert("download error target " + error.target);
                            alert("upload error code: " + error.code);
                        }
                    );
            */
                    var oReq = new XMLHttpRequest();
        // Make sure you add the domain name to the Content-Security-Policy <meta> element.
        oReq.open("GET", "http://pc.pulipuli.info/phonegap-build-projects/PhoneGapBuild-BlockURL/test/app-debug.apk", true);
        // Define how you want the XHR data to come back
        oReq.responseType = "blob";
        oReq.onload = function (oEvent) {
            //alert(111);
            var blob = oReq.response; // Note: not oReq.responseText
            if (blob) {
                write_blob(blob, _filename, fileEntry);
            } else console.error('we didnt get an XHR response!');
        };
        oReq.send(null);
        //alert(222);
        
        
        
                }
                catch (e) {
                    //alert("ee");
                    fail(e);
                }
            }, fail);
        });
};

write_blob = function (blob, _filename, fileEntry) {
    //alert(blob);
    fileEntry.createWriter(function (fileWriter) {

                    fileWriter.onwriteend = function () {
                        //alert("Successful file read..." + "cdvfile://localhost/temporary/" + _filename);
                        resolveLocalFileSystemURL("cdvfile://localhost/temporary/" + _filename, function (entry) {
                            var nativePath = entry.toURL();
                            //alert('Native URI: ' + nativePath);
                            //document.getElementById('video').src = nativePath;
                            alert("OK: " + nativePath);
                            
                            //window.open(nativePath, "_system");
                            /*
                            window.cordova.plugins.FileOpener.openFile(nativePath, function () {
                                alert("ok");
                            }, function (e) {
                                alert("Fail: " + e)
                            })
                            */
                           /*
                           cordova.plugins.fileOpener2.open(
                                nativePath, 
                                'application/vnd.android.package-archive'
                            );
                    */
                            try {
                                //fileOpener.open(nativePath);
                                intent_install(nativePath);
                            } catch (e) {
                                alert(e);
                            }
                        });
                    };

                    fileWriter.onerror = function (e) {
                        alert("Failed file read: " + e.toString());
                    };
                    try {
                        fileWriter.write(blob);
                    } catch (e) {
                        alert(e);
                    }
                });
}

intent_install = function (path) {
    //alert(path);
    //path = "file:///storage/emulated/0/Download/a.apk"
    var _config = {
        action: "android.intent.action.VIEW",
        handler: { packageName: 'com.google.android.packageinstaller'
            , className: 'com.android.packageinstaller.PackageInstallerActivity' },
        data: path,
        //url: path,
        //
        //type: 'application/vnd.android.package-archive',
        extras: {
            url: path,
            data: path,
            uri: path,
        type: 'application/vnd.android.package-archive'
        }
    };

    try {
        window.plugins.webintent.startActivity(_config,
                function () {
                    //alert("OK");
                    navigator.app.exitApp();
                },
                function () {
                    alert('Failed:' + JSON.stringify(_search_items.join(" "), null, 2));
                    navigator.app.exitApp();
                }
        );
    } catch (e) {
        alert(e);
    }
}