var global_menu_structure = {
    Make: [{
            name: 'Jobs',
            icon: 'copy',
            color: '#444',
            what: 'Navigate and play job files',
            clicked: (category_name, menu_name) => {navigation.goto(category_name, menu_name + '/sd', null)},
        },
        {
            name: 'Upload',
            icon: 'file-upload',
            color: '#0074d9',
            what: 'Send a file'
        },
        {
            name: 'Prepare',
            icon: 'wrench',
            color: '#777',
            what: 'Prepare the machine for a job'
        }
    ],
    Control: [{
            name: 'Move',
            icon: 'stroopwafel',
            color: 'Tomato',
            what: 'Jog around or move to an absolute position'
        },
        {
            name: 'Temperatures',
            icon: 'thermometer-half',
            color: 'Orange',
            what: 'Monitor and control temperatures',
            display: (config) => (config.groups && config.groups.temperature_control != undefined),
        },
        {
            name: 'Home',
            icon: 'home',
            color: '#2ecc40',
            what: 'Return machine to origin position',
        },
        {
            name: 'Laser',
            icon: 'sun far',
            color: '#85144b',
            what: 'Control of laser tool',
            display: (config) => (config.entries && config.entries.laser_module_enable == 'true'),
        },
        {
            name: 'Maintainance',
            icon: 'broom',
            color: '#ffdc00',
            what: 'Perform maintainance tasks'
        },
        {
            name: 'Calibrate',
            icon: 'flask',
            color: '#7fdbff',
            what: 'Adjust and optimize machine parameters'
        },
        {
            name: 'Console',
            icon: 'terminal',
            color: 'gray',
            what: 'Send commands and monitor communications'
        },
    ],
    System: [{
            name: 'Machine',
            icon: 'space-shuttle',
            color: 'navy',
            what: 'Configure the machine and controller board'
        },
        {
            name: 'Interface',
            icon: 'mouse-pointer',
            color: 'teal',
            what: 'Configure this interface'
        },
        {
            name: 'Files',
            icon: 'folder',
            color: 'brown',
            what: 'Browse and manipulate the file system'
        }
    ],
};
