import { glpiApiLink } from '../../public/config.json'

describe('Devices', () => {
    beforeEach(function () {
        cy.server()

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmAgent/?uid_cols=true&forcedisplay[0]=2&forcedisplay[1]=3&forcedisplay[2]=4&forcedisplay[3]=12&order=ASC&range=0-14&`,
            response: {
                "totalcount":4,
                "count":4,
                "sort":1,
                "order":"ASC",
                "data":[
                    {"PluginFlyvemdmAgent.name":"device1@teclib.com","PluginFlyvemdmAgent.id":221,"PluginFlyvemdmAgent.PluginFlyvemdmFleet.name":"not managed fleet","PluginFlyvemdmAgent.Computer.id":916,"PluginFlyvemdmAgent.mdm_type":"android"},
                    {"PluginFlyvemdmAgent.name":"device2@teclib.com","PluginFlyvemdmAgent.id":234,"PluginFlyvemdmAgent.PluginFlyvemdmFleet.name":"MyFleet","PluginFlyvemdmAgent.Computer.id":216,"PluginFlyvemdmAgent.mdm_type":"android"}
                ],
                "content-range":"0-3/4"
            }
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/getGlpiConfig`,
            response: {
                "cfg_glpi":{
                    password_min_length: 10,
                    password_need_number: 1,
                    password_need_letter: 1,
                    password_need_caps: 1,
                    password_need_symbol: 1,
                    url_base: "https://your-url.com/glpi"
                }  
            }
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/PluginFlyvemdmAgent/221`,
            response: {"id":221,"name":"device1@teclib.com","version":"2.0.1-beta","computers_id":916,"users_id":580,"wipe":0,"lock":0,"enroll_status":"enrolled","entities_id":0,"plugin_flyvemdm_fleets_id":1,"last_report":null,"last_contact":"2018-05-24 16:52:48","is_online":1,"certificate":"","mdm_type":"android","has_system_permission":0,"api_token":"9VYCtZSxH5Xa01tWvlTEQWG3YRc7Fq3DZIXn7JsB","links":[{"rel":"Computer","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916"},{"rel":"User","href":"https://dev.flyve.org/glpi/apirest.php/User/580"},{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"},{"rel":"PluginFlyvemdmFleet","href":"https://dev.flyve.org/glpi/apirest.php/PluginFlyvemdmFleet/1"}]}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/search/PluginFlyvemdmFleet/?forcedisplay[0]=2&`,
            response: {"totalcount":12,"count":12,"sort":1,"order":"ASC","data":[{"1":"demo fleet","2":58},{"1":"DIOHz0r Tests","2":173},{"1":"Files&Apk","2":57},{"1":"fleet","2":61},{"1":"FlyveDevMcy","2":52},{"1":"Multiple file","2":59},{"1":"MyFleet","2":196},{"1":"New Feet","2":199},{"1":"New Feet copy","2":200},{"1":"not managed fleet","2":1},{"1":"Policies test","2":60},{"1":"test","2":68}],"content-range":"0-11/12"}
        })

        cy.route({
            method: 'GET',
            url: `${glpiApiLink}/PluginFlyvemdmFleet/1?`,
            response: {"id":1,"name":"not managed fleet","entities_id":0,"is_recursive":1,"is_default":1,"links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}
        })

        cy.route({
            method: 'GET',
           url: `${glpiApiLink}/Computer/916?expand_dropdowns=true&with_devices=true&with_disks=true&with_softwares=true&with_connections=true&with_networkports=true&`,
            response: {"id":916,"entities_id":"Root entity","name":"Android SDK built for x86","serial":"Unknown","otherserial":null,"contact":"android-build","contact_num":null,"users_id_tech":0,"groups_id_tech":0,"comment":null,"date_mod":"2018-05-24 16:45:24","autoupdatesystems_id":0,"locations_id":0,"domains_id":0,"networks_id":0,"computermodels_id":"Android SDK built for x86","computertypes_id":"Mobile device","is_template":0,"template_name":null,"manufacturers_id":0,"is_deleted":1,"is_dynamic":1,"users_id":"pspntzlm@hi2.in","groups_id":0,"states_id":0,"ticket_tco":0,"uuid":"4c0317c37d4ddbd8","date_creation":"2018-01-31 20:36:42","is_recursive":0,"_devices":{"Item_DeviceFirmware":{"1995":{"id":1995,"devicefirmwares_id":293,"is_dynamic":1,"entities_id":0,"is_recursive":0,"serial":"","otherserial":null,"locations_id":0,"states_id":0,"links":[{"rel":"DeviceFirmware","href":"https://dev.flyve.org/glpi/apirest.php/DeviceFirmware/293"},{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}},"Item_DeviceProcessor":{"7952":{"id":7952,"deviceprocessors_id":0,"frequency":1555,"serial":"","is_dynamic":1,"nbcores":0,"nbthreads":0,"entities_id":0,"is_recursive":0,"busID":null,"otherserial":null,"locations_id":0,"states_id":0,"links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}},"Item_DeviceMemory":{"2546":{"id":2546,"devicememories_id":2546,"size":2799,"serial":"","is_dynamic":1,"entities_id":0,"is_recursive":0,"busID":"","otherserial":null,"locations_id":0,"states_id":0,"links":[{"rel":"DeviceMemory","href":"https://dev.flyve.org/glpi/apirest.php/DeviceMemory/2546"},{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}},"Item_DeviceBattery":{"2872":{"id":2872,"devicebatteries_id":110,"manufacturing_date":null,"is_dynamic":1,"entities_id":0,"is_recursive":0,"serial":"","otherserial":null,"locations_id":0,"states_id":0,"links":[{"rel":"DeviceBattery","href":"https://dev.flyve.org/glpi/apirest.php/DeviceBattery/110"},{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}}},"_disks":[{"name":{"fsname":null,"id":89113,"entities_id":0,"name":"/data/cache","device":"/data/cache","mountpoint":null,"filesystems_id":0,"totalsize":25610,"freesize":5013,"is_dynamic":1,"date_mod":"2018-06-15 12:19:02","date_creation":"2018-06-15 12:19:02","links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}},{"name":{"fsname":null,"id":89112,"entities_id":0,"name":"/data","device":"/data","mountpoint":null,"filesystems_id":0,"totalsize":25610,"freesize":5013,"is_dynamic":1,"date_mod":"2018-06-15 12:19:02","date_creation":"2018-06-15 12:19:02","links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}},{"name":{"fsname":null,"id":89111,"entities_id":0,"name":"/storage/emulated/0","device":"/storage/emulated/0","mountpoint":null,"filesystems_id":0,"totalsize":25610,"freesize":5013,"is_dynamic":1,"date_mod":"2018-06-15 12:19:02","date_creation":"2018-06-15 12:19:02","links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}},{"name":{"fsname":null,"id":89110,"entities_id":0,"name":"/system","device":"/system","mountpoint":null,"filesystems_id":0,"totalsize":3022,"freesize":1751,"is_dynamic":1,"date_mod":"2018-06-15 12:19:02","date_creation":"2018-06-15 12:19:02","links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"}]}}],"_softwares":[{"softwarecategories_id":0,"softwares_id":237,"softwareversions_id":1139,"is_dynamic":1,"states_id":0,"is_valid":1,"links":[{"rel":"Software","href":"https://dev.flyve.org/glpi/apirest.php/Software/237"},{"rel":"SoftwareVersion","href":"https://dev.flyve.org/glpi/apirest.php/SoftwareVersion/1139"}]}],"_connections":[],"_networkports":{"NetworkPortEthernet":[{"netport_id":1709,"entities_id":0,"is_recursive":0,"logical_number":1,"name":"","mac":"02:00:00:00:00:00","comment":null,"is_dynamic":1,"id":1709,"networkports_id":1709,"items_devicenetworkcards_id":0,"netpoints_id":0,"type":"","speed":-1,"date_mod":"2018-06-09 14:37:53","date_creation":"2018-06-09 14:37:53","NetworkName":{"id":1709,"name":null,"fqdns_id":0,"FQDN":{"id":0,"name":null,"fqdn":null},"IPAddress":[{"id":"","name":null,"IPNetwork":[]}]},"links":[{"rel":"UNKNOWN","href":"https://dev.flyve.org/glpi/apirest.php/UNKNOWN/1709"},{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"},{"rel":"NetworkPort","href":"https://dev.flyve.org/glpi/apirest.php/NetworkPort/1709"}]}]},"links":[{"rel":"Entity","href":"https://dev.flyve.org/glpi/apirest.php/Entity/0"},{"rel":"ComputerModel","href":"https://dev.flyve.org/glpi/apirest.php/ComputerModel/8"},{"rel":"ComputerType","href":"https://dev.flyve.org/glpi/apirest.php/ComputerType/1"},{"rel":"User","href":"https://dev.flyve.org/glpi/apirest.php/User/579"},{"rel":"ReservationItem","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/ReservationItem/"},{"rel":"Document_Item","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Document_Item/"},{"rel":"Contract_Item","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Contract_Item/"},{"rel":"Infocom","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Infocom/"},{"rel":"Item_Ticket","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_Ticket/"},{"rel":"Item_Project","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_Project/"},{"rel":"NetworkPort","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/NetworkPort/"},{"rel":"Item_DeviceMotherboard","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceMotherboard/"},{"rel":"Item_DeviceFirmware","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceFirmware/"},{"rel":"Item_DeviceProcessor","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceProcessor/"},{"rel":"Item_DeviceMemory","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceMemory/"},{"rel":"Item_DeviceHardDrive","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceHardDrive/"},{"rel":"Item_DeviceNetworkCard","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceNetworkCard/"},{"rel":"Item_DeviceDrive","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceDrive/"},{"rel":"Item_DeviceBattery","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceBattery/"},{"rel":"Item_DeviceGraphicCard","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceGraphicCard/"},{"rel":"Item_DeviceSoundCard","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceSoundCard/"},{"rel":"Item_DeviceControl","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceControl/"},{"rel":"Item_DevicePci","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DevicePci/"},{"rel":"Item_DeviceCase","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceCase/"},{"rel":"Item_DevicePowerSupply","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DevicePowerSupply/"},{"rel":"Item_DeviceGeneric","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceGeneric/"},{"rel":"Item_DeviceSimcard","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceSimcard/"},{"rel":"Item_DeviceSensor","href":"https://dev.flyve.org/glpi/apirest.php/Computer/916/Item_DeviceSensor/"}]}
        }) 

        cy.route({
            method: 'GET',
           url: `${glpiApiLink}/search/Software/?metacriteria[0][link]=AND&metacriteria[0][itemtype]=Computer&metacriteria[0][field]=2&metacriteria[0][searchtype]=equals&metacriteria[0][value]=916&uid_cols=true&forcedisplay[0]=2&`,
            response: {"totalcount":1,"count":1,"sort":1,"order":"ASC","data":[{"Software.name":"Android","Software.Entity.completename":"Root entity","Software.id":916}],"content-range":"0-0/1"}
        }) 

        cy.route({
            method: 'GET',
           url: `${glpiApiLink}/search/Software/?metacriteria[0][link]=AND&metacriteria[0][itemtype]=Computer&metacriteria[0][field]=2&metacriteria[0][searchtype]=equals&metacriteria[0][value]=916&uid_cols=true&forcedisplay[0]=1&forcedisplay[1]=2&forcedisplay[2]=19&`,
            response: {"totalcount":1,"count":1,"sort":1,"order":"ASC","data":[{"Software.name":"Android","Software.Entity.completename":"Root entity","Software.id":916,"Software.date_mod":"2017-06-30 18:23:52"}],"content-range":"0-0/1"}
        })

        localStorage.setItem('sessionToken', 'token1234')
        localStorage.setItem('showNotifications', 'true')
        localStorage.setItem('notificationType', 'Toast')

        localStorage.setItem('currentUser',
            JSON.stringify({
                id:123,
                name:"exampleName",
                email: "example@teclib.com",
                picture: null
            })
        )

        localStorage.setItem('display',
            JSON.stringify({
                applicationsUploaded: false,
                devicesByOperatingSystemVersion: false,
                devicesByUsers: false,
                devicesCurrentlyManaged: false,
                filesUploaded: false,
                fleetsCurrentlyManaged: false,
                invitationsSent: false,
                numberUsers: false,
                animations: true,
                pendingInvitations: false
            })
        )
    })
  
    it('should navigate in users without problemss', () => {
        cy.visit('/app/devices')
        cy.contains('No selection')
        cy.get('main').screenshot('devices_noSelection', {capture: 'viewport'})
        cy.get('.win-itemscontainer').click('top')
        cy.get('.content-info > :nth-child(1)')
        cy.get('.header-block').click('topRight')
        cy.get('main').screenshot('devices_main', {capture: 'viewport'})
        cy.get('.win-pivot-headers > :nth-child(2)').click()
        cy.get('.system-report > :nth-child(2)')
        cy.get('.header-block').click('topRight')
        cy.get('main').screenshot('devices_systemReport', {capture: 'viewport'})
        cy.get('.win-pivot-headers > :nth-child(3)').click()
        cy.get('.header-block').click('topRight')
        cy.get('main').screenshot('devices_systemReport', {capture: 'viewport'})

        // cy.get('.editIcon').click()
        // cy.get('.header-block').click('topRight')
        // cy.get('main').screenshot('devices_edit', {capture: 'viewport'})
        // cy.get('.header-breadcrumb > :nth-child(5) > a').click()
    })
})