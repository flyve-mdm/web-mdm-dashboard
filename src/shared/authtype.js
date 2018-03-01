export default (id) => {
    switch (id) {
        case 1:
            return 'GLPI internal database'
        case 2:
            return 'Mail server'
        case 3:
            return 'LDAP directory'
        case 4:
            return 'Other'
        case 5:
            return 'CAS'
        case 6:
            return 'x509 certificate authentication'
        case 7:
            return 'API'
        case 8:
            return 'Cookie'
        case 0:
            return 'Not yet authenticated'
        default:
            return ''
    }
}
