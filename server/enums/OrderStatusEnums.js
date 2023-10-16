const OrderStatus = {
    PENDING: 0,
    APPROVED: 1,
    CANCELED: 2,
};

const OrderStatusList = [
    { text: 'Pending', name:'pending', value: OrderStatus.PENDING },
    { text: 'Approved', name:'approved', value: OrderStatus.APPROVED },
    { text: 'Canceled', name:'canceled', value: OrderStatus.CANCELED },
];

module.exports = {
    OrderStatus,
    OrderStatusList
};