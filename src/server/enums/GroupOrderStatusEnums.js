const GroupOrderStatus = {
    CANCELED: 0,
    PENDING: 1,
    SUBMITTED: 2,
    SHIPPING: 3,
    DELIVERED: 4
};

const GroupOrderStatusList = [
    { text: 'Canceled', name:'canceled', value: OrderStatus.CANCELED },
    { text: 'Pending', name:'pending', value: OrderStatus.PENDING },
    { text: 'Submitted', name:'submitted', value: OrderStatus.SUBMITTED },
    { text: 'Shipping', name:'shipping', value: OrderStatus.SHIPPING },
    { text: 'Delivered', name:'delivered', value: OrderStatus.DELIVERED },
];

module.exports = {
    GroupOrderStatus,
    GroupOrderStatusList
};