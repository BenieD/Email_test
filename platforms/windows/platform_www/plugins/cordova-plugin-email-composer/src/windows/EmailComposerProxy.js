cordova.define("cordova-plugin-email-composer.EmailComposerProxy", function(require, exports, module) {
/* globals Windows: true */

/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

var WinLauncher = Windows.System.Launcher,
    WinMail     = Windows.ApplicationModel.Email;

/**
 * Tries to find out if the device has an configured email account.
 *
 * @param [ Function ] success Success callback
 * @param [ Function ] error   Error callback
 * @param [ Array ]    args    Interface arguments
 *
 * @return [ Void ]
 */
exports.account = function (success, error, args) {
    success(null);
};

/**
 * Tries to find out if the device has an installed email client.
 *
 * @param [ Function ] success Success callback
 * @param [ Function ] error   Error callback
 * @param [ Array ]    args    Interface arguments
 *
 * @return [ Void ]
 */
exports.client = function (success, error, args) {
    success(args[0] === 'mailto:' ? true : null);
};

/**
 * Displays the email composer pre-filled with data.
 *
 * @param [ Function ] success Success callback
 * @param [ Function ] error   Error callback
 * @param [ Array ]    args    Interface arguments
 *
 * @return [ Void ]
 */
exports.open = function (success, error, args) {
    var props = args[0],
        impl  = exports.impl;

    if (WinMail) {
        impl.getDraftWithProperties(props)
            .then(WinMail.EmailManager.showComposeNewEmailAsync)
            .done(success, error);
    } else {
        var mailTo = impl.getMailTo(props);

        WinLauncher
            .launchUriAsync(mailTo)
            .done(success, error);
    }
};

require('cordova/exec/proxy').add('EmailComposer', exports);

});
