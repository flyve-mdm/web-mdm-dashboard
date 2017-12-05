
module.exports = function() {
    var Agents = require('../src/AdminDashboard/data/agents.json')
    var Files = require('../src/AdminDashboard/data/files.json')
    var Fleets = require('../src/AdminDashboard/data/fleets.json')
    var HelpCenter = require('../src/AdminDashboard/data/helpCenter.json')
    var Invitations = require('../src/AdminDashboard/data/invitations.json')
    var InvitationsLog = require('../src/AdminDashboard/data/invitationsLog.json')
    var Packages = require('../src/AdminDashboard/data/packages.json')
    var Plugins = require('../src/AdminDashboard/data/plugins.json')
    var Policies = require('../src/AdminDashboard/data/policies.json')
    var Users = require('../src/AdminDashboard/data/users.json')
    return {
        devices: Agents,
        files: Files,
        fleets: Fleets,
        helpCenter: HelpCenter,
        invitations: Invitations,
        invitationsLog: InvitationsLog,
        applications: Packages,
        plugins: Plugins,
        policies: Policies,
        users: Users
    }
}