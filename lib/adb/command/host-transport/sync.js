(function() {
  var Command, Protocol, Sync, SyncCommand,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Command = require('../../command');

  Protocol = require('../../protocol');

  Sync = require('../../sync');

  SyncCommand = (function(_super) {
    __extends(SyncCommand, _super);

    function SyncCommand() {
      return SyncCommand.__super__.constructor.apply(this, arguments);
    }

    SyncCommand.prototype.execute = function() {
      this._send('sync:');
      return this.parser.readAscii(4).then((function(_this) {
        return function(reply) {
          switch (reply) {
            case Protocol.OKAY:
              return new Sync(_this.connection);
            case Protocol.FAIL:
              return _this.parser.readError();
            default:
              return _this.parser.unexpected(reply, 'OKAY or FAIL');
          }
        };
      })(this));
    };

    return SyncCommand;

  })(Command);

  module.exports = SyncCommand;

}).call(this);