const GroupOrderStatus = {
    PENDING: 0,
    CANCELED: 1,
    SUBMITTED: 2,
    SHIPPING: 3,
    DELIVERED: 4
};

const GroupOrderStatusList = [
    { text: 'Pending', name:'pending', value: OrderStatus.PENDING },
    { text: 'Canceled', name:'canceled', value: OrderStatus.CANCELED },
    { text: 'Submitted', name:'submitted', value: OrderStatus.SUBMITTED },
    { text: 'Shipping', name:'shipping', value: OrderStatus.SHIPPING },
    { text: 'Delivered', name:'delivered', value: OrderStatus.DELIVERED },
];

module.exports = {
    GroupOrderStatus,
    GroupOrderStatusList
};