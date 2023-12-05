const GroupOrderStatus = {
    PENDING: 0,
    CANCELED: 1,
    SUBMITTED: 2,
    SHIPPING: 3,
    DELIVERED: 4
};

const GroupOrderStatusList = [
    { text: 'Pending', name:'pending', value: GroupOrderStatus.PENDING },
    { text: 'Canceled', name:'canceled', value: GroupOrderStatus.CANCELED },
    { text: 'Submitted', name:'submitted', value: GroupOrderStatus.SUBMITTED },
    { text: 'Shipping', name:'shipping', value: GroupOrderStatus.SHIPPING },
    { text: 'Delivered', name:'delivered', value: GroupOrderStatus.DELIVERED },
];

module.exports = {
    GroupOrderStatus,
    GroupOrderStatusList
};