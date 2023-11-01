const GroupOrderStatus = {
    PENDING: 0,
    CLOSED: 1,
    ORDERED: 2,
    SHIPPED: 3,
};

const GroupOrderStatusList = [
    { text: 'Pending', name:'pending', value: OrderStatus.PENDING },
    { text: 'Closed', name:'closed', value: OrderStatus.CLOSED },
    { text: 'Ordered', name:'ordered', value: OrderStatus.ORDERED },
    { text: 'Shipped', name:'shipped', value: OrderStatus.SHIPPED },
];

module.exports = {
    GroupOrderStatus,
    GroupOrderStatusList
};