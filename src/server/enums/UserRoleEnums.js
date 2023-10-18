const UserRole = {
    NORMAL: 0,
    SHIPPER: 1,
};

const UserRoleList = [
    { text: 'Normal', name:'normal', value: UserRole.NORMAL },
    { text: 'Shipper', name:'shipper', value: UserRole.SHIPPER },
];

module.exports = {
    UserRole,
    UserRoleList
};